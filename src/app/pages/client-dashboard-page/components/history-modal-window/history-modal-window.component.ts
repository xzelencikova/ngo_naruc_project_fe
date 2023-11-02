import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-history-modal-window',
  templateUrl: './history-modal-window.component.html',
  styleUrls: ['./history-modal-window.component.css']
})
export class HistoryModalWindowComponent {
  client?: ClientModel;
  
  displayedColumns: string[] = ['phase', 'answered_questions_count', 'all_questions_count', 'last_update', 'edit'];
  public dataSource: MatTableDataSource<any>;

  constructor(private clientService: ClientService, private ratingService: RatingService, private activatedRoute: ActivatedRoute) {
    this.client = this.clientService.getSelectedClient();
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {

    this.ratingService.getRatingsByClientId(this.client?._id!).subscribe(results => {
      let resultsTable: any[] = [];
      console.log(results);
      results.forEach(result => {
        resultsTable.push({
          _id: result._id,
          phase: result.phase_no,
          answered_questions_count: result.questions_rating.filter(questions => questions.rating !== 0).length,
          all_questions_count: result.questions_rating.length,
          // last_updated_by: result.last_updated_by,
          last_update: result.date_rated
        })
      })

      console.log(resultsTable);
      this.dataSource = new MatTableDataSource<any>(resultsTable);
    })
  }

  updateQuestionnaire(questionnaire: any) {
    console.log(questionnaire);
  }
}
