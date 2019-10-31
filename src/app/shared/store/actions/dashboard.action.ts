import { Action } from '@ngrx/store';
import { IDashboard } from '../../common/interfaces';

export const FETCH_DASHBOARD_START = 'FETCH_DASHBOARD_START';
export const FETCH_DASHBOARD_FULFILLED = 'FETCH_DASHBOARD_FULFILLED';
export const FETCH_DASHBOARD_REJECTED = 'FETCH_DASHBOARD_REJECTED';
export const REMOVE_DASHBOARD_ITEM_START = 'REMOVE_DASHBOARD_ITEM_START';
export const REMOVE_DASHBOARD_ITEM_FULFILLED = 'REMOVE_DASHBOARD_ITEM_FULFILLED';
export const REMOVE_DASHBOARD_ITEM_REJECTED = 'REMOVE_DASHBOARD_ITEM_REJECTED';

export class FetchDashboardStart implements Action {
    readonly type = FETCH_DASHBOARD_START;
}

export class FetchDashboardFulfilled implements Action {
    readonly type = FETCH_DASHBOARD_FULFILLED;

    constructor(public payload: IDashboard) { }
}

export class FetchDashboardRejected implements Action {
    readonly type = FETCH_DASHBOARD_REJECTED;

    constructor(public payload: string) { } // payload = error message
}

export class RemoveDashboardItemStart implements Action {
    readonly type = REMOVE_DASHBOARD_ITEM_START;

    constructor(public payload: { type: string, id: string }) { }
}

export class RemoveDashboardItemFulfilled implements Action {
    readonly type = REMOVE_DASHBOARD_ITEM_FULFILLED;

    constructor(public payload: { type: string, id: string }) { }
}

export class RemoveDashboardItemRejected implements Action {
    readonly type = REMOVE_DASHBOARD_ITEM_REJECTED;

    constructor(public payload: string) { } // payload = error message
}

export type DashboardActions = // pure TypeScript - union type
    | FetchDashboardStart
    | FetchDashboardFulfilled
    | FetchDashboardRejected
    | RemoveDashboardItemStart
    | RemoveDashboardItemFulfilled
    | RemoveDashboardItemRejected;
