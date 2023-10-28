import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { RatingModel } from 'src/app/models/rating.model';
import { ClientService } from 'src/app/services/client.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-questionnaire-page',
  templateUrl: './questionnaire.page.html',
  styleUrls: ['./questionnaire.page.css']
})
export class QuestionnairePage {
  public client: ClientModel = {_id: "", name: "", surname: "", last_phase: 1, registration_date: new Date(), active: true};
  unfinished_rating!: RatingModel;

  constructor(private router: Router, private clientService: ClientService, private ratingService: RatingService) {
    // this.clientService.selectedClient$.subscribe(value => {
    //   this.clientName = `${value.name} ${value.surname}`;
    //   this.client = value;
    // });
  }

  ngOnInit() {
    this.client = this.clientService.getSelectedClient();
    this.ratingService.getRatingsByClientId(this.client._id!).subscribe(ratings => {
      ratings.forEach(r => {
        if (r.phase_no == this.client.last_phase + 1) {
          this.unfinished_rating = r;
        }
      })
    })
    
  }
}
