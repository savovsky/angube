import { Injectable } from '@angular/core';
import * as Utils from '../common/utils';

@Injectable()
export class UsersAccountService {
    users: {}[];
    constructor() { }

    storeUsers(users: {}[]) {
        this.users = users;
        Utils.consoleLog(`storeUsers: `, 'purple', users);
    }

    getUsers() {
        Utils.consoleLog(`getUsers: `, 'purple', this.users);
        return this.users;
    }
}
