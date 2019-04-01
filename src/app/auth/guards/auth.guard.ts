import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { Auth } from '../../shared/common/interfaces';
import * as Utils from '../../shared/common/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivateChild(): Observable<boolean> {
    return this.authService.userAuthState()
      .pipe(
        map((response: Auth) => {
          if (response) {
            Utils.consoleLog(`(AuthGuard) User "${response.displayName}" is Authenticated. (canActivateChild)`, 'blue');
            this.authService.currentUserToken(response.ra);
            this.authService.currentUserUid(response.uid);
            return true;
          } else {
            Utils.consoleLog(`(AuthGuard) User is NOT Authenticated. (canActivateChild)`, 'blue');
            this.router.navigate(['']);
            return false;
          }
        })
      );
  }

  canActivate(): Observable<boolean> { // TODO - Not using this method.
    return this.canActivateChild();
  }

  canLoad(): Observable<boolean> {
    return this.authService.userAuthState()
    .pipe(
      map((response: Auth) => {
        if (response) {
          Utils.consoleLog(`(AuthGuard) User "${response.displayName}" is Authenticated. (canLoad)`, 'blue');
          this.authService.currentUserToken(response.ra);
          this.authService.currentUserUid(response.uid);
          return true;
        } else {
          Utils.consoleLog(`(AuthGuard) User is NOT Authenticated. (canLoad)`, 'blue');
          this.router.navigate(['']);
          return false;
        }
      }),
      take(1) // REMIND - If using an observable 'CanLoad' expects to complete !!!
    );
  }

}
