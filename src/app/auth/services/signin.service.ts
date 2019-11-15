import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { FormField } from './../../shared/models/form-field.model';
import { StringsService } from 'src/app/shared/services/strings.service';

@Injectable()
export class SigninService {

  private emailForm = 'emailForm';
  private passwordForm = 'passwordForm';

  constructor(public str: StringsService) { }

  signinFormGroup() {
    const formGroupObj = {};

    formGroupObj[this.emailForm] = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    formGroupObj[this.passwordForm] = new FormControl('', [
      Validators.required
    ]);

    return new FormGroup(formGroupObj);
  }

  signinFormFields() {
    return  [
      new FormField('email', this.str.email, this.emailForm),
      new FormField('password', this.str.password, this.passwordForm)
    ];
  }

  formFieldErrorMessage(formGroup: FormGroup, formControlName: string) {
    const formField = formGroup.get(formControlName);

    switch (formControlName) {

      case this.emailForm:
        if (formField.hasError('required')) {
          return this.str.requiredField;
        } else if (formField.hasError('email')) {
          return this.str.invalidEmailAddress;
        }
        return;

      case this.passwordForm:
        if (formField.hasError('required')) {
          return this.str.requiredField;
        }
        return;

      default: return;
    }
  }
}
