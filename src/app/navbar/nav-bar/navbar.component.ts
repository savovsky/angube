import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../service/auth.service';
import { ProgressService } from '../../service/progress.service';
import { DataStorageService } from '../../service/data-storage.service';
import { User } from '../../interfaces/interfaces';
import * as Utils from '../../common/utils';
import { StringService } from 'src/app/service/strings.service';
import { NavLinksService } from '../nav-links.service';
import { UsersService } from 'src/app/service/users.service';
import { RouterExtService } from 'src/app/router-ext.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    private dataStorageService: DataStorageService,
    public progressService: ProgressService,
    public navLinksService: NavLinksService,
    public usersService: UsersService,
    public routerExtService: RouterExtService,
    public str: StringService
    ) { }

    ngOnInit() {
      this.progressService.startProgresses(2);
      // TODO Find better way for handling the progress bar and react on Errors.

      this.dataStorageService.getUserData(this.authService.uid)
        .subscribe(
          (response: User) => {
            if (response) {
              Utils.consoleLog(`(NavbarComponent) Get user data - Seccess: `, 'purple', response);
              this.usersService.updateCurrentUser(response);
            } else {
              Utils.consoleLog(`(NavbarComponent) Get user data - Seccess but null: `, 'purple', response);
              // TODO Error Screen
              // This is the case when user is authenticated, but
              // there is no user's data in Data Storage for this user.(deleted)
            }
          },
          (error) => {
            Utils.consoleLog(`(NavbarComponent) Get user data - Error: `, 'red', error); // TODO Error Screen
          },
          () => {
            this.progressService.stopProgress();
            Utils.consoleLog(`(NavbarComponent) Get user data - Completed`, 'purple');
          }
        );

      this.dataStorageService.getAllUsersData()
        .subscribe(
          (response: User[]) => {
            Utils.consoleLog(`(NavbarComponent) Get users data - Seccess: `, 'magenta', response);
            this.usersService.storeUsers(response);
          },
          (error) => {
            Utils.consoleLog(`(NavbarComponent) Get users data - Error: `, 'red', error);
          },
          () => {
            this.progressService.stopProgress();
            Utils.consoleLog(`(NavbarComponent) Get users data  - Completed`, 'magenta');
          }
        );
    }

}
