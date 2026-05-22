import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { RatingModel } from 'src/app/models/rating.model';
import { ClientService } from 'src/app/services/client.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-ratings-history',
  templateUrl: './ratings-history.component.html',
  styleUrls: ['./ratings-history.component.css'],
  standalone: false,
})
export class RatingsHistoryComponent {
  client?: ClientModel;
  displayedColumns: string[] = [
    'phase',
    'answered_questions_count',
    'all_questions_count',
    'last_update',
    'last_updated_by',
    'edit',
  ];
  public dataSource: MatTableDataSource<any>;
  private _ratings: any[] = [];

  constructor(
    private clientService: ClientService,
    private ratingService: RatingService,
    private router: Router,
  ) {
    this.client = this.clientService.getSelectedClient();
    this.dataSource = new MatTableDataSource<any>();
  }

  @Input() set ratings(value: any[]) {
    this._ratings = value;

    let ratingsTable: any[] = [];

    this._ratings.forEach((rating: any) => {
      ratingsTable.push({
        _id: rating._id,
        phase: rating.phase_no,
        answered_questions_count: rating.questions_rating.filter(
          (questions: any) => questions.rating !== null,
        ).length,
        all_questions_count: rating.questions_rating.length,
        last_updated_by: rating.rated_by_user_id,
        last_update: rating.date_rated,
        data: rating,
      });
    });

    this.dataSource = new MatTableDataSource<any>(ratingsTable);
  }

  get ratings() {
    return this._ratings;
  }

  updateQuestionnaire(questionnaire: RatingModel) {
    this.ratingService.isHistory$.emit({
      isHistory: true,
      questionnaire: questionnaire,
    });
    this.router.navigate(['questionnaire']);
  }

  deletePhase(id: number) {
    this.ratingService.deleteRating(id).subscribe();
    this.ratingService
      .getRatingsByClientId(this.client?._id ? this.client._id : 0)
      .subscribe((ratingsList: any) => {
        this.dataSource = ratingsList;
      });
  }
}
