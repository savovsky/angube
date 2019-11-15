import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormGroup} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { StringsService } from 'src/app/shared/services/strings.service';
import { FormsService } from 'src/app/shared/services/forms.service';
import { SignupService } from './../../services/signup.service';
import { IAppStore, MatFormField } from './../../../shared/common/interfaces';
import { User } from './../../../shared/models/user.model';
import * as AuthentAction from '../../../shared/store/actions/authent.action';
import * as UserAction from '../../../shared/store/actions/user.action';
import * as Utils from '../../../shared/common/utils';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [FormsService, SignupService]
})
export class SignupComponent implements OnInit, OnDestroy {

  communityId: string;
  error: string;
  isFetching: boolean;
  formFields: MatFormField[];
  signupFormGroup: FormGroup;
  storeSubscription: Subscription;

  constructor(
    private store: Store<IAppStore>,
    private route: ActivatedRoute,
    private signupService: SignupService,
    public frormsService: FormsService,
    public str: StringsService
  ) { }

  ngOnInit() {
    const urlId = this.route.snapshot.queryParamMap.get('id');
    // TODO 'ng68b' is hard-coded
    // Check if community exists first.
    this.communityId = urlId ? urlId : 'ng68b';
    this.signupFormGroup = this.signupService.signupFormGroup();
    this.formFields = this.signupService.signupFormFields(this.communityId);

    console.log(this.signupFormGroup);
    console.log(this.communityId);

    this.storeSubscription = this.store.select('authent').subscribe(
      (store) => {
        Utils.consoleLog('(SignupComponent) authent Store: ', 'limegreen', store);
        this.isFetching = store.signingUp || store.fetchingToken;
        this.error = store.authentErr;

        if (store.fetchTokenFulfilled) {
          this.store.dispatch(new UserAction.UpdateUserStart({
            ...new User(),
            uid: store.uid,
            userName: this.getCurrentUserEmailLocalPart(store.email),
            email: store.email,
            communityId: this.communityId
          }));
        }
      }
    );
  }

  /**
   * Extract and return email lolcal part,
   * e.g. my_name@abc.com -> return 'my_name'.
   */
  getCurrentUserEmailLocalPart(email: string) {
    return email.substring(0, email.lastIndexOf('@'));
  }

  errorMessage(formControlName: string): string {
    return this.signupService.formFieldErrorMessage(this.signupFormGroup, formControlName);
  }

  onSignUp() {
    const email: string = this.signupFormGroup.value.emailForm;
    const password: string = this.signupFormGroup.value.passwordForm;

    if (this.signupFormGroup.valid) {
      this.error = '';
      this.store.dispatch(new AuthentAction.SignUpStart({ email, password }));
    }
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
