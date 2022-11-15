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
    localStorage.setItem('token', token);
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
    return localStorage.getItem('token');
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

  register(user: { nickname: string; password: string }) {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }

  login(nickname: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, { nickname, password }).pipe(
      tap((res: any) => {
        this.handleSuccessfulLogin(res['token']);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.next(false);
  }
}
