import { Injectable } from '@angular/core';
import {
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.isLoggedIn();
  }

  private isLoggedIn(): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn$.pipe(
      map((loggedIn) => {
        return loggedIn ? true : this.router.parseUrl('/');
      })
    );
  }
}
