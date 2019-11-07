import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './components/users/users.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { ProgressSpinnerComponent } from './../loaders/components/progress-spinner/progress-spinner.component';

@NgModule({
  declarations: [
    UsersComponent,
    AccessDeniedComponent,
    ProgressSpinnerComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AdminModule { }
