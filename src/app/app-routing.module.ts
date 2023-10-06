import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'questionnaire',
    loadChildren: () => import('src/app/pages/questionnaire-page/questionnaire-page.module').then(m => m.QuestionnairePageModule)
  },
  {
    path: 'questionnaire-sent',
    loadChildren: () => import('src/app/pages/questionnaire-sent-page/questionnaire-sent-page.module').then(m => m.QuestionnaireSentPageModule)
  },
  {
    path: 'clients-list',
    loadChildren: () => import('src/app/pages/clients-list-page/clients-list-page.module').then(m => m.ClientsListPageModule)
  },
  {
    path: '',
    loadChildren: () => import('src/app/pages/home-page/home-page.module').then(m => m.HomePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
