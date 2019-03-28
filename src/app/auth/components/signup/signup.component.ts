import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { CustomValidators } from 'src/app/common/custom.validators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { SignError, MatFormField, User } from 'src/app/common/interfaces';
import { StringsService } from 'src/app/shared/services/strings.service';
import { FormField } from 'src/app/shared/models/form-field.model';
import { FormsService } from 'src/app/service/forms.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [FormsService]
})
export class SignupComponent implements OnInit {
  error: any;
  isFetching = false;
  fields: MatFormField[];
  signUpForm: FormGroup;
  emailForm = 'emailForm';
  passwordForm = 'passwordForm';
  confirmPasswordForm = 'confirmPasswordForm';

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService,
    private router: Router,
    public frormsService: FormsService,
    public str: StringsService
  ) { }

  ngOnInit() {
    const formGroupObj = {};

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
      new FormField('password', this.str.password, this.passwordForm),
      new FormField('password', this.str.confirmPassword, this.confirmPasswordForm)
    ];

    // REMIND Max, Section 15, Lecture 202
    // this.signUpForm.valueChanges
    //   .subscribe((value) => console.log('signUpForm value', value));
    // this.signUpForm.statusChanges
    //   .subscribe((status) => console.log('signUpForm status', status));

    this.authService.signUpSuccess
      .subscribe((userAccount: User) => {
        this.databaseService.updateUserAccount(userAccount);
        this.router.navigate(['question']);
      });

    this.authService.signUpError
      .subscribe((err: SignError) => {
        this.isFetching = false;
        this.error = err.message;
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
        } else if (this.passwordFormControl.hasError('minlength')) {
          return `${this.str.passwordShouldBeAtLeast}
            ${this.passwordFormControl.errors.minlength.requiredLength}
            ${this.str.characters}`;
        } else if (this.passwordFormControl.hasError('cannotContainSpace')) {
          return this.str.passwordCannotContainSpace;
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
