import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuestionnairePage } from "./questionnaire.page";
import { QuestionnaireRoutingModule } from "./questionnaire-routing.module";
import { PhasesProgressbarComponent } from './components/phases-progressbar/phases-progressbar.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
    declarations: [
        QuestionnairePage,
        PhasesProgressbarComponent,
        QuestionnaireComponent
    ],
    imports: [
        CommonModule,
        QuestionnaireRoutingModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        MatStepperModule
    ],
    providers: [],
    schemas: []
})
export class QuestionnairePageModule {}