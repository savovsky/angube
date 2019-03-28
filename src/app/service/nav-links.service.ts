import { Injectable } from '@angular/core';
import { StringsService } from '../shared/services/strings.service';
import { Link } from '../shared/common/interfaces';


@Injectable()
export class NavLinksService {

  constructor(private str: StringsService) { }

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

}
