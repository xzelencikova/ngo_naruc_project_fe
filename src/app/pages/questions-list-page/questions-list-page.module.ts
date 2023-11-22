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


@NgModule({
    declarations: [
        QuestionsListPage,
        QuestionsTableComponent
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
        MatIconModule
    ],
    providers: [],
    schemas: []
})
export class QuestionsListPageModule {}