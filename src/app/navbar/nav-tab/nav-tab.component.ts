import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { str } from '../../fixtures/strings';


@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.css']
})
export class NavTabComponent implements OnInit {

  tabs = [
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

  activeLink: string;

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.activeLink = this.router.url;
  }

}
