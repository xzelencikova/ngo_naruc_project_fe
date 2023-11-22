import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router'
import { UserProfilePage } from './user-profile.page';
import { ChangeFormComponent } from './components/change-form/change-form.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';


const routes: Routes = [
  {
      path: '',
      component: UserProfilePage // UserProfilePage bude zobrazená pri root ceste ''
  },
  { path: 'change', component: ChangeFormComponent },
  { path: 'password', component: PasswordFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserProfileRoutingModule { }
