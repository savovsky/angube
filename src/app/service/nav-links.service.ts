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
      link: this.str.admin,
      routerLink: '/app/admin'
    },
    {
      link: this.str.users,
      routerLink: '/app/users'
    }
    // {
    //   link: str.posts,
    //   routerLink: '/app/posts'
    // }
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
