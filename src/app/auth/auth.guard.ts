import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

// Executed just before a route is loaded. The route is loaded to the user if the conditions are met.
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // receive the actual route
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    // user is an observable
    return this.authService.user.pipe(
      take(1),
      // transform the observable value
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        // redirect the user when the url is blocked, new way to the redirection
        return this.router.createUrlTree(['/auth']);
      })
      // Old approach
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }
}
