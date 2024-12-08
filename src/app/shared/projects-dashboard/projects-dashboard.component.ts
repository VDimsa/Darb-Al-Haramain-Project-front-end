import { Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pointTypes, PointType, Project, Point } from './project.model';
import { PreloadComponent } from "../preload/preload.component";

@Component({
  selector: 'app-projects-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PreloadComponent
],
  templateUrl: './projects-dashboard.component.html',
  styleUrls: ['./projects-dashboard.component.scss']
})
export class ProjectsDashboardComponent {
  @Input() project: Project | null = null;
  @Output() dataCleared = new EventEmitter<void>();
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  selectedProjectPoint: Point | null = null;
  selectedPoint: Point | null = null;

  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;
  private scale = 1;
  private transformX = 0;
  private transformY = 0;

  showPreloader = true;

  selectedPath: { d: string }[] = []; 

  ngAfterViewInit() {
    this.autoScroll();
  }

  onPointClick(point: any) {
    if (point.isProject) {
      this.selectedPath = [];
      this.selectedProjectPoint = point; // Assign the selected project
      console.log('Project selected:', point);
    } else {
      this.selectedPath = [];
      this.selectedPoint = point; // Assign the selected point
      console.log('Point selected:', point);
    }
  
    if (this.selectedProjectPoint && this.selectedPoint) {
      console.log('Both point and project have been selected!');
      this.drawPath();
    }
  }
  
  drawPath() {
    if (!this.project || !this.selectedProjectPoint || !this.selectedPoint) return;
  
    // Find the main project point which contains the paths
    const projectPoint = this.project.points.find(p => p.isProject);
    if (!projectPoint || !projectPoint.paths) {
      console.error('Main project point or its paths not found.');
      return;
    }
  
    // Find the path corresponding to the selected point
    const pathToPoint = projectPoint.paths.find(p => p.point.id === this.selectedPoint!.id);
    if (!pathToPoint) {
      console.error('Path to the selected point not found.');
      return;
    }
  
    // Create the 'd' attribute for the SVG path
    const pathData = pathToPoint.path
    .map((p, index) => `${index === 0 ? 'M' : 'L'} ${p.x * 20},${p.y * 10.83}`)
    .join(' ');
  
    console.log('Generated Path Data: ', pathData); // Add this log to see what is generated
  
    this.selectedPath = [{ d: pathData }];
    console.log('Path selected:', this.selectedPath);
  }
    
  autoScroll() {
    if (this.project?.autoScroll && this.scrollContainer) {
      const { x, y } = this.project.autoScroll;
      const scrollElement = this.scrollContainer.nativeElement;
  
      // Calculate the scroll positions in pixels
      const scrollLeft = (x / 100) * scrollElement.scrollWidth;
      const scrollTop = (y / 100) * scrollElement.scrollHeight;
  
      // Apply scroll positions
      scrollElement.scrollLeft = -scrollLeft;
      scrollElement.scrollTop = scrollTop;
    }
  }
  
  onImageLoad() {
    setTimeout(() => {
      this.showPreloader = false;
    }, 2000);
  }
  
  onImageError() {
    
  }
  
  getPointClass(type: string): string {
    const pointType = pointTypes.find((pt: PointType) => pt.type === type);
    return pointType ? pointType.class : '';
  }

  clearData() {
    this.project = null;
    this.selectedPath = [];
    this.dataCleared.emit();
  }
}
