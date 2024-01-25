import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewClientFormComponent } from './components/new-client-form/new-client-form.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage{

  user: string = localStorage.getItem('user_name')!;

  openForm(){
    const dialogRef = this.dialog.open(NewClientFormComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {}
    });
  }

  closeForm(){
    const modelDiv = document.getElementById('form-new-client');
    const overlayDiv = document.getElementById('overlay');
    if(modelDiv!=null){
      modelDiv.style.display = 'none';
    }
    if(overlayDiv!=null){
      overlayDiv.style.display = 'none';
    }
  }

  constructor(
    private router: Router,
    private dialog: MatDialog
  ){}

  navigateClientsList(): void {
    this.router.navigate(['/clients-list'])
  }

}
