import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { ClientDashboardPage } from "./client-dashboard.page";
import { ClientDashboardRoutingModule } from "./client-dashboard-routing.module";


@NgModule({
    declarations: [
        ClientDashboardPage
    ],
    imports: [
        CommonModule,
        ClientDashboardRoutingModule,
        FontAwesomeModule
    ],
    providers: [],
    schemas: []
})
export class ClientDashboardPageModule {}