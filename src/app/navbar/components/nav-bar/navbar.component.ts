import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../shared/services/auth.service';
import { DatabaseService } from '../../../shared/services/database.service';
import { User } from '../../../shared/common/interfaces';
import { StringsService } from 'src/app/shared/services/strings.service';
import { NavLinksService } from '../../services/nav-links.service';
import { UsersService } from 'src/app/shared/services/users.service';
import * as Utils from '../../../shared/common/utils';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [NavLinksService]
})
export class NavbarComponent implements OnInit {

  isRequesting: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private databaseService: DatabaseService,
    private authService: AuthService,
    private usersService: UsersService,
    private str: StringsService,
    private navLinksService: NavLinksService
  ) { }

    ngOnInit() {
      this.databaseService.getUserData(this.authService.uid)
        .subscribe(
          (response: User) => {
            if (response) {
              Utils.consoleLog(`(NavbarComponent) Get user data - Seccess: `, 'purple', response);
              this.usersService.updateCurrentUser(response);
            } else {
              Utils.consoleLog(`(NavbarComponent) Get user data - Seccess but null: `, 'purple', response);
              // TODO Error Screen - Max lecture 249.
              // This is the case when user is authenticated, but
              // there is no user's data in Data Storage for this user.(deleted)
            }
          },
          (error) => {
            Utils.consoleLog(`(NavbarComponent) Get user data - Error: `, 'red', error); // TODO Error Screen
          },
          () => {
            Utils.consoleLog(`(NavbarComponent) Get user data - Completed`, 'purple');
          }
        );
    }

    get menu() {
      return this.str.menu;
    }

    get angube() {
      return this.str.angube;
    }

    get appLinks() {
      return this.navLinksService.appLinks;
    }

    get currentUserName() {
      return this.usersService.currentUserName;
    }

    get isCurrentUserAdmin() {
      return this.usersService.isCurrentUserAdmin;
    }

}
