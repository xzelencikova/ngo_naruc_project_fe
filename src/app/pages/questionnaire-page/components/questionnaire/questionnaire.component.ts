import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuestionnaireCategoryModel } from 'src/app/models/questionnaire-category.model';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { RatingModel } from 'src/app/models/rating.model';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscription: any;
  private subscription2: any;

  questionnaire: QuestionnaireCategoryModel[] = [];

  constructor(private questionnaireService: QuestionnaireService, private fb: FormBuilder, library: FaIconLibrary, private ratingService: RatingService) {
    library.addIconPacks(fas, far);
  }

  questForm = this.fb.group({});

  ngOnInit(): void {
    this.subscription = this.questionnaireService.getQuestionnaire().subscribe(categories => {
          this.questionnaire = categories;
          let group: any = {};

          for (let i = 0; i < this.questionnaire.length; i++) {
            this.questionnaire[i].questions.forEach(question => {
              group[question._id] = ['0']
            }
          );

          this.questForm = this.fb.group(group);
          console.log(this.questForm);
        }
      }
    );
  }

  ngAfterViewInit(): void {}
  
  ngOnDestroy(): void {}

  onSubmit(): void {
    let rating: RatingModel = {
      date_rated: new Date,
      rated_by_user_id: "80d71b90976f4933b42abc22d94510e6",
      client_id: "client_id",
      phase_no: 1,
      questions_rating: []
    }

    this.questionnaire.forEach(category => {
      category.questions.forEach(question => {
        rating.questions_rating.push({
          question_id: question._id,
          rating: Number((this.questForm.value as any)[question._id]),
          question: question.question,
          category: category.category,
          icon: category.icon
        })
      })
    })
    
    this.subscription2 = this.ratingService.postRating(rating).subscribe(rating => {});
  }
}
