import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../interfaces/interfaces';
import * as Utils from '../common/utils';
import { Account } from '../account/account.model';

/**
 * Storing  user/s account/s
 */
@Injectable({
    providedIn: 'root'
})
export class UsersService {

    users: User[];
    currentUser: User;

    /**
     * Storing all users.
     * @param users array of all users account objects
     */
    storeUsers(users: User[]) {
        this.users = users;
        Utils.consoleLog(`storeUsers: `, 'orange', users);
    }

    /**
     * Update current user account and users collection too.
     * @param user user's account object
     */
    updateCurrentUser(user: User) {
        this.currentUser = user;
        this.users = this.users.map((obj) => {
            if (obj.uid === user.uid) {
                return user;
            }
            return obj;
        });
        Utils.consoleLog(`updateCurrentUser: `, 'orange', user);
        Utils.consoleLog(`Users updated: `, 'orange', this.users);
    }

}
