import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginPage } from "./login.page";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginFormComponent } from './components/login-form/login-form.component';

@NgModule({
    declarations: [
        LoginPage,
        LoginFormComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule
    ],
    providers: [],
    schemas: []
})
export class LoginPageModule {}