import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ApplicationComponent } from './components/application/application.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarModule } from '../navbar/navbar.module';
import { UserModule } from '../user/user.module';


@NgModule({
  declarations: [
    ApplicationComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    SharedModule,
    NavbarModule,
    UserModule
  ]
})
export class CoreModule { }
