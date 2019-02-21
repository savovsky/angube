import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { HttpResponseService } from './http-response.service';

@Injectable()
export class AuthService {

    token: string;
    uid: string;

    constructor(
        private router: Router,
        private httpResponseService: HttpResponseService
    ) { }

    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                (res) => {
                    console.log('signUpUser Response: ', res);
                    this.uid = this.getCurrentUserUid();
                    this.getCurrentUser().getIdToken()
                            .then(
                                (token: string) => {
                                    // console.log('signUpUser, getIdToken', this.token);
                                    console.log('signUpUser, getIdToken');
                                    this.token = token;
                                    this.httpResponseService.signUpUserSuccess.next();
                                }
                            )
                            .catch(
                                (err) => {
                                    console.log('signUpUser, getIdToken Error: ', err);
                                }
                            );
                }
            )
            .catch(
                (err) => {
                    console.log('signUpUser Error: ', err);
                    this.httpResponseService.signUpUserError.next(err);
                }
            );
    }

    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                (res) => {
                    console.log('signInUser response', res);
                    this.router.navigate(['home']);
                    this.uid = this.getCurrentUserUid();
                    this.getCurrentUser().getIdToken()
                        .then(
                            (token: string) => {
                                this.token = token;
                                console.log('signInUser, getIdToken');
                                // console.log('signInUser, getIdToken', this.token);
                            }
                        )
                        .catch(
                            (err) => {
                                console.log('signInUser, getIdToken Error: ', err);
                            }
                        );
                }
            )
            .catch(
                (err) => {
                    console.log('signInUser Error', err);
                    this.httpResponseService.signInUserError.next(err);
                }
            );
    }

    logOutUser() {
        firebase.auth().signOut()
        .then(
            (response) => {
                console.log('logOutUser Response', response);
                this.token = null;
                this.uid = null;
            }
        )
        .catch((err) => console.log('logOutUser Error', err));
    }

    getToken() {
        this.getCurrentUser().getIdToken()
            .then((token: string) => {
                this.token = token;
                console.log('getToken');
                // console.log('getToken', this.token);
            });
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

    getCurrentUser() {
        return firebase.auth().currentUser;
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

}
