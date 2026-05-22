import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ClientDashboardPage } from './client-dashboard.page';
import { ClientDashboardRoutingModule } from './client-dashboard-routing.module';

import { CategoriesOverviewChartComponent } from './components/categories-overview-chart/categories-overview-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuestionsOverviewChartComponent } from './components/questions-overview-chart/questions-overview-chart.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AlertModule } from 'src/app/components/alert';
import { NoDataComponent } from './components/no-data/no-data.component';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RatingsHistoryComponent } from './components/ratings-history/ratings-history.component';

@NgModule({
  declarations: [
    ClientDashboardPage,
    CategoriesOverviewChartComponent,
    QuestionsOverviewChartComponent,
    RatingsHistoryComponent,
    NoDataComponent,
  ],
  imports: [
    CommonModule,
    ClientDashboardRoutingModule,
    FontAwesomeModule,
    NgxChartsModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatButtonModule,
    AlertModule,
    PlotlyModule.forRoot(PlotlyJS),
    MatTabsModule,
    MatBadgeModule,
    MatCardModule,
    MatGridListModule,
  ],
  providers: [],
  schemas: [],
})
export class ClientDashboardPageModule {}
