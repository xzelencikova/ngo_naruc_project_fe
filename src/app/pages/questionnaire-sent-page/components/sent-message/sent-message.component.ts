import { Component } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { RatingService } from 'src/app/services/rating.service';
import { RatingModel } from 'src/app/models/rating.model';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import * as CSV from 'xlsx';

@Component({
  selector: 'app-sent-message',
  templateUrl: './sent-message.component.html',
  styleUrls: ['./sent-message.component.css']
})
export class SentMessageComponent {
  ratings: RatingModel[] = [];
  public client?: ClientModel;
  constructor(private clientService: ClientService, private ratingService: RatingService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.client = this.clientService.getSelectedClient();
    const client_id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.client._id === 0) {   
      this.clientService.getClientById(client_id!).subscribe(res => {
        this.client = res;

        this.clientService.selectedClient$.emit(res);
      });
    }
    this.ratingService.getRatingsByClientId(this.client?._id ? this.client._id : client_id!).subscribe(ratingsList => {
      this.ratings = ratingsList;
    });

  }

  ngOnInit(): void {
    this.client = this.clientService.getSelectedClient();
  }

  showClient(): void {
    this.router.navigate(['client-overview', this.client?._id])
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
            const rating = jsonData[0].find((item: any) => item.phase_no === phase)?.questions_rating.find((question_item: any) => question_item.question_id === question.question_id)?.rating || '';      
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

  public downloadOverview(): void {

    // export in CSV
    const jsonData = [this.ratings];
    console.log(jsonData);
    this.exportToCSV(jsonData, (this.client!.name +'_' +this.client!.surname! + '_hodnotenie'));
  }


}
