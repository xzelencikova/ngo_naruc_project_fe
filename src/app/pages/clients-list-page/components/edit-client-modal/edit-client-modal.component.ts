import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'edit-client-modal',
  templateUrl: './edit-client-modal.component.html',
  styleUrls: ['./edit-client-modal.component.css'],
  standalone: false,
})
export class EditClientModalComponent {
  clientForm = this.fb.group({
    name: [''],
    surname: [''],
    contract_no: [''],
  });

  categoryOptions: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.clientForm.controls['name'].setValue(this.data.client.name);
    this.clientForm.controls['surname'].setValue(this.data.client.surname);
    this.clientForm.controls['contract_no'].setValue(
      this.data.client.contract_no,
    );
  }

  onSubmit(): void {
    this.data.client = {
      ...this.data.client,
      name: this.clientForm.controls['name'].value,
      surname: this.clientForm.controls['surname'].value,
      contract_no: this.clientForm.controls['contract_no'].value,
    };

    this.clientService.updateClientById(this.data.client).subscribe({
      next: (success) => {
        this.alertService.success(
          'Klient bol úspešne aktualizovaný.',
          'Výborne!',
        );
      },
      error: (err) => {
        this.alertService.error(
          'Nepodarilo sa aktualizovať klienta.',
          'Nastala chyba!',
        );
      },
    });
  }
}
