import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsListPage } from './clients-list.page';
import { ClientsListRoutingModule } from './clients-list-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteClientWindowComponent } from './components/delete-window/delete-window.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditClientModalComponent } from './components/edit-client-modal/edit-client-modal.component';
import { AlertModule } from 'src/app/components/alert';

@NgModule({
  declarations: [
    ClientsListPage,
    ClientsTableComponent,
    DeleteClientWindowComponent,
    EditClientModalComponent,
  ],
  imports: [
    CommonModule,
    ClientsListRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule,
    AlertModule,
  ],
  providers: [],
  schemas: [],
})
export class ClientsListPageModule {}
