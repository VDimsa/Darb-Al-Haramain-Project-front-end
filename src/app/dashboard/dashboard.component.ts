import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ProjectsDashboardComponent } from "../shared/projects-dashboard/projects-dashboard.component";
import { PointTypeEnum, Project } from '../shared/projects-dashboard/project.model';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [
    ProjectsDashboardComponent,
    CommonModule,
    MatTabsModule,
    FormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  currentProject: Project | null = null;
  userInfo: any = null;
  
  newProject: Partial<Project> = {
    name: '',
    mapImage: '',
  };

  logo: File | null = null;
  previewLogo: string | null = null;
  previewMapImage: string | null = null;
  dashboardVisible: boolean = true;

  constructor(
    private router: Router,
  ) {}

  onFileSelected(event: Event, field: 'logo' | 'mapImage'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (field === 'logo') {
          this.previewLogo = reader.result as string;
          this.logo = file;
        } else {
          this.previewMapImage = reader.result as string;
          this.newProject.mapImage = file;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.newProject.name && this.logo && this.newProject.mapImage) {
      this.dashboardVisible = false;
      this.currentProject = {
        id: null,
        name: this.newProject.name,
        mapImage: this.newProject.mapImage,
        autoScroll: {
          x: 0, 
          y: 0
        },
        points: [
          {
            id: 1,
            name: this.newProject.name,
            type: PointTypeEnum.PROJECT,
            isProject: true,
            logo: this.logo,
            position: { 
              x: 0,
              y: 0,
            },
          }
        ],
      }
      console.log('New project data:', this.currentProject);
    }
  }

  backToDashboard() {
    this.dashboardVisible = true;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
