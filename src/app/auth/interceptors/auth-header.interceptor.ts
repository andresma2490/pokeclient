import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '@environments/environment';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      this.authService.getToken() === null ||
      this.isThirdPartyRequest(request.url)
    ) {
      return next.handle(request);
    }

    const requestWithHeaders = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });

    return next.handle(requestWithHeaders);
  }

  isThirdPartyRequest(url: string) {
    return url.startsWith(environment.API_URL) === false;
  }
}
