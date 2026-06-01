import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewClientFormComponent } from './components/new-client-form/new-client-form.component';
import { AlertService } from 'src/app/components/alert';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
  standalone: false,
})
export class HomePage {
  user: string = localStorage.getItem('user_name')!;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private alertService: AlertService,
  ) {}

  openForm() {
    const dialogRef = this.dialog.open(NewClientFormComponent, {});

    dialogRef.componentInstance.clientCreated.subscribe((client) => {
      // 1️⃣ Close modal
      dialogRef.close();

      // 2️⃣ Notification
      this.alertService.success(
        'Klient bol úspešne pridaný do zoznamu klientov.',
        'Výborne!',
      );

      // 3️⃣ Redirect
      this.router.navigate(['client-overview', client.id]);
    });
  }

  closeForm() {
    const modelDiv = document.getElementById('form-new-client');
    const overlayDiv = document.getElementById('overlay');
    if (modelDiv != null) {
      modelDiv.style.display = 'none';
    }
    if (overlayDiv != null) {
      overlayDiv.style.display = 'none';
    }
  }

  navigateClientsList(): void {
    this.router.navigate(['/clients-list']);
  }
}
