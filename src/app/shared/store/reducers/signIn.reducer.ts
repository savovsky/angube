import * as Action from '../actions/signin.action';
import * as InitialState from '../initilal-states';

export function signInReducer(
    state = InitialState.signIn,
    action: Action.SignInActions
    ) {
    switch (action.type) {
        case Action.SIGNIN_START: {
            return {
                ...InitialState.signIn,
                signing: true
            };
        }
        case Action.SIGNIN_FULFILLED: {
            return {
                ...state,
                signing: false,
                signInFulfilled: true,
                signInRejected: false,
                signInErr: '',
                uid: action.payload.uid,
                email: action.payload.email
            };
        }
        case Action.SIGNIN_REJECTED: {
            return {
                ...state,
                signing: false,
                signInFulfilled: false,
                signInRejected: true,
                signInErr: action.payload
            };
        }
        case Action.FETCH_TOKEN_START: {
            return {
                ...state,
                fetchingToken: true,
                fetchTokenFulfilled: false,
                fetchTokenRejected: false,
                fetchTokenErr: ''
            };
        }
        case Action.FETCH_TOKEN_FULFILLED: {
            return {
                ...state,
                fetchingToken: false,
                fetchTokenFulfilled: true,
                fetchTokenRejected: false,
                fetchTokenErr: '',
                token: action.payload
            };
        }
        case Action.FETCH_TOKEN_FULFILLED: {
            return {
                ...state,
                fetchingToken: false,
                fetchTokenFulfilled: false,
                fetchTokenRejected: true,
                fetchTokenErr: action.payload
            };
        }

        default:
            return state;
    }
}
