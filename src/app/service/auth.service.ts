import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Observer, Subject } from 'rxjs';
import { UsersService } from './users.service';
import { User, SignError } from '../interfaces/interfaces';
import * as Utils from '../common/utils';
import * as firebase from 'firebase/app';
import 'firebase/auth';


// https://firebase.google.com/docs/reference/js/firebase.User#providerId

@Injectable()
export class AuthService {

    uid: string;
    token: string;
    signUpSuccess = new Subject<User>();
    signUpError = new Subject<SignError>();
    signInError = new Subject<SignError>();
    private email: string;
    private password: string;

    constructor(
        private router: Router,
        private usersService: UsersService
    ) { }

    signUpUser(email: string, password: string) {
        this.email = email;
        this.password = password;
        this.signUpFirebaseUser()
            .then(
                (response) => {
                    Utils.consoleLog(`signUpUser-signUpFirebaseUser Response: `, 'green', response);
                    this.currentUserUid(firebase.auth().currentUser.uid);
                    this.currentUserEmail(firebase.auth().currentUser.email);
                    return this.getSignedUserToken();
                }
            )
            .then(
                (token: string) => {
                    Utils.consoleLog(`signUpUser-getIdToken: Seccess`, 'green');
                    this.currentUserToken(token);
                    this.signUpSuccess.next({
                        ...this.usersService.currentUser,
                        uid: this.uid,
                        userName: this.getCurrentUserEmailLocalPart(),
                        email: this.email
                    });
                    return this.firebaseSetPersistence();
                }
            )
            .catch(
                (error) => {
                    Utils.consoleLog(`signUpUser Error: `, 'red', error);
                    this.signUpError.next(error);
                }
            );
    }

    signInUser(email: string, password: string) {
        this.email = email;
        this.password = password;
        this.signInFirebaseUser()
            .then(
                (response) => {
                    Utils.consoleLog(`signInUser-signInFirebaseUser Response: `, 'lime', response);
                    this.currentUserUid(firebase.auth().currentUser.uid);
                    this.currentUserEmail(firebase.auth().currentUser.email);
                    return this.getSignedUserToken();
                }
            )
            .then(
                (token: string) => {
                    Utils.consoleLog(`signInUser-getIdToken: Seccess`, 'lime');
                    this.currentUserToken(token);
                    this.router.navigate(['app/home']);
                    return this.firebaseSetPersistence();
                }
            )
            .catch(
                (error) => {
                    Utils.consoleLog(`signInUser Error: `, 'red', error);
                    this.signInError.next(error);
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
    logOut() {
        firebase.auth().signOut()
            .then(
                () => {
                    Utils.consoleLog(`logOut: Seccess`, 'purple');
                    this.usersService.setToDefaultUser();
                    this.uid = null;
                    this.token = null;
                    this.email = null;
                    this.password = null;
                }
            )
            .catch(
                (error) => Utils.consoleLog(`logOut Error: `, 'red', error)
            );
    }

    /**
     * Extract and return email lolcal part,
     * e.g. name@abc.com -> return 'name'.
     */
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

    currentUserEmail(email: string) {
        this.email = email;
    }

    /**
     * https://firebase.google.com/docs/auth/web/manage-users
     */
    userAuthState() {
        return Observable.create((observer: Observer<any>) => {
            firebase.auth().onAuthStateChanged(
                (user) => observer.next(user),
                (err) => observer.error(err),
                () => observer.complete()
            );
        });
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
