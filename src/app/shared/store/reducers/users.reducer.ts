import * as InitialState from '../initilal-states';
import * as Action from '../actions/users.action';


export function usersReducer(
    state = InitialState.users,
    action: Action.UsersActions
    ) {

    switch (action.type) {
        case Action.FETCH_USERS_START: {
            return {
                ...state,
                fetching: true,
                fetchFulfilled: false,
                fetchRejected: false,
                fetchUsersErr: ''
            };
        }
        case Action.FETCH_USERS_FULFILLED: {
            return {
                ...state,
                fetching: false,
                fetchFulfilled: true,
                fetchRejected: false,
                fetchUsersErr: '',
                users: [...action.payload]
            };
        }
        case Action.FETCH_USERS_REJECTED: {
            return {
                ...state,
                fetching: false,
                fetchFulfilled: false,
                fetchRejected: true,
                fetchUsersErr: action.payload
            };
        }

        default:
            return state;
    }
}
