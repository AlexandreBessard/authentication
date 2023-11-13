import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  // request returned and http handler, executed every time we send a request
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      // take the first user only once
      // take one value from that observable and unsubscribe automatically
      take(1),
      // pipe user observable, wait until we get the user and return a new observable by replacing the old observable
      exhaustMap(user => {
        // first time the user is null returned form the Observable
        if (!user) {
          // return an observable
          return next.handle(req);
        }
        // input parameters are immutable
        const modifiedReq = req.clone({
          // add token to all ongoing request
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
