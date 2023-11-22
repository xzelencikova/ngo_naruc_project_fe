import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QuestionModel } from '../models/question.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getQuestionsList(): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(`${this.baseUrl}/ngo/questions`);
  }
}
