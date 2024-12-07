import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ProjectsDashboardComponent } from "../projects-dashboard/projects-dashboard.component";
import { Project } from '../shared/project.model';

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
  projects: Project[] = [
    {
      id: 1,
      name: 'مشروع درب الحرمين',
      mapImage: 'https://res.cloudinary.com/dmyhr9fcz/image/upload/v1733557106/inv4kki12ltoa7fqoupo.webp',
      points: [
        { id: 1, type: 'school', position: { x: 20, y: 30 } },
        { id: 2, type: 'hospital', position: { x: 50, y: 60 } },
        { id: 3, type: 'building', position: { x: 70, y: 40 } },
        { id: 4, type: 'school', position: { x: 40, y: 80 } },
      ],
    },
    {
      id: 2,
      name: 'مشروع درب الحرمين',
      mapImage: 'https://res.cloudinary.com/dmyhr9fcz/image/upload/v1733557106/inv4kki12ltoa7fqoupo.webp',
      points: [
        { id: 1, type: 'school', position: { x: 20, y: 30 } },
        { id: 2, type: 'hospital', position: { x: 50, y: 60 } },
        { id: 3, type: 'building', position: { x: 70, y: 40 } },
        { id: 4, type: 'school', position: { x: 40, y: 80 } },
      ],
    },
    {
      id: 3,
      name: 'مشروع درب الحرمين الحرمين',
      mapImage: 'assets/image/projects/Darb-Al-Haramain-Project.webp',
      points: [
        { id: 1, type: 'school', position: { x: 20, y: 30 } },
        { id: 2, type: 'hospital', position: { x: 50, y: 60 } },
        { id: 3, type: 'building', position: { x: 70, y: 40 } },
        { id: 4, type: 'school', position: { x: 40, y: 80 } },
      ],
    },
    {
      id: 4,
      name: 'مشروع درب الحرمين',
      mapImage: 'assets/image/projects/Darb-Al-Haramain-Project.webp',
      points: [
        { id: 1, type: 'school', position: { x: 20, y: 30 } },
        { id: 2, type: 'hospital', position: { x: 50, y: 60 } },
        { id: 3, type: 'building', position: { x: 70, y: 40 } },
        { id: 4, type: 'school', position: { x: 40, y: 80 } },
      ],
    },
    {
      id: 5,
      name: 'مشروع درب الحرمين',
      mapImage: 'assets/image/projects/Darb-Al-Haramain-Project.webp',
      points: [
        { id: 1, type: 'school', position: { x: 20, y: 30 } },
        { id: 2, type: 'hospital', position: { x: 50, y: 60 } },
        { id: 3, type: 'building', position: { x: 70, y: 40 } },
        { id: 4, type: 'school', position: { x: 40, y: 80 } },
      ],
    },
    {
      id: 6,
      name: 'مشروع درب الحرمين',
      mapImage: 'assets/image/projects/Darb-Al-Haramain-Project.webp',
      points: [
        { id: 1, type: 'school', position: { x: 20, y: 30 } },
        { id: 2, type: 'hospital', position: { x: 50, y: 60 } },
        { id: 3, type: 'building', position: { x: 70, y: 40 } },
        { id: 4, type: 'school', position: { x: 40, y: 80 } },
      ],
    },
    {
      id: 7,
      name: 'مشروع درب الحرمين',
      mapImage: 'assets/image/projects/Darb-Al-Haramain-Project.webp',
      points: [
        { id: 1, type: 'school', position: { x: 20, y: 30 } },
        { id: 2, type: 'hospital', position: { x: 50, y: 60 } },
        { id: 3, type: 'building', position: { x: 70, y: 40 } },
        { id: 4, type: 'school', position: { x: 40, y: 80 } },
      ],
    },
    {
      id: 8,
      name: 'مشروع درب الحرمين',
      mapImage: 'assets/image/projects/Darb-Al-Haramain-Project.webp',
      points: [
        { id: 1, type: 'school', position: { x: 20, y: 30 } },
        { id: 2, type: 'hospital', position: { x: 50, y: 60 } },
        { id: 3, type: 'building', position: { x: 70, y: 40 } },
        { id: 4, type: 'school', position: { x: 40, y: 80 } },
      ],
    },
    {
      id: 9,
      name: 'مشروع درب الحرمين',
      mapImage: 'assets/image/projects/Darb-Al-Haramain-Project.webp',
      points: [
        { id: 1, type: 'school', position: { x: 20, y: 30 } },
        { id: 2, type: 'hospital', position: { x: 50, y: 60 } },
        { id: 3, type: 'building', position: { x: 70, y: 40 } },
        { id: 4, type: 'school', position: { x: 40, y: 80 } },
      ],
    },
    {
      id: 10,
      name: 'مشروع درب الحرمين',
      mapImage: 'assets/image/projects/Darb-Al-Haramain-Project.webp',
      points: [
        { id: 1, type: 'school', position: { x: 20, y: 30 } },
        { id: 2, type: 'hospital', position: { x: 50, y: 60 } },
        { id: 3, type: 'building', position: { x: 70, y: 40 } },
        { id: 4, type: 'school', position: { x: 40, y: 80 } },
      ],
    },
  ];

  projectData: Project | null = null;

  searchTerm: string = '';
  filteredProjects: Project[] = [];
  selectedProject: Project | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    //this.projectData = this.projects[0] || null;
    //this.selectedProject = this.projectData;
    this.filteredProjects = this.projects;
  }

  getIconName(type: string): string {
    switch (type) {
      case 'school':
        return 'school';
      case 'hospital':
        return 'medkit';
      case 'building':
        return 'business';
      default:
        return 'pin';
    }
  }

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

  selectProject(project: Project) {
    this.selectedProject = project;
  }

  backToSearch() {
    this.selectedProject = null;
    this.searchTerm = '';
    this.filteredProjects = [];
  }
}
