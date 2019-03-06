import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuestionComponent } from './question/question.component';
import { ApplicationComponent } from './application/application.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'app',
    component: ApplicationComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'account',
        component: AccountComponent
      },
      {
        path: 'posts',
        component: PostsComponent
      },
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
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
