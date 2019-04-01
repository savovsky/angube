import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppRoutingModule } from './core/app-routing.module';
import { NavbarModule } from './navbar/navbar.module';
import { AdminModule } from './admin/admin.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AuthModule,
    UserModule,
    NavbarModule,
    AdminModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
