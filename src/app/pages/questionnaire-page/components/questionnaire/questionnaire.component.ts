import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
  QueryList,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuestionnaireCategoryModel } from 'src/app/models/questionnaire-category.model';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { RatingModel } from 'src/app/models/rating.model';
import { RatingService } from 'src/app/services/rating.service';

import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { AlertService } from 'src/app/components/alert';
import { QuestionService } from 'src/app/services/question.service';
import { PopupWindowComponent } from 'src/app/components/popup-window/popup-window.component';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css'],
  standalone: false,
})
export class QuestionnaireComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  private subscription: any;
  private subscription2: any;

  questionnaire: QuestionnaireCategoryModel[] = [];
  currentStep: number = 0;
  isHistory: boolean = false;
  timer: any;
  private lastClickTime: number = 0;

  @Input() client: ClientModel | undefined;
  @Input() prefill_questionnaire!: RatingModel;

  @ViewChild('stepper') private stepper!: MatStepper;
  @ViewChildren('shownCategory') titles!: QueryList<ElementRef>; // getting your sections here

  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView(event: any) {
    // setTimeout(() => {

    const currentTime = Date.now();
    const timeSinceLastClick = currentTime - this.lastClickTime;

    if (timeSinceLastClick > 1000) {
      for (let index = 0; index < this.titles.length; index++) {
        const rect = document
          .getElementById(this.questionnaire[index].icon)
          ?.getBoundingClientRect();
        const topShown = rect?.top ? rect?.top >= 0 : undefined;
        const bottomShown = rect?.bottom
          ? rect?.bottom <= window.innerHeight
          : undefined;
        if (topShown && bottomShown) {
          this.currentStep = index;
        }
      }
    }
    // }, 3000);
  }

  constructor(
    private questionService: QuestionService,
    private fb: FormBuilder,
    library: FaIconLibrary,
    private ratingService: RatingService,
    private clientService: ClientService,
    private saveMessageBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private alertService: AlertService,
  ) {
    library.addIconPacks(fas, far);
  }

  questForm = this.fb.group({});

  ngOnInit(): void {
    this.isHistory = this.ratingService.getHistory();

    this.subscription = this.questionService
      .getAllQuestionsByCategories()
      .subscribe((categories) => {
        this.questionnaire = categories;
        let group: any = {};

        for (let i = 0; i < this.questionnaire.length; i++) {
          this.questionnaire[i].questions.forEach((question) => {
            if (this.prefill_questionnaire === undefined)
              group[question.id] = [null];
            else {
              group[question.id] = [
                String(
                  this.prefill_questionnaire.ratings.filter(
                    (q) => q.question_id == question.id,
                  )[0].rating,
                ),
              ];
            }
          });

          this.questForm = this.fb.group(group);
        }
      });
  }

  ngAfterViewInit(): void {
    this.stepper.selectedIndexChange.subscribe((res: number) => {
      this.lastClickTime = Date.now();
      this.currentStep = res;

      document.getElementById(this.questionnaire[res].icon)?.scrollIntoView({
        behavior: 'auto',
        block: 'center',
      });
    });
  }

  ngOnDestroy(): void {}

  saveFormData(): void {
    let rating: RatingModel = {
      id: this.prefill_questionnaire.id,
      last_update_date: new Date(),
      last_update_by:
        localStorage.getItem('user_name') +
        ' ' +
        localStorage.getItem('user_surname'),
      client: this.client?.name
        ? `${this.client.name} ${this.client.surname}`
        : '',
      client_id: this.client?.id ? this.client.id : 0,
      phase: this.prefill_questionnaire
        ? this.prefill_questionnaire?.phase
        : this.client?.last_phase! + 1,
      ratings: [],
    };
    console.log(this.questForm);
    this.questionnaire.forEach((category) => {
      category.questions.forEach((question) => {
        const value = (this.questForm.value as any)[question.id];
        rating.ratings.push({
          question_id: question.id,
          rating_id: this.prefill_questionnaire?.id || 0,
          rating:
            value === 'null' || value === null || value === '' || value === 0
              ? null
              : Number(value),
          question: question.question,
          category: category.category,
          category_order: category.category_order,
          icon: category.icon,
        });
      });
    });

    this.subscription2 = this.ratingService.addNewRating(rating).subscribe({
      next: (success) => {
        this.alertService.success(
          'Pozorovací hárok bol úspešne uložený.',
          'Výborne!',
        );
      },
      error: (err) => {
        this.alertService.error(
          'Nebolo možné presunúť klienta do ďalšej fázy programu.',
          'Nastala chyba!',
        );
      },
    });
  }

  submitFormData(): boolean {
    let rating: RatingModel = {
      id: 0,
      last_update_date: new Date(),
      last_update_by:
        localStorage.getItem('user_name') +
        ' ' +
        localStorage.getItem('user_surname'),
      client: this.client?.name
        ? `${this.client.name} ${this.client.surname}`
        : '',
      client_id: this.client?.id ? this.client.id : 0,
      phase: this.client?.last_phase ? this.client.last_phase + 1 : 1,
      ratings: [],
    };

    if (this.client!.last_phase < 3)
      this.client!.last_phase = this.client!.last_phase + 1;
    else this.client!.active = false;

    this.questionnaire.forEach((category) => {
      category.questions.forEach((question) => {
        const value = (this.questForm.value as any)[question.id];
        rating.ratings.push({
          question_id: question.id,
          rating:
            value === 'null' || value === null || value === '' || value === 0
              ? null
              : Number(value),
          question: question.question,
          category: category.category,
          category_order: category.category_order,
          rating_id: 0,
          icon: category.icon,
        });
      });
    });

    this.clientService.updateClientById(this.client!).subscribe({
      next: (success) => {
        this.alertService.success(
          'Klient bol presunutý do ďalšej fázy programu.',
          'Výborne!',
        );
      },
      error: (err) => {
        this.alertService.error(
          'Nebolo možné presunúť klienta do ďalšej fázy programu.',
          'Nastala chyba!',
        );
        return false;
      },
    });

    this.subscription2 = this.ratingService.addNewRating(rating).subscribe({
      next: (success) => {
        this.alertService.success(
          'Pozorovací hárok bol úspešne uložený.',
          'Výborne!',
        );
      },
      error: (err) => {
        this.alertService.error(
          'Nebolo možné uložiť hodnotenie klienta.',
          'Nastala chyba!',
        );
        return false;
      },
    });
    return true;
  }

  countUnansweredQuestions(questions: any): number {
    let counter = 0;
    for (let k in questions) {
      if (questions[k] === null) counter++;
    }

    return counter;
  }

  onSubmit(): void {
    const dialogRef = this.dialog.open(PopupWindowComponent, {
      data: {
        img: '../../../../../../../assets/images/send_popup.svg',
        title: 'ULOŽIŤ ZMENY',
        message: `Praješ si odoslať hodnotenie klienta? Po odoslaní pozorovacích hárkov sa fáza č. ${this.client!.last_phase + 1} uzavrie.`,
        submessage: `V dotazníku ostalo ${this.countUnansweredQuestions(this.questForm.value)} nezodpovedaných otázok.`,
        footerMessage:
          'Hodnotenie je možné upraviť v histórii pozorovacích hárkov.',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const sent = this.submitFormData();
        if (sent) this.router.navigate(['/questionnaire-sent']);
      }
    });
  }
}
