import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuestionnaireSentPage } from "./questionnaire-sent.page";
import { QuestionnaireSentRoutingModule } from "./questionnaire-sent-routing.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { SentMessageComponent } from './components/sent-message/sent-message.component';



@NgModule({
    declarations: [
        QuestionnaireSentPage,
        SentMessageComponent,
    ],
    imports: [
        CommonModule,
        QuestionnaireSentRoutingModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatSnackBarModule,
        MatDialogModule
    ],
    providers: [],
    schemas: []
})
export class QuestionnaireSentPageModule {}