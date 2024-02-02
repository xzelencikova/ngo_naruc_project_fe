import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject } from 'rxjs';  
import { UserModel } from 'src/app/models/user.model';
import { UserDataService } from 'src/app/services/user-data.service';
import { AlertService } from 'src/app/components/alert';

@Component({
  selector: 'app-change-form',
  templateUrl: './change-form.component.html',
  styleUrls: ['./change-form.component.css']
})
export class ChangeFormComponent {
  public user: UserModel = this.userService.getLoggedInUser();
  public message: string | null = null;
  public error: boolean = false;

  // Define a BehaviorSubject to hold user data
  private userDataSubject = new BehaviorSubject<UserModel | null>(null);
  userData$ = this.userDataSubject.asObservable();

  public changeForm = this.fb.group({
    name: [''],
    surname: ['']
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private alertService: AlertService
  ) 
  {
    this.userService.selectedUser$.subscribe(selection => {
      this.user = selection;
      this.changeForm.setValue({
        name: selection.name,
        surname: selection.surname
      });
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
    const updatedName = this.sanitizeValue(this.changeForm.get('name')?.value);
    const updatedSurname = this.sanitizeValue(this.changeForm.get('surname')?.value);
  
    const updatedUser: UserModel = {
      ...this.user,
      name: updatedName,
      surname: updatedSurname
    };

    this.userService.updateUser(this.user._id!, updatedUser).subscribe({
      next: success => {
        this.userService.selectedUser$.emit(success);
        this.alertService.success("Údaje boli úspešne zmenené.", "Výborne!");

        // Emit the updated user data
        this.userDataService.updateUserData(updatedUser);
      },
      error: err => {
        this.alertService.error("Nepodarilo sa zmeniť údaje.", "Nastala chyba!");
      }
    });
  }
}
