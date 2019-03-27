import { Injectable } from '@angular/core';
import { StringService } from './strings.service';
import { Link, UserLink } from '../common/interfaces';


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

  userLinks: UserLink[] = [ // TODO use it!
    {
      link: this.str.myAccount,
      routerLink: '',
      queryParams: '',
      matIcon: 'person'
    },
    {
      link: this.str.logOut,
      routerLink: '',
      queryParams: '',
      matIcon: 'power_off'
    },
  ];

}
