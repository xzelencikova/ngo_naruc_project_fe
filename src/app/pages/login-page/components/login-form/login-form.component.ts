import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertService,
  Alert,
  AlertType,
  PositiionType,
} from 'src/app/components/alert';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  standalone: false,
})
export class LoginFormComponent {
  public loginForm = this.fb.group({
    email: [''],
    password: [''],
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
    private alertService: AlertService,
  ) {}

  onSubmit() {
    let user: any = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.userService.authenticateUser(user).subscribe({
      next: (success) => {
        this.alertService.success('Prihlásenie prebehlo úspešne.', 'Výborne!');
        localStorage.setItem('user_name', success.name);
        localStorage.setItem('user_surname', success.surname);
        localStorage.setItem('user_id', success.id ? String(success.id) : '0');
        localStorage.setItem('user_role', success.role);
        localStorage.setItem('token', success.token ? success.token : '');

        this.userService.selectedUser$.emit({
          id: success.id,
          name: success.name,
          surname: success.surname,
          email: success.email,
          role: success.role,
        });
        this.router.navigate(['/']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.alertService.error(
            'Nesprávny email alebo heslo.',
            'Prihlásenie zlyhalo',
          );
        } else {
          this.alertService.error(
            'Nastala chyba servera. Skúste to znova neskôr.',
            'Nastala chyba!',
          );
        }
      },
    });
  }
}
