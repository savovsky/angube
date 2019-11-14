import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { StringsService } from '../../../shared/services/strings.service';
import { RouterExtService } from '../../../shared/services/router-ext.service';
import { AccountService } from './../../services/account.service';
import { IUser, MatFormField, IAppStore } from '../../../shared/common/interfaces';
import * as UserAction from '../../../shared/store/actions/user.action';
import * as Utils from '../../../shared/common/utils';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [AccountService]
})
export class AccountComponent implements OnInit, OnDestroy {

  userId: string;
  communityId: string;
  isCurrentUser: boolean;
  isRequesting: boolean;
  user: IUser;
  formFields: MatFormField[];
  accountFormGroup: FormGroup;
  storeSubscription: Subscription;

  constructor(
    private store: Store<IAppStore>,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private routerExtService: RouterExtService,
    public str: StringsService
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.queryParamMap.get('id');
    this.formFields = this.accountService.accountFormFields();
    this.accountFormGroup = this.accountService.accountFormGroup();

    // REMIND Max, Section 15, Lecture 202
    // this.accountFormGroup.valueChanges
    //   .subscribe((value) => console.log('accountFormGroup value', value));
    // this.accountFormGroup.statusChanges
    //   .subscribe((status) => console.log('accountFormGroup status', status));

    this.storeSubscription = this.store.select(appState => appState).subscribe(
      (store) => {
        Utils.consoleLog('(AccountComponent) Store: ', 'gold', store);
        this.communityId = store.authent.communityId;
        this.user = store.user.user;
        this.isCurrentUser = store.authent.uid === this.userId;
        this.isRequesting = store.user.fetching || store.user.updating;

        this.setFormValues();
      }
    );

    this.store.dispatch(new UserAction.FetchUserStart({
      userId: this.userId,
      communityId: this.communityId
    }));

  }

  setFormValues() {
    this.accountFormGroup.setValue({
      userNameForm: this.user.userName,
      firstNameForm: this.user.firstName,
      lastNameForm: this.user.lastName
    });
    // REMIND
    // .patchValue({....}) - for updating only a part of the form
    // .reset() - reset the entire form
  }

  errorMessage(formControlName: string): string {
    return this.accountService.formFieldErrorMessage(this.accountFormGroup, formControlName);
  }


  onAccountSave() {
    if (this.accountFormGroup.valid) {
      const userAccount: IUser = this.accountService.userAccount(this.accountFormGroup, this.user);

      this.store.dispatch(new UserAction.UpdateUserStart(userAccount));
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

  // () => {
  //   Utils.consoleLog(`(AccountComponent) updateUserSuccess`, 'pink');
  //   if (this.canNavigateToHome()) {
  //     this.router.navigate(['app/home']);
  //   } else {
  //     this.router.navigate([this.routerExtService.previousPath]);
  //   }
  // }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
