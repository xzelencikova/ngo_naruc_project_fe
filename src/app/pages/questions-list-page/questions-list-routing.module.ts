import { NgModule } from "@angular/core";
import {Routes, RouterModule} from '@angular/router'
import { QuestionsListPage } from "./questions-list.page";

const routes: Routes = [
    {
        path: '',
        component: QuestionsListPage
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestionsListRoutingModule {}