import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from '../user/components/account/account.component';
import { ProfileComponent } from '../user/components/profile/profile.component';
import { UsersComponent } from '../admin/components/users/users.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ApplicationComponent } from './components/application/application.component';
import { AccessDeniedComponent } from '../admin/components/access-denied/access-denied.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AdminGuard } from '../admin/guards/admin.guard';


const routes: Routes = [
  {
    path: 'app',
    canActivateChild: [AuthGuard],
    component: ApplicationComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
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
        canActivate: [AdminGuard],
        component: UsersComponent
      },
      {
        path: 'access-denied',
        component: AccessDeniedComponent
      },
      {
        path: 'dashboard',
        canLoad: [AuthGuard],
        loadChildren: '../dashboard/dashboard.module#DashboardModule'
      }
    ]
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
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard]
})
export class AppRoutingModule { }
