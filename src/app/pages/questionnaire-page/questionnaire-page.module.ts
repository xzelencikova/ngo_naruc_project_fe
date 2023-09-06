import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuestionnairePage } from "./questionnaire.page";
import { QuestionnaireRoutingModule } from "./questionnaire-routing.module";

@NgModule({
    declarations: [
        QuestionnairePage
    ],
    imports: [
        CommonModule,
        QuestionnaireRoutingModule
    ],
    providers: [],
    schemas: []
})
export class QuestionnairePageModule {}