import * as CurrentUserActions from '../actions/currentUser.action';

const initialState = {
    userName: 'eho',
    firstName: 'beho',
    lastName: '',
    birthdate: '',
    email: '',
    isBlocked: false,
    isAdmin: false,
    uid: '',
    communityCode: ''
};


export function currentUserReducer(
    state = initialState,
    action: CurrentUserActions.UpdateCurrentUser
    ) {
        console.log(action.payload);
    switch (action.type) {
        case CurrentUserActions.UPDATE_CURRENT_USER: {
            return {
                ...state,
                ...action.payload
            };
        }

        default:
            return state;
    }

}