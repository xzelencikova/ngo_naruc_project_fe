import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { ClientDashboardPage } from "./client-dashboard.page";
import { ClientDashboardRoutingModule } from "./client-dashboard-routing.module";

import { CategoriesOverviewChartComponent } from './components/categories-overview-chart/categories-overview-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuestionsOverviewChartComponent } from './components/questions-overview-chart/questions-overview-chart.component';
import { HistoryModalWindowComponent } from './components/history-modal-window/history-modal-window.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';


@NgModule({
    declarations: [
        ClientDashboardPage,
        CategoriesOverviewChartComponent,
        QuestionsOverviewChartComponent,
        HistoryModalWindowComponent
    ],
    imports: [
        CommonModule,
        ClientDashboardRoutingModule,
        FontAwesomeModule,
        NgxChartsModule,
        MatDialogModule,
        MatTableModule
    ],
    providers: [],
    schemas: []
})
export class ClientDashboardPageModule {}