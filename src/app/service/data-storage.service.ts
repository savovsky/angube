import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import * as Utils from '../common/utils';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/interfaces';
import { Location } from '@angular/common';
import { UsersService } from './users.service';


@Injectable()
export class DataStorageService {

    private url = 'https://angube-92c87.firebaseio.com/users/';

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private router: Router,
        private location: Location,
        private usersService: UsersService,
        ) { }

    getItems() {
        const uid = this.authService.uid;
        const token = this.authService.token;

        return this.http.get(this.url + '.json?auth=' + token)
            .pipe(
                map((data: []) => {
                    // creating an array from response object values
                    const usersArr = Object.values(data);
                    // reordering the array - current user as first item
                    const currentUserIndex = usersArr.findIndex((user: User) => user.uid === uid);
                    usersArr.splice(0, 0, usersArr.splice(currentUserIndex, 1)[0]);
                    return usersArr;
                    }
                )
            );
    }


    getUserData(uid: string) {
        const token = this.authService.token;

        return this.http.get(this.url + uid + '.json?auth=' + token);
    }


    updateUserAccount(user: User, isNewUser: boolean) {
        const token = this.authService.token;

        this.http.put(this.url + user.uid + '.json?auth=' + token, user)
            .subscribe(
                (response: User) => {
                    Utils.consoleLog(`updateUserAccount Response: `, 'purple', response);
                    if (response.uid === this.authService.uid) {
                        this.authService.currentUserName(response.userName);
                    }
                    if (isNewUser) {
                        this.router.navigate(['question']);
                    } else {
                        this.usersService.updateCurrentUser(response);
                        if (this.router.url === '/app/users') {
                            return;
                        }
                        this.location.back();
                    }

                },
                (error) => Utils.consoleLog(`updateUserAccount Error: `, 'red', error)
            );
    }

}
