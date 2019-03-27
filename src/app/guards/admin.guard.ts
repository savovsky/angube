import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';
import { UsersService } from '../service/users.service';
import { DataStorageService } from '../service/data-storage.service';
import { User } from '../interfaces/interfaces';
import * as Utils from '../common/utils';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private dataStorageService: DataStorageService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
    if (this.usersService.isCurrentUserAdmin) {
      Utils.consoleLog(`(AdminGuard) Current user is Admin.`, 'darkTurquoise');
      return true;
    } else {
      return this.dataStorageService.getUserData(this.authService.uid)
        .pipe(
          map((response: User) => {
            if (response.isAdmin) {
              Utils.consoleLog(`(AdminGuard) Current user "${response.userName}" is Admin.`, 'darkTurquoise');
              return true;
            } else {
              Utils.consoleLog(`(AdminGuard) Current user "${response.userName}" is NOT Admin.`, 'darkTurquoise');
              this.router.navigate(['/app/access-denied']);
              return false;
            }
          })
        );
    }
  }
}
