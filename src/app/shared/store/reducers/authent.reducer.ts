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
        case Action.SIGNUP_START: {
            return {
                ...InitialState.authent,
                signingUp: true
            };
        }
        case Action.AUTHENT_FULFILLED: {
            return {
                ...state,
                signing: false,
                signingUp: false,
                authentFulfilled: true,
                authentRejected: false,
                uid: action.payload.uid,
                email: action.payload.email
            };
        }
        case Action.AUTHENT_REJECTED: {
            return {
                ...state,
                signing: false,
                signingUp: false,
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
                token: action.payload.token
            };
        }
        case Action.FETCH_TOKEN_REJECTED: {
            return {
                ...state,
                fetchingToken: false,
                fetchTokenFulfilled: false,
                fetchTokenRejected: true,
                fetchTokenErr: action.payload
            };
        }
        case Action.LOG_OUT_START: {
            return {
                ...state,
                loggingOut: true,
                logOutFulfilled: false,
                logOutRejected: false
            };
        }
        case Action.LOG_OUT_FULFILLED: {
            return {
                ...state,
                loggingOut: false,
                logOutFulfilled: true,
                logOutRejected: false,
                uid: '',
                token: '',
                email: ''
            };
        }
        case Action.LOG_OUT_REJECTED: {
            return {
                ...state,
                loggingOut: false,
                logOutFulfilled: false,
                logOutRejected: true,
                logOutErr: action.payload
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
                verifyAuthentRejected: false
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
