import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginPage } from "./login.page";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        LoginPage,
        LoginFormComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    schemas: []
})
export class LoginPageModule {}