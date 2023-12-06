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

  getCategoriesOptions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ngo/categories`)
  }

  addQuestion(question: QuestionModel): Observable<QuestionModel> {
    return this.http.post<QuestionModel>(`${this.baseUrl}/ngo/questions`, question);
  }

  editQuestion(question: any): Observable<QuestionModel> {
    return this.http.put<QuestionModel>(`${this.baseUrl}/ngo/question/${question._id}`, question);
  }

  deleteQuestion(question_id: number): Observable<QuestionModel> {
    return this.http.delete<QuestionModel>(`${this.baseUrl}/ngo/question/${question_id}`);
  }
}
