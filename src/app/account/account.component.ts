import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { NameValidators } from '../common/validators/username.validators';
import { DataStorageService } from '../service/data-storage.service';
import { AuthService } from '../service/auth.service';
import { Account } from './account.model';
import { ActivatedRoute } from '@angular/router';
import { User, MatFormField } from '../interfaces/interfaces';
import * as Utils from '../common/utils';
import { Location } from '@angular/common';
import { StringService } from '../service/strings.service';
import { FormField } from '../common/form-field.model';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  error: any;
  user: User;
  fields: MatFormField[];
  isRequesting = true;
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
      NameValidators.cannotContainSpace
    ]);
    formGroupObj[this.firstNameForm] = new FormControl('', [
      NameValidators.cannotContainSpace
    ]);
    formGroupObj[this.lastNameForm] = new FormControl('', [
      NameValidators.cannotContainSpace
    ]);
    this.accountForm = new FormGroup(formGroupObj);

    this.fields = [
      new FormField(this.str.userName, this.userNameForm),
      new FormField(this.str.firstName, this.firstNameForm),
      new FormField(this.str.lastName, this.lastNameForm)
    ];

    this.dataStorageService.getUserData(uid)
    .subscribe( // TODO when first time user (Sign Up) there is no need to request database!
      (response: User) => {
        this.isRequesting = false;
        if (response) {
          Utils.consoleLog(`getUserData Seccess: `, 'purple', response);
          Utils.consoleLog(`accountForm: `, 'yellow', this.accountForm);
          this.authService.currentUserIsAdmin(response.isAdmin);
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

  userUid() {
    return this.user.uid;
  }

  userEmail() {
    return this.user.email;
  }

  userIsAdmin() {
    return this.user.isAdmin;
  }

  userIsBlocked() {
    return this.user.isBlocked;
  }

  userBirthdate() {
    return this.user.birthdate;
  }

  userName() {
    return this.userNameFormControl.value;
  }

  firstName() {
    return this.firstNameFormControl.value;
  }

  lastName() {
    return this.lastNameFormControl.value;
  }


  isFormValid() {
    if (
      !this.userNameFormControl.invalid &&
      !this.firstNameFormControl.invalid &&
      !this.lastNameFormControl.invalid
    ) {
      return true;
    }
    return false;
  }


  getErrorMessage(fieldLabel: string) {
    switch (fieldLabel) {
      case this.str.userName:
        if (this.userNameFormControl.hasError('required')) {
          return this.str.requiredField;
        }
        if (this.userNameFormControl.hasError('cannotContainSpace')) {
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
    }
  }

  onAccountSave() {
    if (this.isFormValid()) {
      const userAccount = new Account(
        this.userUid(),
        this.userName(),
        this.firstName(),
        this.lastName(),
        this.userEmail(),
        this.userBirthdate(),
        this.userIsAdmin(),
        this.userIsBlocked()
      );

      this.error = null;
      this.isRequesting = true;
      this.dataStorageService.updateUserAccount(userAccount, false);
    }
  }

  onCancel() {
    this.location.back(); // TODO Back to question component after the question..Repair it!
  }
}
