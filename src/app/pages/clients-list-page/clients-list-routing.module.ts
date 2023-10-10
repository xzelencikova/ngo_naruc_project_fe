import { NgModule } from "@angular/core";
import {Routes, RouterModule} from '@angular/router'
import { ClientsListPage } from "./clients-list.page";

const routes: Routes = [
    {
        path: '',
        component: ClientsListPage
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientsListRoutingModule {}