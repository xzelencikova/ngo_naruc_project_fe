import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';
import { HomeRoutingModule } from './home-routing.module';
import { NewClientFormComponent } from './components/new-client-form/new-client-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/components/alert';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [HomePage, NewClientFormComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    AlertModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [],
  schemas: [],
})
export class HomePageModule {}
