import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  /**
   * Allow routing only if user is logged in
   */
  canActivate() {
    if (!this.auth.isUserLoggedIn()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

}
