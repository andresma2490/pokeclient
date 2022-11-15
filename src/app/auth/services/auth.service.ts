import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '@environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = `${environment.API_URL}/${environment.API_VERSION}`;
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private http: HttpClient) {}

  private handleSuccessfulLogin(token: string): void {
    localStorage.setItem('access_token', token);
    this.isLoggedIn.next(true);
    this.redirectToHome();
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedIn.asObservable().pipe(
      map(() => {
        return this.getToken() != null ? true : false;
      })
    );
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

  login(email: string, password: string) {
    return this.http
      .post(`${this.baseUrl}/auth/login`, { email, password })
      .pipe(
        tap((res: any) => {
          this.handleSuccessfulLogin(res['access_token']);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.isLoggedIn.next(false);
  }
}
