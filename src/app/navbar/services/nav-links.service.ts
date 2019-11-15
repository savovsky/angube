import { Injectable } from '@angular/core';
import { StringsService } from '../../shared/services/strings.service';
import { ILink } from '../../shared/common/interfaces';


@Injectable()
export class NavLinksService {

  constructor(private str: StringsService) { }

  appLinks: ILink[] = [
    {
      link: this.str.home,
      routerLink: '/app/home',
      icon: 'home'
    },
    {
      link: this.str.dashboard,
      routerLink: '/app/dashboard',
      icon: 'web'
    },
    {
      link: this.str.forms,
      routerLink: '/app/forms',
      icon: 'live_help'
    },
    {
      link: this.str.users,
      routerLink: '/app/users',
      icon: 'group'
    }
  ];
}
