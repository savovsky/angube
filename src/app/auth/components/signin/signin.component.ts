import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SignError, MatFormField } from 'src/app/shared/common/interfaces';
import { StringsService } from 'src/app/shared/services/strings.service';
import { FormField } from 'src/app/shared/models/form-field.model';
import { FormsService } from 'src/app/shared/services/forms.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [FormsService]
})
export class SigninComponent implements OnInit {

  error: any;
  isFetching = false;
  fields: MatFormField[];
  signInForm: FormGroup;
  emailForm = 'emailForm';
  passwordForm = 'passwordForm';

  constructor(
    private authService: AuthService,
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
      Validators.required
    ]);
    this.signInForm = new FormGroup(formGroupObj);

    this.fields = [
      new FormField('email', this.str.email, this.emailForm),
      new FormField('password', this.str.password, this.passwordForm)
    ];

    this.authService.signInError
      .subscribe((err: SignError) => {
        this.isFetching = false;
        this.error = err.message;
      });
  }

  get emailFormControl() {
    return this.signInForm.get('emailForm');
  }

  get passwordFormControl() {
    return this.signInForm.get('passwordForm');
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
        }
        return;
      default: return;
    }
  }

  onSignIn() {
    const email: string = this.emailFormControl.value;
    const password: string = this.passwordFormControl.value;

    if (this.signInForm.valid) {
      this.error = null;
      this.isFetching = true;
      this.authService.signInUser(email, password);
    }
  }
}
