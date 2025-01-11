import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt'; 

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private jwtHelper = new JwtHelperService();

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      if (token && !this.jwtHelper.isTokenExpired(token)) {
        return true; // Token is valid
      } else {
        // Token is expired or missing
        localStorage.removeItem('token'); // Clear expired token
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: this.router.url }, // Pass the current URL for redirection after login
        });
        return false;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}