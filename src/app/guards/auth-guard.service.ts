import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ServerResponse } from '../models/server-response.model';
import { AuthService } from '../services/auth.service';
import { StoreService } from '../services/init-store.service';
import { SettingsService } from '../services/settings.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  error: boolean = false;
  q;
  constructor(public auth: AuthService, public router: Router
    , private route: ActivatedRoute,
    private storeService: StoreService,
    private settingsService: SettingsService,) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(state["url"]);
    this.q = route.queryParams['q'];
    console.log(this.q);
    if (this.auth.isAuthenticated() != route.data.expectedAuth) {
      if (route.data.expectedAuth) {
        this.router.navigate(['error']);
      }
      else {
        if (this.q) {
          this.initStore();
        }
        else {
          this.router.navigate(['products']);
          return false;
        }
      }
    }
    else {
      if (!route.data.expectedAuth) {
        if (this.q) {
          this.initStore();
        }
        else {
          this.router.navigate(['error']);
          return false;
        }
      }
    }

    // if (this.auth.isAuthenticated() !== route.data.expectedAuth && !route.queryParams.store) {
    //   if (route.data.expectedAuth) {
    //     this.router.navigate(['auth/signup'], { queryParamsHandling: 'preserve' });
    //   }
    //   console.log(this.auth.isAuthenticated(), route.data.expectedAuth, route.queryParams.store);
    //   return false;
    // }
    // console.log("dini-dini");
    return true;
  }
  initStore() {
    this.storeService.initStore(this.q).subscribe((response: ServerResponse) => {
      console.log(response);
      if (parseInt(response.data.store_active, 10) && response.data.token) {
        console.log("i am active");
        this.auth.setToken(response.data.token);
        this.router.navigate(['products'], {
        });
        return false;
      } else {
        if (response.response == "error") {
          this.error = true;
          this.router.navigate(['error']);
          return false;
        }
        else if (response.data.client_id) {
          console.log("set client id");
          this.settingsService.setClientId(response.data.client_id);
          this.settingsService.setMasof(response.data.masof);
          this.auth.removeToken();
          if (!response.data.status) {
            this.router.navigate(['lead']);
            return false;
          }
          return true;
        }
        // this.isInitializing = false;
      }
    });
  }
}

