import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RatingModel } from '../models/rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.baseUrl;

  postRating(body: RatingModel): Observable<RatingModel> {
    console.log(body);
    return this.http.post<RatingModel>(`${this.baseUrl}/ngo/rating`, body);
  }
}
