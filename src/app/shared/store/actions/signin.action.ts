import { Action } from '@ngrx/store';

export const SIGNIN_START = 'SIGNIN_START';
export const SIGNIN_FULFILLED = 'SIGNIN_FULFILLED';
export const SIGNIN_REJECTED = 'SIGNIN_REJECTED';
export const FETCH_TOKEN_START = 'FETCH_TOKEN_START';
export const FETCH_TOKEN_FULFILLED = 'FETCH_TOKEN_FULFILLED';
export const FETCH_TOKEN_REJECTED = 'FETCH_TOKEN_REJECTED';

export class SignInStart implements Action {
    readonly type = SIGNIN_START;

    constructor(public payload: { email: string, password: string }) { }
}

export class SignInFulfilled implements Action {
    readonly type = SIGNIN_FULFILLED;

    constructor(public payload: { uid: string, email: string }) { }
}

export class SignInRejected implements Action {
    readonly type = SIGNIN_REJECTED;

    constructor(public payload: string) { } // payload = error message
}

export class FetchTokenStart implements Action {
    readonly type = FETCH_TOKEN_START;
}

export class FetchTokenFulfilled implements Action {
    readonly type = FETCH_TOKEN_FULFILLED;

    constructor(public payload: string) { } // // payload = token
}

export class FetchTokenRejected implements Action {
    readonly type = FETCH_TOKEN_REJECTED;

    constructor(public payload: string) { } // payload = error message
}

export type SignInActions =
    | SignInStart
    | SignInFulfilled
    | SignInRejected
    | FetchTokenStart
    | FetchTokenFulfilled
    | FetchTokenRejected;
