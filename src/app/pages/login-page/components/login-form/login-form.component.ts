import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, Alert, AlertType, PositiionType } from 'src/app/components/alert';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  public loginForm = this.fb.group({
    email: [''],
    password: ['']
  });
  Position = PositiionType;

  public showPassword: boolean = false;
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private userService: UserService, 
    private fb: FormBuilder, 
    private router: Router, 
    private alertService: AlertService, ) {}


  onSubmit() {
    let user: any = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.userService.loginUser(user).subscribe({
      next: success => {
        this.alertService.success("Prihlásenie prebehlo úspešne.", "Výborne!");
        localStorage.setItem('user_name', success.name);
        localStorage.setItem('user_surname', success.surname);
        localStorage.setItem('user_id', success._id ? String(success._id) : "0");
        localStorage.setItem('user_role', success.role);
        localStorage.setItem('token', success.token ? success.token : "")
        
        this.userService.selectedUser$.emit({
          _id: success._id,
          name: success.name,
          surname: success.surname,
          email: success.email,
          role: success.role
        });
        this.router.navigate(['/'])
      },
      error: err => {
        this.alertService.error("Nebolo možné prihlásiť používateľa do systému.", "Nastala chyba!")
      }
    }); 
  }  
}
