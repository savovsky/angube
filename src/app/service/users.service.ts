import { Injectable } from '@angular/core';
import { User } from '../interfaces/interfaces';
import * as Utils from '../common/utils';
import { Subject } from 'rxjs';

/**
 * @description
 * Menage user/s account/s.
 */
@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private defaultUser = {
        uid: '',
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        birthdate: '',
        isAdmin: false,
        isBlocked: false,
    };
    private defaultUsers = [];

    currentUser: User = this.defaultUser;
    users: User[] = this.defaultUsers;
    usersStored = new Subject();
    currentUserUpdated = new Subject();

    /**
     * Storing all users accounts.
     * @param users Array of all users account objects.
     */
    storeUsers(users: User[]) {
        this.users = users;
        this.usersStored.next();
        Utils.consoleLog(`(UsersService) Users stored: `, 'orange', this.users);
    }

    /**
     * @description
     * Update current user account and users collection too.
     *
     * @param user Current user's account object.
     */
    updateCurrentUser(user: User) {
        this.currentUser = user;
        this.users = this.users.map((obj) => {
            if (obj.uid === user.uid) {
                return user;
            }
            return obj;
        });
        this.currentUserUpdated.next();

        Utils.consoleLog(`(UsersService) Current user updated: `, 'orange', this.currentUser);
        Utils.consoleLog(`(UsersService) Users updated: `, 'orange', this.users);
    }

    /**
     * @description
     * Update user account and users collection too.
     *
     * @param user User's account object.
     */
    updateUser(user: User) {
        this.users = this.users.map((obj) => {
            if (obj.uid === user.uid) {
                return user;
            }
            return obj;
        });

        Utils.consoleLog(`(UsersService) User updated: `, 'orange', this.currentUser);
        Utils.consoleLog(`(UsersService) Users updated: `, 'orange', this.users);
    }

    /**
     * Get stored user by uid.
     * @param uid User uid.
     */
    getUser(uid: string) {
        const userAccount = this.users.find((account: User) => account.uid === uid);
        return userAccount ? userAccount : this.defaultUser;
    }

    /**
     * @description
     * Clear current user and users collection and set them to default values.
     */
    setToDefaultUser() {
        this.currentUser = this.defaultUser;
        this.users = this.defaultUsers;

        Utils.consoleLog(`(UsersService) Current user set to default: `, 'orange', this.currentUser);
        Utils.consoleLog(`(UsersService) Users set to default: `, 'orange', this.users);
    }

    get currentUserName() {
        return this.currentUser.userName;
    }

    get currentUserUid() {
        return this.currentUser.uid;
    }

    get isCurrentUserAdmin() {
        return this.currentUser.isAdmin;
    }

    get currentUserAccount() {
        return this.currentUser;
    }

}
