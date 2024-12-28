import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Building, BuildingStatus } from '../../models/building.model'; 

@Component({
  selector: 'app-building-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './building-viewer.component.html',
  styleUrls: ['./building-viewer.component.scss']
})
export class BuildingViewerComponent implements OnInit {
  @Input() building!: Building;

  mediaType: 'video' | 'image' | 'none' = 'none';

  constructor() {}

  ngOnInit(): void {
    this.determineMediaType();
  }

  /**
   * Determines the type of media to display based on the `urlVideo` flag and the presence of a URL.
   */
  private determineMediaType(): void {
    if (this.building.url && this.building.urlVideo) {
      this.mediaType = 'video';
    } else if (this.building.url) {
      this.mediaType = 'image';
    } else {
      this.mediaType = 'none';
    }
  }

  /**
   * Utility method to format the building status for display.
   */
  get formattedStatus(): string {
    switch (this.building.status) {
      case BuildingStatus.ACTIVE:
        return 'Active';
      case BuildingStatus.UNDER_MAINTENANCE:
        return 'Under Maintenance';
      case BuildingStatus.DECOMMISSIONED:
        return 'Decommissioned';
      case BuildingStatus.RESERVED:
        return 'Reserved';
      default:
        return 'Unknown';
    }
  }
}
