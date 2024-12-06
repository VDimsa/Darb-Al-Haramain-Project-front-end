import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  onDragStart(event: MouseEvent) {
    this.isDragging = true;
    this.offsetX = event.clientX;
    this.offsetY = event.clientY;
    event.preventDefault();
  }

  onDrag(event: MouseEvent) {
    if (this.isDragging) {
      const deltaX = event.clientX - this.offsetX;
      const deltaY = event.clientY - this.offsetY;
      this.transformX += deltaX;
      this.transformY += deltaY;
      this.offsetX = event.clientX;
      this.offsetY = event.clientY;

      this.updateImagePosition();
    }
  }

  onDragEnd() {
    this.isDragging = false;
  }

  updateImagePosition() {
    const imgElement = document.getElementById('draggable-image') as HTMLImageElement;
    const maxX = Math.max(0, window.innerWidth - imgElement.width * this.scale);
    const maxY = Math.max(0, window.innerHeight - imgElement.height * this.scale);

    this.transformX = Math.min(Math.max(this.transformX, -imgElement.width * this.scale + window.innerWidth), 0);
    this.transformY = Math.min(Math.max(this.transformY, -imgElement.height * this.scale + window.innerHeight), 0);

    imgElement.style.transform = `translate(${this.transformX}px, ${this.transformY}px) scale(${this.scale})`;
  }

  @HostListener('wheel', ['$event'])
  onZoom(event: WheelEvent) {
    event.preventDefault();

    const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;
    this.scale *= zoomFactor;
    this.scale = Math.min(Math.max(this.scale, 1), 3);
    this.updateImagePosition();
  }

  clearData() {
    this.data = null;
    this.dataCleared.emit();
  }
}
