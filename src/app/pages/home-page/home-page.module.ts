import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePage } from "./home.page";
import { HomeRoutingModule } from "./home-routing.module";
import { NewClientFormComponent } from './components/new-client-form/new-client-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        HomePage,
        NewClientFormComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        ReactiveFormsModule
    ],
    providers: [],
    schemas: []
})
export class HomePageModule {}