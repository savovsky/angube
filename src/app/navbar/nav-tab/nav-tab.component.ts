import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


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
    // {
    //   link: 'Posts',
    //   routerLink: '/app/posts'
    // },
    {
      link: 'Admin',
      routerLink: '/app/admin'
    }
  ];

  activeLink: string;

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.activeLink = this.router.url;
  }

}
