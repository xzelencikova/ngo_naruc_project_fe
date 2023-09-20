import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent{

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

  ){}








}
