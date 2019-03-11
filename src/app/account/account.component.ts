import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { NameValidators } from '../common/validators/username.validators';
import { DataStorageService } from '../service/data-storage.service';
import { AuthService } from '../service/auth.service';
import { Account } from './account.model';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/interfaces';
import * as Utils from '../common/utils';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accountForm = new FormGroup({

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

  userNameFormControl = this.accountForm.get('userNameFormControl');
  firstNameFormControl = this.accountForm.get('firstNameFormControl');
  lastNameFormControl = this.accountForm.get('lastNameFormControl');
  error: any;
  user: any;
  isRequesting = true;


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    const uid = this.route.snapshot.queryParamMap.get('id');

    this.dataStorageService.getUserData(uid)
    .subscribe( // TODO when first time user (Sign Up) there is no need to request database!
      (response: User) => {
        Utils.consoleLog(`getUserData Seccess: `, 'purple', response);
        this.isRequesting = false;
        if (response) {
          this.user = response;
          this.userNameFormControl.reset(response.userName);
          this.firstNameFormControl.reset(response.firstName);
          this.lastNameFormControl.reset(response.lastName);
        } else {
          const userName = this.authService.getCurrentUserName();
          this.userNameFormControl.reset(userName);
        }
      },
      (error) => Utils.consoleLog(`getUserData Error: `, 'red', error),
      () => Utils.consoleLog(`getUserData Completed`, 'purple')
    );

  }

  userUid() {
    return this.authService.uid;
  }

  userEmail() {
    return this.authService.email;
  }

  userBirthdate() {
    return '';
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
        false
      );

      this.error = null;
      this.isRequesting = true;
      this.dataStorageService.updateUserAccount(userAccount, false);
    }
  }
}
