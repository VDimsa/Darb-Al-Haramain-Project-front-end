import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ProjectsDashboardComponent } from "../shared/projects-dashboard/projects-dashboard.component";
import { Project } from '../shared/projects-dashboard/project.model';
import { url } from 'inspector';

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
      autoScroll: { x: 100, y: 20},
      mapImage: 'https://res.cloudinary.com/dmyhr9fcz/image/upload/v1733557106/inv4kki12ltoa7fqoupo.webp',
      points: [
        {
          id: 1, type: 'project', position: { x: 39, y: 48 },
          name: '',
          logo: new URL("https://res.cloudinary.com/dmyhr9fcz/image/upload/v1733559930/ogx0jgirrgqrjq70gjed.ico"),
          isProejct: true
        },
        {
          id: 2, type: 'hospital', position: { x: 60, y: 32 },
          name: '',
          isProejct: false
        },
        {
          id: 3, type: 'hospital', position: { x: 69, y: 61 },
          name: '',
          isProejct: false
        },
        {
          id: 4, type: 'hospital', position: { x: 28, y: 40 },
          name: '',
          isProejct: false
        },
        {
          id: 5, type: 'mall', position: { x: 54.3, y: 30 },
          name: '',
          isProejct: false
        },
        {
          id: 6, type: 'mall', position: { x: 63, y: 29 },
          name: '',
          isProejct: false
        },
        {
          id: 7, type: 'mall', position: { x: 29, y: 52 },
          name: '',
          isProejct: false
        },
        {
          id: 8, type: 'restaurant', position: { x: 42, y: 37 },
          name: '',
          isProejct: false
        },
        {
          id: 9, type: 'school', position: { x: 75, y: 51 },
          name: '',
          isProejct: false
        },
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
    //this.filteredProjects = this.projects;
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
