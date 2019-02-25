import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
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

    // storeItems() {
    //     const token = this.authService.getToken();
    //     const item: {}[] = [
    //         {id: 1, title: 'item1'},
    //         {id: 2, title: 'item2'}
    //     ];

    //     return this.http.put(this.url + token, item);
    // }

    getItems() {
        const token = this.authService.getToken();
        console.log('getItems, token ', token);
        return this.http.get(this.url + '.json?auth=' + token)
        .pipe(
            map((data: []) => {
                return Object.values(data);
                }
            )
        );
    }

    getCurrentUser() {
        const token = this.authService.getToken();
        const uid = this.authService.uid;

        return this.http.get(this.url + uid + '.json?auth=' + token);
    }

    updateUserAccount(user: { uid: string, userName: string, firstName: string, lastName: string }, isNewUser: boolean) {
        const token = this.authService.getToken();
        const uid = this.authService.uid;

        this.http.put(this.url + uid + '.json?auth=' + token, user)
            .subscribe(
                (res: {userName: string}) => {
                console.log('updateUserAccount response: ', res);
                if (res.userName) {
                    firebase.auth().currentUser.updateProfile({
                    displayName: user.userName,
                    photoURL: null
                    })
                    .then(() => {
                        console.log('updateProfile->currentUser.displayName: ', firebase.auth().currentUser.displayName);
                        isNewUser ? this.router.navigate(['question']) : this.router.navigate(['home']);
                    })
                    .catch(
                        (err) => {
                            console.log('updateUserAccount error: ', err);
                        }
                    );
                }
                }
            );
    }
}
