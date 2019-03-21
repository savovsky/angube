import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import * as Utils from '../common/utils';
// import { mapTo, map, catchError } from 'rxjs/operators';
// import { HttpResponseService } from './http-response.service';
import { Observable, of } from 'rxjs';


// @Injectable({
//   providedIn: 'root'
// })
// REMIND - The New Way of doing DI in Angular
// this provides service in Appmodule
// https://medium.com/@tomastrajan/total-guide-to-angular-6-dependency-injection-providedin-vs-providers-85b7a347b59f

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    // private router: Router,
    // private httpResponseService: HttpResponseService
  ) { }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
  //   // TODO on refresh getting token is asynchron and with AuthGuardService it redirect.
  //   // if (this.authService.token) {
  //   //   return true;
  //   // } else {
  //   //   this.router.navigate(['']);
  //   // }
  //   return true;
  // }

  canActivate(): Observable<boolean> {
    return this.authService.userAuthState()
    .subscribe(
      (user) => {
        if (user) {
          Utils.consoleLog(`User ${user.displayName} is Signed In.`, 'cyan', user);
          return true;
        } else {
          Utils.consoleLog(`User ${user.displayName} is Signed In.`, 'yellow', user);
          return false;
        }
      },
      (error) => {
        Utils.consoleLog(`userAuthState Error: `, 'pink', error);
        return false;
      }
    );

    // return this.httpResponseService.auth.pipe(
    //   map((user) => {
    //     console.log('yyyyyyyyyyyy', user);
    //     return true;
    //   }),
    //   catchError((err) => {
    //     console.log('errrrrrrrrrrrr', err);
    //     return of(false);
    //   })
    // );


    // return this.httpResponseService.auth.pipe(
    //   mapTo(true)
    // );

    // this.httpResponseService.auth
    //   .subscribe(
    //     () => {
    //       console.log('eeeeeeeeeee');
    //       return true;
    //     }
    //   );
    // return true;

  }

}
