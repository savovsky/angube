import { Injectable } from '@angular/core';
import { StringService } from './strings.service';
import { Link } from '../common/interfaces';


@Injectable()
export class NavLinksService {

  constructor(private str: StringService) { }

  appLinks: Link[] = [
    {
      link: this.str.home,
      routerLink: '/app/home'
    },
    {
      link: this.str.myDashboard,
      routerLink: '/app/dashboard'
    },
    {
      link: this.str.users,
      routerLink: '/app/users'
    }
  ];

  userLinks: Link[] = [ // TODO use it!
    {
      link: this.str.myAccount,
      routerLink: ''
    },
    {
      link: this.str.logOut,
      routerLink: ''
    },
  ];

}
