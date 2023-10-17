import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserManagementPage } from "./user-management.page";
import { UserManagementRoutingModule } from "./user-management-routing.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
import { UserTableComponent } from './components/user-table/user-table.component';
import { AddNewUserComponent } from './components/add-new-user/add-new-user.component';



@NgModule({
  declarations: [
    UserManagementPage,
    UserTableComponent,
    AddNewUserComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
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
export class UserManagementPageModule { }
