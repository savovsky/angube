import { IAppStore } from '../common/interfaces';
import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './reducers/auth.reducer';
import { dashboardReducer } from './reducers/dashboard.reducer';
import { currentUserReducer } from './reducers/currentUser.reducer';


export const appReducer: ActionReducerMap<IAppStore> = {
    auth: authReducer,
    dashboard: dashboardReducer,
    currentUser: currentUserReducer
};
