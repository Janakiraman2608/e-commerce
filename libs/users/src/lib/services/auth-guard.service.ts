import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalSService } from './localS.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private localStorage: LocalSService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorage.getToken();

    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode.isAdmin && !this.tokenExpired(tokenDecode.exp))
        return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  tokenExpired(expiration: number) {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
