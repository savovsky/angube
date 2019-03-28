import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UsersService } from '../../../shared/services/users.service';
import { StringsService } from '../../../shared/services/strings.service';

@Component({
  selector: 'app-menu-icons',
  templateUrl: './menu-icons.component.html',
  styleUrls: ['./menu-icons.component.css']
})
export class MenuIconsComponent {

  constructor(
    public usersService: UsersService,
    public authService: AuthService,
    public str: StringsService
  ) { }

  onLogout() {
    this.authService.logOut();
  }

}
