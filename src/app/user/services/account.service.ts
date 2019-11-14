import { Injectable } from '@angular/core';
import { CustomValidators } from './../../shared/common/custom.validators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormField } from 'src/app/shared/models/form-field.model';
import { StringsService } from './../../shared/services/strings.service';
import { User, IUser } from '../../shared/common/interfaces';
import { Account } from '../../shared/models/account.model';

@Injectable()
export class AccountService {

  private user: [string, any][];
  private orderList = Object.keys(new Account());
  private userNameForm = 'userNameForm';
  private firstNameForm = 'firstNameForm';
  private lastNameForm = 'lastNameForm';

  constructor(public str: StringsService) { }

  /**
   * Mutate the user account object to array of its entries and
   * reorder this array elements by given list.
   * @param account User account object.
   */
  toOrderedArray(account: User) {
    this.user = Object.entries(account);
    this.orderByList();
    return this.user;
  }

  /**
   * Reorder user array elements by index from 'orderList' array.
   */
  orderByList() {
    this.orderList.forEach((el, index) => {
      const currentItemIndex = this.user.findIndex((item) => item[0] === el);
      this.user.splice(index, 0, this.user.splice(currentItemIndex, 1)[0]);
    });
  }

  accountFormGroup() {
    const formGroupObj = {};

    formGroupObj[this.userNameForm] = new FormControl('', [
      Validators.required,
      CustomValidators.cannotContainSpace
    ]);
    formGroupObj[this.firstNameForm] = new FormControl('', [
      CustomValidators.cannotContainSpace
    ]);
    formGroupObj[this.lastNameForm] = new FormControl('', [
      CustomValidators.cannotContainSpace
    ]);
    // REMIND The first argument is for default input value
    // You can have a FormGroup in FormGroup (nested) - REMIND Grouping Controls

    return new FormGroup(formGroupObj);
  }

  accountFormFields() {
    return  [
      new FormField('text', this.str.userName, this.userNameForm),
      new FormField('text', this.str.firstName, this.firstNameForm),
      new FormField('text', this.str.lastName, this.lastNameForm)
    ];
  }

  formFieldErrorMessage(formGroup: FormGroup, formControlName: string) {
    switch (formControlName) {
      case this.userNameForm:
        if (formGroup.get(formControlName).hasError('required')) {
          return this.str.requiredField;
        } else if (formGroup.get(formControlName).hasError('cannotContainSpace')) {
          return this.str.cannotContainSpace;
        }
        return;
      case this.firstNameForm:
        if (formGroup.get(formControlName).hasError('cannotContainSpace')) {
          return this.str.cannotContainSpace;
        }
        return;
      case this.lastNameForm:
        if (formGroup.get(formControlName).hasError('cannotContainSpace')) {
          return this.str.cannotContainSpace;
        }
        return;

      default: return;
    }

  }

  userAccount(formGroup: FormGroup, user: IUser) {
    return {
      ...user,
      userName: formGroup.get(this.userNameForm).value,
      firstName: formGroup.get(this.firstNameForm).value,
      lastName: formGroup.get(this.lastNameForm).value
    };
  }

}
