import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
  });

  get email() {
    return this.signInForm.get('emailFormControl');
  }

  get password() {
    return this.signInForm.get('passwordFormControl');
  }

  constructor() { }

  ngOnInit() {
  }

  onSignIn() {
    console.log(this.signInForm);
  }

  onClick() {
    console.log(this.signInForm);
    console.log(this.signInForm.get('passwordFormControl'));
  }

}
