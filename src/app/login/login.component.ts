import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
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
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    // Initialize form with validators
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('token')) {
      this.router.navigate(['/']);  // Redirect to home if token exists
    }
  }

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.message = '';
    this.messageType = '';
    this.submitted = false;
  
    if (this.isLoginMode) {
      // If login mode, remove email validation
      this.authForm.get('email')?.clearValidators();
      this.authForm.get('username')?.setValidators([Validators.required]);
    } else {
      // If register mode, add email validation
      this.authForm.get('email')?.setValidators([Validators.required, Validators.email]);
      this.authForm.get('username')?.clearValidators();
    }
  
    // Update the validity of the fields
    this.authForm.get('email')?.updateValueAndValidity();
    this.authForm.get('username')?.updateValueAndValidity();
  
    // Reset the form to clear values when switching modes
    this.authForm.reset();
  
    // Optionally, if you want to keep the username field value, do something like this:
    if (this.isLoginMode) {
      this.authForm.get('username')?.setValue(this.authForm.get('username')?.value);
    }
  }
    
  onSubmit(): void {
    this.submitted = true;
    this.message = '';
    this.messageType = '';

    if (this.authForm.invalid) {
      return;
    }

    this.loading = true;

    if (this.isLoginMode) {
      this.login();
    } else {
      this.register();
    }
  }

  login(): void {
    const loginData = {
      username: this.authForm.value.username,
      password: this.authForm.value.password,
    };

    console.log('loginData are: ', loginData)
    this.http
      .post(`${environment.apiUrl}/auth/login`, loginData)
      .subscribe({
        next: (response: any) => {
          this.message = response.message.en;
          this.messageType = 'success';
          this.loading = false;

          console.log(response.success, response.message.en)
          // Store the token and navigate to the home page
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.message = 'Login failed. Please check your credentials.';
          this.messageType = 'error';
          this.loading = false;
        },
      });
  }

  register(): void {
    const registerData = {
      username: this.authForm.value.username,
      email: this.authForm.value.email,
      password: this.authForm.value.password,
    };

    this.http
      .post(`${environment.apiUrl}/auth/register`, registerData)
      .subscribe({
        next: (response: any) => {
          this.message = response.message.en;
          this.messageType = 'success';
          this.loading = false;
          this.toggleMode(); 
        },
        error: (err) => {
          this.message = 'Registration failed. Please try again.';
          this.messageType = 'error';
          this.loading = false;
        },
      });
  }
}
