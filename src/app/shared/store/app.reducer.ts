import { ActionReducerMap } from '@ngrx/store';
import { IAppStore } from '../common/interfaces';
import { authentReducer } from './reducers/authent.reducer';
import { dashboardReducer } from './reducers/dashboard.reducer';
import { currentUserReducer } from './reducers/currentUser.reducer';
import { routerReducer } from '@ngrx/router-store';
import { formTemplateReducer } from './reducers/formTemplate.reducer';


export const appReducer: ActionReducerMap<IAppStore> = {
  router: routerReducer,
  authent: authentReducer,
  dashboard: dashboardReducer,
  currentUser: currentUserReducer,
  formTemplate: formTemplateReducer
};
