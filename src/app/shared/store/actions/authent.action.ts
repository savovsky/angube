import { Action } from '@ngrx/store';

export const SIGNIN_START = '[Authentication] SIGNIN_START';
export const SIGNUP_START = '[Authentication] SIGNUP_START';
export const AUTHENT_FULFILLED = '[Authentication] AUTHENT_FULFILLED';
export const AUTHENT_REJECTED = '[Authentication] AUTHENT_REJECTED';
export const AUTHENT_UPDATE = '[Authentication] AUTHENT_UPDATE';
export const FETCH_TOKEN_START = '[Authentication] FETCH_TOKEN_START';
export const FETCH_TOKEN_FULFILLED = '[Authentication] FETCH_TOKEN_FULFILLED';
export const FETCH_TOKEN_REJECTED = '[Authentication] FETCH_TOKEN_REJECTED';
export const LOG_OUT_START = '[Authentication] LOG_OUT_START';
export const LOG_OUT_FULFILLED = '[Authentication] LOG_OUT_FULFILLED';
export const LOG_OUT_REJECTED = '[Authentication] LOG_OUT_REJECTED';
export const VERIFY_AUTHENT_START = '[Authentication] VERIFY_AUTHENT_START';
export const VERIFY_AUTHENT_FULFILLED = '[Authentication] VERIFY_AUTHENT_FULFILLED';
export const VERIFY_AUTHENT_REJECTED = '[Authentication] VERIFY_AUTHENT_REJECTED';

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

    constructor(public payload: { uid: string, email: string, isSignIn: boolean }) { }
}

export class AuthentRejected implements Action {
    readonly type = AUTHENT_REJECTED;

    constructor(public payload: string) { } // payload = error message
}

export class AuthentUpdate implements Action {
    readonly type = AUTHENT_UPDATE;

    constructor(public payload: { uid: string, token: string, email: string }) { }
}

export class FetchTokenStart implements Action {
    readonly type = FETCH_TOKEN_START;

    constructor(public payload: boolean) { } // // payload = isSignIn
}

export class FetchTokenFulfilled implements Action {
    readonly type = FETCH_TOKEN_FULFILLED;

    constructor(public payload: { token: string, isSignIn: boolean }) { }
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
    | AuthentUpdate
    | FetchTokenStart
    | FetchTokenFulfilled
    | FetchTokenRejected
    | LogOutStart
    | LogOutFulfilled
    | LogOutRejected
    | VerifyAuthentStart
    | VerifyAuthentFulfilled
    | VerifyAuthentRejected;
