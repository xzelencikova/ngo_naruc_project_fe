import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuestionnairePage } from "./questionnaire.page";
import { QuestionnaireRoutingModule } from "./questionnaire-routing.module";
import { PhasesProgressbarComponent } from './components/phases-progressbar/phases-progressbar.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalWindowComponent } from './components/questionnaire/components/modal-window/modal-window.component';
import { AlertModule } from "src/app/components/alert";



@NgModule({
    declarations: [
        QuestionnairePage,
        PhasesProgressbarComponent,
        QuestionnaireComponent,
        ModalWindowComponent
    ],
    imports: [
        CommonModule,
        QuestionnaireRoutingModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatSnackBarModule,
        MatDialogModule,
        AlertModule
    ],
    providers: [],
    schemas: []
})
export class QuestionnairePageModule {}