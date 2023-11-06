import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {

  questForm: FormGroup = this.formBuilder.group({
    userName: [''],
    userSurname: [''],
    userEmail: [''],
    userRole:[''],
    userPassword: ['']
  });

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService) { }


  ngOnInit() {
  }

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

  onSubmit(): void {
    const formData = this.questForm.value;
    console.log(formData);
    const user: UserModel = {
      name: formData.userName,
      surname: formData.userSurname,
      role: formData.userRole,
      email: formData.userEmail,
      password:  formData.userPassword 
    };

    this.userService.postNewUser(user).subscribe(
      (user: any) => {
        window.location.reload();
    });

  }


}
