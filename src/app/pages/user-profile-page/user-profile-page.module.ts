import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserProfilePage } from "./user-profile.page";
import { UserProfileRoutingModule } from "./user-profile-routing.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
import { ChangeFormComponent } from './components/change-form/change-form.component';



@NgModule({
  declarations: [
    UserProfilePage,
    ChangeFormComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class UserProfilePageModule { }
