import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pointTypes, PointType } from './project.model';

@Component({
  selector: 'app-projects-dashboard',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './projects-dashboard.component.html',
  styleUrls: ['./projects-dashboard.component.scss']
})
export class ProjectsDashboardComponent {
  @Input() data: any | null = null;
  @Output() dataCleared = new EventEmitter<void>();

  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;
  private scale = 1;
  private transformX = 0;
  private transformY = 0;

  getPointClass(type: string): string {
    const pointType = pointTypes.find((pt: PointType) => pt.type === type);
    return pointType ? pointType.class : '';
  }

  clearData() {
    this.data = null;
    this.dataCleared.emit();
  }
}
