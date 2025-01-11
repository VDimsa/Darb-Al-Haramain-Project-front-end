import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, AuthResponseData } from '../../shared/models/response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

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
          // Return a structured error response
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
        role_id, // Default role_id is 1 (user)
      })
      .pipe(
        catchError((error) => {
          console.error('Registration error:', error);
          // Return a structured error response
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
}