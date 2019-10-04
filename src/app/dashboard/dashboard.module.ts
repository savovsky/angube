import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ProgressSpinnerComponent } from './../loaders/components/progress-spinner/progress-spinner.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressSpinnerComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
