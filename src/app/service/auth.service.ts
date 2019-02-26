import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpResponseService } from './http-response.service';
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
                console.log('signUpUser-signUpFirebaseUser Response: ', response);
                this.uid = this.getCurrentUserUid();
                return this.getCurrentUserToken();
            }
          )
          .then(
            (token: string) => {
                console.log('signUpUser-getIdToken: Seccess');
                this.token = token;
                this.httpResponseService.signUpUserSuccess.next();
                return this.firebaseSetPersistence();
            }
          )
          .catch(
            (error) => {
                console.log('signUpUser Error: ', error);
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
                console.log('signInUser-signInFirebaseUser Response: ', response);
                this.uid = this.getCurrentUserUid();
                return this.getCurrentUserToken();
            }
          )
          .then(
            (token: string) => {
                console.log('signInUser-getIdToken: Seccess');
                this.token = token;
                this.router.navigate(['home']);
                return this.firebaseSetPersistence();
            }
          )
          .catch(
            (error) => {
                console.log('signInUser Error: ', error);
                this.httpResponseService.signInUserError.next(error);
            }
          );
    }

    /**
     * https://firebase.google.com/docs/auth/web/auth-state-persistence
     */
    firebaseSetPersistence() {
       firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
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
                (response) => {
                    console.log('logOutUser Response', response);
                    this.token = null;
                    this.uid = null;
                }
            )
            .catch((err) => console.log('logOutUser Error', err));
    }

    getToken() {
        if (this.getCurrentUser()) {
            this.getCurrentUser().getIdToken()
            .then((token: string) => {
                this.token = token;
                // sessionStorage.setItem('angube_token', token);
                console.log('getToken', this.token);
            });

        return this.token;
        } else if (this.currentUser) {
            const token = this.currentUser.ra;
            return token;
        }
        return;

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
    userAuthState() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(`%cuser ${user.displayName} is Signed In.`, 'color: blue');
            } else {
                console.log(`%cNo user is Signed In.`, 'color: blue');
            }
          });
    }

}
