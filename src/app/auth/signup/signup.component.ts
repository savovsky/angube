import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { PasswordValidators } from 'src/app/common/validators/password.validators';
import { AuthService } from 'src/app/service/auth.service';
import { HttpResponseService } from 'src/app/service/http-response.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      PasswordValidators.cannotContainSpace
    ]),
    confirmPasswordFormControl: new FormControl('', [
      Validators.required,
      PasswordValidators.mustBeEqualToPassword('passwordFormControl')
    ])
  });

  hide = true;
  passwordConfirm = this.signUpForm.get('confirmPasswordFormControl');
  error: any;
  isFetching = false;

  constructor(
    private authService: AuthService,
    private httpResponseService: HttpResponseService
  ) { }

  ngOnInit() {
    this.httpResponseService.signUpUserError
      .subscribe((err: {code: string, message: string}) => {
        this.error = err.message;
        this.isFetching = false;
      });

    // this.httpResponseService.signUpUserSuccess
    //   .subscribe(() => this.isFetching = false);
  }

  get email() {
    return this.signUpForm.get('emailFormControl');
  }

  get password() {
    return this.signUpForm.get('passwordFormControl');
  }

  isPasswordConfirmEmpty() {
    return this.passwordConfirm.hasError('required');
  }

  isPasswordConfirmMatch() {
    return this.passwordConfirm.hasError('mustBeEqualToPassword');
  }

  onSignUp() {
    const email: string = this.signUpForm.value.emailFormControl;
    const password: string = this.signUpForm.value.passwordFormControl;

    if (
      !this.isPasswordConfirmMatch() &&
      !this.isPasswordConfirmEmpty()
    ) {
      this.isFetching = true;
      this.error = null;
      this.authService.signUpUser(email, password);
    }
  }
}
