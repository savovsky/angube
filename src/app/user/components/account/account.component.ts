import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { DatabaseService } from '../../../shared/services/database.service';
import { StringsService } from '../../../shared/services/strings.service';
import { AuthService } from '../../../shared/services/auth.service';
import { UsersService } from '../../../shared/services/users.service';
import { FormField } from '../../../shared/models/form-field.model';
import { CustomValidators } from '../../../shared/common/custom.validators';
import { User, MatFormField } from '../../../shared/common/interfaces';
import * as Utils from '../../../shared/common/utils';
import { Subscription } from 'rxjs';
import { RouterExtService } from '../../../shared/services/router-ext.service';
import * as CurrentUserActions from '../../../shared/store/actions/currentUser.action';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy {

  error: any;
  isRequesting = true;
  isCurrentUser = true;
  user: User;
  fields: MatFormField[];
  accountForm: FormGroup;
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;
  userNameForm = 'userNameForm';
  firstNameForm = 'firstNameForm';
  lastNameForm = 'lastNameForm';

  constructor(
    private store: Store<{currentUser: User}>,
    private route: ActivatedRoute,
    private authService: AuthService,
    private databaseService: DatabaseService,
    private usersService: UsersService,
    private location: Location,
    private router: Router,
    private routerExtService: RouterExtService,
    public str: StringsService
  ) { }

  ngOnInit() {
    const userUid = this.route.snapshot.queryParamMap.get('id');
    const currentUserUid = this.authService.uid;
    const formGroupObj = {};
    this.isCurrentUser = currentUserUid === userUid;

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

    // this.subscription1 = this.usersService.currentUserUpdated
    //   .subscribe(
    //     () => {
    //       this.user = this.usersService.currentUserAccount;
    //       this.setFormValues();
    //     }
    //   );

    // this.subscription2 = this.databaseService.updateUserSuccess
    //   .subscribe(
    //     () => {
    //       Utils.consoleLog(`(AccountComponent) updateUserSuccess`, 'pink');
    //       if (this.canNavigateToHome()) {
    //         this.router.navigate(['app/home']);
    //       } else {
    //         this.router.navigate([this.routerExtService.previousPath]);
    //       }
    //     }
    //   );

    // if (this.isCurrentUser) {
    //   this.isRequesting = false;
    //   this.user = this.usersService.currentUserAccount;
    //   this.setFormValues();
    // } else { // When Admin editing a user.
    //   this.subscription3 = this.databaseService.getUserData(userUid)
    //     .subscribe(
    //       (response: User) => {
    //         if (response) {
    //           Utils.consoleLog(`(AccountComponent) Get user data - Seccess: `, 'pink', response);
    //           this.user = response;
    //           this.setFormValues();
    //           // REMIND
    //           // .patchValue({....}) - for updating only a part of the form
    //           // .reset() - reset the entire form
    //         } else {
    //           Utils.consoleLog(`(AccountComponent) Get user data - Seccess but null: `, 'pink', response);
    //           // TODO Error Screen - Max lecture 249.
    //           // This is the case when user is authenticated, but
    //           // there is no user's data in Data Storage for this user.(deleted)
    //         }
    //       },
    //       (error) => {
    //          // TODO Error Screen - Max lecture 249.
    //         Utils.consoleLog(`(AccountComponent) Get user data - Error: `, 'red', error);
    //       },
    //       () => {
    //         this.isRequesting = false;
    //         Utils.consoleLog(`(AccountComponent) Get user data - Completed`, 'pink');
    //       }
    //     );
    // }

    this.subscription4 = this.store.select('currentUser').subscribe(
      (user: User) => {
        this.user = user;
        this.setFormValues();
      }
    );
  }

  ngOnDestroy() {
    // this.subscription1.unsubscribe();
    // this.subscription2.unsubscribe();
    this.subscription4.unsubscribe();

    // if (this.subscription3) {
    //   this.subscription3.unsubscribe();
    // } else {
    //   return;
    // }
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
      const userAccount: User = {
        ...this.user,
        userName: this.userNameFormControl.value,
        firstName: this.firstNameFormControl.value,
        lastName: this.lastNameFormControl.value,
      };

      this.error = null;
      // this.isRequesting = true;
      // this.databaseService.updateUserAccount(userAccount);
      this.store.dispatch(new CurrentUserActions.UpdateCurrentUser(userAccount));
    }
  }

  onCancel() {
    if (this.canNavigateToHome()) {
      this.router.navigate(['app/home']);
    } else {
      this.location.back();
    }
  }

  canNavigateToHome() {
    if (
      this.routerExtService.previousPath === this.routerExtService.currentPath || // After refresh!
      this.routerExtService.previousPath === '/question'
    ) {
      return true;
    }
    return false;
  }

}
