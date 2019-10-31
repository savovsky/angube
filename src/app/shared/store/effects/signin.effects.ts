import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import * as Action from '../actions/signin.action';
import * as Utils from '../../common/utils';


@Injectable()
export class SignInEffects {

  private email: string;
  private password: string;

  constructor(
    private actions$: Actions
  ) { }

  @Effect()
  signIn$ = this.actions$.pipe(
    ofType(Action.SIGNIN_START),
    switchMap((action: Action.SignInStart) => {
      this.email = action.payload.email;
      this.password = action.payload.password;

      return from(this.signInFirebaseUser()).pipe(
        map((response) => {
          Utils.consoleLog('(SignInEffects) Sign In  - Response: ', 'darkGoldenRod', response);
          const uid = firebase.auth().currentUser.uid;
          const email = firebase.auth().currentUser.email;

          return new Action.SignInFulfilled({ uid, email });
        }),
        catchError((error) => {
          Utils.consoleLog('(SignInEffects) Sign In - Error: ', 'red', error);
          return of(new Action.SignInRejected(error.message));
        })
      );
    })
  );

  @Effect()
  fetchToken$ = this.actions$.pipe(
    ofType(Action.SIGNIN_FULFILLED),
    map(() => new Action.FetchTokenStart()),
    switchMap(() => {
      return from(this.getSignedUserToken()).pipe(
        map((token) => {
          Utils.consoleLog('(SignInEffects) Fetch Token - Seccess! ', 'darkGoldenRod');
          return new Action.FetchTokenFulfilled(token);
        }),
        catchError((error) => {
          Utils.consoleLog('(SignInEffects) Fetch Token - Error: ', 'red', error);
          return of(new Action.FetchTokenRejected(error.message));
        })
      );
    })
  );


  // https://firebase.google.com/docs/auth/web/password-auth
  signInFirebaseUser() {
    return firebase.auth().signInWithEmailAndPassword(this.email, this.password);
  }

  // Gets a JWT token used to identify the user to a Firebase service.
  getSignedUserToken() {
    return firebase.auth().currentUser.getIdToken();
  }

  // TODO Include firebaseSetPersistence
  // https://firebase.google.com/docs/auth/web/auth-state-persistence

}
