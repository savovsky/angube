import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { NavbarComponent } from './navbar/nav-bar/navbar.component';
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
import { CardComponent } from './card/card.component';
import { ApplicationComponent } from './application/application.component';
import { NavTabComponent } from './navbar/nav-tab/nav-tab.component';
import { AdminComponent } from './admin/admin.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AdminItemGuardPipe, AdminLinkGuardPipe } from './pipes/admin-guard.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { StringPipe, EmptyPipe } from './pipes/string.pipe';


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
    NavTabComponent,
    AdminComponent,
    AccessDeniedComponent,
    AdminLinkGuardPipe,
    CapitalizePipe,
    StringPipe,
    EmptyPipe,
    AdminItemGuardPipe
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
    DataStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
