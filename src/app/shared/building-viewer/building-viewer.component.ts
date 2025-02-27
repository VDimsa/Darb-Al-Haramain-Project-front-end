import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Building,
  BuildingStatus,
  ApartmentStatus,
  Floor,
  Apartment,
} from '../models/building.model';
import { FormsModule } from '@angular/forms';
import { Coordinate } from '../models/compound.model';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-building-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSliderModule],
  templateUrl: './building-viewer.component.html',
  styleUrls: ['./building-viewer.component.scss'],
})
export class BuildingViewerComponent implements OnInit {
  @Input() building!: Building;
  @Output() takeAction = new EventEmitter<void>();

  mediaType: 'video' | 'image' | 'none' = 'none';
  showAvailable = true;
  showBooked = true;
  showSold = true;
  showUnderMaintenance = true;
  show1Room = true;
  show2Rooms = true;
  show3Rooms = true;
  show4Rooms = true;
  show5Rooms = true;
  minArea: number = 0;
  maxArea: number = Infinity;
  addMode = true;
  currentApartment: Apartment | null = null;
  currentFloor: Floor | null = null;
  polygonCoordinates: { x: number; y: number }[] = [];

  constructor() {}

  ngOnInit(): void {
    this.determineMediaType();
  }

  private determineMediaType(): void {
    if (this.building.url && this.building.urlVideo) {
      this.mediaType = 'video';
    } else if (this.building.url) {
      this.mediaType = 'image';
    } else {
      this.mediaType = 'none';
    }
  }

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

  shouldShowBorder(
    status: ApartmentStatus,
    roomsCount: number,
    area: number
  ): boolean {
    const roomCountCondition = (roomsCount: number) => {
      switch (roomsCount) {
        case 1:
          return this.show1Room;
        case 2:
          return this.show2Rooms;
        case 3:
          return this.show3Rooms;
        case 4:
          return this.show4Rooms;
        case 5:
          return this.show5Rooms;
        default:
          return false;
      }
    };

    const areaCondition = (area: number) => {
      return (
        (this.minArea ? area >= this.minArea : true) &&
        (this.maxArea ? area <= this.maxArea : true)
      );
    };

    switch (status) {
      case ApartmentStatus.AVAILABLE:
        return (
          this.showAvailable &&
          roomCountCondition(roomsCount) &&
          areaCondition(area)
        );
      case ApartmentStatus.BOOKED:
        return (
          this.showBooked &&
          roomCountCondition(roomsCount) &&
          areaCondition(area)
        );
      case ApartmentStatus.SOLD:
        return (
          this.showSold && roomCountCondition(roomsCount) && areaCondition(area)
        );
      case ApartmentStatus.UNDER_MAINTENANCE:
        return (
          this.showUnderMaintenance &&
          roomCountCondition(roomsCount) &&
          areaCondition(area)
        );
      default:
        return false;
    }
  }

  getPolygonPoints(coordinates: { x: number; y: number }[]): string {
    return coordinates.map((coord) => `${coord.x},${coord.y}`).join(' ');
  }

  getBorderColor(status: string): string {
    switch (status) {
      case 'available':
        return 'green';
      case 'booked':
        return 'yellow';
      case 'sold':
        return 'red';
      case 'under_maintenance':
        return 'gray';
      default:
        return 'transparent';
    }
  }

  onMediaClick(event: MouseEvent): void {
    if (this.addMode && this.currentApartment) {
      const rect = (event.target as HTMLImageElement).getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      this.currentApartment.border.coordinates.push({ x, y });
    }
  }

  onBorderClick(apartment: Apartment): void {
    if (this.addMode) {
      console.log('Border clicked:', apartment.border);
    }
  }

  goBack(): void {
    this.takeAction.emit();
  }

  startAddMode(): void {
    this.addMode = true;
  }

  cancelAdding(): void {
    this.addMode = false;
    this.polygonCoordinates = [];
  }

  saveBuilding(): void {
    // Save the building data (API call or local storage update)
    console.log('Building data saved', this.building);
    // this.addMode = false;
  }

  addFloorToCurrentBuilding(): void {
    const floorNumber = this.building.floors.length + 1;
    const floor: Floor = {
      floorNumber,
      apartments: [],
    };

    this.building.floors.push(floor);
  }

  addAparmentToCurrentFloor(floor: Floor) {
    const apartment: Apartment = {
      id: 0,
      name: 'New Apartment',
      number: '0',
      roomsCount: 0,
      area: 0,
      status: ApartmentStatus.AVAILABLE,
      floorNumber: floor.floorNumber,
      buildingId: this.building.id,
      border: {
        coordinates: [],
        color: 'transparent',
        visible: true,
        data: {
          name: 'New Apartment',
          type: 'سكني',
          floors: 0,
          area: '0 م²',
          occupancy: '0%',
        },
      },
    };

    floor.apartments.push(apartment);
  }

  editFloor(floor: Floor): void {
    if (this.currentApartment) this.currentApartment = null;

    this.currentFloor = floor;
    console.log('Edit floor:', floor);
  }

  doneEditFloor(floor: Floor): void {
    this.currentFloor = null;
    console.log('Done editing apartment:', floor);
  }

  removeFloor(floor: Floor): void {
    const index = this.building.floors.indexOf(floor);
    if (index !== -1) {
      this.building.floors.splice(index, 1);
    }
  }

  editApartment(apartment: Apartment): void {
    if (this.currentFloor) this.currentFloor = null;

    this.currentApartment = apartment;
    console.log('Edit apartment:', apartment);
  }

  doneEditApartment(apartment: Apartment): void {
    this.currentApartment = null;
    console.log('Done editing apartment:', apartment);
  }

  clearCoordinates(coordinates: Coordinate[]): void {
    coordinates.splice(0, coordinates.length);
  }

  removeApartment(apartment: Apartment, floor: Floor): void {
    const index = floor.apartments.indexOf(apartment);
    if (index !== -1) {
      floor.apartments.splice(index, 1);
    }
  }

  // ============================
  // SIDEBAR FILTER
  // ============================
  showSidebarFilter: boolean = false;
  onShowSidebarFilter() {
    this.showSidebarFilter = !this.showSidebarFilter;
  }
  // ============================
  // Active Buttos
  // ============================
  activeTypeBtn: string | null = 'Available';

  onActiveTypeBtn(value: string) {
    this.activeTypeBtn = value;
  }

  // ======================
  // * Filter BUILDING TYPES
  // ======================
  buttonBuildingType: { [key: string]: boolean } = {
    amenities: false,
    twoBedrooms: false,
    threeBedrooms: false,
    fourBedrooms: false,
    upperBuilding: false,
  };

  onButtonBuildingType(buttonName: string) {
    this.buttonBuildingType[buttonName] = !this.buttonBuildingType[buttonName];
  }

  // ======================
  // * Filter BUILDING VIEWS
  // ======================
  buttonBuildingViews: { [key: string]: boolean } = {
    seeView: false,
    seeFront: false,
  };

  onButtonBuildingViews(buttonName: string) {
    this.buttonBuildingViews[buttonName] =
      !this.buttonBuildingViews[buttonName];
  }
  // ======================
  // * Filter CLASS TYPES
  // ======================
  buttonClassTypes: { [key: string]: boolean } = {
    A: true,
    B: true,
    C: true,
    D: true,
    E: true,
  };

  onButtonClassTypes(buttonName: string) {
    this.buttonClassTypes[buttonName] = !this.buttonClassTypes[buttonName];
  }

  // ===================================
  // ===================================
  // floorValue: number = 0;
  minFloorValue: number = 0;
  maxFloorValue: number = 24;
  floorOptions: Options = {
    floor: 0,
    ceil: 24,
  };
  minSizeValue: number = 0;
  maxSizeValue: number = 295;
  SizeOptions: Options = {
    floor: 0,
    ceil: 295,
  };
  // ===================================
  // ===================================
}
