import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer, ReplaySubject } from 'rxjs';
import { HttpResponseService } from './http-response.service';
import * as Utils from '../common/utils';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { CurrentUser } from '../interfaces/interfaces';

// https://firebase.google.com/docs/reference/js/firebase.User#providerId

@Injectable()
export class AuthService {

    currentUser: CurrentUser;
    uid: string;
    email: string;
    password: string;
    token: string;
    userName: string;


    constructor(
        private router: Router,
        private httpResponseService: HttpResponseService
    ) { }

    signUpUser(email: string, password: string) {
        this.email = email;
        this.password = password;
        this.signUpFirebaseUser()
            .then(
                (response) => {
                    Utils.consoleLog(`signUpUser-signUpFirebaseUser Response: `, 'green', response);
                    this.getCurrentUser();
                    return this.getSignedUserToken();
                }
            )
            .then(
                (token: string) => {
                    Utils.consoleLog(`signUpUser-getIdToken: Seccess`, 'green');
                    this.token = token;
                    this.httpResponseService.signUpUserSuccess.next();
                    return this.firebaseSetPersistence();
                }
            )
            .catch(
                (error) => {
                    Utils.consoleLog(`signUpUser Error: `, 'red', error);
                    this.httpResponseService.signUpUserError.next(error);
                }
            );
    }

    signInUser(email: string, password: string) {
        this.email = email;
        this.password = password;
        this.signInFirebaseUser()
            .then(
                (response) => {
                    Utils.consoleLog(`signInUser-signInFirebaseUser Response: `, 'limegreen', response);
                    this.getCurrentUser();
                    return this.getSignedUserToken();
                }
            )
            .then(
                (token: string) => {
                    Utils.consoleLog(`signInUser-getIdToken: Seccess`, 'limegreen');
                    this.token = token;
                    this.router.navigate(['app/home']);
                    return this.firebaseSetPersistence();
                }
            )
            .catch(
                (error) => {
                    Utils.consoleLog(`signInUser Error: `, 'red', error);
                    this.httpResponseService.signInUserError.next(error);
                }
            );
    }


    /**
     * https://firebase.google.com/docs/auth/web/auth-state-persistence
     */
    firebaseSetPersistence() {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    }


    /**
     * https://firebase.google.com/docs/auth/web/password-auth
     */
    signUpFirebaseUser() {
        return firebase.auth().createUserWithEmailAndPassword(this.email, this.password);
    }


    /**
     * https://firebase.google.com/docs/auth/web/password-auth
     */
    signInFirebaseUser() {
        return firebase.auth().signInWithEmailAndPassword(this.email, this.password);
    }


    /**
     * https://firebase.google.com/docs/auth/web/password-auth
     */
    logOutUser() {
        firebase.auth().signOut()
            .then(
                () => {
                    Utils.consoleLog(`logOutUser: Seccess`, 'purple');
                    this.currentUser = null;
                    this.uid = null;
                    this.email = null;
                    this.password = null;
                    this.token = null;
                    this.userName = null;
                }
            )
            .catch(
                (error) => Utils.consoleLog(`logOutUser Error: `, 'red', error)
            );
    }

    getCurrentUser() {
        this.currentUser = firebase.auth().currentUser;
        this.uid = this.currentUser.uid;
        this.email = this.currentUser.email;
        this.userName = this.getCurrentUserName();
        return firebase.auth().currentUser;
    }


    getCurrentUserName() {
        if (this.currentUser) {
            return this.currentUser.displayName ?
                this.currentUser.displayName : this.getCurrentUserEmailLocalPart();
        } else {
            return 'none';
        }
    }


    getCurrentUserEmailLocalPart() {
        return this.email.substring(0, this.email.lastIndexOf('@'));
    }


    /**
     * Returns a JWT token used to identify the user to a Firebase service.
     */
    getSignedUserToken() {
        return this.getCurrentUser().getIdToken();
    }


    currentUserToken(token: string) {
        this.token = token;
    }


    currentUserUid(uid: string) {
        this.uid = uid;
    }

    currentUserDisplayName(displayName: string) {
        this.userName = displayName;
    }



    /**
     * https://firebase.google.com/docs/auth/web/manage-users
     */
    userAuthState() {
        const authState = Observable.create((observer: Observer<any>) => {
            firebase.auth().onAuthStateChanged(
                (user) => observer.next(user),
                (err) => observer.error(err),
                () => observer.complete()
            );
        });
        return authState;
    }
}
