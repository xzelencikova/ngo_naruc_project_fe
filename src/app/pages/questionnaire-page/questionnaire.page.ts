import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { RatingModel } from 'src/app/models/rating.model';
import { ClientService } from 'src/app/services/client.service';
import { QuestionService } from 'src/app/services/question.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-questionnaire-page',
  templateUrl: './questionnaire.page.html',
  styleUrls: ['./questionnaire.page.css'],
  standalone: false,
})
export class QuestionnairePage {
  public client: ClientModel = {
    id: 0,
    name: '',
    surname: '',
    last_phase: 1,
    registration_date: new Date(),
    active: true,
  };
  public phase_no: number = 0;
  unfinished_rating!: RatingModel;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private ratingService: RatingService,
    private questionService: QuestionService,
  ) {
    // this.clientService.selectedClient$.subscribe(value => {
    //   this.clientName = `${value.name} ${value.surname}`;
    //   this.client = value;
    // });
  }

  ngOnInit() {
    this.client = this.clientService.getSelectedClient();

    if (this.ratingService.getHistory()) {
      this.unfinished_rating = this.ratingService.getHistoryQuestionnaire();
      this.phase_no = this.unfinished_rating.phase - 1;
    } else {
      this.phase_no = this.client.last_phase;
    }
  }
}
