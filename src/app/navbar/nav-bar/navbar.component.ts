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
    private usersService: UsersService,
    public str: StringService
    ) { }

    ngOnInit() {
      this.progressService.setProgressing(true);

      this.dataStorageService.getUserData(this.authService.uid)
      .subscribe(
        (response: User) => {
          if (response) {
            Utils.consoleLog(`getUserData Seccess: `, 'purple', response);
            this.authService.currentUserName(response.userName);
            this.authService.currentUserIsAdmin(response.isAdmin);
            this.authService.userAuth.next(response.isAdmin);
          } else {
            Utils.consoleLog(`getUserData Respose`, 'red', response);
          }
        },
        (error) => Utils.consoleLog(`getUserData Error: `, 'red', error),
        () => Utils.consoleLog(`getUserData Completed - navbar`, 'purple')
      );

      // Fetching all users
      this.dataStorageService.getItems()
        .subscribe(
          (usersArr) => {
            Utils.consoleLog(`getItems Seccess: `, 'purple', usersArr);
            this.usersService.storeUsers(usersArr);
            this.progressService.setProgressing(false);
          },
          (error) => {
            Utils.consoleLog(`getItems Error: `, 'red', error);
            this.progressService.setProgressing(false);
          },
          () => Utils.consoleLog(`getItems Completed - application`, 'purple')
        );
    }

}
