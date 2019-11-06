import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { IFormTemplate, IDashboardItem, IFormStore } from './../../common/interfaces';
import * as Action from '../actions/formTemplate.action';
import * as Utils from '../../common/utils';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';


@Injectable()
export class FormTemplateEffects {

  form: IFormStore;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router
  ) { }

  @Effect()
  uploadForm$ = this.actions$.pipe(
    ofType(Action.UPLOAD_FORM_START),
    switchMap((action: Action.UploadFormStart) => {
      this.form = action.payload;

      return this.http.put(this.urlUpdateForm(), this.formData()).pipe(
        map((response) => {
          Utils.consoleLog('(FormTemplateEffects) Upload Form - Success: ', 'darkGoldenRod', response);
          return new Action.UploadFormFulfilled();
        }),
        catchError((error: HttpErrorResponse) => {
          Utils.consoleLog('(FormTemplateEffects) Upload Form - Error: ', 'red', error);
          return of(new Action.UploadFormRejected(error.error.error));
        })
      );
    })
  );

  @Effect()
  uploadFormToDashboard$ = this.actions$.pipe(
    ofType(Action.UPLOAD_FORM_TO_DASHBOARD_START),
    switchMap((action: Action.UploadFormToDashboardStart) => {
      this.form = action.payload;

      return this.http.put(this.urlUpdateFormTodashboard(), this.dashboardFormData()).pipe(
        map((response) => {
          Utils.consoleLog('(FormTemplateEffects) Upload Form To Dashboard - Success: ', 'darkGoldenRod', response);
          return new Action.UploadFormToDashboardFulfilled();
        }),
        catchError((error: HttpErrorResponse) => {
          Utils.consoleLog('(FormTemplateEffects) Upload Form To Dashboard - Error: ', 'red', error);
          return of(new Action.UploadFormToDashboardRejected(error.error.error));
        })
      );
    })
  );

  @Effect()
  onUploadFormFulfilled$ = this.actions$.pipe(
    ofType(Action.UPLOAD_FORM_FULFILLED),
    map(() => {
      this.router.navigate(['app/forms']);
      return new Action.SetToDefault();
    })
  );

  @Effect()
  onUploadFormToDashboardFulfilled$ = this.actions$.pipe(
    ofType(Action.UPLOAD_FORM_TO_DASHBOARD_FULFILLED),
    map(() => {
      this.router.navigate(['app/dashboard']);
      return new Action.SetToDefault();
    })
  );

  urlUpdateForm() {
    // TODO Use Cloud function - Custom Claims - to add Community (Group) Code for each user
    // TODO Use the Store for getting the communityId userId and token.
    const communityId = 'ng68b';
    const userId = this.usersService.currentUser.uid;
    const formId = this.form.id;
    const token = this.authService.token;

    return Utils.firebaseUrl() + communityId + '/forms/' + userId + '/' + formId + '.json?auth=' + token;
  }

  urlUpdateFormTodashboard() {
    // TODO Use Cloud function - Custom Claims - to add Community (Group) Code for each user
    // TODO Use the Store for getting the communityId and token.
    const communityId = 'ng68b';
    const formId = this.form.id;
    const token = this.authService.token;

    return Utils.firebaseUrl() + communityId + '/dashboard/forms/' + formId + '.json?auth=' + token;
  }

  // TODO Should be in service or should stay here ?
  formData(): IFormTemplate {
    const { uploading, uploadFulfilled, uploadRejected, uploadErr, isPreviewMode,  ...formData } = this.form;

    return formData;
  }

  // TODO Should be in service or should stay here ?
  dashboardFormData(): IDashboardItem {
    // TODO Use the Store for getting the userId.
    return {
      author: this.usersService.currentUser.uid,
      id: this.form.id,
      img: '',
      publishedDate: this.form.date,
      title: this.form.title.value
    };
  }

}
