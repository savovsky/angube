import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IDashboardStore, IDashboardItem } from './../../../shared/common/interfaces';
import * as Action from '../../../shared/store/actions/dashboard.action';
import * as Utils from '../../../shared/common/utils';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  isFetching: boolean;
  forms: IDashboardItem[];
  notes: IDashboardItem[];
  subscriptionStore: Subscription;

  constructor(
    private store: Store<{ dashboard: IDashboardStore }>
  ) { }

  ngOnInit() {
    this.isFetching = true;
    this.store.dispatch(new Action.FetchDashboardStart());
    this.subscriptionStore = this.store.select('dashboard').subscribe(
      (store) => {
        Utils.consoleLog('(DashboardComponent) Dashboard Store: ', 'limegreen', store);
        this.isFetching = store.fetching;
        this.forms = store.forms;
        this.notes = store.notes;
      }
    );
  }

  onDelete(type: string, id: string) {
    this.store.dispatch(new Action.RemoveDashboardItemStart({ type, id }));
  }

  ngOnDestroy() {
    this.subscriptionStore.unsubscribe();
  }

}
