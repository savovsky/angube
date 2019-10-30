import { Action } from '@ngrx/store';

export const VERIFY_AUTH_START = 'VERIFY_AUTH_START';
export const VERIFY_AUTH_FULFILLED = 'VERIFY_AUTH_FULFILLED';
export const VERIFY_AUTH_REJECTED = 'VERIFY_AUTH_REJECTED';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';

export class VerifyAuthStart implements Action {

    readonly type = VERIFY_AUTH_START;
}

export class VerifyAuthFulfilled implements Action {

    readonly type = VERIFY_AUTH_FULFILLED;

    constructor(public payload: any) { } // TODO do not use any!
}

export class VerifyAuthRejected implements Action {

    readonly type = VERIFY_AUTH_REJECTED;

    constructor(public payload: string) { } // payload = error message
}

export type AuthActions =
    | VerifyAuthStart
    | VerifyAuthFulfilled
    | VerifyAuthRejected;
