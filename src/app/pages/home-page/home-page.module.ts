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
import { ContractNumberFormatterDirective } from 'src/app/shared/directives/contract-number-formatter.directive';
import { MatAnchor, MatButtonModule } from '@angular/material/button';

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
    ContractNumberFormatterDirective,
    MatAnchor,
    MatButtonModule,
  ],
  providers: [],
  schemas: [],
})
export class HomePageModule {}
