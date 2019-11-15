import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from './../../shared/common/custom.validators';
import { FormField } from './../../shared/models/form-field.model';
import { StringsService } from './../../shared/services/strings.service';

@Injectable()
export class SignupService {

  private emailForm = 'emailForm';
  private passwordForm = 'passwordForm';
  private confirmPasswordForm = 'confirmPasswordForm';
  private communityIdForm = 'communityIdForm';

  constructor(public str: StringsService) { }

  signupFormGroup() {
    const formGroupObj = {};

    // REMIND The first argument is for default input value
    // You can have a FormGroup in FormGroup (nested) - Grouping Controls
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
      CustomValidators.mustBeEqualTo(this.passwordForm)
    ]);
    formGroupObj[this.communityIdForm] = new FormControl(
      { value: '', disabled: true },
      [Validators.required]
    );

    return new FormGroup(formGroupObj);
  }

  signupFormFields(communityId: string) {
    return  [
      new FormField('email', this.str.email, this.emailForm),
      new FormField('password', this.str.password, this.passwordForm),
      new FormField('password', this.str.confirmPassword, this.confirmPasswordForm),
      new FormField('text', this.str.communityId, this.communityIdForm, communityId)
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
        } else if (formField.hasError('minlength')) {
          return `${this.str.passwordShouldBeAtLeast}
            ${formField.errors.minlength.requiredLength}
            ${this.str.characters}`;
        } else if (formField.hasError('cannotContainSpace')) {
          return this.str.passwordCannotContainSpace;
        }
        return;

      case this.confirmPasswordForm:
        if (formField.hasError('required')) {
          return this.str.requiredField;
        } else if (formField.hasError('mustBeEqualTo')) {
          return this.str.passwordDoesNotMatch;
        }
        return;

      case this.communityIdForm:
        if (formField.hasError('required')) {
          return this.str.requiredField;
        }
        return;

      default: return;
    }
  }
}
