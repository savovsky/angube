import { IDashboardItem } from './../../common/interfaces';
import * as Action from '../actions/dashboard.action';
import * as InitialState from '../initilal-states';


export function dashboardReducer(
    state = InitialState.dashboard,
    action: Action.DashboardActions
    ) {
    switch (action.type) {
        case Action.FETCH_DASHBOARD_START: {
            return {
                ...state,
                fetching: true,
                fetchFulfilled: false,
                fetchRejected: false,
                fetchDashboardErr: ''
            };
        }
        case Action.FETCH_DASHBOARD_FULFILLED: {
            return {
                ...state,
                fetching: false,
                fetchFulfilled: true,
                fetchRejected: false,
                fetchDashboardErr: '',
                forms: Object.values(action.payload.forms),
                notes: Object.values(action.payload.notes)
            };
        }
        case Action.FETCH_DASHBOARD_REJECTED: {
            return {
                ...state,
                fetching: false,
                fetchFulfilled: false,
                fetchRejected: true,
                fetchDashboardErr: action.payload
            };
        }
        case Action.REMOVE_DASHBOARD_ITEM_START: {
            return {
                ...state,
                deleting: true,
                deleteFulfilled: false,
                deletedRejected: false,
                deleteItemErr: ''
            };
        }
        case Action.REMOVE_DASHBOARD_ITEM_FULFILLED: {
            return {
                ...state,
                deleting: false,
                deleteFulfilled: true,
                deletedRejected: false,
                deleteItemErr: '',
                [action.payload.type]: state[action.payload.type].filter(
                    (item: IDashboardItem) => item.id !== action.payload.id
                ) // e.g. notes: notes.filter(.....)
            };
        }
        case Action.REMOVE_DASHBOARD_ITEM_REJECTED: {
            return {
                ...state,
                deleting: false,
                deleteFulfilled: false,
                deletedRejected: true,
                deleteItemErr: action.payload
            };
        }

        default:
            return state;
    }
}
