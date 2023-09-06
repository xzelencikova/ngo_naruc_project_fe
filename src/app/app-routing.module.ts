import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dotaznik',
    loadChildren: () => import('src/app/pages/questionnaire-page/questionnaire-page.module').then(m => m.QuestionnairePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
