import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { HttpResponseService } from './http-response.service';
import * as Utils from '../common/utils';
import * as firebase from 'firebase/app';
import 'firebase/auth';


// https://firebase.google.com/docs/reference/js/firebase.User#providerId

@Injectable()
export class AuthService {

    uid: string;
    userName: string;
    email: string;
    password: string;
    token: string;

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
                    this.currentUserUid(firebase.auth().currentUser.uid);
                    this.userName = this.getCurrentUserEmailLocalPart();
                    return this.getSignedUserToken();
                }
            )
            .then(
                (token: string) => {
                    Utils.consoleLog(`signUpUser-getIdToken: Seccess`, 'green');
                    this.currentUserToken(token);
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
                    this.currentUserUid(firebase.auth().currentUser.uid);
                    return this.getSignedUserToken();
                }
            )
            .then(
                (token: string) => {
                    Utils.consoleLog(`signInUser-getIdToken: Seccess`, 'limegreen');
                    this.currentUserToken(token);
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


    getCurrentUserEmailLocalPart() {
        return this.email.substring(0, this.email.lastIndexOf('@'));
    }


    /**
     * Returns a JWT token used to identify the user to a Firebase service.
     */
    getSignedUserToken() {
        return firebase.auth().currentUser.getIdToken();
    }


    currentUserToken(token: string) {
        this.token = token;
    }


    currentUserUid(uid: string) {
        this.uid = uid;
    }

    currentUserName(name: string) {
        this.userName = name;
    }

    currentUserEmail(email: string) {
        this.email = email;
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


// UPDATE USER PROFILE

// if (response.userName) {
//     firebase.auth().currentUser.updateProfile({
//         displayName: user.userName,
//         photoURL: null
//     })
//     .then(() => {
//         Utils.consoleLog(`updateProfile->currentUser.displayName: `, 'purple', firebase.auth().currentUser.displayName);
//     })
//     .catch(
//         (error) => Utils.consoleLog(`updateUserAccount Error: `, 'red', error)
//     );
// }
