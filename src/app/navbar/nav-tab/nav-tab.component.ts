import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NavLinksService } from '../nav-links.service';


@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.css']
})
export class NavTabComponent implements OnInit {

  activeLink: string;

  constructor(
    private router: Router,
    public authService: AuthService,
    public navLinksService: NavLinksService
  ) { }

  ngOnInit() {
    this.activeLink = this.router.url;
  }

}
