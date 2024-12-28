import { Component, Inject, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { ProjectsDashboardComponent } from "../shared/projects-dashboard/projects-dashboard.component";
import { Border, Point, PointTypeEnum, Project, ProjectsMap, ProjectsMapData } from '../shared/projects-dashboard/project.model';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
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
  currentProject: Partial<Project> = {
    id: null,
    name: '',
    logo: null,
    mapImage: '',
  };
  userInfo: any = null;

  currentStage: number = 0;
  projectViewer: boolean = false;

  selectedBorderPoint: Point | null = null; 
  uploadedBorderImage: string | null = null; 
  newPointBoarder: Partial<Point>|null = null;
  showNewMapImage: boolean = false;

  
  projectsMap: ProjectsMap = {
    projectId: null,
    pointId: null,
    mapImage: null,
    data: []
  };

  currentPointType: PointTypeEnum = PointTypeEnum.MALL;
  pointTypes = [
    { type: PointTypeEnum.MALL, icon: 'fa-cart-shopping' },
    { type: PointTypeEnum.MOSQUE, icon: 'fa-moon' },
    { type: PointTypeEnum.SCHOOL, icon: 'fa-graduation-cap' },
    { type: PointTypeEnum.RESTAURANT, icon: 'fa-utensils' },
    { type: PointTypeEnum.HOSPITAL, icon: 'fa-circle-h' },
  ];
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedBorderPoint'] && !changes['selectedBorderPoint'].firstChange) {
      this.onSelectedBorderPointChange(changes['selectedBorderPoint'].currentValue);
    }
  }
  
  getIcon(type: string): string {
    const icons: { [key: string]: string } = {
      mosque: 'fa-moon',
      school: 'fa-graduation-cap',
      restaurant: 'fa-utensils',
      mall: 'fa-cart-shopping',
      hospital: 'fa-circle-h',
    };
    return icons[type] || 'fa-question-circle';
  }
  
  onFileSelected(event: Event, field: 'logo' | 'mapImage'): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (field === 'logo') {
          this.currentProject.logo = reader.result as string;
        } else {
          this.currentProject.mapImage = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  getLogo(logoFile: File | string | undefined | null): string | null {
    if (!logoFile) return null;
  
    if (logoFile instanceof File) {
      const reader = new FileReader();
      let result: string | null = null;
  
      reader.onload = (event) => {
        result = event.target?.result as string;
      };
  
      reader.readAsDataURL(logoFile);
      return result; 
    }
  
    if (typeof logoFile === 'string') {
      return logoFile;
    }
  
    return null; 
  }
  
  onSelectedBorderPointChange(newBorderPoint: Point | null): void {
    this.selectedBorderPoint = newBorderPoint;
    console.log('Updated selected border point:', this.selectedBorderPoint);
  }
  
  onSubmit(): void {
    if (this.currentProject.name && this.currentProject.logo && this.currentProject.mapImage) {
      this.currentStage += 1;
      console.log('New project data:', this.currentProject);
    }
  }

  back() {
    if(this.currentStage > 0)
    this.currentStage -= 1;

    if(this.currentStage === 8)
      this.currentStage = 6;

    console.log('Current project data are: ', this.currentProject)
    console.log('Border data are: ', this.selectedBorderPoint)
    console.log('Current stage is: ', this.currentStage)
  }

  next() {
    if(this.currentStage < 10)
    this.currentStage += 1;
    
    console.log('Current project data are: ', this.currentProject)
    console.log('Border data are: ', this.selectedBorderPoint)
    console.log('Current stage is: ', this.currentStage)
  }

  toggleProjectViewer() {
    this.projectViewer = !this.projectViewer;
  }

  selectType(type: PointTypeEnum) {
    this.currentPointType = type;
  }
  
  triggerFileInput(point: any): void {
    if(this.currentStage === 2) {
      const fileInput = document.querySelector(`.hidden-input`);
      if (fileInput) {
        (fileInput as HTMLInputElement).click();
      }
    }
  }
  
  onImageChange(event: Event, point: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        point.logo = reader.result as string; 
      };
      reader.readAsDataURL(file);
    }
  }

  onBorderImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedBorderPoint!.pointMap = reader.result as string; 
        this.projectsMap.mapImage = reader.result as string; 
        this.projectsMap.projectId = this.currentProject.id || 0; 
        this.projectsMap.pointId = this.selectedBorderPoint!.id; 
        console.log('Uploaded border image:', this.selectedBorderPoint!.pointMap);
      };
      reader.readAsDataURL(file);
    }
  }
  
  onActionButtonClick(): void {
    if (this.selectedBorderPoint?.pointMap) {
      console.log('Action button clicked for border:', this.selectedBorderPoint);
  
      // Move to stage 7
      this.currentStage = 7;
    }
  }
  
  getMapImageSource(mapImage: string | File | null | undefined): string | null {
    if (!mapImage) return null;
    if (typeof mapImage === 'string') return mapImage;
    if (mapImage instanceof File) {
      return URL.createObjectURL(mapImage);
    }
    return null;
  }
  
}
