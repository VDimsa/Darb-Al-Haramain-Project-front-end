import { Component, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pointTypes, PointType } from './project.model';
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
  @Input() data: any | null = null;
  @Output() dataCleared = new EventEmitter<void>();
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;
  private scale = 1;
  private transformX = 0;
  private transformY = 0;

  showPreloader = true;

  ngAfterViewInit() {
    this.autoScroll();
  }

  autoScroll() {
    if (this.data?.autoScroll && this.scrollContainer) {
      const { x, y } = this.data.autoScroll;
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
    this.data = null;
    this.dataCleared.emit();
  }
}
