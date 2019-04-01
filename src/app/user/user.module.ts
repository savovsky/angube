import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './components/account/account.component';
import { CardComponent } from './components/card/card.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AccountComponent,
    CardComponent,
    ProfileComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CardComponent
  ]
})
export class UserModule { }
