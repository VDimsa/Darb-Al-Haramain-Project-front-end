import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private userState = new BehaviorSubject<any>(this.loadUserFromStorage()); 

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/user/auth/login`, credentials)
      .pipe(
        map((response) => {
          if (response.success && response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            this.userState.next(response.data.user);
            return {
              success: true,
              token: response.data.token,
              user: response.data.user,
            };
          } else {
            return { success: false, message: 'Invalid credentials' };
          }
        }),
      );
  }

  isAuthenticated(): boolean {
    return (
      typeof localStorage !== 'undefined' && !!localStorage.getItem('token')
    );
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('fcmtoken');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.userState.next(null); 
    }
    this.router.navigate(['/login']);
  }

  getUserData() {
    if (typeof localStorage !== 'undefined') {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  getUserRole(): string | null {
    const user = this.getUserData();
    return user && user.type ? user.type.type : null;
  }

  getUserEmail(): string | null {
    const user = this.getUserData();
    return user ? user.email : null;
  }

  getUserState(): Observable<any> {
    return this.userState.asObservable();
  }

  private loadUserFromStorage(): any {
    if (typeof localStorage !== 'undefined') {
      const userData = localStorage.getItem('user');
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }
}
