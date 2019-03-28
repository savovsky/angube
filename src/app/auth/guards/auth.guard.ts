import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { Auth } from '../../shared/common/interfaces';
import * as Utils from '../../shared/common/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivateChild(): Observable<boolean> {
    return this.authService.userAuthState()
      .pipe(
        map((response: Auth) => {
          if (response) {
            Utils.consoleLog(`(AuthGuard) User "${response.displayName}" is Authenticated.`, 'blue');
            this.authService.currentUserToken(response.ra);
            this.authService.currentUserUid(response.uid);
            return true;
          } else {
            Utils.consoleLog(`(AuthGuard) User is NOT Authenticated.`, 'blue');
            this.router.navigate(['']);
            return false;
          }
        })
      );
  }
}
