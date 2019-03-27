import { Component } from '@angular/core';
import { NavLinksService } from '../nav-links.service';
import { UsersService } from 'src/app/service/users.service';
import { RouterExtService } from '../../service/router-ext.service';


@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.css']
})
export class NavTabComponent {

  constructor(
    public usersService: UsersService,
    public navLinksService: NavLinksService,
    public routerExtService: RouterExtService
  ) { }

}
