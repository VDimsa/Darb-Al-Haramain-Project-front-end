import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectsDashboardComponent } from "../shared/projects-dashboard/projects-dashboard.component";
import { Project } from '../shared/models/project.model';
import { PointTypeEnum } from '../shared/models/project.model';
import { staticProjects } from '../../assets/staticPaths';
import { PreloaderService } from '../shared/preload/preloader.service';
import { Building, BuildingStatus, ApartmentStatus } from '../shared/models/building.model';
import { staticBuildings } from '../../assets/staticPaths';
import { BuildingViewerComponent } from "../shared/building-viewer/building-viewer.component"; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProjectsDashboardComponent,
    BuildingViewerComponent
]
})
export class HomeComponent {
  // Existing Project-related properties
  projects: Project[] = staticProjects;
  projectData: Project | null = null;
  searchTerm: string = '';
  filteredProjects: Project[] = [];
  selectedProject: Project | null = null;

  // Added Building-related properties
  buildings: Building[] = staticBuildings;
  buildingSearchTerm: string = '';
  filteredBuildings: Building[] = [];
  selectedBuilding: Building | null = null;

  constructor(
    private preloaderService: PreloaderService,
  ) {
    this.preloaderService.show();
  }

  ngOnInit() {
    // Initialize without selecting any project or building
    this.selectedProject = null;
    this.selectedBuilding = null;
    this.filteredProjects = [];
    this.filteredBuildings = [];

    //this.projectData = this.projects[0] || null;
    //this.selectedProject = this.projectData;
    //this.filteredProjects = this.projects;

    setTimeout(() => {
      this.preloaderService.hide();
    }, 2000);
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
        project.id!.toString().includes(term) || project.name.toLowerCase().includes(term)
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
    this.filteredProjects = [];
  }

  onBuildingSearchChange() {
    const term = this.buildingSearchTerm.toLowerCase();

    if (!term) {
      this.filteredBuildings = [];
    } else {
      this.filteredBuildings = this.buildings.filter(building =>
        building.id.toString().includes(term) || building.name.toLowerCase().includes(term)
      );
    }
  }

  /**
   * Selects a building and displays the BuildingViewerComponent.
   * Also resets any selected project.
   * @param building The selected building.
   */
  selectBuilding(building: Building) {
    this.selectedBuilding = building;
    this.selectedProject = null; // Reset project selection
    // Optionally, clear search terms and filtered lists
    this.buildingSearchTerm = '';
    this.filteredBuildings = [];
  }

  /**
   * Resets the building selection and returns to the building search view.
   */
  backToBuildingSearch() {
    this.selectedBuilding = null;
    this.buildingSearchTerm = '';
    this.filteredBuildings = [];
  }
}
