import { Action } from '@ngrx/store';

export const SIGNIN_START = 'SIGNIN_START';
export const SIGNUP_START = 'SIGNUP_START';
export const AUTHENT_FULFILLED = 'AUTHENT_FULFILLED';
export const AUTHENT_REJECTED = 'AUTHENT_REJECTED';
export const FETCH_TOKEN_START = 'FETCH_TOKEN_START';
export const FETCH_TOKEN_FULFILLED = 'FETCH_TOKEN_FULFILLED';
export const FETCH_TOKEN_REJECTED = 'FETCH_TOKEN_REJECTED';
export const LOG_OUT_START = 'LOG_OUT_START';
export const LOG_OUT_FULFILLED = 'LOG_OUT_FULFILLED';
export const LOG_OUT_REJECTED = 'LOG_OUT_REJECTED';
export const VERIFY_AUTHENT_START = 'VERIFY_AUTHENT_START';
export const VERIFY_AUTHENT_FULFILLED = 'VERIFY_AUTHENT_FULFILLED';
export const VERIFY_AUTHENT_REJECTED = 'VERIFY_AUTHENT_REJECTED';

export class SignInStart implements Action {
    readonly type = SIGNIN_START;

    constructor(public payload: { email: string, password: string }) { }
}

export class SignUpStart implements Action {
    readonly type = SIGNUP_START;

    constructor(public payload: { email: string, password: string }) { }
}

export class AuthentFulfilled implements Action {
    readonly type = AUTHENT_FULFILLED;

    constructor(public payload: { uid: string, email: string }) { }
}

export class AuthentRejected implements Action {
    readonly type = AUTHENT_REJECTED;

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

export class LogOutStart implements Action {
    readonly type = LOG_OUT_START;
}

export class LogOutFulfilled implements Action {
    readonly type = LOG_OUT_FULFILLED;
}

export class LogOutRejected implements Action {
    readonly type = LOG_OUT_REJECTED;

    constructor(public payload: string) { } // payload = error message
}


export class VerifyAuthentStart implements Action {
    readonly type = VERIFY_AUTHENT_START;

    constructor(public payload: any) { } // TODO do not use any!
}

export class VerifyAuthentFulfilled implements Action {
    readonly type = VERIFY_AUTHENT_FULFILLED;

    constructor(public payload: any) { } // TODO do not use any!
}

export class VerifyAuthentRejected implements Action {
    readonly type = VERIFY_AUTHENT_REJECTED;

    constructor(public payload: string) { } // payload = error message
}

export type AuthentActions =
    | SignInStart
    | SignUpStart
    | AuthentFulfilled
    | AuthentRejected
    | FetchTokenStart
    | FetchTokenFulfilled
    | FetchTokenRejected
    | LogOutStart
    | LogOutFulfilled
    | LogOutRejected
    | VerifyAuthentStart
    | VerifyAuthentFulfilled
    | VerifyAuthentRejected;
