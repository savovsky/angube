import { Injectable } from '@angular/core';

@Injectable()
export class UsersAccountService {
    users: {}[];
    constructor() { }

    storeUsers(users: {}[]) {
        this.users = users;
    }
}
