import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IDashboardStore, IDashboardItem } from './../../../shared/common/interfaces';
import * as Action from '../../../shared/store/actions/dashboard.action';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  isFetching: boolean;
  forms: IDashboardItem[];
  subscriptionStore: Subscription;

  constructor(
    private store: Store<{ dashboard: IDashboardStore }>
  ) { }

  ngOnInit() {
    this.isFetching = true;
    this.store.dispatch(new Action.FetchDashboardStart());
    this.subscriptionStore = this.store.select('dashboard').subscribe(
      (store) => {
        this.isFetching = store.fetching;
        console.log('dashboard store = ', store);
        if (store.fetchFulfilled) {
          this.forms = Object.values(store.forms);
          console.log('forms = ', this.forms);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionStore.unsubscribe();
  }

}
