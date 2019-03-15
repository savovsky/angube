import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../interfaces/interfaces';
import * as Utils from '../common/utils';
import { Account } from '../account/account.model';

/**
 * Storing the all users accounts
 */
@Injectable({
    providedIn: 'root'
})
export class UsersService {

    users: User[];

    /**
     * Storing all users
     * @param users array of all user's objects
     */
    storeUsers(users: User[]) {
        this.users = users;
        Utils.consoleLog(`storeUsers: `, 'orange', users);
    }

    /**
     * Update user account object
     * @param user user's account object
     */
    updateUser(user: User) {
        this.users = this.users.map((obj) => {
            if (obj.uid === user.uid) {
                return user;
            }
            return obj;
        });
        Utils.consoleLog(`updateUser: `, 'orange', user);
        Utils.consoleLog(`Users updated: `, 'orange', this.users);
    }

}
