import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../service/auth.service';
import { ProgressService } from '../../service/progress.service';
import { DataStorageService } from '../../service/data-storage.service';
import { User } from '../../interfaces/interfaces';
import * as Utils from '../../common/utils';


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
    public progressService: ProgressService
    ) { }

    ngOnInit() {
      this.dataStorageService.getUserData(this.authService.uid)
      .subscribe(
        (response: User) => {
          if (response) {
            Utils.consoleLog(`getUserData Seccess: `, 'purple', response);
            this.authService.currentUserName(response.userName);
            this.authService.currentUserIsAdmin(response.isAdmin);
          } else {
            Utils.consoleLog(`getUserData Respose`, 'red', response);
          }
        },
        (error) => Utils.consoleLog(`getUserData Error: `, 'red', error),
        () => Utils.consoleLog(`getUserData Completed`, 'purple')
      );
    }

}
