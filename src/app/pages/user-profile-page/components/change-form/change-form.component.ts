import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from 'src/app/models/user.model'; 

@Component({
  selector: 'app-change-form',
  templateUrl: './change-form.component.html',
  styleUrls: ['./change-form.component.css']
})
export class ChangeFormComponent {
  public user: UserModel;
  
  name1: string = localStorage.getItem('user_name')!;
  surname1: string = localStorage.getItem('user_surname')!;

  public changeForm = this.fb.group({
    name: [''],
    surname: ['']
  });

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.user = this.userService.user;
  }

  sanitizeValue(value: string | null | undefined): string {
    return (value !== null && value !== undefined) ? value : '';
  }
  
  onSubmit() {
    const updatedName = this.sanitizeValue(this.changeForm.get('name')?.value);
    const updatedSurname = this.sanitizeValue(this.changeForm.get('surname')?.value);
  
    const updatedUser = { 
      ...this.userService.user, 
      name: updatedName, 
      surname: updatedSurname 
    };
  
    this.userService.changeUser(updatedUser).subscribe({
      next: success => {
        this.userService.selectedUser$.emit(success);
        this.router.navigate(['/success']);
      },
      error: err => {
      }
    });
  }
}

