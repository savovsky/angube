import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.css']
})
export class NavTabComponent implements OnInit {

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

  activeLink: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.activeLink = this.router.url;
  }

}
