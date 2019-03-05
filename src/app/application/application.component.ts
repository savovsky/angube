import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import * as Utils from '../common/utils';
import { DataStorageService } from '../service/data-storage.service';
import { UsersAccountService } from '../service/users-account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  isUserAuthorized = false;
  isUsersFetched = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private usersAccountService: UsersAccountService
    ) { }

  ngOnInit() {
    this.authService.userAuthState()
    .subscribe(
      (user) => {
        if (user) {
          this.isUserAuthorized = true;
          this.authService.currentUserToken(user.ra);
          Utils.consoleLog(`User ${user.displayName} is Signed In.`, 'blue', user);

          this.dataStorageService.getItems() // TODO Is this a Bad pattern?
          .subscribe(
            (res) => {
              Utils.consoleLog(`getItems Seccess: `, 'purple', res);
              this.isUsersFetched = true;
              this.usersAccountService.storeUsers(res);
            },
            (error) => Utils.consoleLog(`getItems Error: `, 'red', error),
            () => Utils.consoleLog(`getItems Completed`, 'purple')
          );
        } else {
          this.router.navigate(['']);
        }
      },
      (error) => Utils.consoleLog(`logOutUser Error: `, 'red', error)
    );

  }

}
