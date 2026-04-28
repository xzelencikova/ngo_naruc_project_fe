import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientModel } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert';

@Component({
    selector: 'app-new-client-form',
    templateUrl: './new-client-form.component.html',
    styleUrls: ['./new-client-form.component.css'],
    standalone: false
})
export class NewClientFormComponent implements OnInit {
  questForm: FormGroup = this.formBuilder.group({
    clientName: [''],
    clientSurname: [''],
    contractNumber: [''],
    contractYear: [''],
  });
  years: Array<number> = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit(): void {
    const formData = this.questForm.value;
    const client: ClientModel = {
      name: formData.clientName,
      surname: formData.clientSurname,
      registration_date: new Date(),
      last_phase: 0,
      contract_no: `${formData.contractNumber.length === 1 ? '0' : ''}${
        formData.contractNumber
      }-${formData.contractYear}`,
      active: true,
    };

    this.clientService.postNewClient(client).subscribe({
      next: (data) => {
        this.alertService.success(
          'Klient bol úspešne pridaný do zoznamu klientov.',
          'Výborne!'
        );
        this.clientService.selectedClient$.emit(data);
        this.router.navigate(['client-overview', data._id]);
      },
      error: (err) => {
        this.alertService.error(
          'Nebolo možné vytvoriť klienta.',
          'Nastala chyba!'
        );
      },
    });
  }
}
