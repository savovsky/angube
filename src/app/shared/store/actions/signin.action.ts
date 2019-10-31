import { Action } from '@ngrx/store';

export const SIGNIN_START = 'SIGNIN_START';
export const SIGNIN_FULFILLED = 'SIGNIN_FULFILLED';
export const SIGNIN_REJECTED = 'SIGNIN_REJECTED';

export class SignInStart implements Action {

    readonly type = SIGNIN_START;

    constructor(public payload: { email: string, password: string }) { }
}

export class SignInFulfilled implements Action {

    readonly type = SIGNIN_FULFILLED;

    constructor(public payload: any) { } // TODO do not use any!
}

export class SignInRejected implements Action {

    readonly type = SIGNIN_REJECTED;

    constructor(public payload: string) { } // payload = error message
}

export type SignInActions =
    | SignInStart
    | SignInFulfilled
    | SignInRejected;
