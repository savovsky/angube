import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu-icons',
  templateUrl: './menu-icons.component.html',
  styleUrls: ['./menu-icons.component.css']
})
export class MenuIconsComponent {

  constructor(public authService: AuthService) { }

  onLogout() {
    this.authService.logOutUser();
  }

}
