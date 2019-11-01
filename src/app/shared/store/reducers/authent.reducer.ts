import * as Action from '../actions/authent.action';
import * as InitialState from '../initilal-states';

export function authentReducer(
    state = InitialState.authent,
    action: Action.AuthentActions
    ) {
    switch (action.type) {
        case Action.SIGNIN_START: {
            return {
                ...InitialState.authent,
                signing: true
            };
        }
        case Action.SIGNIN_FULFILLED: {
            return {
                ...state,
                signing: false,
                authentFulfilled: true,
                authentRejected: false,
                authentErr: '',
                uid: action.payload.uid,
                email: action.payload.email
            };
        }
        case Action.SIGNIN_REJECTED: {
            return {
                ...state,
                signing: false,
                authentFulfilled: false,
                authentRejected: true,
                authentErr: action.payload
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
        case Action.VERIFY_AUTHENT_START: {
            return {
                ...state,
                verifyingAuthent: true,
                verifyAuthentFulfilled: false,
                verifyAuthentRejected: false,
                verifyAuthentErr: ''
            };
        }
        case Action.VERIFY_AUTHENT_FULFILLED: {
            return {
                ...state,
                verifyingAuthent: false,
                verifyAuthentFulfilled: true,
                verifyAuthentRejected: false,
                verifyAuthentErr: ''
            };
        }
        case Action.VERIFY_AUTHENT_REJECTED: {
            return {
                ...state,
                verifyingAuthent: false,
                verifyAuthentFulfilled: false,
                verifyAuthentRejected: true,
                verifyAuthentErr: action.payload
            };
        }

        default:
            return state;
    }
}
