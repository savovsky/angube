import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AdminModule { }
