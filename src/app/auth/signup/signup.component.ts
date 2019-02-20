import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { PasswordValidators } from 'src/app/common/validators/password.validators';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpForm = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      PasswordValidators.cannotContainSpace
    ]),
    confirmPasswordFormControl: new FormControl('', [
      Validators.required,
      PasswordValidators.mustBeEqualToPassword('passwordFormControl')
    ])
  });

  hide = true;

  constructor(private authService: AuthService) { }

  get email() {
    return this.signUpForm.get('emailFormControl');
  }

  get password() {
    return this.signUpForm.get('passwordFormControl');
  }

  passwordConfirm = this.signUpForm.get('confirmPasswordFormControl');

  isPasswordConfirmEmpty() {
    return this.passwordConfirm.hasError('required');
  }

  isPasswordConfirmMatch() {
    return this.passwordConfirm.hasError('mustBeEqualToPassword');
  }

  onSignUp() {
    const email: string = this.signUpForm.value.emailFormControl;
    const password: string = this.signUpForm.value.passwordFormControl;

    if (
      !this.isPasswordConfirmMatch() &&
      !this.isPasswordConfirmEmpty()
    ) {
      this.authService.signUpUser(email, password);
    }
  }
}
