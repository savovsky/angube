import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'users/:id/:username',
    component: ProfileComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'posts',
    component: PostsComponent
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
