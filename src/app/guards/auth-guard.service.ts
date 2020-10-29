import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public auth: AuthService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.auth.isAuthenticated() !== route.data.expectedAuth && !route.queryParams.store) {
      if (route.data.expectedAuth){
        this.router.navigate(['auth/signup'], { queryParamsHandling: 'preserve' });
      }
      return false;
    }
    return true;
  }
}
