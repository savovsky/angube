import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import * as Utils from '../common/utils';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  isUserAuthorized = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.userAuthState()
    .subscribe(
      (user) => {
        Utils.consoleLog(`User ${user.displayName} is Signed In.`, 'purple');
        this.isUserAuthorized = true;
      },
      (error) => Utils.consoleLog(`logOutUser Error: `, 'red', error)
  );
  }

}
