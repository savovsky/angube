import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UsernameValidators } from '../common/validators/username.validators';
import { DataStorageService } from '../service/data-storage.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  signUpForm = new FormGroup({

    userNameFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      UsernameValidators.cannotContainSpace,
      UsernameValidators.shouldBeUnique
    ]),
    firstNameFormControl: new FormControl('', [
      Validators.minLength(1),
      UsernameValidators.cannotContainSpace
    ])
  });


  get userName() {
    return this.signUpForm.get('userNameFormControl');
  }

  get firstName() {
    return this.signUpForm.get('firstNameFormControl');
  }

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onAccountSave() {
    const userName = this.signUpForm.get('userNameFormControl').value;
    const firstName = this.signUpForm.get('firstNameFormControl').value;
    const userId = this.authService.uid;
    console.log('onAccountSave - clicked');
    console.log('User name = ', userName);
    console.log('User uid = ', userId);
    const user = {
      userName,
      firstName
    };

    this.dataStorageService.addUser(user)
      .subscribe(
        (response: {userName: string}) => {
          console.log('addUser response = ', response);
          if (response.userName) {
            firebase.auth().currentUser.updateProfile({
              displayName: firstName,
              photoURL: null
            })
              .then(() => {
                this.router.navigate(['home']);
                console.log(firebase.auth().currentUser);
              })
              .catch(
                (err) => console.log(err)
              );
          }
        }
      );
  }

}
