import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { IAuthentErr } from './../../common/interfaces';
import * as firebase from 'firebase/app';
import * as Action from '../actions/authent.action';
import * as Utils from '../../common/utils';


@Injectable()
export class AuthentEffects {

  private email: string;
  private password: string;

  constructor(
    private actions$: Actions,
    private router: Router
  ) { }

  @Effect()
  signUp$ = this.actions$.pipe(
    ofType(Action.SIGNUP_START),
    switchMap((action: Action.SignUpStart) => {
      this.email = action.payload.email;
      this.password = action.payload.password;

      return from(this.signUpFirebaseUser()).pipe(
        map((response) => {
          Utils.consoleLog('(AuthentEffects) Sign Up  - Response: ', 'darkGoldenRod', response);
          return this.handleAuthentSuccsess(false);
        }),
        catchError((error: IAuthentErr) => {
          Utils.consoleLog('(AuthentEffects) Sign Up - Error: ', 'red', error);
          return this.handleAuthentError(error);
        })
      );
    })
  );

  @Effect()
  signIn$ = this.actions$.pipe(
    ofType(Action.SIGNIN_START),
    switchMap((action: Action.SignInStart) => {
      this.email = action.payload.email;
      this.password = action.payload.password;

      return from(this.signInFirebaseUser()).pipe(
        map((response) => {
          Utils.consoleLog('(AuthentEffects) Sign In  - Response: ', 'darkGoldenRod', response);
          return this.handleAuthentSuccsess(true);
        }),
        catchError((error) => {
          Utils.consoleLog(`(AuthentEffects) Sign In - Error: `, 'red', error);
          return this.handleAuthentError(error);
        })
      );
    })
  );

  @Effect()
  fetchToken$ = this.actions$.pipe(
    ofType(Action.AUTHENT_FULFILLED),
    map((action: Action.AuthentFulfilled) => new Action.FetchTokenStart(action.payload.isSignIn)),
    switchMap((action) => {
      return from(this.getSignedUserToken()).pipe(
        map((token) => {
          Utils.consoleLog('(AuthentEffects) Fetch Token - Seccess! ', 'darkGoldenRod');
          return new Action.FetchTokenFulfilled({ token, isSignIn: action.payload});
        }),
        catchError((error) => {
          Utils.consoleLog('(AuthentEffects) Fetch Token - Error: ', 'red', error);
          return of(new Action.FetchTokenRejected(error.message));
        })
      );
    })
  );

  @Effect({ dispatch: false }) // Informing 'ngrx effects' this one will not dispatch an action.
  navigateOnAuthentSuccess$ = this.actions$.pipe(
    ofType(Action.FETCH_TOKEN_FULFILLED),
    tap((action: Action.FetchTokenFulfilled) => {
      if (action.payload.isSignIn) {
        this.router.navigate(['app/home']);
      } else {
        this.router.navigate(['question']);
      }
    })
  );

  @Effect()
  logOut$ = this.actions$.pipe(
    ofType(Action.LOG_OUT_START),
    switchMap(() => {
      return from(this.signOutFirebaseUser()).pipe(
        map(() => {
          Utils.consoleLog('(AuthentEffects) Log Out - Succsess: ', 'darkGoldenRod');
          return new Action.LogOutFulfilled();
        }),
        catchError((error: IAuthentErr) => {
          Utils.consoleLog('(AuthentEffects) Log Out - Error: ', 'red', error);
          return of(new Action.AuthentRejected(error.message));
        })
      );
    })
  );


  // https://firebase.google.com/docs/auth/web/password-auth
  signUpFirebaseUser() {
    return firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
  }

  signInFirebaseUser() {
    return firebase.auth().signInWithEmailAndPassword(this.email, this.password);
  }

  signOutFirebaseUser() {
    return firebase.auth().signOut();
  }

  // Gets a JWT token used to identify the user to a Firebase service.
  getSignedUserToken() {
    return firebase.auth().currentUser.getIdToken();
  }

  // TODO Include firebaseSetPersistence
  // https://firebase.google.com/docs/auth/web/auth-state-persistence


  handleAuthentSuccsess(isSignIn: boolean) {
    const uid = firebase.auth().currentUser.uid;
    const email = firebase.auth().currentUser.email;

    return new Action.AuthentFulfilled({ uid, email, isSignIn });
  }

  handleAuthentError(error: IAuthentErr) {
    return of(new Action.AuthentRejected(error.message));
  }

}
