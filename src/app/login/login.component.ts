import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { ApiResponse, AuthResponseData } from '../shared/models/response.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [HttpClient],
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
      username: ['', Validators.required], // For registration mode
      email: ['', [Validators.required, Validators.email]], // For both modes
      password: ['', [Validators.required, Validators.minLength(4)]], // For both modes
    });
  }

  ngOnInit(): void {
    // Initialize the form with only email and password fields
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('token')) {
      this.router.navigate(['/']); // Redirect to home if token exists
    }
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.message = '';
    this.messageType = '';
    this.submitted = false;

    if (this.isLoginMode) {
      // Remove the username field in login mode
      this.authForm.removeControl('username');
    } else {
      // Add the username field in registration mode
      this.authForm.addControl('username', this.formBuilder.control('', Validators.required));
    }

    // Reset the form when switching modes
    this.authForm.reset();
  }

  onSubmit(): void {
    this.submitted = true;
    this.message = '';
    this.messageType = '';

    if (this.authForm.invalid) {
      console.log('Invalid form:', this.authForm.errors); // Log form errors
      console.log('Form controls:', this.authForm.controls); // Log individual control errors
      return;
    }

    this.loading = true;

    const { username, email, password } = this.authForm.value;

    if (this.isLoginMode) {
      // Login with email and password
      this.authService.login(email, password).subscribe({
        next: (response) => this.handleAuthSuccess(response),
        error: (err) => this.handleAuthError(err),
      });
    } else {
      // Register with username, email, and password
      this.authService.register(username, email, password).subscribe({
        next: (response) => this.handleAuthSuccess(response),
        error: (err) => this.handleAuthError(err),
      });
    }
  }

  private handleAuthSuccess(response: ApiResponse<AuthResponseData>): void {
    this.message = response.message.en; // Use the English message
    this.messageType = 'success';
    this.loading = false;

    if (response.data?.token && response.data?.user) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      this.router.navigate(['/']);
    }

    if (!this.isLoginMode) {
      this.toggleMode(); // Switch back to login mode after successful registration
    }
  }

  private handleAuthError(err: any): void {
    this.message = err.error?.message?.en || (this.isLoginMode ? 'Login failed. Please check your credentials.' : 'Registration failed. Please try again.');
    this.messageType = 'error';
    this.loading = false;
  }
}