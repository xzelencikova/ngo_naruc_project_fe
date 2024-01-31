import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { AlertService } from 'src/app/components/alert';


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
    private userService: UserService,
    private alertService: AlertService) { }


  ngOnInit() {
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

    this.userService.postNewUser(user).subscribe({
      next: success => {
        this.alertService.success("Používateľ bol úspešne vytvorený.", "Výborne!");
      },
      error: err => {
        this.alertService.error("Nepodarilo sa vytvoriť používateľa.", "Nastala chyba!");
      }
    });

  }


}
