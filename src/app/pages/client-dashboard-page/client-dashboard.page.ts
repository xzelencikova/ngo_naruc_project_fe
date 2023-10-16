import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { ClientModel } from 'src/app/models/client.model';
import { RatingModel } from 'src/app/models/rating.model';
import { ClientService } from 'src/app/services/client.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-client-dashboard-page',
  templateUrl: './client-dashboard.page.html',
  styleUrls: ['./client-dashboard.page.css']
})
export class ClientDashboardPage {
  public client: ClientModel = {_id: "", name: "", surname: "", last_phase: 1, registration_date: new Date(), active: true};
  ratingOverview: any = {};
  ratingCategory: any[] = [];
  ratings: RatingModel[] = [];
  customColors: any[] = [];
  isOverview: boolean = true;
  category: string = "";

  colorScheme: Color = {
    name: "myScheme",
    selectable: true,
    group: ScaleType.Ordinal,
    domain: this.customColors // ['#1E19FF', '#1E19FF', '#1E19FF']
  };

  constructor(private router: Router, private clientService: ClientService, private ratingService: RatingService, private activatedRoute: ActivatedRoute) {
    this.client = this.clientService.getSelectedClient();
    const client_id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.client._id === "") {   
      this.clientService.getClientById(client_id!).subscribe(res => {
        this.client = res;

        this.clientService.selectedClient$.emit(res);
      });
    }

    this.ratingService.getRatingOverviewForClient(this.client?._id ? this.client._id : client_id!).subscribe(overview => {
      this.ratingOverview = overview;
    });
    this.ratingService.getRatingsByClientId(this.client?._id ? this.client._id : client_id!).subscribe(ratingsList => {
      this.ratings = ratingsList;
    });
  }

  ngOnInit() {
    
  }

  getCategoryRating(category: string) {
    const categoryQuestions = this.ratings.map(rating => rating.questions_rating.filter(q => q.category === category));
    this.ratingCategory = [];
    this.category = category;
    
    categoryQuestions[0].forEach(c => {
      this.ratingCategory.push({
        "name": c.question,
        "series": [
          {
            "name": "Fáza 1",
            "value": 0
          },
          {
            "name": "Fáza 2",
            "value": 0
          },
          {
            "name": "Fáza 3",
            "value": 0
          }
        ]
      });

      this.customColors.push({
        "name": c.question,
        "series": [
          {
            "name": "Fáza 1",
            "value": "#FF4D00"
          },
          {
            "name": "Fáza 2",
            "value": "#FF4D00"
          },
          {
            "name": "Fáza 3",
            "value": "#FF4D00"
          }
        ]
      })
    })
  
    for (let i = 0; i < this.ratings.length; i++) {
      let phase = this.ratings[i].phase_no - 1;

      for (let j = 0; j < categoryQuestions[i].length; j++) {
        this.ratingCategory[j].series[phase].value = categoryQuestions[i][j].rating; 

        switch (categoryQuestions[i][j].rating) {
          case 1:
            this.customColors[j].series[phase].value = "#FF5800"
            break;
          case 2:
            this.customColors[j].series[phase].value = "#FF9A65"
            break;
          case 3:
            this.customColors[j].series[phase].value = "#189D5F"
            break;
          default:
            break;
        }
      }
    }

    this.isOverview = false;
  }

  setOverview(event: boolean) {
    this.isOverview = event;
  }

  loadQuestionnaire() {
    this.router.navigate(["questionnaire"]);
  }

  downloadOverview() {
    console.log("Stiahnuť prehľad");
  }

}
