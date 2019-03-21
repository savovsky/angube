import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { CustomValidators } from 'src/app/common/custom.validators';
import { AuthService } from 'src/app/service/auth.service';
import { HttpResponseService } from 'src/app/service/http-response.service';
import { DataStorageService } from 'src/app/service/data-storage.service';
import { Account } from 'src/app/account/account.model';
import { SignError, MatFormField } from 'src/app/interfaces/interfaces';
import { StringService } from 'src/app/service/strings.service';
import { FormField } from 'src/app/common/form-field.model';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error: any;
  hide = true;
  isFetching = false;
  fields: MatFormField[];
  signUpForm: FormGroup;
  emailForm = 'emailForm';
  passwordForm = 'passwordForm';
  confirmPasswordForm = 'confirmPasswordForm';

  constructor(
    private authService: AuthService,
    private httpResponseService: HttpResponseService,
    private dataStorageService: DataStorageService,
    public str: StringService
  ) { }

  ngOnInit() {
    const formGroupObj = {};

    // this.signUpForm = new FormGroup({
    //   emailFormControl: new FormControl('', [
    //     // The first argument is for default input value
    //     // You can have a FormGroup in FormGroup (nested) - REMIND Grouping Controls
    //     Validators.required,
    //     Validators.email
    //   ]),
    //   passwordFormControl: new FormControl('', [
    //     Validators.required,
    //     Validators.minLength(6),
    //     CustomValidators.cannotContainSpace
    //   ]),
    //   confirmPasswordFormControl: new FormControl('', [
    //     Validators.required,
    //     CustomValidators.mustBeEqualTo('passwordFormControl')
    //   ])
    // });

    formGroupObj[this.emailForm] = new FormControl('', [
      // REMIND The first argument is for default input value
      // You can have a FormGroup in FormGroup (nested) - REMIND Grouping Controls
      Validators.required,
      Validators.email
    ]);
    formGroupObj[this.passwordForm] = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      CustomValidators.cannotContainSpace
    ]);
    formGroupObj[this.confirmPasswordForm] = new FormControl('', [
      Validators.required,
      CustomValidators.mustBeEqualTo('passwordForm')
    ]);

    this.signUpForm = new FormGroup(formGroupObj);

    this.fields = [
      new FormField('email', this.str.email, this.emailForm),
      new FormField('password', this.str.password, this.passwordForm)
    ];

    // REMIND Max, Section 15, Lecture 202
    // this.signUpForm.valueChanges
    //   .subscribe((value) => console.log('signUpForm value', value));
    // this.signUpForm.statusChanges
    //   .subscribe((status) => console.log('signUpForm status', status));

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
        const isBlocked = false;
        const userAccount = new Account(
          uid, userName, firstName, lastName, email, birthdate, isAdmin, isBlocked
        );

        this.dataStorageService.updateUserAccount(userAccount, true);
      });
  }

  get emailFormControl() {
    return this.signUpForm.get('emailForm');
  }

  get passwordFormControl() {
    return this.signUpForm.get('passwordForm');
  }

  get passwordConfirmFormControl() {
    return this.signUpForm.get('confirmPasswordForm');
  }

  isPasswordConfirmEmpty() { // Remove
    return this.passwordConfirmFormControl.hasError('required');
  }

  isPasswordConfirmMatch() { // Remove
    return this.passwordConfirmFormControl.hasError('mustBeEqualTo');
  }

  getErrorMessage(fieldLabel: string) {
    switch (fieldLabel) {
      case this.str.email:
        if (this.emailFormControl.hasError('required')) {
          return this.str.requiredField;
        } else if (
          this.emailFormControl.hasError('email')
          ) {
          return this.str.invalidEmailAddress;
        }
        return;
      case this.str.password:
        if (this.passwordFormControl.hasError('required')) {
          return this.str.requiredField;
        } else if (true) {
          return;
        } else if (true) {
          return;
        }
        return;
      case this.str.confirmPassword:
        if (this.passwordConfirmFormControl.hasError('required')) {
          return this.str.requiredField;
        } else if (this.passwordConfirmFormControl.hasError('mustBeEqualTo')) {
          return this.str.passwordDoesNotMatch;
        }
        return;
      default: return;
    }
  }

  onVisibilityClick(event: MouseEvent) {
    event.stopPropagation();
    this.hide = !this.hide;
  }

  onSignUp() {
    const email: string = this.emailFormControl.value;
    const password: string = this.passwordFormControl.value;
    // REMIND - another way
    // const email: string = this.signUpForm.value.emailForm;
    // const password: string = this.signUpForm.value.passwordForm;

    if (this.signUpForm.valid) {
      this.error = null;
      this.isFetching = true;
      this.authService.signUpUser(email, password);
    }
  }
}
