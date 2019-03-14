import { Component } from '@angular/core';
import { str } from '../fixtures/strings';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  angube: string = str.angube;
  welcomeTo: string = str.welcomeTo;
  alreadyHaveAnAccount: string = str.alreadyHaveAnAccount;
  firstTimeUser: string = str.firstTimeUser;
  signIn: string = str.signIn;
  signUp: string = str.signUp;
}
