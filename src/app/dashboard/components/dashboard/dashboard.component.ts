import { DatabaseDashboardService } from './../../../shared/services/database-dashboard.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as Utils from '../../../shared/common/utils';
import { IDashboardStore, IDashboardItem } from './../../../shared/common/interfaces';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  isFetching: boolean;
  subscriptionStore: Subscription;
  forms: IDashboardItem[];
  // subscription: Subscription;

  constructor(
    private databaseDashboardService: DatabaseDashboardService,
    private store: Store<{ dashboard: IDashboardStore }>
  ) { }

  ngOnInit() {
    this.isFetching = true;
    this.subscriptionStore = this.store.select('dashboard').subscribe(
      (res) => {
        console.log('res', res);
        this.forms = Object.values(res.forms);
        console.log('forms = ', this.forms);
      }
    );
    this.databaseDashboardService.getDashboardData()
      .subscribe(
        (response) => {
          this.isFetching = false;
          Utils.consoleLog(`(databaseDashboardService) Get Daashboard Data  - Response: `, 'darkGoldenRod', response);
            // this.usersService.updateUser(response);
          // this.updateUserSuccess.next();
        },
        (error) => Utils.consoleLog(`(databaseDashboardService) Get Dashboard Data - Error: `, 'red', error),
        () => {
          this.isFetching = false;
          Utils.consoleLog(`(AccountComponent) Getting Dashboard Data - Completed`, 'pink');
        }
      );
  }

  ngOnDestroy() {
    this.subscriptionStore.unsubscribe();
    // this.subscription.unsubscribe();
  }

}
