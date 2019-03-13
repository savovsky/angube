import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersComponent } from './users/users.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { AuthService } from './service/auth.service';
import { DataStorageService } from './service/data-storage.service';
import { MatComponentsModule } from './mat-components.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccountComponent } from './account/account.component';
import { QuestionComponent } from './question/question.component';
import { MenuIconsComponent } from './menu-icons/menu-icons.component';
import { HttpResponseService } from './service/http-response.service';
import { CardComponent } from './card/card.component';
import { UsersAccountService } from './service/users-account.service';
import { ApplicationComponent } from './application/application.component';
import { NavTabComponent } from './navbar/nav-tab/nav-tab.component';
import { ProgressService } from './service/progress.service';
import { AuthGuardService } from './service/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    NotFoundComponent,
    UsersComponent,
    SigninComponent,
    SignupComponent,
    WelcomeComponent,
    AccountComponent,
    QuestionComponent,
    MenuIconsComponent,
    CardComponent,
    ApplicationComponent,
    NavTabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatComponentsModule,
    LayoutModule
  ],
  providers: [
    AuthService,
    DataStorageService,
    HttpResponseService,
    UsersAccountService,
    ProgressService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
