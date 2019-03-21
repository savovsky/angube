import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import * as Utils from '../common/utils';
import {switchMap, tap, map, catchError } from 'rxjs/operators';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    // TODO on refresh getting isAdmin is asynchron and with AdminAuthGuardService it redirect.
    // if (this.authService.isAdmin) {
    //   return true;
    // } else {
    //   this.router.navigate(['/app/access-denied']);
    //   return false;
    // }


    // return this.authService.userAuth.subscribe(
    //     (isAdmin: boolean) => {
    //       if (isAdmin) {
    //         Utils.consoleLog(`User is Admin.`, 'cyan');
    //         return true;
    //       } else {
    //         Utils.consoleLog(`User is NOT Admin`, 'cyan');
    //         this.router.navigate(['/app/access-denied']);
    //         return false;
    //       }
    //     },
    //     (error) => {
    //       Utils.consoleLog(`userAuth Error: `, 'pink', error);
    //       return false;
    //     }
    //   );
    return this.authService.userAuth.pipe(
        map((isAdmin: boolean) => {
          if (isAdmin) {
            Utils.consoleLog(`User is Admin.`, 'cyan');
            return true;
          } else {
            Utils.consoleLog(`User is NOT Admin`, 'cyan');
            this.router.navigate(['/app/access-denied']);
            return false;
          }
        })
        // catchError((error) => {
        //   Utils.consoleLog(`userAuth Error: `, 'pink', error);
        //   return false;
        // })
        // (error) => {
        //   Utils.consoleLog(`userAuth Error: `, 'pink', error);
        //   return false;
        // }
      );

  }
}
