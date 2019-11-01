import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../shared/services/auth.service';
import { UsersService } from '../../../shared/services/users.service';
import { StringsService } from '../../../shared/services/strings.service';
import * as AuthentAction from './../../../shared/store/actions/authent.action';
import { IAppStore } from './../../../shared/common/interfaces';

@Component({
  selector: 'app-menu-icons',
  templateUrl: './menu-icons.component.html',
  styleUrls: ['./menu-icons.component.css']
})
export class MenuIconsComponent {

  constructor(
    public usersService: UsersService,
    public authService: AuthService,
    public str: StringsService,
    private store: Store<IAppStore>
  ) { }

  onLogout() {
    this.authService.logOut();
    // ------------------
    this.store.dispatch(new AuthentAction.LogOutStart());
  }

}
