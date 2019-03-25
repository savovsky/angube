import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/interfaces';
import * as Utils from '../common/utils';


@Injectable()
export class DataStorageService {

    private url = 'https://angube-92c87.firebaseio.com/users/';

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private router: Router,
        private location: Location,
        private usersService: UsersService
        ) { }

    getUserData(uid: string) {
        const token = this.authService.token;

        return this.http.get(this.url + uid + '.json?auth=' + token);
    }


    updateUserAccount(user: User, isNewUser: boolean) {
        const token = this.authService.token;
        const currentUserUid = this.authService.uid;

        this.http.put(this.url + user.uid + '.json?auth=' + token, user)
            .subscribe(
                (response: User) => {
                    if (response.uid === currentUserUid) {
                        this.usersService.updateCurrentUser(response);
                        Utils.consoleLog(`(DataStorageService) Update current user account  - Response: `, 'darkGoldenRod', response);
                    } else {
                        this.usersService.updateUser(response);
                        Utils.consoleLog(`(DataStorageService) Update user account  - Response: `, 'darkGoldenRod', response);
                    }

                    // Refactor - not working properly.
                    if (isNewUser) {
                        this.router.navigate(['question']);
                    } else {
                        if (this.router.url === '/app/users') {
                            return;
                        }
                        this.location.back();
                    }

                },
                (error) => Utils.consoleLog(`(DataStorageService) Update user account - Error: `, 'red', error)
            );
    }

    getAllUsersData() {
        const uid = this.authService.uid;
        const token = this.authService.token;

        return this.http.get(this.url + '.json?auth=' + token)
            .pipe(
                map((data: []) => {
                    // Creating an array from response object values.
                    const usersArr = Object.values(data);
                    // Reordering the array - current user as first item.
                    const currentUserIndex = usersArr.findIndex((user: User) => user.uid === uid);
                    usersArr.splice(0, 0, usersArr.splice(currentUserIndex, 1)[0]);
                    return usersArr;
                    }
                )
            );
    }

}
