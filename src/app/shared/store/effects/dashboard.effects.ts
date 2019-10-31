import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import * as Action from './../actions/dashboard.action';
import * as Utils from '../../common/utils';
import { IDashboard } from './../../common/interfaces';
import { AuthService } from '../../services/auth.service';


@Injectable() // it allows the DI for this class
export class DashboardEffects {
  @Effect()
    fetchDashboard$ = this.actions$.pipe( // do not call subscribe, ngrx Effects will do it !
      ofType(Action.FETCH_DASHBOARD_START), // special operator form @ngrx/effects not from rxjs !
      switchMap(() => {
        return this.http.get(
          Utils.firebaseUrl() + 'ng68b' + '/dashboard/.json?auth=' + this.authService.token,
          { params: new HttpParams().set('print', 'pretty') }
        ).pipe(
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
      switchMap((action: Action.RemoveDashboardItemStart) => {
        const type = action.payload.type;
        const id = action.payload.id;

        return this.http.delete(
          Utils.firebaseUrl() + 'ng68b' + '/dashboard/' + type + '/' + id + '.json?auth=' + this.authService.token
        ).pipe(
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

  constructor(
    // actions$ - stream of dispatched actions - observable. It must never die!
    private actions$: Actions,
    private http: HttpClient,
    private authService: AuthService
  ) { }
}
