import { Router, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class NoAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // Replace this with your real token check
    const hasToken = !!this.auth.getToken();

    // If already logged in, redirect to home (or any page you like)
    return hasToken ? this.router.createUrlTree(['/']) : true;
  }
}
