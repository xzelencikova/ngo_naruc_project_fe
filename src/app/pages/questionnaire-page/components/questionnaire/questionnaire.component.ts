import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuestionnaireCategoryModel } from 'src/app/models/questionnaire-category.model';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscription: any;

  questionnaire: QuestionnaireCategoryModel[] = [];
  // faSmile = faSmile;

  constructor(private questionnaireService: QuestionnaireService, private fb: FormBuilder, library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }

  ngOnInit(): void {
    this.subscription = this.questionnaireService.getQuestionnaire().subscribe(categories => {
          this.questionnaire = categories;
      }
    );
  }

  ngAfterViewInit(): void {
    
  }
  
  ngOnDestroy(): void {}
}
