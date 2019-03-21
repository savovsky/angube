import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import * as Utils from '../common/utils';
import { Router } from '@angular/router';
import { HttpResponseService } from '../service/http-response.service';



@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  isUserAuthorized = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private httpResponseService: HttpResponseService
    ) { }

  ngOnInit() {
    // Checking user authentication
    this.authService.userAuthState()
      .subscribe(
        (user) => {
          if (user) {
            this.isUserAuthorized = true;
            this.authService.currentUserToken(user.ra);
            this.authService.currentUserUid(user.uid);
            Utils.consoleLog(`User ${user.displayName} is Signed In.`, 'blue', user);
            // this.httpResponseService.auth.next(user);
          } else {
            Utils.consoleLog(`No user is Signed In.`, 'orange', user);
            this.router.navigate(['']);
          }
        },
        (error) => Utils.consoleLog(`userAuthState Error: `, 'red', error)
      );
  }

}
