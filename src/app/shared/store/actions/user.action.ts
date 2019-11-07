import { Action } from '@ngrx/store';
import { IUser } from '../../common/interfaces';

export const FETCH_USER_START = 'FETCH_USER_START';
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
export const FETCH_USER_REJECTED = 'FETCH_USER_REJECTED';
export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_FULFILLED = 'UPDATE_USER_FULFILLED';
export const UPDATE_USER_REJECTED = 'UPDATE_USER_REJECTED';
export const DELETE_USER_START = 'DELETE_USER_START';
export const DELETE_USER_FULFILLED = 'DELETE_USER_FULFILLED';
export const DELETE_USER_REJECTED = 'DELETE_USER_REJECTED';

export class FetchUserStart implements Action {
    readonly type = FETCH_USER_START;

    constructor(public payload: { userId: string, communityId: string}) { }
}

export class FetchUserFulfilled implements Action {
    readonly type = FETCH_USER_FULFILLED;

    constructor(public payload: IUser) { }
}

export class FetchUserRejected implements Action {
    readonly type = FETCH_USER_REJECTED;

    constructor(public payload: string) { } // payload = error message
}

export class UpdateUserStart implements Action {
    readonly type = UPDATE_USER_START;

    constructor(public payload: IUser) { }
}

export class UpdateUserFulfilled implements Action {
    readonly type = UPDATE_USER_FULFILLED;
}

export class UpdateUserRejected implements Action {
    readonly type = UPDATE_USER_REJECTED;

    constructor(public payload: string) { } // payload = error message
}

export class DeleteUserStart implements Action {
    readonly type = DELETE_USER_START;

    constructor(public payload: { userId: string, communityId: string}) { }
}

export class DeleteUserFulfilled implements Action {
    readonly type = DELETE_USER_FULFILLED;
}

export class DeleteUserRejected implements Action {
    readonly type = DELETE_USER_REJECTED;

    constructor(public payload: string) { } // payload = error message
}

export type UsersActions =
    | FetchUserStart
    | FetchUserFulfilled
    | FetchUserRejected
    | UpdateUserStart
    | UpdateUserFulfilled
    | UpdateUserRejected
    | DeleteUserStart
    | DeleteUserFulfilled
    | DeleteUserRejected;
