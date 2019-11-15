import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SigninService } from './../../services/signin.service';
import { StringsService } from 'src/app/shared/services/strings.service';
import { FormsService } from 'src/app/shared/services/forms.service';
import { MatFormField, IAppStore } from './../../../shared/common/interfaces';
import * as AuthentAction from '../../../shared/store/actions/authent.action';
import * as Utils from '../../../shared/common/utils';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [FormsService, SigninService]
})
export class SigninComponent implements OnInit, OnDestroy {

  error: string;
  isFetching: boolean;
  formFields: MatFormField[];
  signinFormGroup: FormGroup;
  storeSubscription: Subscription;

  constructor(
    private store: Store<IAppStore>,
    private signinService: SigninService,
    public frormsService: FormsService,
    public str: StringsService
  ) { }

  ngOnInit() {
    this.signinFormGroup = this.signinService.signinFormGroup();
    this.formFields = this.signinService.signinFormFields();

    this.storeSubscription = this.store.select('authent').subscribe(
      (store) => {
        Utils.consoleLog('(SigninComponent) authent Store: ', 'limegreen', store);
        this.isFetching = store.signing || store.fetchingToken;
        this.error = store.authentErr;
      }
    );
  }

  errorMessage(formControlName: string): string {
    return this.signinService.formFieldErrorMessage(this.signinFormGroup, formControlName);
  }

  onSignIn() {
    const email: string = this.signinFormGroup.value.emailForm;
    const password: string = this.signinFormGroup.value.passwordForm;

    if (this.signinFormGroup.valid) {
      this.error = '';
      this.store.dispatch(new AuthentAction.SignInStart({ email, password }));
    }
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
