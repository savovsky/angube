import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthService } from '../../shared/services/auth.service';
import { IAppStore, IAuth } from '../../shared/common/interfaces';
import * as AuthentAction from '../../shared/store/actions/authent.action';
import * as Utils from '../../shared/common/utils';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<IAppStore>
  ) { }

  // TODO Check where are you using it and why ?!
  canActivateChild(): Observable<boolean> {
    return this.authService.userAuthState()
      .pipe(
        map((response: IAuth) => {
          if (response) {
            Utils.consoleLog(`(AuthGuard) User "${response.displayName}" is Authenticated. (canActivateChild)`, 'blue', response);
            const uid = response.uid;
            const token = response.ra;
            const email = response.email;
            this.authService.currentUserUid(uid);
            this.authService.currentUserToken(token);
            this.store.dispatch(new AuthentAction.AuthentUpdate({ uid, token, email }));
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

  // TODO Check where are you using it and why ?!
  canLoad(): Observable<boolean> {
    return this.authService.userAuthState()
    .pipe(
      map((response: IAuth) => {
        if (response) {
          Utils.consoleLog(`(AuthGuard) User "${response.displayName}" is Authenticated. (canLoad)`, 'blue', response);
          const uid = response.uid;
          const token = response.ra;
          const email = response.email;
          this.authService.currentUserUid(uid);
          this.authService.currentUserToken(token);
          this.store.dispatch(new AuthentAction.AuthentUpdate({ uid, token, email }));
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
