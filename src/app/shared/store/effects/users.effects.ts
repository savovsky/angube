import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { IUser } from './../../common/interfaces';
import { AuthService } from '../../services/auth.service';
import * as Action from '../actions/users.action';
import * as Utils from '../../common/utils';
import { UsersService } from '../../services/users.service';


@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  @Effect()
  fetchUsers$ = this.actions$.pipe(
    ofType(Action.FETCH_USERS_START),
    switchMap(() => {
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
    const communityId = 'ng68b';
    const token = this.authService.token;

    return Utils.firebaseUrl() + communityId + '/users/.json?auth=' + token;
  }

  transformResponce(response) {
    const userId = this.usersService.currentUser.uid;

    // Creating an array from response object values.
    const usersArr: IUser[] = Object.values(response);
    // Reordering the array - current user at index 0.
    const currentUserIndex = usersArr.findIndex((user: IUser) => user.uid === userId);
    usersArr.splice(0, 0, usersArr.splice(currentUserIndex, 1)[0]);

    return usersArr;
  }

}
