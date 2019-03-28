import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { UsersService } from '../service/users.service';
import { StringService } from '../service/strings.service';

@Component({
  selector: 'app-menu-icons',
  templateUrl: './menu-icons.component.html',
  styleUrls: ['./menu-icons.component.css']
})
export class MenuIconsComponent {

  constructor(
    public usersService: UsersService,
    public authService: AuthService,
    public str: StringService
  ) { }

  onLogout() {
    this.authService.logOut();
  }

}
