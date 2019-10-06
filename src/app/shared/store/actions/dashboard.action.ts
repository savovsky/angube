import { Action } from '@ngrx/store';
import { IDashboard } from '../../common/interfaces';

export const FETCH_DASHBOARD_START = 'FETCH_DASHBOARD_START';
export const FETCH_DASHBOARD_FULFILLED = 'FETCH_DASHBOARD_FULFILLED';
export const FETCH_DASHBOARD_REJECTED = 'FETCH_DASHBOARD_REJECTED';

export class FetchDashboardStart implements Action {

    readonly type = FETCH_DASHBOARD_START;
}

export class FetchDashboardFulfilled implements Action {

    readonly type = FETCH_DASHBOARD_FULFILLED;

    constructor(public payload: IDashboard) { }
}

export class FetchDashboardRejected implements Action {

    readonly type = FETCH_DASHBOARD_REJECTED;

    constructor(public payload: '') { }
}

export type DashboardActions = 
    FetchDashboardStart |
    FetchDashboardFulfilled |
    FetchDashboardRejected;
