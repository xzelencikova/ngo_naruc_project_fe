import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css']
})
export class HomePage{


  user: string = localStorage.getItem('user_name')!;

  openForm(){
    const overlayDiv = document.getElementById('overlay');
    const modelDiv = document.getElementById('form-new-client');
    if(modelDiv!=null){
      modelDiv.style.display = 'block';
    }

    if(overlayDiv!=null){
      overlayDiv.style.display = 'block';
    }
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
    private router: Router
  ){}
  

  navigateClientsList(): void {
    this.router.navigate(['/clients-list'])
  }

}
