import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Auth } from '../interfaces/interfaces';
import * as Utils from '../common/utils';


@Injectable()
export class AuthGuardService implements CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivateChild(): Observable<boolean> {
    return this.authService.userAuthState()
      .pipe(
        map((response: Auth) => {
          if (response) {
            Utils.consoleLog(`(AuthGuardService) User "${response.displayName}" is Authenticated.`, 'blue');
            this.authService.currentUserToken(response.ra);
            this.authService.currentUserUid(response.uid);
            return true;
          } else {
            Utils.consoleLog(`(AuthGuardService) User is NOT Authenticated.`, 'blue');
            this.router.navigate(['']);
            return false;
          }
        })
      );
  }
}
