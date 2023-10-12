import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  ratingOverview: any[] = []

  constructor(private router: Router, private clientService: ClientService, private ratingService: RatingService, private activatedRoute: ActivatedRoute) {
    this.client = this.clientService.getSelectedClient();

    if (this.client._id === "") {
      const client_id = this.activatedRoute.snapshot.paramMap.get('id');
      
      this.clientService.getClientById(client_id!).subscribe(res => {
        this.client = res;

        this.clientService.selectedClient$.emit(res);
        
        this.ratingService.getRatingOverviewForClient(this.client?._id ? this.client._id : "").subscribe(ratingList => {
          this.ratingOverview = ratingList;
          console.log(ratingList);
        });
      })
    }
    else {
      this.ratingService.getRatingOverviewForClient(this.client?._id ? this.client._id : "").subscribe(ratingList => {
        this.ratingOverview = ratingList;
        console.log(ratingList);
      });
    }
  }

  ngOnInit() {
    
  }

  loadQuestionnaire() {
    this.router.navigate(["questionnaire"]);
  }

  downloadOverview() {
    console.log("Stiahnuť prehľad");
  }

}
