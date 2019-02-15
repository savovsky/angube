import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBw9E0kj8zySgLKAGhkomOmMunkxSW5ykA",
      authDomain: "angube-92c87.firebaseapp.com"
    })
  }
}
