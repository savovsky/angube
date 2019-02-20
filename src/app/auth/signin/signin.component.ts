import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { HttpResponseService } from 'src/app/service/http-response.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required
    ]),
  });

  hide = true;
  error: any;
  isFetching = false;

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
    .subscribe((err: {code: string, message: string}) => {
      this.error = err.message;
      this.isFetching = false;
    });
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
