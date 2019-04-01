import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ApplicationComponent } from './application/application.component';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { NavbarModule } from './navbar/navbar.module';
import { AdminModule } from './admin/admin.module';
import { DashboardModule } from './dashboard/dashboard.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ApplicationComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    UserModule,
    NavbarModule,
    AdminModule,
    DashboardModule,

    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,

    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
