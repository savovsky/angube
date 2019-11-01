import { ActionReducerMap } from '@ngrx/store';
import { IAppStore } from '../common/interfaces';
import { authentReducer } from './reducers/authent.reducer';
import { dashboardReducer } from './reducers/dashboard.reducer';
import { currentUserReducer } from './reducers/currentUser.reducer';


export const appReducer: ActionReducerMap<IAppStore> = {
  authent: authentReducer,
  dashboard: dashboardReducer,
  currentUser: currentUserReducer
};
