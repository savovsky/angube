import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    currentUser: any;

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
                    return this.getCurrentUserToken();
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
                    return this.getCurrentUserToken();
                }
            )
            .then(
                (token: string) => {
                    Utils.consoleLog(`signInUser-getIdToken: Seccess`, 'limegreen');
                    this.token = token;
                    this.router.navigate(['home']);
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

    getToken() {
        return this.token;
    }

    getCurrentUserName() {
        if (this.getCurrentUser()) {
            const currentUserName = this.getCurrentUserDisplayName();
            return currentUserName ? currentUserName : this.getCurrentUserEmailLocalPart();
        } else {
            return 'none';
        }
    }

    // getSignedInUser(user: any) {
    //     this.currentUser = user;
    // }

    eho() {
        // return firebase.auth().onAuthStateChanged((user) => {
        //       if (user) {
        //           console.log('user is ON', user);
        //         //   this.getSignedInUser(user);
        //         return user;
        //       } else {
        //         console.log('user is OFF');
        //       }
        //     });
        console.log('eho');
        const qq = Observable.create(obs => {
            firebase.auth().onAuthStateChanged(
                (user) => {
                    console.log('next');
                    obs.next(user);
                },
                (err) => {
                    console.log('error');
                    obs.error(err);
                },
                () => {
                    console.log('complete');
                    obs.complete();
                }
            );
        });
        console.log(qq);
        qq
            .subscribe(
                (res) => {
                    console.log('eho res = ', res);
                    this.currentUser = res;
                    this.getToken();
                },
                (err) => console.log('eho err = ', err),
                () => console.log('eho completed ')
            );
        return qq;
    }

    getCurrentUser() {
        return firebase.auth().currentUser;
    }

    getCurrentUserToken() {
        return this.getCurrentUser().getIdToken();
    }

    getCurrentUserUid() {
        return this.getCurrentUser().uid;
    }

    getCurrentUserDisplayName() {
        return this.getCurrentUser().displayName;
    }

    getCurrentUserEmail() {
        return this.getCurrentUser().email;
    }

    getCurrentUserEmailLocalPart() {
        const email = this.getCurrentUserEmail();
        return email.substring(0, email.lastIndexOf('@'));
    }

    isAuthenticated() {
        // console.log('isAuthenticated', this.token !== null); // TODO Memory leak ?
        return this.token !== null;
    }

    /**
     * https://firebase.google.com/docs/auth/web/manage-users
     */
    userAuthState(callback) {
        firebase.auth().onAuthStateChanged(
            (user) => {
                this.token = user.ra;
                callback(user);
            }
            // (user) => {
            // if (user) {
            //     Utils.consoleLog(`User ${user.displayName} is Signed In.`, 'blue', user);
            // } else {
            //     Utils.consoleLog(`No user is Signed In.`, 'blue');
            // }
            //   }
        );
    }

}
