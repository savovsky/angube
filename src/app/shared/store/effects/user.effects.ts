import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { IAppStore, IUser } from '../../common/interfaces';
import * as Action from '../actions/user.action';
import * as Utils from '../../common/utils';


@Injectable()
export class UserEffects {

  private communityId: string;
  private userId: string;
  private token: string;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store$: Store<IAppStore>
  ) { }

  @Effect()
  fetchUser$ = this.actions$.pipe(
    ofType(Action.FETCH_USER_START),
    withLatestFrom(this.store$),
    switchMap(([action, store]: [Action.FetchUserStart, IAppStore]) => {
      this.communityId = action.payload.communityId;
      this.userId = action.payload.userId;
      this.token = store.authent.token;

      return this.http.get(this.urlUser()).pipe(
        map((response: IUser) => {
          if (response) {
            Utils.consoleLog('(UserEffects) Get User - Success: ', 'darkGoldenRod', response);
            return new Action.FetchUserFulfilled(response);
          } else {
            Utils.consoleLog(`(UserEffects) Get User - Seccess but NULL: `, 'pink', response);
            // This is the case when user is authenticated, but
            // there is no user's data in Data Storage for this user.(deleted)
            // TODO Error Screen - Max lecture 249.
          }
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
    withLatestFrom(this.store$),
    switchMap(([action, store]: [Action.UpdateUserStart, IAppStore]) => {
      const user = action.payload;

      this.communityId = action.payload.communityId;
      this.userId = action.payload.uid;
      this.token = store.authent.token;

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
    withLatestFrom(this.store$),
    switchMap(([action, store]: [Action.DeleteUserStart, IAppStore]) => {
      this.communityId = action.payload.communityId;
      this.userId = action.payload.userId;
      this.token = store.authent.token;

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
    return Utils.firebaseUrl() + this.communityId + '/users/' + this.userId + '.json?auth=' + this.token;
  }

}

// REMIND https://medium.com/@viestursv/how-to-get-store-state-in-ngrx-effect-fab9e9c8f087
// REMIND https://blog.angularindepth.com/ngrx-tips-tricks-69feb20a42a7
