import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppStore, IDashboardItem } from './../../../shared/common/interfaces';
import * as DashboardAction from '../../../shared/store/actions/dashboard.action';
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
  storeSubscription: Subscription;

  constructor(
    private store: Store<IAppStore>
  ) { }

  ngOnInit() {
    this.isFetching = true;
    this.store.dispatch(new DashboardAction.FetchDashboardStart());
    this.storeSubscription = this.store.select('dashboard').subscribe(
      (store) => {
        Utils.consoleLog('(DashboardComponent) Dashboard Store: ', 'limegreen', store);
        this.isFetching = store.fetching;
        this.forms = store.forms;
        this.notes = store.notes;
      }
    );
  }

  onDelete(type: string, id: string) {
    this.store.dispatch(new DashboardAction.RemoveDashboardItemStart({ type, id }));
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

}
