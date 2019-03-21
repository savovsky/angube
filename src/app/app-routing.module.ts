import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuestionComponent } from './question/question.component';
import { ApplicationComponent } from './application/application.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { AdminAuthGuardService } from './service/admin-auth-guard.service';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'app',
    // canActivate: [AuthGuardService],
    component: ApplicationComponent,
    children: [
      {
        path: 'home',
        // canActivate: [AuthGuardService],
        component: HomeComponent,
      },
      {
        path: 'admin',
        // canActivate: [AuthGuardService, AdminAuthGuardService],
        canActivate: [AdminAuthGuardService],
        component: AdminComponent,
      },
      {
        path: 'account/:id/:username',
        component: AccountComponent
      },
      {
        path: 'account/:username',
        component: AccountComponent
      },
      {
        path: 'account',
        component: AccountComponent
      },
      // {
      //   path: 'posts',
      //   component: PostsComponent
      // },
      {
        path: 'users/:id/:username',
        component: ProfileComponent
      },
      {
        path: 'users/:username',
        component: ProfileComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'access-denied',
        component: AccessDeniedComponent
      }
    ]
  },
  {
    path: 'question',
    component: QuestionComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
