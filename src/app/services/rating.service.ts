import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RatingModel } from '../models/rating.model';
import { ErrorHandlerService } from './error-handler.service';
import { QuestionRatingModel } from '../models/question-rating.model';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  public isHistory$: EventEmitter<any> = new EventEmitter<any>();
  public isHistory: boolean = false;
  public selectedQuestionnaire!: RatingModel;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
  ) {
    this.isHistory$.subscribe((selection) => {
      this.isHistory = selection.isHistory;
      this.selectedQuestionnaire = selection.questionnaire;
      console.log(this.selectedQuestionnaire);
    });
  }

  private baseUrl: string = `${environment.baseUrl}/ratings`;

  addNewRating(rating: RatingModel): Observable<RatingModel> {
    return this.http
      .post<RatingModel>(`${this.baseUrl}`, rating)
      .pipe(catchError(this.errorHandlerService.handleError));
  }

  getRatingsByClientId(clientId: number): Observable<RatingModel[]> {
    return this.http.get<RatingModel[]>(
      `${this.baseUrl}/client-id/${clientId}`,
    );
  }

  getHistory(): boolean {
    return this.isHistory;
  }

  getHistoryQuestionnaire(): RatingModel {
    return this.selectedQuestionnaire;
  }

  deleteRatingById(rating_id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${rating_id}`);
  }
}
