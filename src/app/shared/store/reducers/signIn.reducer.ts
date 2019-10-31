import * as Action from '../actions/signIn.action';
import * as InitialState from '../initilal-states';

export function signInReducer(
    state = InitialState.signIn,
    action: Action.SignInActions
    ) {
    switch (action.type) {
        case Action.SIGNIN_START: {
            return {
                ...state,
                verifying: true,
                verifyFulfilled: false,
                verifyRejected: false,
                verifyAuthErr: ''
            };
        }
        case Action.SIGNIN_FULFILLED: {
            return {
                ...state,
                verifying: false,
                verifyFulfilled: true,
                verifyRejected: false,
                verifyAuthErr: ''
            };
        }
        case Action.SIGNIN_REJECTED: {
            return {
                ...state,
                verifying: false,
                verifyFulfilled: false,
                verifyRejected: true,
                verifyAuthErr: action.payload
            };
        }

        default:
            return state;
    }
}
