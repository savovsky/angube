import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.css']
})
export class NavTabComponent {

  tabs = [
    {
      link: 'Home',
      routerLink: '/app/home'
    },
    {
      link: 'Users',
      routerLink: '/app/users'
    },
    {
      link: 'Posts',
      routerLink: '/app/posts'
    },
  ];

  activeLink = this.tabs[0].link;

}
