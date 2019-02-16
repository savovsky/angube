import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class AuthService {
    token: string;

    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(
            (err) => console.log(err)
        );
    }

    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                (responce) => {
                    console.log(responce);
                    firebase.auth().currentUser.getIdToken()
                        .then((token: string) => {
                            this.token = token;
                        });
                }
            )
            .catch((err) => console.log(err));
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then((token: string) => {
                this.token = token;
            });
        return this.token;
    }

    isAuthenticated() {
        // console.log('isToken', this.token !== null)
        return this.token !== null;
    }

}
