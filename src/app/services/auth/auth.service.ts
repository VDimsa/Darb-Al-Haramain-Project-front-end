import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, AuthResponseData } from '../../shared/models/response.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  // Login with email and password
  login(email: string, password: string): Observable<ApiResponse<AuthResponseData>> {
    return this.http
      .post<ApiResponse<AuthResponseData>>(`${environment.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(() => ({
            successful: false,
            message: {
              en: error.error?.message?.en || 'Invalid credentials',
              ar: error.error?.message?.ar || 'بيانات الاعتماد غير صالحة',
            },
            data: null,
          }));
        })
      );
  }

  // Register with username, email, password, and role_id
  register(username: string, email: string, password: string, role_id: number = 1): Observable<ApiResponse<AuthResponseData>> {
    return this.http
      .post<ApiResponse<AuthResponseData>>(`${environment.apiUrl}/auth/register`, {
        username,
        email,
        password,
        role_id,
      })
      .pipe(
        catchError((error) => {
          console.error('Registration error:', error);
          return throwError(() => ({
            successful: false,
            message: {
              en: error.error?.message?.en || 'Registration failed',
              ar: error.error?.message?.ar || 'فشل التسجيل',
            },
            data: null,
          }));
        })
      );
  }

  // Check if the token is expired
  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    return token ? this.jwtHelper.isTokenExpired(token) : true;
  }

  // Logout the user
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}