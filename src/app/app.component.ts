import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase/app';
import { credentials } from '../../credentialsFirebase';
import { AuthService } from './service/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService

) { }

  ngOnInit() {
    console.log('initializeApp');
    firebase.initializeApp(credentials);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          console.log('user is ON', user);
          this.authService.getSignedInUser(user);
      } else {
        console.log('user is OFF');
      }
    });
  }

  ngOnDestroy() {
    alert('OnDestroy');
    firebase.auth().signOut();
    console.log('OnDestroy');
  }
}
