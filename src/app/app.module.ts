import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/components/nav-bar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './user/components/profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersComponent } from './admin/components/users/users.component';
import { AccountComponent } from './user/components/account/account.component';
import { MenuIconsComponent } from './navbar/components/menu-user/menu-icons.component';
import { CardComponent } from './user/components/card/card.component';
import { ApplicationComponent } from './application/application.component';
import { NavTabComponent } from './navbar/components/nav-tab/nav-tab.component';
import { DashboardComponent } from './user/components/dashboard/dashboard.component';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './modules/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    NotFoundComponent,
    UsersComponent,
    AccountComponent,

    MenuIconsComponent,
    CardComponent,
    ApplicationComponent,
    NavTabComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    HttpClientModule,
    LayoutModule,

    SharedModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
