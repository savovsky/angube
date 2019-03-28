import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { UsersService } from '../service/users.service';
import { DatabaseService } from '../shared/services/database.service';
import { User } from '../shared/common/interfaces';
import * as Utils from '../shared/common/utils';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private databaseService: DatabaseService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
    if (this.usersService.isCurrentUserAdmin) {
      Utils.consoleLog(`(AdminGuard) Current user is Admin.`, 'darkTurquoise');
      return true;
    } else {
      return this.databaseService.getUserData(this.authService.uid)
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
