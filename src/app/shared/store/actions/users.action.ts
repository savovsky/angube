import { Action } from '@ngrx/store';
import { IUser } from './../../common/interfaces';

export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_FULFILLED = 'FETCH_USERS_FULFILLED';
export const FETCH_USERS_REJECTED = 'FETCH_USERS_REJECTED';

export class FetchUsersStart implements Action {
    readonly type = FETCH_USERS_START;
}

export class FetchUsersFulfilled implements Action {
    readonly type = FETCH_USERS_FULFILLED;

    constructor(public payload: IUser[]) { }
}

export class FetchUsersRejected implements Action {
    readonly type = FETCH_USERS_REJECTED;

    constructor(public payload: string) { } // payload = error message
}

export type UsersActions =
    | FetchUsersStart
    | FetchUsersFulfilled
    | FetchUsersRejected;
