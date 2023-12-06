import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject } from 'rxjs';  
import { UserModel } from 'src/app/models/user.model';
import { PasswordModel } from 'src/app/models/password.model';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})
export class PasswordFormComponent {
  public user: UserModel = this.userService.getLoggedInUser();
  public message: string | null = null;
  public error: boolean = false;

  // Define a BehaviorSubject to hold user data
  private userDataSubject = new BehaviorSubject<UserModel | null>(null);
  userData$ = this.userDataSubject.asObservable();

  public passwordForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private userDataService: UserDataService
  ) {
    this.userService.selectedUser$.subscribe(selection => {
      this.user = selection;
    });

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.passwordForm.setValue({
      newPassword: '',  // Set default value or leave it empty
      confirmPassword: '',  // Set default value or leave it empty
    });
  }

  activeForm: 'change' | 'password' = 'change';  // Set default form

  setActiveForm(form: 'change' | 'password') {
      this.activeForm = form;
  }

  sanitizeValue(value: string | null | undefined): string {
    return (value !== null && value !== undefined) ? value : '';
  }
  
  onSubmit() {
    const newPasswordControl = this.passwordForm.get('newPassword');
    const confirmPasswordControl = this.passwordForm.get('confirmPassword');
  
    if (!newPasswordControl || !confirmPasswordControl) {
      return;
    }
  
    const newPassword: string = newPasswordControl.value;
    const confirmPassword: string = confirmPasswordControl.value;
  
    if (
      newPassword === undefined ||
      confirmPassword === undefined ||
      newPassword !== confirmPassword
    ) {
      this.message = 'Heslá sa nezhodujú';
      this.error = true;
      setTimeout(() => {
        this.message = null;
        this.error = false;
      }, 3000);
      return;
    }
  
    const updatedPassword: PasswordModel = {
      password: newPassword,
    };
  
    if (newPassword !== undefined) {
      this.userService
        .updateUserPassword(this.user._id!, updatedPassword)
        .subscribe({
          next: (success) => {
            this.user = { ...this.user, password: newPassword }; 
            this.userDataService.updateUserData(this.user);
            this.userService.selectedUser$.emit(success);
            this.message = 'Heslo úspešne zmenené';
            setTimeout(() => (this.message = null), 3000);
          },
          error: (err) => {
            this.message = 'Nastala chyba';
            this.error = true;
            setTimeout(() => {
              this.message = null;
              this.error = false;
            }, 3000);
          },
        });
    }
  }
}