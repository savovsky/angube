import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { IAppStore, IDashboard } from './../../common/interfaces';
import * as Action from './../actions/dashboard.action';
import * as Utils from '../../common/utils';


@Injectable() // it allows the DI for this class
export class DashboardEffects {

  private communityId: string;
  private token: string;

  constructor(
    // actions$ - stream of dispatched actions - observable. It must never die!
    private actions$: Actions,
    private http: HttpClient,
    private store$: Store<IAppStore>
  ) { }

  @Effect()
  fetchDashboard$ = this.actions$.pipe( // do not call subscribe, ngrx Effects will do it !
    ofType(Action.FETCH_DASHBOARD_START), // special operator form @ngrx/effects not from rxjs !
    withLatestFrom(this.store$),
    switchMap(([, store]: [Action.FetchDashboardStart, IAppStore]) => {
      this.communityId = store.authent.communityId;
      this.token = store.authent.token;

      return this.http.get(this.urlDashboard(), { params: new HttpParams().set('print', 'pretty') }).pipe(
        map((response: IDashboard) => {
          Utils.consoleLog(`(DashboardEffects) Get Dashboard Data  - Response: `, 'darkGoldenRod', response);
          return new Action.FetchDashboardFulfilled(response);
        }),
        catchError((error: HttpErrorResponse) => {
          Utils.consoleLog(`(DashboardEffects) Get Dashboard Data - Error: `, 'red', error);
          return of(new Action.FetchDashboardRejected(error.error.error));
        })
      );
    })
  );

  @Effect()
  deleteDashboardItem$ = this.actions$.pipe(
    ofType(Action.REMOVE_DASHBOARD_ITEM_START),
    withLatestFrom(this.store$),
    switchMap(([action, store]: [Action.RemoveDashboardItemStart, IAppStore]) => {
      this.communityId = store.authent.communityId;
      this.token = store.authent.token;
      const type = action.payload.type;
      const id = action.payload.id;

      return this.http.delete(this.urlDashboarditem(type, id)).pipe(
        map(() => {
          Utils.consoleLog(`(DashboardEffects) Delete Dashboard Item  - Success! `, 'darkGoldenRod');
          return new Action.RemoveDashboardItemFulfilled({ type, id });
        }),
        catchError((error: HttpErrorResponse) => {
          Utils.consoleLog(`(DashboardEffects) Delete Dashboard Item - Error: `, 'red', error);
          return of(new Action.RemoveDashboardItemRejected(error.error.error));
        })
      );
    })
  );

  urlDashboard() {
    return  Utils.firebaseUrl() + this.communityId + '/dashboard/.json?auth=' + this.token;
  }

  urlDashboarditem(type: string, id: string) {
    return  Utils.firebaseUrl() + this.communityId + '/dashboard/' + type + '/' + id + '.json?auth=' + this.token;
  }

}

// REMIND https://medium.com/@viestursv/how-to-get-store-state-in-ngrx-effect-fab9e9c8f087
// REMIND https://blog.angularindepth.com/ngrx-tips-tricks-69feb20a42a7
