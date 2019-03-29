import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MenuIconsComponent } from './components/menu-user/menu-icons.component';
import { NavbarComponent } from './components/nav-bar/navbar.component';
import { NavTabComponent } from './components/nav-tab/nav-tab.component';


@NgModule({
  declarations: [
    MenuIconsComponent,
    NavbarComponent,
    NavTabComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
