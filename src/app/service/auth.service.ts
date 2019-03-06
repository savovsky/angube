import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer, ReplaySubject } from 'rxjs';
import { HttpResponseService } from './http-response.service';
import * as Utils from '../common/utils';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class AuthService {

    uid: string;
    email: string;
    password: string;
    token: string;
    userName: string;
    isUserAuthorized = false;
    name = new ReplaySubject(1);

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
                    this.uid = this.getCurrentUserUid();
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
                    this.uid = this.getCurrentUserUid();
                    this.name.next(firebase.auth().currentUser.displayName);
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
                    this.token = null;
                    this.uid = null;
                }
            )
            .catch(
                (error) => Utils.consoleLog(`logOutUser Error: `, 'red', error)
            );
    }


    getCurrentUserName() {
        if (this.getCurrentUser()) {
            const currentUserName = this.getCurrentUserDisplayName();
            return currentUserName ? currentUserName : this.getCurrentUserEmailLocalPart();
        } else {
            return 'none';
        }
    }


    getCurrentUser() {
        return firebase.auth().currentUser;
    }


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


    getCurrentUserUid() {
        return this.getCurrentUser().uid;
    }


    getCurrentUserDisplayName() {
        this.userName = this.getCurrentUser().displayName;
        return this.getCurrentUser().displayName;
    }


    getCurrentUserEmail() {
        return this.getCurrentUser().email;
    }


    getCurrentUserEmailLocalPart() {
        const email = this.getCurrentUserEmail();
        return email.substring(0, email.lastIndexOf('@'));
    }


    isUserAuthenticated() {
        // console.log('isUserAuthenticated', this.token !== null); // TODO Memory leak ?
        return this.token !== null;
    }


    getToken() {
        return this.token;
    }


    getUserName() {
        return this.userName;
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
