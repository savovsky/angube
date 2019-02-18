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
                const uid = firebase.auth().currentUser.uid;
                console.log('uid =', uid);
                this.uid = uid;
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
                    firebase.auth().currentUser.getIdToken()
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
            }
        )
        .catch((err) => console.log('logOutUser error', err));
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then((token: string) => {
                this.token = token;
                console.log('getToken', this.token);
            });
        return this.token;
    }


    isAuthenticated() {
        // console.log('isAuthenticated', this.token !== null); // TODO Memory leak ?
        return this.token !== null;
    }

}
