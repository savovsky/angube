import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class AuthService {
    token: string;
    uid: string;


    constructor(private router: Router) { }

    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                (response) => {
                    console.log('signUpUser response', response);
                    this.router.navigate(['question']);
                    this.getCurrentUser().getIdToken()
                            .then((token: string) => {
                                this.token = token;
                                console.log('signUpUser, getIdToken', this.token);
                            });
                    this.uid = this.getCurrentUserUid();
                }
            )
            .catch(
                (err) => console.log(err)
            );
    }

    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                (response) => {
                    console.log('signInUser response', response);
                    this.router.navigate(['home']);
                    this.getCurrentUser().getIdToken()
                        .then((token: string) => {
                            this.token = token;
                            console.log('signInUser, getIdToken', this.token);
                        });
                }
            )
            .catch((err) => console.log('signInUser error', err));
    }

    logOutUser() {
        firebase.auth().signOut()
        .then(
            (response) => {
                console.log('logOutUser response', response);
                this.token = null;
                this.uid = null;
            }
        )
        .catch((err) => console.log('logOutUser error', err));
    }

    getToken() {
        this.getCurrentUser().getIdToken()
            .then((token: string) => {
                this.token = token;
                console.log('getToken', this.token);
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
