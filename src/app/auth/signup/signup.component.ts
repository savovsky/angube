import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { PasswordValidators } from 'src/app/common/validators/password.validators';
import { UsernameValidators } from 'src/app/common/validators/username.validators';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      PasswordValidators.cannotContainSpace
    ]),
    userNameFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      UsernameValidators.cannotContainSpace,
      UsernameValidators.shouldBeUnique
    ])
  });



  get email() {
    return this.signUpForm.get('emailFormControl');
  }

  get password() {
    return this.signUpForm.get('passwordFormControl');
  }

  get userName() {
    return this.signUpForm.get('userNameFormControl');
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp() {
    const email : string = this.signUpForm.value.emailFormControl;
    const password : string = this.signUpForm.value.passwordFormControl;
    // console.log('submit ', this.signUpForm);
    // console.log('email = ', email);
    // console.log('password = ', password);
    this.authService.signUpUser(email, password);
  }

  onClick() {
    // console.log(this.signUpForm);
    // console.log(this.signUpForm.get('userNameFormControl'));
  }

}
