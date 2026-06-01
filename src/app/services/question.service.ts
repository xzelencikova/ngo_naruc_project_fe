import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QuestionModel } from '../models/question.model';
import { Observable } from 'rxjs';
import { QuestionnaireCategoryModel } from '../models/questionnaire-category.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private baseUrl: string = `${environment.baseUrl}/questions`;

  constructor(private http: HttpClient) {}

  getAllQuestions(): Observable<QuestionModel[]> {
    return this.http.get<QuestionModel[]>(this.baseUrl);
  }

  getAllQuestionsByCategories(): Observable<QuestionnaireCategoryModel[]> {
    return this.http.post<QuestionnaireCategoryModel[]>(
      `${this.baseUrl}/categories`,
      null,
    );
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/categories`);
  }

  addNewQuestion(question: QuestionModel): Observable<QuestionModel> {
    return this.http.post<QuestionModel>(`${this.baseUrl}`, question);
  }

  updateQuestionById(question: any): Observable<QuestionModel> {
    return this.http.put<QuestionModel>(
      `${this.baseUrl}/${question.id}`,
      question,
    );
  }

  deleteQuestionById(question_id: number): Observable<QuestionModel> {
    return this.http.delete<QuestionModel>(`${this.baseUrl}/${question_id}`);
  }

  lockQuestions(data: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}`, data);
  }
}
