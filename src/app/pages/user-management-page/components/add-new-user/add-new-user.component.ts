import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { AlertService } from 'src/app/components/alert';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css'],
  standalone: false,
})
export class AddNewUserComponent implements OnInit {
  questForm: FormGroup = this.formBuilder.group({
    userName: [''],
    userSurname: [''],
    userEmail: [''],
    userRole: [''],
    userPassword: [''],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
  ) {}

  ngOnInit() {}

  public showPassword: boolean = false;
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    const formData = this.questForm.value;
    console.log(formData);
    const user: UserModel = {
      name: formData.userName,
      surname: formData.userSurname,
      role: formData.userRole,
      email: formData.userEmail,
      password: formData.userPassword,
    };

    this.userService.addNewUser(user).subscribe({
      next: (success) => {
        this.alertService.success(
          'Používateľ bol úspešne vytvorený.',
          'Výborne!',
        );
        this.data.reload();
      },
      error: (err) => {
        this.alertService.error(
          'Nepodarilo sa vytvoriť používateľa.',
          'Nastala chyba!',
        );
      },
    });
  }
}
