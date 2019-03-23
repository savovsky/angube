import { Injectable } from '@angular/core';
import { Router, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Utils from '../common/utils';
import { Auth } from '../interfaces/interfaces';


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
            Utils.consoleLog(`User is Auth : ${response.displayName}`, 'blue');
            this.authService.currentUserToken(response.ra);
            this.authService.currentUserUid(response.uid);
            return true;
          } else {
            Utils.consoleLog(`User is NOT Auth`, 'cyan');
            this.router.navigate(['']);
            return false;
          }
        })
      );
  }
}
