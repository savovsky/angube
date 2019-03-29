import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { QuestionComponent } from './components/question/question.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    SigninComponent,
    SignupComponent,
    QuestionComponent,
    AccessDeniedComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AuthModule { }
