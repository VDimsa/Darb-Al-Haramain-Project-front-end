import { Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pointTypes, PointType, Project, Point } from './project.model';
import { AppComponent } from '../../app.component';
import { PreloaderService } from '../preload/preloader.service';

@Component({
  selector: 'app-projects-dashboard',
  standalone: true,
  imports: [
    CommonModule,
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

  private imageCache = new Map<File, string>();

  selectedPath: { d: string }[] = []; 

  constructor(
    private preloaderService: PreloaderService,
  ) {
    this.preloaderService.show();
  }

  ngAfterViewInit() {
    this.selectFirstProjectPoint();

    setTimeout(() => {
      this.preloaderService.hide();
    }, 2000);
  }

  ngOnDestroy() {
    this.clearCachedURLs();
  }

  selectFirstProjectPoint() {
    if (this.project && this.project.points) {
      const firstProjectPoint = this.project.points.find(point => point.isProject);
      if (firstProjectPoint) {
        this.onPointClick(firstProjectPoint);
      }
    }
  }

  onMouseWheel(event: WheelEvent) {
    if (event.ctrlKey) {
      event.preventDefault(); // Prevent the default zoom behavior of the browser
  
      const zoomFactor = 0.1; // Define how much to zoom per scroll step
      this.scale += event.deltaY > 0 ? -zoomFactor : zoomFactor;
  
      // Clamp the scale value to avoid excessive zoom in or out
      this.scale = Math.max(0.5, Math.min(2, this.scale)); 
  
      // Apply the scaling transformation
      const container = this.scrollContainer.nativeElement as HTMLElement;
      container.style.zoom = `${this.scale}`;
    }
  }
  
  onPointClick(point: any) {
    if (point.isProject) {
      this.selectedPath = [];
      this.selectedProjectPoint = point; 
    } else {
      this.selectedPath = [];
      this.selectedPoint = point; 
    }
  
    if (this.selectedProjectPoint && this.selectedPoint) {
      this.drawPath();
    }
  }
  
  drawPath() {
    if (!this.project || !this.selectedProjectPoint || !this.selectedPoint) return;
  
    
    const projectPoint = this.project.points.find(p => p.isProject);
    if (!projectPoint || !projectPoint.paths) {
      console.error('Main project point or its paths not found.');
      return;
    }
  
    
    const pathToPoint = projectPoint.paths.find(p => p.point.id === this.selectedPoint!.id);
    if (!pathToPoint) {
      console.error('Path to the selected point not found.');
      return;
    }
  
    
    const pathData = pathToPoint.path
    .map((p, index) => `${index === 0 ? 'M' : 'L'} ${p.x * 20},${p.y * 10.83}`)
    .join(' ');
  
    this.selectedPath = [{ d: pathData }];
  }
    
  autoScroll() {
    if (this.project?.autoScroll && this.scrollContainer) {
      const { x, y } = this.project.autoScroll;
      const scrollElement = this.scrollContainer.nativeElement;
  
      
      const scrollLeft = (x / 100) * scrollElement.scrollWidth;
      const scrollTop = (y / 100) * scrollElement.scrollHeight;
  
      
      scrollElement.scrollLeft = -scrollLeft;
      scrollElement.scrollTop = scrollTop;
    }
  }
  
  onImageLoad() {
    this.autoScroll();
  }
  
  onImageError() {
    
  }
  
  getMapImageSource(mapImage: string | File | null | undefined): string | null {
    if (!mapImage) {
      return null; 
    }
    
    if (typeof mapImage === 'string') {
      return mapImage; 
    }

    if (mapImage instanceof File) {
      if (!this.imageCache.has(mapImage)) {
        const url = URL.createObjectURL(mapImage);
        this.imageCache.set(mapImage, url);
      }

      const img = this.imageCache.get(mapImage) || null;
      
      return img;
    }
    
    return null; 
  }

  getPointClass(type: string): string {
    const pointType = pointTypes.find((pt: PointType) => pt.type === type);
    return pointType ? pointType.class : '';
  }

  clearCachedURLs() {
    this.imageCache.forEach((url) => URL.revokeObjectURL(url));
    this.imageCache.clear();
  }

  clearData() {
    this.clearCachedURLs();
    this.project = null;
    this.selectedPath = [];
    this.dataCleared.emit();
  }
}
