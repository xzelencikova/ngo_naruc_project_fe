import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { ClientDashboardPage } from "./client-dashboard.page";
import { ClientDashboardRoutingModule } from "./client-dashboard-routing.module";

import { CategoriesOverviewChartComponent } from './components/categories-overview-chart/categories-overview-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuestionsOverviewChartComponent } from './components/questions-overview-chart/questions-overview-chart.component';

@NgModule({
    declarations: [
        ClientDashboardPage,
        CategoriesOverviewChartComponent,
        QuestionsOverviewChartComponent
    ],
    imports: [
        CommonModule,
        ClientDashboardRoutingModule,
        FontAwesomeModule,
        NgxChartsModule
    ],
    providers: [],
    schemas: []
})
export class ClientDashboardPageModule {}