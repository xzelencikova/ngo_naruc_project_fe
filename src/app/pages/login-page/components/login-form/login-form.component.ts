import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {}

  onSubmit() {
    let user: any = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.userService.loginUser(user).subscribe({
      next: success => {
        localStorage.setItem('user_name', success.name);
        localStorage.setItem('user_surname', success.surname);
        localStorage.setItem('user_id', success._id ? success._id : "");
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
        
      }
    }); 
  }  
}
