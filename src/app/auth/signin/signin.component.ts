import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { HttpResponseService } from 'src/app/service/http-response.service';
import { SignError } from 'src/app/interfaces/interfaces';
import { str } from '../../fixtures/strings';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  hide = true;
  error: any;
  isFetching = false;
  signIn: string = str.signIn;
  signUp: string = str.signUp;
  submit: string = str.submit;
  emailIs: string = str.emailIs;
  passwordIs: string = str.passwordIs;
  required: string = str.required;
  notRegisteredYet: string = str.notRegisteredYet;
  pleaseEnterValidEmailAddress: string = str.pleaseEnterValidEmailAddress;

  signInForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required
    ]),
  });


  get email() {
    return this.signInForm.get('emailFormControl');
  }

  get password() {
    return this.signInForm.get('passwordFormControl');
  }

  constructor(
    private authService: AuthService,
    private httpResponseService: HttpResponseService
  ) { }

  ngOnInit() {
    this.httpResponseService.signInUserError
    .subscribe((err: SignError) => {
      this.error = err.message;
      this.isFetching = false;
    });
  }

  onVisibilityClick(event: MouseEvent) {
    event.stopPropagation();
    this.hide = !this.hide;
  }


  onSignIn() {
    const email: string = this.signInForm.value.emailFormControl;
    const password: string = this.signInForm.value.passwordFormControl;

    if (
      !this.signInForm.get('emailFormControl').invalid &&
      !this.signInForm.get('passwordFormControl').invalid
    ) {
    this.isFetching = true;
    this.error = null;
    this.authService.signInUser(email, password);
    }
  }
}
