import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CustomValidators } from 'src/app/shared/common/custom.validators';
import { StringsService } from 'src/app/shared/services/strings.service';
import { FormField } from 'src/app/shared/models/form-field.model';
import { FormsService } from 'src/app/shared/services/forms.service';
import { IAppStore, MatFormField } from './../../../shared/common/interfaces';
import { User } from './../../../shared/models/user.model';
import * as AuthentAction from '../../../shared/store/actions/authent.action';
import * as UserAction from '../../../shared/store/actions/user.action';
import * as Utils from '../../../shared/common/utils';

// Check account.component
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [FormsService]
})
export class SignupComponent implements OnInit, OnDestroy {
  error: string;
  isFetching: boolean;
  fields: MatFormField[];
  signUpForm: FormGroup;
  emailForm = 'emailForm';
  passwordForm = 'passwordForm';
  confirmPasswordForm = 'confirmPasswordForm';
  communityCodeForm = 'communityCodeForm';
  storeSubscription: Subscription;

  constructor(
    private store: Store<IAppStore>,
    public frormsService: FormsService,
    public str: StringsService
  ) { }

  ngOnInit() {
    const formGroupObj = {};

    formGroupObj[this.emailForm] = new FormControl('', [
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
    formGroupObj[this.communityCodeForm] = new FormControl(
      {
        value: 'ng68b',
        disabled: true
      },
      [Validators.required]
    );

    this.signUpForm = new FormGroup(formGroupObj);

    this.fields = [
      new FormField('email', this.str.email, this.emailForm),
      new FormField('password', this.str.password, this.passwordForm),
      new FormField('password', this.str.confirmPassword, this.confirmPasswordForm),
      new FormField('text', this.str.communityCode, this.communityCodeForm, 'ng68b')
    ];

    this.storeSubscription = this.store.select('authent').subscribe(
      (store) => {
        Utils.consoleLog('(SignupComponent) authent Store: ', 'limegreen', store);
        this.isFetching = store.signingUp || store.fetchingToken;
        this.error = store.authentErr;

        if (store.fetchTokenFulfilled) {
          this.store.dispatch(new UserAction.UpdateUserStart({
            ...new User(),
            uid: store.uid,
            userName: this.getCurrentUserEmailLocalPart(store.email),
            email: store.email,
            communityId: this.communityIdFormControl.value
          }));
        }
      }
    );
  }

  /**
   * Extract and return email lolcal part,
   * e.g. my_name@abc.com -> return 'my_name'.
   */
  getCurrentUserEmailLocalPart(email: string) {
    return email.substring(0, email.lastIndexOf('@'));
  }

  get emailFormControl() {
    return this.signUpForm.get(this.emailForm);
  }

  get passwordFormControl() {
    return this.signUpForm.get(this.passwordForm);
  }

  get passwordConfirmFormControl() {
    return this.signUpForm.get(this.confirmPasswordForm);
  }

  get communityIdFormControl() {
    return this.signUpForm.get(this.communityCodeForm);
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

      case this.str.communityCode:
        if (this.passwordConfirmFormControl.hasError('required')) {
          return this.str.requiredField;
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
      this.error = '';
      this.store.dispatch(new AuthentAction.SignUpStart({ email, password }));
    }
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
