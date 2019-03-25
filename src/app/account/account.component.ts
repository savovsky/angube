import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { DataStorageService } from '../service/data-storage.service';
import { StringService } from '../service/strings.service';
import { AuthService } from '../service/auth.service';
import { UsersService } from '../service/users.service';
import { Account } from './account.model';
import { FormField } from '../common/form-field.model';
import { CustomValidators } from '../common/custom.validators';
import { User, MatFormField } from '../interfaces/interfaces';
import * as Utils from '../common/utils';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  error: any;
  isRequesting = true;
  user: User;
  fields: MatFormField[];
  accountForm: FormGroup;
  subscription1: Subscription;
  subscription2: Subscription;
  userNameForm = 'userNameForm';
  firstNameForm = 'firstNameForm';
  lastNameForm = 'lastNameForm';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private usersService: UsersService,
    private location: Location,
    public str: StringService
  ) { }

  ngOnInit() {
    const userUid = this.route.snapshot.queryParamMap.get('id');
    const currentUserUid = this.authService.uid;
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

    this.subscription1 = this.usersService.currentUserUpdated
      .subscribe(
        () => {
          this.user = this.usersService.currentUserAccount;
          this.setFormValues();
        }
      );

    if (currentUserUid === userUid) {
      this.isRequesting = false;
      this.user = this.usersService.currentUserAccount;
      this.setFormValues();
    } else {
      this.subscription2 = this.dataStorageService.getUserData(userUid)
        .subscribe(
          (response: User) => {
            if (response) {
              Utils.consoleLog(`(AccountComponent) Get user data - Seccess: `, 'pink', response);
              this.user = response;
              this.setFormValues();
              // REMIND
              // .patchValue({....}) - for updating only a part of the form
              // .reset() - reset the entire form
            } else {
              Utils.consoleLog(`(AccountComponent) Get user data - Seccess but null: `, 'pink', response);
              // TODO Error Screen
              // This is the case when user is authenticated, but
              // there is no user's data in Data Storage for this user.(deleted)
            }
          },
          (error) => {
            Utils.consoleLog(`(AccountComponent) Get user data - Error: `, 'red', error); // TODO Error Screen
          },
          () => {
            this.isRequesting = false;
            Utils.consoleLog(`(AccountComponent) Get user data - Completed`, 'pink');
          }
        );
    }
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();

    if (this.subscription2) {
      this.subscription2.unsubscribe();
    } else {
      return;
    }
  }

  setFormValues() {
    this.accountForm.setValue({
      userNameForm: this.user.userName,
      firstNameForm: this.user.firstName,
      lastNameForm: this.user.lastName
    });
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
