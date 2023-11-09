import { Component, Input } from '@angular/core';
import { ClientModel } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent {
  client?: ClientModel;

  constructor(private clientService: ClientService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.client = this.clientService.getSelectedClient();
  }
}
