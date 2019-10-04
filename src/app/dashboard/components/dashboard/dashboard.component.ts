import { DatabaseDashboardService } from './../../../shared/services/database-dashboard.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  isFetching: boolean;
  databaseDashboardUpdateSubscription: Subscription;

  constructor(
    public databaseDashboardService: DatabaseDashboardService
  ) { }

  ngOnInit() {
    this.isFetching = true;
    this.databaseDashboardUpdateSubscription = this.databaseDashboardService.databaseDashboardUpdate.subscribe(
      () => { this.isFetching = false; }
    );
  }

  ngOnDestroy() {
    this.databaseDashboardUpdateSubscription.unsubscribe();
  }

}
