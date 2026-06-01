import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { RatingModel } from 'src/app/models/rating.model';
import { ClientService } from 'src/app/services/client.service';
import { RatingService } from 'src/app/services/rating.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { QuestionsOverviewChartComponent } from './components/questions-overview-chart/questions-overview-chart.component';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-client-dashboard-page',
  templateUrl: './client-dashboard.page.html',
  styleUrls: ['./client-dashboard.page.css'],
  standalone: false,
})
export class ClientDashboardPage {
  public client: ClientModel = {
    id: 0,
    name: '',
    contract_no: '',
    surname: '',
    last_phase: 1,
    registration_date: new Date(),
    active: true,
  };

  ratings: RatingModel[] = [];
  colors: string[] = [
    'FFA539',
    'FF4219',
    '19BAFF',
    '1E19FF',
    '27CD9B',
    'CD2727',
    'F556F2',
  ];

  phasesData: any[] = [];
  phasesLabels: string[] = [
    'Adaptačná fáza',
    'Podporná fáza',
    'Aktivizačná fáza',
  ];
  totalPhasesAvgScore: number = 0;
  progressbarColor: string = '#fff';

  clientName: string = '';

  constructor(
    private router: Router,
    private clientService: ClientService,
    private ratingService: RatingService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    const client_id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.clientService.getClientById(client_id!).subscribe((res) => {
      this.client = res;
      this.clientService.selectedClient$.emit(res);
    });

    this.ratingService
      .getRatingsByClientId(client_id)
      .subscribe((ratingsList) => {
        for (let i = 0; i < ratingsList.length; i++) {
          const validRatings = ratingsList[i].ratings.filter(
            (r: any) =>
              r.rating > 0 && r.rating !== null && r.rating !== undefined,
          );
          const maxPhaseScore = validRatings.length * 2;
          console.log(maxPhaseScore);
          const avgPhaseScore =
            this.calculateAverageScore(
              validRatings,
              'rating',
              maxPhaseScore,
              true,
            ) * 100;
          console.log(avgPhaseScore);

          this.phasesData.push({
            phase: this.phasesLabels[i],
            score: avgPhaseScore,
            color: this.getScoreColor(avgPhaseScore),
            state: 'complete',
          });
        }
        if (this.phasesData.length > 0 && this.phasesData.length < 3) {
          for (let index = this.phasesData.length; index < 3; index++) {
            this.phasesData.push({
              phase: this.phasesLabels[index],
              score: 0,
              color: '#fff',
              state: index === ratingsList.length ? 'active' : null,
            });
          }
        }
        console.log(this.phasesData);
        this.totalPhasesAvgScore = this.calculateAverageScore(
          this.phasesData,
          'score',
          ratingsList.length,
          false,
        );
        this.progressbarColor = this.getScoreColor(this.totalPhasesAvgScore);

        this.ratings = ratingsList;
      });
  }

  loadQuestionnaire() {
    this.ratingService.isHistory$.emit({ isHistory: false, questionnaire: {} });
    this.router.navigate(['questionnaire']);
  }

  getScoreColor(score: number) {
    if (score >= 60) return '#2e9e4f';
    if (score >= 40) return '#ff9a65';
    return '#d8200f';
  }

  // Functions to calculate average score and set label
  calculateAverageScore(
    arr: any[],
    key: string,
    divider: number,
    isRating: boolean,
  ): number {
    return isRating
      ? arr?.reduce(
          (accumulator, currentValue) => accumulator + (currentValue[key] - 1),
          0,
        ) / divider
      : arr?.reduce(
          (accumulator, currentValue) => accumulator + currentValue[key],
          0,
        ) / divider;
  }

  getScoreLabel(score: number): string {
    if (score >= 80) return 'Výborné';
    if (score >= 60) return 'Dobré';
    if (score >= 40) return 'Priemerné';
    if (score >= 20) return 'Slabé';
    return 'Veľmi slabé';
  }

  // Function to identifz phases style for progress bar
  getPhaseStyles(phase: any) {
    return {
      background: phase.state === 'complete' ? this.progressbarColor : null,
      color: phase.state === 'active' ? this.progressbarColor : null,
      border:
        phase.state !== null ? `3px solid ${this.progressbarColor}` : null,
    };
  }

  // Function to export tables as Excel sheets
  @ViewChild(QuestionsOverviewChartComponent)
  questionsOverviewChart!: QuestionsOverviewChartComponent;
  exportToExcel() {
    const workbook = XLSX.utils.book_new();

    const tables = this.questionsOverviewChart.getExcelData();
    tables.forEach((tab: any) => {
      const sheetData = tab.data.map((row: any) => ({
        'No.': row.id,
        Otázka: row.question,
        'Fáza 1': row.phase_1,
        'Fáza 2': row.phase_2,
        'Fáza 3': row.phase_3,
      }));

      const worksheet = XLSX.utils.json_to_sheet(sheetData);
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        tab.category.length <= 31 ? tab.category : tab.category.slice(0, 31),
      );
    });

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    this.saveExcel(
      excelBuffer,
      `${this.client.contract_no}_${this.client.name}_${this.client.surname}_Prehľad_Hodnotenia`,
    );
  }

  saveExcel(buffer: any, filename: string) {
    const data = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(data, `${filename}.xlsx`);
  }

  // Function to export dashboard as PDF file
  @ViewChild('pdfPage') pdfPage!: ElementRef;
  isDownload: boolean = false;
  prepareExportToPDF() {
    this.isDownload = true;
    setTimeout(() => {
      this.exportToPDF();
    }, 0);
  }

  exportToPDF() {
    const DATA = this.pdfPage.nativeElement;

    html2canvas(DATA, {
      scale: 2, // Better quality
      useCORS: true, // For Plotly & images
      allowTaint: true,
    }).then((canvas) => {
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF('p', 'mm', 'a4');
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        position,
        imgWidth,
        imgHeight,
      );
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          0,
          position,
          imgWidth,
          imgHeight,
        );
        heightLeft -= pageHeight;
      }

      pdf.save(
        `${this.client.contract_no}_${this.client.name}_${this.client.surname}_Prehľad_Hodnotenia.pdf`,
      );
      this.isDownload = false;
    });
  }
}
