import * as Action from '../actions/dashboard.action';
import * as InitialState from '../initilal-states';


export function dashboardReducer(
    state = InitialState.dashboard,
    action: Action.DashboardActions
    ) {
    switch (action.type) {
        case 'FETCH_DASHBOARD_START': {
            return {
                ...state,
                fetching: true,
                fetchFulfilled: false,
                fetchRejected: false,
                errMsg: ''
            };
        }
        case 'FETCH_DASHBOARD_FULFILLED': {
            return {
                ...state,
                fetching: false,
                fetchFulfilled: true,
                fetchRejected: false,
                errMsg: '',
                forms: { ...action.payload.forms },
                notes: { ...action.payload.notes }
            };
        }
        case 'FETCH_DASHBOARD_REJECTED': {
            return {
                ...state,
                fetching: false,
                fetchFulfilled: false,
                fetchRejected: true,
                errMsg: action.payload

            };
        }

        default:
            return state;
    }
}
