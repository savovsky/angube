import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringService {
    angube = 'angube';
    menu = 'menu';
    home = 'home';
    users = 'users';
    admin = 'admin';

    myAccount = 'my account';
    userAccount = 'user account';
    userDetails = 'user details';
    userid = 'user id';
    userName = 'user name';
    firstName = 'first name';
    lastName = 'last name';
    birthdate = 'birth date';

    logOut = 'log out';
    signIn = 'sign in';
    signUp = 'sign up';
    email = 'email';
    password = 'password';
    confirmPassword = 'confirm password';
    submit = 'submit';
    save = 'save';
    cancel = 'cancel';
    edit = 'edit';
    message = 'message';
    block = 'block';
    unblock = 'unblock';
    yes = 'yes';
    notNow = 'not now';

    blockedUser = 'blocked user';
    like = 'like';
    share = 'share';

    welcomeTo = 'welcome to';
    alreadyHaveAnAccount = 'already have an account';
    firstTimeUser = 'first time user';
    notRegisteredYet = 'not registered yet';
    wouldYouLikeToUpdateYourAccount = 'would you like to update your account';
    emailIs = 'email is'; // TODO Remove
    passwordIs = 'password is'; // TODO Remove
    required = 'required';
    passwordShouldBeAtLeast = 'password should be at least';
    characters = 'characters';
    passwordCannotContainSpace = 'password cannot contain space';
    pleaseEnterPassword = 'please enter a password';
    passwordConfirmationIs = 'password confirmation is';
    passwordDoesNotMatch = 'password does not match';

    // Input Errors
    requiredField = 'Required field';
    cannotContainSpace = 'Field cannot contain space';
    invalidEmailAddress = 'Invalid email address';
}
