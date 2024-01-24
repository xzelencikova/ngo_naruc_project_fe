import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
import { QuestionsListPage } from "./questions-list.page";
import { QuestionsTableComponent } from "./components/questions-table/questions-table.component";
import { QuestionsListRoutingModule } from "./questions-list-routing.module";
import { AddQuestionFormComponent } from './components/add-question-form/add-question-form.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { DeleteWindowComponent } from "./components/modal-window/delete-window.component";
import { AlertModule } from "src/app/components/alert";


@NgModule({
    declarations: [
        QuestionsListPage,
        QuestionsTableComponent,
        AddQuestionFormComponent,
        DeleteWindowComponent
    ],
    imports: [
        CommonModule,
        QuestionsListRoutingModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatFormFieldModule,
        MatIconModule,
        MatDialogModule,
        MatSelectModule,
        AlertModule
    ],
    providers: [],
    schemas: []
})
export class QuestionsListPageModule {}