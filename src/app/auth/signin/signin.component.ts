import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignIn() {
    // console.log(this.signInForm);
    const email: string = this.signInForm.value.emailFormControl;
    const password: string = this.signInForm.value.passwordFormControl;
    // console.log('email = ', email);
    // console.log('password = ', password);
    this.authService.signInUser(email, password);
  }

  onClick() {
    // console.log(this.signInForm);
    // console.log(this.signInForm.get('passwordFormControl'));
  }

}
