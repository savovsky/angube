import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { NameValidators } from '../common/validators/username.validators';
import { DataStorageService } from '../service/data-storage.service';
import { AuthService } from '../service/auth.service';
import { Account } from './account.model';


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
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    this.dataStorageService.getCurrentUserData()
      .subscribe( // TODO when first time user (Sign Up) there is no need to request database!
        (res: { userName: string, firstName: string, lastName: string }) => {
          this.isRequesting = false;
          if (res) {
            this.userNameFormControl.reset(res.userName);
            this.firstNameFormControl.reset(res.firstName);
            this.lastNameFormControl.reset(res.lastName);
            this.user = res;
          } else {
            const userName = this.authService.getCurrentUserName();
            this.userNameFormControl.reset(userName);
          }
        }
      );
  }

  userUid() {
    return this.authService.uid;
  }

  userEmail() {
    return this.authService.email;
  }

  userBirthdate() {
    return this.authService.birthdate;
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
