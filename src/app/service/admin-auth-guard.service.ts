import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { DataStorageService } from './data-storage.service';
import { UsersService } from './users.service';
import { User } from '../interfaces/interfaces';
import * as Utils from '../common/utils';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private dataStorageService: DataStorageService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
    if (this.usersService.isAdmin) {
      Utils.consoleLog(`(AdminAuthGuardService) Current user is Admin.`, 'darkTurquoise');
      return true;
    } else {
      return this.dataStorageService.getUserData(this.authService.uid)
        .pipe(
          map((response: User) => {
            if (response.isAdmin) {
              Utils.consoleLog(`(AdminAuthGuardService) Current user "${response.userName}" is Admin.`, 'darkTurquoise');
              return true;
            } else {
              Utils.consoleLog(`(AdminAuthGuardService) Current user "${response.userName}" is NOT Admin.`, 'darkTurquoise');
              this.router.navigate(['/app/access-denied']);
              return false;
            }
          })
        );
    }
  }
}
