import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ProjectsDashboardComponent } from "../shared/projects-dashboard/projects-dashboard.component";
import { Project } from '../shared/projects-dashboard/project.model';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [
    ProjectsDashboardComponent,
    CommonModule,
    MatTabsModule,
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  currentProject: Project | null = null;
  userInfo: any = null;

  ngOnInit(): void {
    // Fetch user info if logged in
    this.loadUserInfo();
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: any, 
    private router: Router,
  ) {}

  loadUserInfo(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('user'); // Assuming user data is saved in localStorage
      if (userData) {
        this.userInfo = JSON.parse(userData);
      } else {
        // If user is not logged in, redirect to login page
        this.router.navigate(['/login']);
      }
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
