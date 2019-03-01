import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { credentials } from '../../credentialsFirebase';
import * as firebase from 'firebase/app';
import * as Utils from './common/utils';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService

) { }

  ngOnInit() {
    // Utils.consoleLog(`1.`, 'orange');
    firebase.initializeApp(credentials);
    // this.authService.userAuthState();
    // this.authService.eho()
    // .subscribe(
    //   (res) => {
    //     console.log('eho res = ', res);
    //   },
    //   (err) => console.log('eho err = ', err),
    //   () => console.log('eho completed ')
    // );
  }

}
