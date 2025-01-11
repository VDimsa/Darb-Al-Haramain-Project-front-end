import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { ApiResponse, AuthResponseData } from '../shared/models/response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authForm: FormGroup;
  isLoginMode: boolean = true;
  loading: boolean = false;
  submitted: boolean = false;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.message = '';
    this.messageType = '';
    this.submitted = false;

    if (this.isLoginMode) {
      this.authForm.removeControl('username');
    } else {
      this.authForm.addControl('username', this.formBuilder.control('', Validators.required));
    }

    this.authForm.reset();
  }

  onSubmit(): void {
    this.submitted = true;
    this.message = '';
    this.messageType = '';

    if (this.authForm.invalid) {
      return;
    }

    this.loading = true;

    const { username, email, password } = this.authForm.value;

    if (this.isLoginMode) {
      // Login with email and password
      this.authService.login(email, password).subscribe({
        next: (response) => {
          if (response.successful) {
            this.handleAuthSuccess(response);
          } else {
            this.handleAuthError(response);
          }
        },
        error: (err) => this.handleAuthError(err),
      });
    } else {
      // Register with username, email, and password
      this.authService.register(username, email, password).subscribe({
        next: (response) => {
          if (response.successful) {
            this.handleAuthSuccess(response);
          } else {
            this.handleAuthError(response);
          }
        },
        error: (err) => this.handleAuthError(err),
      });
    }
  }

  private handleAuthSuccess(response: ApiResponse<AuthResponseData>): void {
    this.message = response.message.ar; // Show Arabic message
    this.messageType = 'success';
    this.loading = false;

    if (response.successful && response.data?.token && response.data?.user) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      this.router.navigate(['/']);
    }

    if (!this.isLoginMode) {
      this.toggleMode(); // Switch back to login mode after successful registration
    }
  }

  private handleAuthError(err: ApiResponse<AuthResponseData>): void {
    const arMessage = err.message?.ar;
    this.message = arMessage || (this.isLoginMode ? 'بيانات الاعتماد غير صالحة' : 'فشل التسجيل');
    this.messageType = 'error';
    this.loading = false;
    console.error('Authentication error:', err);
  }
}