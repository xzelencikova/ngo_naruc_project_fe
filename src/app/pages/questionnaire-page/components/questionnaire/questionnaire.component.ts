import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren, QueryList, ElementRef, HostListener, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuestionnaireCategoryModel } from 'src/app/models/questionnaire-category.model';
import { QuestionnaireService } from 'src/app/services/questionnaire.service';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { RatingModel } from 'src/app/models/rating.model';
import { RatingService } from 'src/app/services/rating.service';

import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';


@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscription: any;
  private subscription2: any;

  questionnaire: QuestionnaireCategoryModel[] = [];
  currentStep: number = 0;
  isHistory: boolean = false;

  @Input() client: ClientModel | undefined;
  @Input() prefill_questionnaire!: RatingModel;

  @ViewChild("stepper") private stepper!: MatStepper;
  @ViewChildren('shownCategory') titles!: QueryList<ElementRef>; // getting your sections here

  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView(){
    setTimeout(() => {
      for (let index = 0; index < this.titles.length; index++) {
        const rect = document.getElementById(this.questionnaire[index].icon)?.getBoundingClientRect();
        const topShown = rect?.top ? rect?.top >= 0 : undefined;
        const bottomShown = rect?.bottom ? rect?.bottom <= window.innerHeight : undefined;
        if (topShown && bottomShown) this.currentStep = index;
      }
    }, 1500);
  }

  constructor(private questionnaireService: QuestionnaireService, 
    private fb: FormBuilder, 
    library: FaIconLibrary, 
    private ratingService: RatingService,
    private clientService: ClientService, 
    private saveMessageBar: MatSnackBar, 
    private dialog: MatDialog, 
    private router: Router) {
    library.addIconPacks(fas, far);
  }

  questForm = this.fb.group({});

  ngOnInit(): void {
    this.isHistory = this.ratingService.getHistory();
    
    this.subscription = this.questionnaireService.getQuestionnaire().subscribe(categories => {
          this.questionnaire = categories;
          let group: any = {};

          for (let i = 0; i < this.questionnaire.length; i++) {
            this.questionnaire[i].questions.forEach(question => {
              if (this.prefill_questionnaire === undefined)
                group[question._id] = ['0']
              else {
                group[question._id] = [String(this.prefill_questionnaire.questions_rating.filter(q => q.question_id == question._id)[0].rating)];
              }
            }
          );

          this.questForm = this.fb.group(group);
        }
      }
    );
  }

  ngAfterViewInit(): void {
    this.stepper.selectedIndexChange
    .subscribe((res: number) => {
      this.currentStep = res;
      document.getElementById(this.questionnaire[res].icon)?.scrollIntoView();
    })
  }
  
  ngOnDestroy(): void {}

  saveFormData(): void {

    let rating: RatingModel = {
      date_rated: new Date,
      rated_by_user_id: localStorage.getItem('user_name') + ' ' + localStorage.getItem('user_surname'),
      client_id: this.client?._id ? this.client._id : 0,
      phase_no: this.prefill_questionnaire ? this.prefill_questionnaire?.phase_no : this.client?.last_phase! + 1,
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
    
    this.subscription2 = this.ratingService.postRating(rating).subscribe({
      next: success => {
        this.saveMessageBar.open('Pozorovací hárok bol úspešne uložený!', 'X', {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          duration: 2000
        });
      },
      error: err => {
        this.saveMessageBar.open('Niečo sa pokazilo. Skúste to znova, prosím.', 'X', {
          horizontalPosition: "end",
          verticalPosition: "bottom",
          duration: 2000
        });
      }
    });
  }

  submitFormData(): boolean {
    let rating: RatingModel = {
      date_rated: new Date,
      rated_by_user_id: localStorage.getItem('user_name') + ' ' + localStorage.getItem('user_surname'),
      client_id: this.client?._id ? this.client._id : 0,
      phase_no: this.client?.last_phase ? this.client.last_phase + 1 : 1,
      questions_rating: []
    }

    if (this.client!.last_phase < 3)
      this.client!.last_phase = this.client!.last_phase + 1;
    else this.client!.active = false;


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

    this.clientService.editClient(this.client!).subscribe({
      next: success => {},
      error: err => {
        // this.saveMessageBar.open('Niečo sa pokazilo. Skúste to znova, prosím.', 'X', {
        //   horizontalPosition: "end",
        //   verticalPosition: "bottom",
        //   duration: 2000
        // });
        return false;
      }
    });
    
    this.subscription2 = this.ratingService.postRating(rating).subscribe({
      next: success => {},
      error: err => {
        // this.saveMessageBar.open('Niečo sa pokazilo. Skúste to znova, prosím.', 'X', {
        //   horizontalPosition: "end",
        //   verticalPosition: "bottom",
        //   duration: 2000
        // });
        return false;
      }
    });
    return true;
  }

  countUnansweredQuestions(questions: any): number {
    let counter = 0;
    for (let k in questions) {
      if (questions[k] === "0") counter++;
    }
    
    return counter;
  }

  onSubmit(): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, {
      data: {
        unasweredQuestions: this.countUnansweredQuestions(this.questForm.value)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const sent = this.submitFormData();
        if (sent)
          this.router.navigate(['/questionnaire-sent'])
      }
    });
  }
}
