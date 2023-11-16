// import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      // Check if the user has a valid token

      let token = this.tokenStorage.getToken();

      if (token == null) {
        // If not authenticated, redirect to the login page

        this.router.navigate(['/authentication/login']);
        return false;
  
      } else {
        // If authenticated, allow access to the route

        return true;
  
      }
  }
  
}
