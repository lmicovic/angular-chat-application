import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // If user is logged in
    if(this.authService.isLoggedIn() === true) {
      return true;
    }

    // If user is not logged in redirect to home page, or last visited page.
    this.router.navigate(["/login"], {queryParams: {returnUrl: state.url}});
    return false;
    
  }

}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthGuardService).canActivate(next, state);
}
