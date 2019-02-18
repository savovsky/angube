import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { UsernameValidators } from '../common/validators/username.validators';
import { DataStorageService } from '../service/data-storage.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

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
    ])
  });


  get userName() {
    return this.signUpForm.get('userNameFormControl');
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
    const userId = this.authService.uid;
    console.log('onAccountSave - clicked');
    console.log('User name = ', userName);
    console.log('User uid = ', userId);
    this.dataStorageService.addUser(userName)
      .subscribe(
        (response) => {
          console.log('addUser response = ', response);
          this.router.navigate(['home']);
        }
      );
  }

}
