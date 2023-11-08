import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RatingModel } from '../models/rating.model';
import { ErrorHandlerService } from './error-handler.service';
import { QuestionRatingModel } from '../models/question-rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  public isHistory$: EventEmitter<any> = new EventEmitter<any>();
  public isHistory: boolean = false;
  public selectedQuestionnaire!: RatingModel;

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {
    this.isHistory$.subscribe(selection => {
      this.isHistory = selection.isHistory;
      this.selectedQuestionnaire = selection.questionnaire
      console.log(this.selectedQuestionnaire);
    });
  }

  private baseUrl: string = environment.baseUrl;

  postRating(rating: RatingModel): Observable<RatingModel> {
    return this.http.post<RatingModel>(`${this.baseUrl}/ngo/ratings`, rating)
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }

  getRatingOverviewForClient(clientId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ngo/rating_overview/${clientId}`);
  }

  getRatingsByClientId(clientId: string): Observable<RatingModel[]> {
    return this.http.get<RatingModel[]>(`${this.baseUrl}/ngo/ratings/for_client/${clientId}`)
  }

  getHistory(): boolean {
    return this.isHistory;
  }

  getHistoryQuestionnaire(): RatingModel {
    return this.selectedQuestionnaire;
  }
}
