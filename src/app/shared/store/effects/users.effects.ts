import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { IAppStore, IUser } from './../../common/interfaces';
import * as Action from '../actions/users.action';
import * as Utils from '../../common/utils';


@Injectable()
export class UsersEffects {

  private communityId: string;
  private userId: string;
  private token: string;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store$: Store<IAppStore>
  ) { }

  @Effect()
  fetchUsers$ = this.actions$.pipe(
    ofType(Action.FETCH_USERS_START),
    withLatestFrom(this.store$),
    switchMap(([, store]: [Action.FetchUsersStart, IAppStore]) => {
      this.communityId = store.authent.communityId;
      this.userId = store.authent.uid;
      this.token = store.authent.token;

      return this.http.get(this.urlUsers()).pipe(
        map((response) => {
          Utils.consoleLog('(UsersEffects) Get Users - Success: ', 'darkGoldenRod', response);
          return new Action.FetchUsersFulfilled(this.transformResponce(response));
        }),
        catchError((error: HttpErrorResponse) => {
          Utils.consoleLog('(UsersEffects) Get Users - Error: ', 'red', error);
          return of(new Action.FetchUsersRejected(error.error.error));
        })
      );
    })
  );

  urlUsers() {
    return Utils.firebaseUrl() + this.communityId + '/users/.json?auth=' + this.token;
  }

  transformResponce(response) {
    // Creating an array from response object values.
    const usersArr: IUser[] = Object.values(response);
    // Reordering the array - current user at index 0.
    const currentUserIndex = usersArr.findIndex((user: IUser) => user.uid === this.userId);
    usersArr.splice(0, 0, usersArr.splice(currentUserIndex, 1)[0]);

    return usersArr;
  }

}
