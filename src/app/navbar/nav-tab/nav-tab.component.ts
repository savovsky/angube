import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavLinksService } from '../nav-links.service';
import { UsersService } from 'src/app/service/users.service';


@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.css']
})
export class NavTabComponent implements OnInit {

  activeLink: string;

  constructor(
    private router: Router,
    public usersService: UsersService,
    public navLinksService: NavLinksService
  ) { }

  ngOnInit() {
    this.activeLink = this.router.url;
  }

}
