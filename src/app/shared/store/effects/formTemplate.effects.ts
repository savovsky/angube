import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { IFormTemplate } from './../../common/interfaces';
import * as Action from '../actions/formTemplate.action';
import * as Utils from '../../common/utils';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';


@Injectable()
export class FormTemplateEffects {

  form: IFormTemplate;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router
  ) { }

  @Effect()
  formUpload$ = this.actions$.pipe(
    ofType(Action.UPLOAD_START),
    switchMap((action: Action.UploadStart) => {
      this.form = action.payload;

      return this.http.put(this.urlUpdateForm(), this.form).pipe(
        map((response) => {
          Utils.consoleLog('(FormTemplateEffects) Upload Form - Success: ', 'darkGoldenRod', response);
          return new Action.UploadFulfilled();
        }),
        catchError((error: HttpErrorResponse) => {
          Utils.consoleLog('(FormTemplateEffects) Upload Form - Error: ', 'red', error);
          return of(new Action.UploadRejected(error.error.error));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  navigateOnFormUploadSuccess$ = this.actions$.pipe(
    ofType(Action.UPLOAD_FULFILLED),
    tap(() => {
      this.router.navigate(['app/forms']);
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

}
