import { ActionReducerMap } from '@ngrx/store';
import { IAppStore } from '../common/interfaces';
import { authReducer } from './reducers/auth.reducer';
import { signInReducer } from './reducers/signIn.reducer';
import { dashboardReducer } from './reducers/dashboard.reducer';
import { currentUserReducer } from './reducers/currentUser.reducer';


export const appReducer: ActionReducerMap<IAppStore> = {
    auth: authReducer,
    signIn: signInReducer,
    dashboard: dashboardReducer,
    currentUser: currentUserReducer
};
