import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './components/users/users.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';


@NgModule({
  declarations: [
    UsersComponent,
    AccessDeniedComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AdminModule { }
