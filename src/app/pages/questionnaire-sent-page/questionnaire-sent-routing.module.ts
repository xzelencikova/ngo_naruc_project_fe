import { NgModule } from "@angular/core";
import {Routes, RouterModule} from '@angular/router'
import { QuestionnaireSentPage } from "./questionnaire-sent.page";

const routes: Routes = [
    {
        path: '',
        component: QuestionnaireSentPage
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuestionnaireSentRoutingModule {}