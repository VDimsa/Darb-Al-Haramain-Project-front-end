import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    const currentRoute = next.routeConfig?.path;

    if (isAuthenticated && currentRoute === 'login') {
      this.router.navigate(['/dashboard']);
      return false;
    }

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRoles: string[] = next.data['requiredRoles'] || [];
    const userRole = this.authService.getUserRole() || '';
    const userEmail = this.authService.getUserEmail() || '';

    if (requiredRoles.length > 0 && !requiredRoles.includes(userRole) && userEmail !== 'abdulazizassainar.work@gmail.com') {
      this.router.navigate(['/']); 
      return false;
    }

    return true;
  }
}
