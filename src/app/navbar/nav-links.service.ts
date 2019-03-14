import { Injectable } from '@angular/core';
import { StringService } from '../service/strings.service';
import { Link } from '../interfaces/interfaces';


@Injectable({
  providedIn: 'root'
})
export class NavLinksService {

  constructor(private str: StringService) { }

  appLinks: Link[] = [
    {
      link: this.str.home,
      routerLink: '/app/home'
    },
    {
      link: this.str.users,
      routerLink: '/app/users'
    },
    // {
    //   link: str.posts,
    //   routerLink: '/app/posts'
    // },
    {
      link: this.str.admin,
      routerLink: '/app/admin'
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
