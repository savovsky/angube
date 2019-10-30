
import * as Action from '../actions/auth.action';
import * as InitialState from '../initilal-states';


export function authReducer(
    state = InitialState.auth,
    action: Action.AuthActions
    ) {
    switch (action.type) {
        case Action.VERIFY_AUTH_START: {
            return {
                ...state,
                verifying: true,
                verifyFulfilled: false,
                verifyRejected: false,
                verifyAuthErr: ''
            };
        }
        case Action.VERIFY_AUTH_FULFILLED: {
            return {
                ...state,
                verifying: false,
                verifyFulfilled: true,
                verifyRejected: false,
                verifyAuthErr: ''
            };
        }
        case Action.VERIFY_AUTH_REJECTED: {
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
