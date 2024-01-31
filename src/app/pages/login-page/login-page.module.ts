import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginPage } from "./login.page";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertModule } from "src/app/components/alert";


@NgModule({
    declarations: [
        LoginPage,
        LoginFormComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AlertModule
    ],
    providers: [],
    schemas: []
})
export class LoginPageModule {}