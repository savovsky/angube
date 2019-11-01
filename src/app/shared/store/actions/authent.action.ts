import { Action } from '@ngrx/store';

export const SIGNIN_START = '[Auth] SIGNIN_START';
export const SIGNIN_FULFILLED = '[Auth] SIGNIN_FULFILLED';
export const SIGNIN_REJECTED = '[Auth] SIGNIN_REJECTED';
export const FETCH_TOKEN_START = '[Auth] FETCH_TOKEN_START';
export const FETCH_TOKEN_FULFILLED = '[Auth] FETCH_TOKEN_FULFILLED';
export const FETCH_TOKEN_REJECTED = '[Auth] FETCH_TOKEN_REJECTED';

export const VERIFY_AUTHENT_START = 'VERIFY_AUTHENT_START';
export const VERIFY_AUTHENT_FULFILLED = 'VERIFY_AUTHENT_FULFILLED';
export const VERIFY_AUTHENT_REJECTED = 'VERIFY_AUTHENT_REJECTED';

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

//

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
    | SignInFulfilled
    | SignInRejected
    | FetchTokenStart
    | FetchTokenFulfilled
    | FetchTokenRejected
    | VerifyAuthentStart
    | VerifyAuthentFulfilled
    | VerifyAuthentRejected;
