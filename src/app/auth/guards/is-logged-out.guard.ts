import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedOutGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.isLoggedOut();
  }

  private isLoggedOut(): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn$.pipe(
      map((loggedIn) => {
        return loggedIn ? this.router.parseUrl('/') : true;
      })
    );
  }
}
