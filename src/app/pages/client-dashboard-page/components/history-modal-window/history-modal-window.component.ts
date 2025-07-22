import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { RatingModel } from 'src/app/models/rating.model';
import { ClientService } from 'src/app/services/client.service';
import { RatingService } from 'src/app/services/rating.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-history-modal-window',
  templateUrl: './history-modal-window.component.html',
  styleUrls: ['./history-modal-window.component.css']
})
export class HistoryModalWindowComponent {
  client?: ClientModel;
  
  displayedColumns: string[] = ['phase', 'answered_questions_count', 'all_questions_count', 'last_update', 'last_updated_by', 'edit'];
  public dataSource: MatTableDataSource<any>;

  constructor(private clientService: ClientService, private ratingService: RatingService, private activatedRoute: ActivatedRoute, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.client = this.clientService.getSelectedClient();
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.ratingService.getRatingsByClientId(this.client?._id!).subscribe(results => {
      let resultsTable: any[] = [];

      results.forEach(result => {
        resultsTable.push({
          _id: result._id,
          phase: result.phase_no,
          answered_questions_count: result.questions_rating.filter(questions => questions.rating !== null).length,
          all_questions_count: result.questions_rating.length,
          last_updated_by: result.rated_by_user_id,
          last_update: result.date_rated,
          questions: result
        })
      })

      this.dataSource = new MatTableDataSource<any>(resultsTable);
    })
  }

  updateQuestionnaire(questionnaire: RatingModel) {
    this.ratingService.isHistory$.emit({isHistory: true, questionnaire: questionnaire});
    this.router.navigate(['questionnaire']);
  }
}
