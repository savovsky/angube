import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    // TODO on refresh getting isAdmin is asynchron and with AdminAuthGuardService it redirect.
    if (this.authService.isAdmin) {
      return true;
    } else {
      this.router.navigate(['/app/access-denied']);
      return false;
    }
  }

}
