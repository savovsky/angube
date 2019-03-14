import { str } from '../fixtures/strings';

export const appLinks = [
    {
      link: str.home,
      routerLink: '/app/home'
    },
    {
      link: str.users,
      routerLink: '/app/users'
    },
    // {
    //   link: str.posts,
    //   routerLink: '/app/posts'
    // },
    {
      link: str.admin,
      routerLink: '/app/admin'
    }
  ];

export const userLinks = [ // TODO use it!
    {
      link: str.myAccount,
      routerLink: ''
    },
    {
      link: str.logOut,
      routerLink: ''
    },
  ];
