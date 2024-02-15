import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ClientModel } from 'src/app/models/client.model';
import { RatingModel } from 'src/app/models/rating.model';
import { ClientService } from 'src/app/services/client.service';
import { RatingService } from 'src/app/services/rating.service';
import { HistoryModalWindowComponent } from './components/history-modal-window/history-modal-window.component';
import { MatDialog } from '@angular/material/dialog';
import domToImage from 'dom-to-image';
import jsPDF from 'jspdf';
import { AlertService, Alert } from 'src/app/components/alert';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import * as CSV from 'xlsx';


@Component({
  selector: 'app-client-dashboard-page',
  templateUrl: './client-dashboard.page.html',
  styleUrls: ['./client-dashboard.page.css']
})
export class ClientDashboardPage {
  public client: ClientModel = {_id: 0, name: "", surname: "", last_phase: 1, registration_date: new Date(), active: true};
  ratingOverview: any = {};
  ratingCategory: any[] = [];
  ratings: RatingModel[] = [];
  customColors: any[] = [];
  isOverview: boolean = true;
  category: string = "";
  colors: string[] = ['FFA539', 'FF4219', '19BAFF', '1E19FF', '27CD9B'];
  categoryColors: any[] = [];
  isData: boolean = false;
  

  isPieDataArray: any = {
    "pie_1": false, 
    "pie_2": false, 
    "pie_3": false
  };

  colorScheme: Color = {
    name: "myScheme",
    selectable: true,
    group: ScaleType.Ordinal,
    domain: this.customColors // ['#1E19FF', '#1E19FF', '#1E19FF']
  };

  constructor(private router: Router, private clientService: ClientService, private ratingService: RatingService, private activatedRoute: ActivatedRoute, private dialog: MatDialog, private alertService: AlertService) {
    this.client = this.clientService.getSelectedClient();
    const client_id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.client._id === 0) {   
      this.clientService.getClientById(client_id!).subscribe(res => {
        this.client = res;

        this.clientService.selectedClient$.emit(res);
      });
    }

    this.ratingService.getRatingOverviewForClient(this.client?._id ? this.client._id : client_id!).subscribe(overview => {
      if (overview.bar_overview.length > 0) {
        this.ratingOverview = overview;

        Object.keys(this.ratingOverview).forEach(key => {
          if (key.includes("pie")) {
            for (let index = 0; index < Object.keys(this.ratingOverview[key]).length; index++) {
              if (this.ratingOverview[key][index].value === 0) continue;
              
              this.isPieDataArray[key] = true;
              break;
            }
          }
        })
        console.log(this.ratingOverview);
        this.categoryColors = JSON.parse(JSON.stringify(overview.bar_overview));

        for (let index = 0; index < this.categoryColors.length; index++) {
          this.categoryColors[index].series[0].value = `#${this.colors[index]}80`;
          this.categoryColors[index].series[1].value = `#${this.colors[index]}BF`;
          this.categoryColors[index].series[2].value = `#${this.colors[index]}FF`;
        }
        this.isData = true;
      }
      else this.isData = false;

    });
    this.ratingService.getRatingsByClientId(this.client?._id ? this.client._id : client_id!).subscribe(ratingsList => {
      this.ratings = ratingsList;
    });
  }

  ngOnInit() {
    
  }

  getCategoryRating(category: string) {
    const categoryQuestions = this.ratings.map(rating => rating.questions_rating.filter(q => q.category === category));
    this.ratingCategory = [];
    this.category = category;
    
    categoryQuestions[0].forEach(c => {
      this.ratingCategory.push({
        "name": c.question,
        "series": [
          {
            "name": "Fáza 1",
            "value": 0
          },
          {
            "name": "Fáza 2",
            "value": 0
          },
          {
            "name": "Fáza 3",
            "value": 0
          }
        ]
      });

      this.customColors.push({
        "name": c.question,
        "series": [
          {
            "name": "Fáza 1",
            "value": "#FF4D00"
          },
          {
            "name": "Fáza 2",
            "value": "#FF4D00"
          },
          {
            "name": "Fáza 3",
            "value": "#FF4D00"
          }
        ]
      })
    })
  
    for (let i = 0; i < this.ratings.length; i++) {
      let phase = this.ratings[i].phase_no - 1;

      for (let j = 0; j < categoryQuestions[i].length; j++) {
        this.ratingCategory[j].series[phase].value = categoryQuestions[i][j].rating; 

        switch (categoryQuestions[i][j].rating) {
          case 1:
            this.customColors[j].series[phase].value = "#FF5800"
            break;
          case 2:
            this.customColors[j].series[phase].value = "#FF9A65"
            break;
          case 3:
            this.customColors[j].series[phase].value = "#189D5F"
            break;
          default:
            break;
        }
      }
    }

    this.isOverview = false;
  }

  setOverview(event: boolean) {
    this.isOverview = event;
  }

  loadQuestionnaire() {
    this.ratingService.isHistory$.emit({isHistory: false, questionnaire: {}});
    this.router.navigate(["questionnaire"]);
  }

  columns = [] as string[];

  exportToCSV(jsonData: any[], fileName: string): void {

    // // Replace 'client_id' and 'date_rated' with actual values from your JSON data
    // const clientId = jsonData[0].client_id;
    // const dateRated = jsonData[0].date_rated;

    // // Construct filename
    // const filename = `client_${clientId}_rated_${dateRated}`;

    const csvData: string = this.convertArrayToCSV(jsonData);
  
    // Save the CSV data to a file
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, fileName + '.csv');
  }
  
  convertArrayToCSV(jsonData: any[]): string {
    let csv = '';

    // Ensure jsonData is an array and not undefined
    if (!Array.isArray(jsonData)) {
      console.error('JSON data is not an array.');
      return csv;
    }

    // Construct the CSV header
    const headers = ['Question ID'];
    const phases = new Set<number>();
    console.log('json nula', jsonData[0]);
    jsonData[0].forEach((item: any) => {
      // Ensure each item has the necessary properties
      if (item.questions_rating && Array.isArray(item.questions_rating)) {
        phases.add(item.phase_no);
      } else {
        console.error('Invalid item:', item);
      }
    });

    phases.forEach((phase: number) => {
      headers.push(`Rating Phase ${phase}`);
    });
    headers.push('Category', 'Question');

    csv += headers.join(',') + '\n';

    // Populate CSV rows
    jsonData[0].forEach((item: any) => {
      if (item.questions_rating && Array.isArray(item.questions_rating)) {
        item.questions_rating.forEach((question: any) => {
          const rowValues: any[] = [question.question_id];
          phases.forEach((phase: number) => {
            const rating = jsonData[0].find((item: any) => item.phase_no === phase)?.questions_rating.find((question: any) => question.question_id === question.question_id)?.rating || '';
            rowValues.push(rating);
          });

          rowValues.push(question.category, question.question);
          csv += rowValues.join(',') + '\n';
        });
      } else {
        console.error('Invalid item:', item);
      }
    });

    return csv;
  }
  
  
  
  // @ts-ignore
  @ViewChild('dataToExport', { static: false }) public dataToExport: ElementRef;


  public downloadOverview(): void {

    // export in CSV
    const jsonData = [this.ratings];
    console.log(jsonData);
    this.exportToCSV(jsonData, (this.client!.name +'_' +this.client!.surname! + '_hodnotenie'));
    
    
    const width = Math.max(this.dataToExport.nativeElement.clientWidth, 
      this.dataToExport.nativeElement.scrollWidth, 
      this.dataToExport.nativeElement.offsetWidth);

    const height = Math.max(this.dataToExport.nativeElement.clientHeight, 
      this.dataToExport.nativeElement.scrollHeight, 
      this.dataToExport.nativeElement.offsetHeight);

    domToImage
    .toPng(this.dataToExport.nativeElement, {
      width: width,
      height: height,
    })
    .then(result => {
      const pdf = new jsPDF('l','mm','a4');
      pdf.setFontSize(20);
      pdf.setTextColor('#5C5C5C');
      pdf.text(this.client!.name +'_' +this.client!.surname!, 10, 10);
      pdf.addImage(result, 'PNG', 5, 20, 287, height*(287/width));
      pdf.save(this.client!.name +'_' +this.client!.surname! + '_prehlad' + '.pdf');
      this.alertService.success("Prehľad klienta bol úspešne stiahnutý.", "Výborne!");
    })
    .catch(error => {
      console.log(error);
      this.alertService.error("Nebolo možné stiahnuť prehľad klienta.", "Nastala chyba!")
    });
  }

openHistoryModal() {
  const dialogRef = this.dialog.open(HistoryModalWindowComponent);
}

}
