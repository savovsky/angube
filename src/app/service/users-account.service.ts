import * as Utils from '../common/utils';


export class UsersAccountService {
    users: {}[];

    storeUsers(users: {}[]) {
        this.users = users;
        Utils.consoleLog(`storeUsers: `, 'purple', users);
    }

    getUsers() {
        Utils.consoleLog(`getUsers: `, 'purple', this.users);
        return this.users;
    }
}
