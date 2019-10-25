import { DatabaseDashboardService } from './../../../shared/services/database-dashboard.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs';
import * as Utils from '../../../shared/common/utils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  isFetching: boolean;
  // subscription: Subscription;

  constructor(
    public databaseDashboardService: DatabaseDashboardService
  ) { }

  ngOnInit() {
    this.isFetching = true;
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
    // this.subscription.unsubscribe();
  }

}
