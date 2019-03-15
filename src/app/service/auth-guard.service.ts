import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import * as Utils from '../common/utils';
import { map } from 'rxjs/operators';
import { HttpResponseService } from './http-response.service';


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
    private router: Router,
    private httpResponseService: HttpResponseService
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

  canActivate() {
    // this.httpResponseService.auth.pipe(
    //   map((e) => {
    //     if (e) {
    //       console.log('eeeeeeeeeee');
    //     }
    //   })
    // );
    this.httpResponseService.auth
      .subscribe(
        () => {
          console.log('eeeeeeeeeee');
          return true;
        }
      );
    return true;
  }

}
