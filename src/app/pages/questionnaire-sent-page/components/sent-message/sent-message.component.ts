import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientModel } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-sent-message',
  templateUrl: './sent-message.component.html',
  styleUrls: ['./sent-message.component.css']
})
export class SentMessageComponent {

  constructor(private clientService: ClientService, private router: Router) {}

  public client?: ClientModel;

  ngOnInit(): void {
    this.client = this.clientService.getSelectedClient();
  }

  showClient(): void {
    this.router.navigate(['client-overview', this.client?._id])
  }
}
