import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { IUser } from '../../common/interfaces';
import { AuthService } from '../../services/auth.service';
import * as Action from '../actions/user.action';
import * as Utils from '../../common/utils';


@Injectable()
export class UserEffects {

  private communityId: string;
  private userId: string;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService
  ) { }

  @Effect()
  fetchUser$ = this.actions$.pipe(
    ofType(Action.FETCH_USER_START),
    switchMap((action: Action.FetchUserStart) => {
      this.userId = action.payload.userId;
      this.communityId = action.payload.communityId;

      return this.http.get(this.urlUser()).pipe(
        map((response: IUser) => {
          Utils.consoleLog('(UserEffects) Get User - Success: ', 'darkGoldenRod', response);
          return new Action.FetchUserFulfilled(response);
        }),
        catchError((error: HttpErrorResponse) => {
          Utils.consoleLog('(UserEffects) Get User - Error: ', 'red', error);
          return of(new Action.FetchUserRejected(error.error.error));
        })
      );
    })
  );

  @Effect()
  updateUser$ = this.actions$.pipe(
    ofType(Action.UPDATE_USER_START),
    switchMap((action: Action.UpdateUserStart) => {
      this.communityId = action.payload.communityId;
      this.userId = action.payload.uid;
      const user = action.payload;

      return this.http.put(this.urlUser(), user).pipe(
        map((response) => {
          Utils.consoleLog('(UserEffects) Update User - Success: ', 'darkGoldenRod', response);
          return new Action.UpdateUserFulfilled();
        }),
        catchError((error: HttpErrorResponse) => {
          Utils.consoleLog('(UserEffects) Update User - Error: ', 'red', error);
          return of(new Action.UpdateUserRejected(error.error.error));
        })
      );
    })
  );

  @Effect()
  deleteUser$ = this.actions$.pipe(
    ofType(Action.DELETE_USER_START),
    switchMap((action: Action.DeleteUserStart) => {
      this.userId = action.payload.userId;
      this.communityId = action.payload.communityId;

      return this.http.delete(this.urlUser()).pipe(
        map((response) => {
          Utils.consoleLog('(UserEffects) Delete User - Success: ', 'darkGoldenRod', response);
          return new Action.DeleteUserFulfilled();
        }),
        catchError((error: HttpErrorResponse) => {
          Utils.consoleLog('(UserEffects) Delete User - Error: ', 'red', error);
          return of(new Action.DeleteUserRejected(error.error.error));
        })
      );
    })
  );

  urlUser() {
    const token = this.authService.token;

    return Utils.firebaseUrl() + this.communityId + '/users/' + this.userId + '.json?auth=' + token;
  }

}
