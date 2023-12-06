import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router'
import { UserProfilePage } from './user-profile.page';
import { ChangeFormComponent } from './components/change-form/change-form.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'change', // Set the default route to 'change'
    pathMatch: 'full',
  },
  {
    path: '',
    component: UserProfilePage,
    children: [
      { path: 'change', component: ChangeFormComponent },
      { path: 'password', component: PasswordFormComponent },
      // Add other child routes if needed
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
