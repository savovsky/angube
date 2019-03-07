import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import * as Utils from '../common/utils';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { map } from 'rxjs/operators';


@Injectable()
export class DataStorageService {

    private url = 'https://angube-92c87.firebaseio.com/users/';
    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private router: Router
    ) { }


    getItems() {
        const token = this.authService.token;
        return this.http.get(this.url + '.json?auth=' + token)
        .pipe(
            map((data: []) => {
                return Object.values(data);
                }
            )
        );
    }


    getCurrentUser() {
        const token = this.authService.token;
        const uid = this.authService.uid;

        return this.http.get(this.url + uid + '.json?auth=' + token);
    }


    updateUserAccount(user: { uid: string, userName: string, firstName: string, lastName: string }, isNewUser: boolean) {
        const token = this.authService.token;
        const uid = this.authService.uid;

        this.http.put(this.url + uid + '.json?auth=' + token, user)
            .subscribe(
                (response: {userName: string}) => {
                Utils.consoleLog(`updateUserAccount Response: `, 'purple', response);
                if (response.userName) {
                    firebase.auth().currentUser.updateProfile({
                        displayName: user.userName,
                        photoURL: null
                    })
                    .then(() => {
                        Utils.consoleLog(`updateProfile->currentUser.displayName: `, 'purple', firebase.auth().currentUser.displayName);
                        this.authService.currentUserDisplayName(firebase.auth().currentUser.displayName);
                        isNewUser ? this.router.navigate(['question']) : this.router.navigate(['app/home']);
                    })
                    .catch(
                        (error) => Utils.consoleLog(`updateUserAccount Error: `, 'red', error)
                    );
                }
                }
            );
    }

}
