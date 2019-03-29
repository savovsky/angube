import { Component } from '@angular/core';
import { NavLinksService } from '../../services/nav-links.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { RouterExtService } from '../../../shared/services/router-ext.service';


@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.css'],
  providers: [NavLinksService]
})
export class NavTabComponent {

  constructor(
    public usersService: UsersService,
    public navLinksService: NavLinksService,
    public routerExtService: RouterExtService
  ) { }

}
