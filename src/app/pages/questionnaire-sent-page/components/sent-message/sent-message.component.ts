import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { RatingService } from 'src/app/services/rating.service';
import { RatingModel } from 'src/app/models/rating.model';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import * as CSV from 'xlsx';

@Component({
  selector: 'app-sent-message',
  templateUrl: './sent-message.component.html',
  styleUrls: ['./sent-message.component.css'],
  standalone: false,
})
export class SentMessageComponent {
  ratings: RatingModel[] = [];
  public client?: ClientModel;
  constructor(
    private clientService: ClientService,
    private ratingService: RatingService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.client = this.clientService.getSelectedClient();
    const client_id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.client.id === 0) {
      this.clientService.getClientById(client_id!).subscribe((res) => {
        this.client = res;

        this.clientService.selectedClient$.emit(res);
      });
    }
    this.ratingService
      .getRatingsByClientId(this.client?.id ? this.client.id : client_id!)
      .subscribe((ratingsList) => {
        this.ratings = ratingsList;
      });
  }

  ngOnInit(): void {
    this.client = this.clientService.getSelectedClient();
  }

  showClient(): void {
    this.router.navigate(['client-overview', this.client?.id]);
  }
}
