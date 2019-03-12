import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { PasswordValidators } from 'src/app/common/validators/password.validators';
import { AuthService } from 'src/app/service/auth.service';
import { HttpResponseService } from 'src/app/service/http-response.service';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { Account } from 'src/app/account/account.model';
import { SignError } from 'src/app/interfaces/interfaces';


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
    private httpResponseService: HttpResponseService,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    this.httpResponseService.signUpUserError
      .subscribe((err: SignError) => {
        this.isFetching = false;
        this.error = err.message;
      });

    this.httpResponseService.signUpUserSuccess
      .subscribe(() => {
        const uid = this.authService.uid;
        const userName = this.authService.userName;
        const firstName = '';
        const lastName = '';
        const email = this.authService.email;
        const birthdate = '';
        const isAdmin = false;
        const userAccount = new Account(
          uid, userName, firstName, lastName, email, birthdate, isAdmin
        );

        this.dataStorageService.updateUserAccount(userAccount, true);
      });
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
      !this.signUpForm.get('emailFormControl').invalid &&
      !this.signUpForm.get('passwordFormControl').invalid &&
      !this.signUpForm.get('confirmPasswordFormControl').invalid
    ) {
      this.error = null;
      this.isFetching = true;
      this.authService.signUpUser(email, password);
    }
  }
}
