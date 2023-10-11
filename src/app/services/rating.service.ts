import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RatingModel } from '../models/rating.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }

  private baseUrl: string = environment.baseUrl;

  postRating(rating: RatingModel): Observable<RatingModel> {
    return this.http.post<RatingModel>(`${this.baseUrl}/ngo/rating`, rating)
      .pipe(
        catchError(this.errorHandlerService.handleError)
      );
  }
}
