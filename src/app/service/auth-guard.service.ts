import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';


// @Injectable({
//   providedIn: 'root'
// })
// TODO - The New Way of doing DI in Angular
// this provides service in Appmodule
// https://medium.com/@tomastrajan/total-guide-to-angular-6-dependency-injection-providedin-vs-providers-85b7a347b59f

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
  ): boolean {
    // if (this.authService.token) { // TODO on refresh getting token is asynchron and it redirect...
    //   return true;
    // } else {
    //   this.router.navigate(['']);
    // }
    return true;
  }
}
