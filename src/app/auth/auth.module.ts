import { NgModule } from '@angular/core';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

import { SharedModule } from '../shared/shared.module';
import { QuestionComponent } from './components/question/question.component';
import { WelcomeComponent } from './components/welcome/welcome.component';


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
  ],
  exports: []
})
export class AuthModule { }
