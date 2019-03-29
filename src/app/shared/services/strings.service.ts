import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringsService {
    angube = 'angube';
    menu = 'menu';
    home = 'home';
    users = 'users';
    myDashboard = 'my dashboard';

    myAccount = 'my account';
    userAccount = 'user account';
    userDetails = 'user details';
    uid = 'user id';
    userName = 'user name';
    firstName = 'first name';
    lastName = 'last name';
    birthdate = 'birth date';
    isAdmin = 'user is admin';
    isBlocked = 'user is blocked';

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

    required = 'required';

    passwordCannotContainSpace = 'password cannot contain space';
    pleaseEnterPassword = 'please enter a password';
    passwordConfirmationIs = 'password confirmation is';
    passwordDoesNotMatch = 'password does not match';

    // Input Errors
    requiredField = 'required field';
    cannotContainSpace = 'field cannot contain space';
    invalidEmailAddress = 'invalid email address';
    passwordShouldBeAtLeast = 'password should be at least';
    characters = 'characters';

    // Icons
    powerOff = 'power_off';
}
