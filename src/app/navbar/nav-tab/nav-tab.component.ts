import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { appLinks } from '../nav-links';
import { Link } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.css']
})
export class NavTabComponent implements OnInit {

  appLinks: Link[] = appLinks;

  activeLink: string;

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.activeLink = this.router.url;
  }

}
