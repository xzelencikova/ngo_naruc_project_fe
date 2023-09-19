import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { QuestionnaireCategoryModel } from '../models/questionnaire-category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.baseUrl;

  getQuestionnaire(): Observable<QuestionnaireCategoryModel[]> {
    console.log("Lalalalal")
    return this.http.get<QuestionnaireCategoryModel[]>(`${this.baseUrl}/ngo/questionnaire`);
  }
}
