import { Component, Input } from '@angular/core';
import { ClientModel } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent {
  client?: ClientModel;
  constructor(private clientService: ClientService) {
    this.client = this.clientService.getSelectedClient();
  }
}
