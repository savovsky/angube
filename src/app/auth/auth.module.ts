import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { QuestionComponent } from './components/question/question.component';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  declarations: [
    WelcomeComponent,
    SigninComponent,
    SignupComponent,
    QuestionComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
