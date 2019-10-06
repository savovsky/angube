import * as Action from '../actions/currentUser.action';
import * as InitialState from '../initilal-states';


export const currentUserReducer = (
    state = InitialState.currentUser,
    action: Action.UpdateCurrentUser
    ) => {
    switch (action.type) {
        case Action.UPDATE_CURRENT_USER: {
            return {
                ...state,
                ...action.payload
            };
        }

        default:
            return state;
    }

}