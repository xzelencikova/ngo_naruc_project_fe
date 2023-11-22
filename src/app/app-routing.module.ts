import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'questionnaire',
    loadChildren: () => import('src/app/pages/questionnaire-page/questionnaire-page.module').then(m => m.QuestionnairePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'questionnaire-sent',
    loadChildren: () => import('src/app/pages/questionnaire-sent-page/questionnaire-sent-page.module').then(m => m.QuestionnaireSentPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'clients-list',
    loadChildren: () => import('src/app/pages/clients-list-page/clients-list-page.module').then(m => m.ClientsListPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'client-overview/:id',
    loadChildren: () => import('src/app/pages/client-dashboard-page/client-dashboard-page.module').then(m => m.ClientDashboardPageModule),
    canActivate: [authGuard]
  },
  {
    path: '',
    loadChildren: () => import('src/app/pages/home-page/home-page.module').then(m => m.HomePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/pages/login-page/login-page.module').then(m => m.LoginPageModule)
  },
  {
    path: 'user-management',
    loadChildren: () => import('src/app/pages/user-management-page/user-management-page.module').then(m => m.UserManagementPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'user-profile',
    loadChildren: () => import('src/app/pages/user-profile-page/user-profile-page.module').then(m => m.UserProfilePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'questions-management',
    loadChildren: () => import('src/app/pages/questions-list-page/questions-list-page.module').then(m => m.QuestionsListPageModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
