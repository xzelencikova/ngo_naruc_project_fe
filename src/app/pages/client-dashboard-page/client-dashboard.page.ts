import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ClientModel } from 'src/app/models/client.model';
import { RatingModel } from 'src/app/models/rating.model';
import { ClientService } from 'src/app/services/client.service';
import { RatingService } from 'src/app/services/rating.service';
import { MatDialog } from '@angular/material/dialog';
import domToImage from 'dom-to-image';
import jsPDF from 'jspdf';
import { AlertService, Alert } from 'src/app/components/alert';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import * as CSV from 'xlsx';
import { active } from 'd3';

@Component({
  selector: 'app-client-dashboard-page',
  templateUrl: './client-dashboard.page.html',
  styleUrls: ['./client-dashboard.page.css'],
  standalone: false,
})
export class ClientDashboardPage {
  public client: ClientModel = {
    _id: 0,
    name: '',
    surname: '',
    last_phase: 1,
    registration_date: new Date(),
    active: true,
  };

  ratings: RatingModel[] = [];
  customColors: any[] = [];
  isOverview: boolean = true;
  category: string = '';
  colors: string[] = ['FFA539', 'FF4219', '19BAFF', '1E19FF', '27CD9B'];
  categoryColors: any[] = [];
  isData: boolean = false;

  phasesData: any[] = [];
  totalPhasesAvgScore: number = 0;
  progressbarColor: string = '#fff';

  clientName: string = '';

  isPieDataArray: any = {
    pie_1: false,
    pie_2: false,
    pie_3: false,
  };

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: this.customColors, // ['#1E19FF', '#1E19FF', '#1E19FF']
  };

  constructor(
    private router: Router,
    private clientService: ClientService,
    private ratingService: RatingService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private alertService: AlertService,
  ) {}

  ngOnInit() {
    this.client = this.clientService.getSelectedClient();

    this.ratingService
      .getRatingsByClientId(this.client?._id ? this.client._id : 0)
      .subscribe((ratingsList) => {
        for (let i = 0; i < ratingsList.length; i++) {
          const maxPhaseScore =
            ratingsList[i].questions_rating.filter((r: any) => r.rating >= 0)
              .length * 2;
          const avgPhaseScore =
            (ratingsList[i].questions_rating.reduce(
              (acc: any, curr: any) => acc + curr.rating,
              0,
            ) /
              maxPhaseScore) *
            100;

          this.phasesData.push({
            phase: `Fáza ${ratingsList[i].phase_no}`,
            score: avgPhaseScore,
            color:
              avgPhaseScore > 67
                ? '#2e9e4f'
                : avgPhaseScore > 33
                  ? '#ff9a65'
                  : '#f03c6c',
            state: i + 1 === ratingsList.length ? 'active' : 'complete',
          });

          // for (let j = 0; j < ratingsList[i].questions_rating.length; j++) {
          //   ratingsList[i].questions_rating[j].rating =
          //     ratingsList[i].questions_rating[j].rating + 1;
          // }
        }
        if (this.phasesData.length > 0 && this.phasesData.length < 3) {
          for (let index = this.phasesData.length; index < 3; index++) {
            this.phasesData.push({
              phase: `Fáza ${index + 1}`,
              score: 0,
              color: '#fff',
              state: null,
            });
          }
        }
        console.log(this.phasesData);
        this.totalPhasesAvgScore =
          this.phasesData.reduce((acc, curr) => acc + curr.score, 0) /
          ratingsList.length;
        this.progressbarColor =
          this.totalPhasesAvgScore > 67
            ? '#2e9e4f'
            : this.totalPhasesAvgScore > 33
              ? '#ff9a65'
              : '#d8200f';
        this.ratings = ratingsList;
      });
  }

  loadQuestionnaire() {
    this.ratingService.isHistory$.emit({ isHistory: false, questionnaire: {} });
    this.router.navigate(['questionnaire']);
  }

  calculateAverageScore(arr: any[]): number {
    return (
      arr?.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      ) / arr.filter((a: any) => a.score > 0).length
    );
  }

  getScoreLabel(score: number): string {
    if (score >= 80) return 'Výborné';
    if (score >= 60) return 'Dobré';
    if (score >= 40) return 'Priemerné';
    if (score >= 20) return 'Slabé';
    return 'Veľmi slabé';
  }

  exportToCSV(jsonData: any[], fileName: string): void {
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
            const rating =
              jsonData[0]
                .find((item: any) => item.phase_no === phase)
                ?.questions_rating.find(
                  (question_item: any) =>
                    question_item.question_id === question.question_id,
                )?.rating || '';
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

  getPhaseStyles(phase: any) {
    return {
      background: phase.state === 'complete' ? this.progressbarColor : null,
      color: phase.state === 'active' ? this.progressbarColor : null,
      border:
        phase.state !== null ? `3px solid ${this.progressbarColor}` : null,
    };
  }

  // @ts-ignore
  @ViewChild('dataToExport', { static: false }) public dataToExport: ElementRef;

  public downloadCSVOverview(): void {
    // export in CSV
    const jsonData = [this.ratings];
    console.log('Data from API', jsonData);
    this.exportToCSV(
      jsonData,
      this.client!.name + '_' + this.client!.surname! + '_hodnotenie',
    );
  }

  public downloadOverview(): void {
    const width = Math.max(
      this.dataToExport.nativeElement.clientWidth,
      this.dataToExport.nativeElement.scrollWidth,
      this.dataToExport.nativeElement.offsetWidth,
    );

    const height = Math.max(
      this.dataToExport.nativeElement.clientHeight,
      this.dataToExport.nativeElement.scrollHeight,
      this.dataToExport.nativeElement.offsetHeight,
    );

    domToImage
      .toPng(this.dataToExport.nativeElement, {
        width: width,
        height: height,
      })
      .then((result) => {
        const pdf = new jsPDF('l', 'mm', 'a4');
        pdf.setFontSize(20);
        pdf.setTextColor('#5C5C5C');
        pdf.text(this.client!.name + '_' + this.client!.surname!, 10, 10);
        pdf.addImage(result, 'PNG', 5, 20, 287, height * (287 / width));
        pdf.save(
          this.client!.name + '_' + this.client!.surname! + '_prehlad' + '.pdf',
        );
        this.alertService.success(
          'Prehľad klienta bol úspešne stiahnutý.',
          'Výborne!',
        );
      })
      .catch((error) => {
        console.log(error);
        this.alertService.error(
          'Nebolo možné stiahnuť prehľad klienta.',
          'Nastala chyba!',
        );
      });
  }
}
