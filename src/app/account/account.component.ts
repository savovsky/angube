import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { CustomValidators } from '../common/custom.validators';
import { DataStorageService } from '../service/data-storage.service';
import { AuthService } from '../service/auth.service';
import { Account } from './account.model';
import { ActivatedRoute } from '@angular/router';
import { User, MatFormField } from '../interfaces/interfaces';
import { Location } from '@angular/common';
import { StringService } from '../service/strings.service';
import { FormField } from '../common/form-field.model';
import * as Utils from '../common/utils';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  error: any;
  isRequesting = true;
  user: User;
  fields: MatFormField[];
  accountForm: FormGroup;
  userNameForm = 'userNameForm';
  firstNameForm = 'firstNameForm';
  lastNameForm = 'lastNameForm';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private location: Location,
    public str: StringService
  ) { }

  ngOnInit() {
    const uid = this.route.snapshot.queryParamMap.get('id');
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
    this.accountForm = new FormGroup(formGroupObj);

    this.fields = [
      new FormField('text', this.str.userName, this.userNameForm),
      new FormField('text', this.str.firstName, this.firstNameForm),
      new FormField('text', this.str.lastName, this.lastNameForm)
    ];

    this.dataStorageService.getUserData(uid)
    .subscribe( // TODO when first time user (Sign Up) there is no need to request database!
      (response: User) => {
        this.isRequesting = false;
        if (response) {
          Utils.consoleLog(`getUserData Seccess: `, 'purple', response);
          // Remove
          // this.authService.currentUserIsAdmin(response.isAdmin);
          this.user = response;
          this.accountForm.setValue({
            userNameForm: response.userName,
            firstNameForm: response.firstName,
            lastNameForm: response.lastName
          });
          // REMIND
          // .patchValue({....}) - for updating only a part of the form
          // .reset() - reset the entire form
        } else {
          Utils.consoleLog(`getUserData Respose: `, 'red', response);
          // TODO Error Screen
          // This is the case when user is authenticated, but
          // there is no user's data in Data Storage for this user.(deleted)
        }
      },
      (error) => Utils.consoleLog(`getUserData Error: `, 'red', error), // TODO Error Screen
      () => Utils.consoleLog(`getUserData Completed`, 'purple')
    );

  }

  get userNameFormControl() {
    return this.accountForm.get(this.userNameForm);
  }
  // REMIND - act on exact FormControl
  // this.userNameFormControl.reset(response.userName);

  get firstNameFormControl() {
    return this.accountForm.get(this.firstNameForm);
  }

  get lastNameFormControl() {
    return this.accountForm.get(this.lastNameForm);
  }

  getErrorMessage(fieldLabel: string) {
    switch (fieldLabel) {
      case this.str.userName:
        if (this.userNameFormControl.hasError('required')) {
          return this.str.requiredField;
        } else if (this.userNameFormControl.hasError('cannotContainSpace')) {
          return this.str.cannotContainSpace;
        }
        return;
      case this.str.firstName:
        if (this.firstNameFormControl.hasError('cannotContainSpace')) {
          return this.str.cannotContainSpace;
        }
        return;
      case this.str.lastName:
        if (this.lastNameFormControl.hasError('cannotContainSpace')) {
          return this.str.cannotContainSpace;
        }
        return;
      default: return;
    }
  }

  onAccountSave() {
    if (this.accountForm.valid) {
      const userAccount = new Account(
        this.user.uid,
        this.userNameFormControl.value,
        this.firstNameFormControl.value,
        this.lastNameFormControl.value,
        this.user.email,
        this.user.birthdate,
        this.user.isAdmin,
        this.user.isBlocked
      );

      this.error = null;
      this.isRequesting = true;
      this.dataStorageService.updateUserAccount(userAccount, false);
    }
  }

  onCancel() {
    // TODO Back to question component after the question..Repair it!
    this.location.back();
  }
}
