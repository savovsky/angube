import * as InitialState from '../initilal-states';
import * as Action from '../actions/user.action';


export function userReducer(
    state = InitialState.user,
    action: Action.UsersActions
    ) {

    switch (action.type) {
        case Action.FETCH_USER_START: {
            return {
                ...state,
                fetching: true,
                fetchFulfilled: false,
                fetchRejected: false,
                fetchUserErr: ''
            };
        }
        case Action.FETCH_USER_FULFILLED: {
            return {
                ...state,
                fetching: false,
                fetchFulfilled: true,
                fetchRejected: false,
                fetchUserErr: '',
                user: action.payload
            };
        }
        case Action.FETCH_USER_REJECTED: {
            return {
                ...state,
                fetching: false,
                fetchFulfilled: false,
                fetchRejected: true,
                fetchUserErr: action.payload
            };
        }
        case Action.UPDATE_USER_START: {
            return {
                ...state,
                updating: true,
                updateFulfilled: false,
                updateRejected: false,
                updateUserErr: ''
            };
        }
        case Action.UPDATE_USER_FULFILLED: {
            return {
                ...state,
                updating: false,
                updateFulfilled: true,
                updateRejected: false,
                updateUserErr: ''
            };
        }
        case Action.UPDATE_USER_REJECTED: {
            return {
                ...state,
                updating: false,
                updateFulfilled: false,
                updateRejected: true,
                updateUserErr: action.payload
            };
        }
        case Action.DELETE_USER_START: {
            return {
                ...state,
                deleting: true,
                deleteFulfilled: false,
                deletedRejected: false,
                deleteUserErr: ''
            };
        }
        case Action.DELETE_USER_FULFILLED: {
            return {
                ...state,
                deleting: false,
                deleteFulfilled: true,
                deletedRejected: false,
                deleteUserErr: ''
            };
        }
        case Action.DELETE_USER_REJECTED: {
            return {
                ...state,
                deleting: false,
                deleteFulfilled: false,
                deletedRejected: true,
                deleteUserErr: action.payload
            };
        }

        default:
            return state;
    }
}
