import { IAppStore } from '../common/interfaces';
import { ActionReducerMap } from '@ngrx/store';
import { dashboardReducer } from './reducers/dashboard.reducer';
import { authReducer } from './reducers/auth.reducer';
import { currentUserReducer } from './reducers/currentUser.reducer';


export const appReducer: ActionReducerMap<IAppStore> = {
    dashboard: dashboardReducer,
    auth: authReducer,
    currentUser: currentUserReducer
};
