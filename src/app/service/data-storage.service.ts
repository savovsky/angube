import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';


@Injectable()
export class DataStorageService {

    private url = 'https://angube-92c87.firebaseio.com/users/';

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private router: Router
    ) { }

    storeItems() {
        const token = this.authService.getToken();
        const item: {}[] = [
            {id: 1, title: 'item1'},
            {id: 2, title: 'item2'}
        ];

        return this.http.put(this.url + token, item);
    }

    getItems() {
        const token = this.authService.getToken();
        return this.http.get(this.url + token);
    }

    addUser(user: {}) {
        const token = this.authService.getToken();
        const uid = this.authService.uid;

        return this.http.put(this.url + uid + '.json?auth=' + token, user);
    }

    addNewUser(user: { userName: string, firstName: string, lastName: string }) {
        const token = this.authService.getToken();
        const uid = this.authService.uid;

        this.http.put(this.url + uid + '.json?auth=' + token, user)
            .subscribe(
                (response: {userName: string}) => {
                console.log('addNewUser response: ', response);
                if (response.userName) {
                    firebase.auth().currentUser.updateProfile({
                    displayName: user.userName,
                    photoURL: null
                    })
                    .then(() => {
                        console.log('updateProfile->currentUser.displayName: ', firebase.auth().currentUser.displayName);
                        this.router.navigate(['home']);
                    })
                    .catch(
                        (err) => {
                            console.log('addNewUser error: ', err);
                        }
                    );
                }
                }
            );
    }
}
