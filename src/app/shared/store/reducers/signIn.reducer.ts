import * as Action from '../actions/signin.action';
import * as InitialState from '../initilal-states';

export function signInReducer(
    state = InitialState.signIn,
    action: Action.SignInActions
    ) {
    switch (action.type) {
        case Action.SIGNIN_START: {
            return {
                ...state,
                signing: true,
                signInFulfilled: false,
                signInRejected: false,
                signInErr: ''
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
                email: action.payload.email,
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

        default:
            return state;
    }
}
