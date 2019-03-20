import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { NameValidators } from '../common/validators/username.validators';
import { DataStorageService } from '../service/data-storage.service';
import { AuthService } from '../service/auth.service';
import { Account } from './account.model';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/interfaces';
import * as Utils from '../common/utils';
import { Location } from '@angular/common';
import { StringService } from '../service/strings.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  error: any;
  user: User;
  isRequesting = true;
  accountForm: FormGroup;
  value = 'eho';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private location: Location,
    public str: StringService
  ) { }

  ngOnInit() {
    this.accountForm = new FormGroup({

      userNameFormControl: new FormControl('', [
        Validators.required,
        NameValidators.cannotContainSpace
      ]),
      firstNameFormControl: new FormControl('', [
        NameValidators.cannotContainSpace
      ]),
      lastNameFormControl: new FormControl('', [
        NameValidators.cannotContainSpace
      ])
    });

    const uid = this.route.snapshot.queryParamMap.get('id');

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
            userNameFormControl: response.userName,
            firstNameFormControl: response.firstName,
            lastNameFormControl: response.lastName
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
    return this.accountForm.get('userNameFormControl');
  }
  // REMIND - act on exact FormControl
  // this.userNameFormControl.reset(response.userName);

  get firstNameFormControl() {
    return this.accountForm.get('firstNameFormControl');
  }

  get lastNameFormControl() {
    return this.accountForm.get('lastNameFormControl');
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

  // User Name
  isUserNameValid() {
    return this.userNameFormControl.invalid ? false : true;
  }

  isUserNameEmpty() {
    return this.userNameFormControl.hasError('required') ? true : false;
  }

  isUserNameContainSpace() {
    return this.userNameFormControl.hasError('cannotContainSpace') ? true : false;
  }

  // First Name
  isFirstNameValid() {
    return this.firstNameFormControl.invalid ? false : true;
  }

  isFirstNameContainSpace() {
    return this.firstNameFormControl.hasError('cannotContainSpace') ? true : false;
  }

  // Last Name
  isLastNameValid() {
    return this.lastNameFormControl.invalid ? false : true;
  }

  isLastNameContainSpace() {
    return this.lastNameFormControl.hasError('cannotContainSpace') ? true : false;
  }

  getErrorMessage(expression: string) {
    switch (expression) {
      case this.str.userName:
        if (this.isUserNameEmpty()) {
          return this.str.userNameIsRequired;
        }
        if (this.isUserNameContainSpace()) {
          return this.str.userNameCannotContainSpace;
        }
        return;
      case this.str.firstName:
        if (this.isFirstNameContainSpace()) {
          return this.str.firstNameCannotContainSpace;
        }

    }


  }

  onAccountSave() {
    if (
      this.isUserNameValid() &&
      this.isFirstNameValid() &&
      this.isLastNameValid()
    ) {
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
