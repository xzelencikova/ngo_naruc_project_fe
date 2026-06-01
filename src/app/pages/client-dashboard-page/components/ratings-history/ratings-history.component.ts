import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { RatingModel } from 'src/app/models/rating.model';
import { ClientService } from 'src/app/services/client.service';
import { RatingService } from 'src/app/services/rating.service';
import { DeleteWindowComponent } from '../delete-window/delete-window.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/components/alert';

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
    private dialog: MatDialog,
    private alertService: AlertService,
  ) {
    this.client = this.clientService.getSelectedClient();
    this.dataSource = new MatTableDataSource<any>();
  }

  // Fill the ratings into a history table
  @Input() set ratings(value: any[]) {
    this._ratings = value;

    let ratingsTable: any[] = [];

    this._ratings.forEach((rating: any) => {
      ratingsTable.push({
        id: rating.id,
        phase: rating.phase,
        answered_questions_count: rating.ratings.filter(
          (questions: any) => questions.rating !== null,
        ).length,
        all_questions_count: rating.ratings.length,
        last_updated_by: rating.last_update_by,
        last_update: rating.last_update_date,
        data: rating,
      });
    });

    this.dataSource = new MatTableDataSource<any>(ratingsTable);
  }

  get ratings() {
    return this._ratings;
  }

  // Function to open a specified rating as a questionnaire
  updateQuestionnaire(questionnaire: RatingModel) {
    this.ratingService.isHistory$.emit({
      isHistory: true,
      questionnaire: questionnaire,
    });
    this.router.navigate(['questionnaire']);
  }

  // Function to delete a specified rating
  deletePhase(id: number) {
    const dialogRef = this.dialog.open(DeleteWindowComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ratingService.deleteRatingById(id!).subscribe({
          next: (success) => {
            this.alertService.success(
              'Hodnotenie bolo úspešne odstránené.',
              'Výborne!',
            );
            window.location.reload();
          },
          error: (err) => {
            this.alertService.error(
              'Nepodarilo sa odstrániť hodnotenie.',
              'Nastala chyba!',
            );
          },
        });
      }
    });
  }
}
