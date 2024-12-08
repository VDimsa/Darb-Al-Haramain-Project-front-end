import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ProjectsDashboardComponent } from "../shared/projects-dashboard/projects-dashboard.component";
import { Project } from '../shared/projects-dashboard/project.model';
import { PointTypeEnum } from '../shared/projects-dashboard/project.model';
import { staticProjects } from '../../assets/staticPaths';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProjectsDashboardComponent
  ]
})
export class HomeComponent {
  projects: Project[] = staticProjects;

  projectData: Project | null = null;
  searchTerm: string = '';
  filteredProjects: Project[] = [];
  selectedProject: Project | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.projectData = this.projects[0] || null;
    this.selectedProject = this.projectData;
    //this.filteredProjects = this.projects;
  }

  // Return the correct icon class based on the Point type
  getIconName(type: PointTypeEnum): string {
    switch (type) {
      case PointTypeEnum.SCHOOL:
        return 'fa-solid fa-graduation-cap';  
      case PointTypeEnum.HOSPITAL:
        return 'fa-solid fa-circle-h';  
      case PointTypeEnum.RESTAURANT:
        return 'fa-solid fa-utensils';  
      case PointTypeEnum.MALL:
        return 'fa-solid fa-cart-shopping';  
      case PointTypeEnum.MOSQUE:
        return 'fa-solid fa-moon';  
      default:
        return 'fa-solid fa-map-pin'; 
    }
  }

  // Search handler that filters projects based on the search term
  onSearchChange() {
    const term = this.searchTerm.toLowerCase();

    if (!term) {
      this.filteredProjects = [];
    } else {
      this.filteredProjects = this.projects.filter(project =>
        project.id.toString().includes(term) || project.name.toLowerCase().includes(term)
      );
    }
  }

  // Select a specific project
  selectProject(project: Project) {
    this.selectedProject = project;
  }

  // Reset search and go back to the search view
  backToSearch() {
    this.selectedProject = null;
    this.searchTerm = '';
    this.filteredProjects = this.projects;
  }
}
