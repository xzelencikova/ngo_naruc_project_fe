import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuestionnairePage } from "./questionnaire.page";
import { QuestionnaireRoutingModule } from "./questionnaire-routing.module";
import { PhasesProgressbarComponent } from './components/phases-progressbar/phases-progressbar.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [
        QuestionnairePage,
        PhasesProgressbarComponent,
        QuestionnaireComponent
    ],
    imports: [
        CommonModule,
        QuestionnaireRoutingModule,
        FontAwesomeModule
    ],
    providers: [],
    schemas: []
})
export class QuestionnairePageModule {}