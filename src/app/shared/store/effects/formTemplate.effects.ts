import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { IFormTemplate, IDashboardItem, IFormStore, IAppStore } from './../../common/interfaces';
import * as Action from '../actions/formTemplate.action';
import * as Utils from '../../common/utils';


@Injectable()
export class FormTemplateEffects {

  private form: IFormStore;
  private communityId: string;
  private userId: string;
  private token: string;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private store$: Store<IAppStore>
  ) { }

  @Effect()
  uploadForm$ = this.actions$.pipe(
    ofType(Action.UPLOAD_FORM_START),
    withLatestFrom(this.store$),
    switchMap(([action, store]: [Action.UploadFormStart, IAppStore]) => {
      this.form = action.payload;
      this.communityId = store.authent.communityId;
      this.userId = store.authent.uid;
      this.token = store.authent.token;

      return this.http.put(this.urlForm(), this.formData()).pipe(
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
    withLatestFrom(this.store$),
    switchMap(([action, store]: [Action.UploadFormToDashboardStart, IAppStore]) => {
      this.form = action.payload;
      this.communityId = store.authent.communityId;
      this.userId = store.authent.uid;
      this.token = store.authent.token;

      return this.http.put(this.urlDashboardForm(), this.dashboardFormData()).pipe(
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

  urlForm() {
    return Utils.firebaseUrl() + this.communityId + '/forms/' + this.userId + '/' + this.form.id + '.json?auth=' + this.token;
  }

  urlDashboardForm() {
    return Utils.firebaseUrl() + this.communityId + '/dashboard/forms/' + this.form.id + '.json?auth=' + this.token;
  }

  // TODO Should be in service or should stay here ?
  formData(): IFormTemplate {
    // Removing the first 5 items from object 'form' and the rest items are going into 'formData'.
    const { uploading, uploadFulfilled, uploadRejected, uploadErr, isPreviewMode, ...formData } = this.form;

    return formData;
  }

  // TODO Should be in service or should stay here ?
  dashboardFormData(): IDashboardItem {
    return {
      author: this.userId,
      id: this.form.id,
      img: '',
      publishedDate: this.form.date,
      title: this.form.title.value
    };
  }

}
