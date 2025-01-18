import { Component, ElementRef, ViewChild, Input, Output, EventEmitter, SimpleChanges, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pointTypes, PointType, Project, Point, PointTypeEnum, Path, Border, ProjectsMap } from '../models/project.model';
import { PreloaderService } from '../preload/preloader.service';
import { alharamenProjectMap, staticBuildings } from '../../../assets/staticPaths';
import { FormsModule } from '@angular/forms';
import { Building } from '../models/building.model';

@Component({
  selector: 'app-projects-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './projects-dashboard.component.html',
  styleUrls: ['./projects-dashboard.component.scss']
})
export class ProjectsDashboardComponent {
  @Input() currentProject: Project | null = null;
  @Input() newProject: Partial<Project> | null = null;
  @Input() newPointBoarder: Partial<Point> | null = null;
  @Input() isAddingMode = false;
  @Input() selectedBorderPoint: Point | null = null;
  @Input() addingPointType: PointTypeEnum | null = null;
  @Input() showSidebar = true;
  @Input() addStage = 0;
  @Output() dataCleared = new EventEmitter<void>();
  @Output() selectedBorderPointChange = new EventEmitter<Point | null>();
  @Output() selectedBuilding = new EventEmitter<Building | null>();
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  @ViewChild('projectMap') projectMap!: ElementRef;
  @ViewChildren('mapPoint') mapPoints!: QueryList<ElementRef<HTMLDivElement>>;

  @Input() projectsMap: ProjectsMap = {
    projectId: null,
    pointId: null,
    mapImage: null,
    data: []
  };

  selectedProjectPoint: Point | null = null;
  selectedPoint: Point | null = null;
  newPath: Path[] | null = null;
  showFilters = false;

  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;
  private transformX = 0;
  private transformY = 0;
  private containerScale: number = 1;
  private currentBorder: Border | null = null;
  private imageCache = new Map<File, string>();

  borderTypes: string[] = ['سكني', 'تجاري', 'تسوق', 'ترفيه', 'خدمات', 'مكاتب', 'مستشفيات', 'مدارس', 'مساجد', 'مطاعم', 'مولات', 'مواقف'];
  uniqueFloors: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  areaRange = { min: 0, max: 10000 };
  occupancyRange = { min: 0, max: 100 };

  activeBorderFilters = {
    types: this.borderTypes.reduce((acc, type) => ({ ...acc, [type]: true }), {} as { [key: string]: boolean }),
    floors: [...this.uniqueFloors],
    area: { min: this.areaRange.min, max: this.areaRange.max },
    occupancy: { min: this.occupancyRange.min, max: this.occupancyRange.max }
  };

  filteredBorders: Border[] = [];
  filterOptions: { type: string; label: string }[] = [];
  activeFilters: { [key: string]: boolean } = {};
  selectedPath: { d: string }[] = [];
  pathDrawn = false;
  currentMapImage: string | File | null = null;
  showPartProjectMap: boolean = false;
  imageWidth: number = 1;
  imageHeight: number = 1;
  selectedProjectMap: ProjectsMap | undefined;
  addBuildingBorder: boolean = false;

  constructor(private preloaderService: PreloaderService) {
    this.preloaderService.show();
  }

  ngOnInit() {
    this.initializeFilters();
    this.selectFirstProjectPoint();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['addStage']) {
      this.onStageChange();
    }

    if (changes['selectedBorderPoint'] && this.selectedBorderPoint) {
      this.initializeAdvancedFilters();
      this.applyAdvancedFilters();
    }

    if (changes['showPartProjectMap']) {
      console.log(`showPartProjectMap value changed to: ${this.showPartProjectMap}`);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.preloaderService.hide();
    }, 2000);
  }

  ngOnDestroy() {
    this.clearCachedURLs();
  }

  private initializeFilters() {
    if (this.activeProject?.mapImage) {
      this.setShowPartProjectMap(this.getMapImageSource(this.activeProject.mapImage));
    }

    this.filterOptions = pointTypes
      .filter((pt) => pt.type !== PointTypeEnum.PROJECT)
      .map((pt) => ({
        type: pt.type,
        label: this.getFilterLabel(pt.type),
      }));

    this.activeFilters = this.filterOptions.reduce(
      (filters, option) => ({ ...filters, [option.type]: true }),
      {}
    );

    this.initializeAdvancedFilters();
  }

  private selectFirstProjectPoint() {
    if (this.activeProject?.points) {
      const firstProjectPoint = this.activeProject.points.find(point => point.isProject);
      if (firstProjectPoint) {
        this.onPointClick(firstProjectPoint);
      }
    }
  }

  private getFilterLabel(type: string): string {
    const labels: { [key: string]: string } = {
      mosque: 'مساجد',
      school: 'مدارس',
      restaurant: 'مطاعم',
      mall: 'مولات',
      hospital: 'مستشفيات',
    };
    return labels[type] || type;
  }

  private initializeAdvancedFilters() {
    if (!this.selectedBorderPoint || !this.selectedBorderPoint.borders) {
      return;
    }

    this.borderTypes = Array.from(
      new Set(this.selectedBorderPoint.borders.map(border => border.data?.type).filter(type => type))
    ) as string[];

    this.borderTypes.forEach(type => {
      this.activeBorderFilters.types[type] = true;
    });

    this.uniqueFloors = Array.from(
      new Set(this.selectedBorderPoint.borders.map(border => border.data?.floors).filter(floors => floors != null))
    ) as number[];

    this.activeBorderFilters.floors = [...this.uniqueFloors];

    const areas = this.selectedBorderPoint.borders
      .map(border => parseInt(border.data?.area?.replace(/\D/g, '') || '0', 10))
      .filter(area => !isNaN(area));
    this.areaRange.min = Math.min(...areas, 0);
    this.areaRange.max = Math.max(...areas, 10000);
    this.activeBorderFilters.area.min = this.areaRange.min;
    this.activeBorderFilters.area.max = this.areaRange.max;

    const occupancies = this.selectedBorderPoint.borders
      .map(border => parseInt((border.data?.occupancy ?? '0').replace(/%/g, ''), 10))
      .filter(occupancy => !isNaN(occupancy));
    this.occupancyRange.min = Math.min(...occupancies, 0);
    this.occupancyRange.max = Math.max(...occupancies, 100);
    this.activeBorderFilters.occupancy.min = this.occupancyRange.min;
    this.activeBorderFilters.occupancy.max = this.occupancyRange.max;

    this.filteredBorders = [...this.selectedBorderPoint.borders];
  }

  private clearCachedURLs() {
    this.imageCache.forEach((url) => URL.revokeObjectURL(url));
    this.imageCache.clear();
  }

  private setShowPartProjectMap(value: string | File | null) {
    this.preloaderService.show();
    this.currentMapImage = value;
    setTimeout(() => {
      this.autoScroll();
      this.preloaderService.hide();
    }, 2000);
  }

  private autoScroll() {
    if (this.scrollContainer) {
      const scrollElement = this.scrollContainer.nativeElement;
      const centerHeight = scrollElement.clientHeight / 2;
      const centerWidth = scrollElement.clientWidth / 2;

      if (this.currentProject?.autoScroll && !this.showPartProjectMap) {
        const { x, y } = this.currentProject.autoScroll;
        let scrollLeft = (x / 100) * scrollElement.scrollWidth - centerWidth;
        let scrollTop = (y / 100) * scrollElement.scrollHeight - centerHeight;
        scrollElement.scrollLeft = -scrollLeft;
        scrollElement.scrollTop = scrollTop;
      } else if (this.selectedProjectMap?.autoScroll && this.showPartProjectMap) {
        const { x, y } = this.selectedProjectMap.autoScroll;
        let scrollLeft = (x / 100) * scrollElement.scrollWidth - centerWidth;
        let scrollTop = (y / 100) * scrollElement.scrollHeight - centerHeight;
        scrollElement.scrollLeft = -scrollLeft;
        scrollElement.scrollTop = scrollTop;
      }
    }
  }

  onImageLoad() {
    this.autoScroll();
    const img = this.projectMap.nativeElement as HTMLImageElement;
    this.imageWidth = img.naturalWidth;
    this.imageHeight = img.naturalHeight;
  }

  onImageError() {
    console.error('Failed to load image.');
  }

  getPointClass(type: string): string {
    const pointType = pointTypes.find((pt: PointType) => pt.type === type);
    return pointType ? pointType.class : '';
  }

  clearData() {
    if (this.showPartProjectMap && this.activeProject) {
      this.setShowPartProjectMap(this.getMapImageSource(this.activeProject.mapImage));
      this.showPartProjectMap = false;
      return;
    }

    this.clearCachedURLs();
    this.selectedBorderPoint = null;
    if (this.activeProject?.mapImage) {
      this.setShowPartProjectMap(this.getMapImageSource(this.activeProject.mapImage));
    }
    this.currentProject = null;
    this.selectedPath = [];
    this.dataCleared.emit();
  }

  get activeProject(): Project | Partial<Project> | null {
    return this.isAddingMode ? this.newProject : this.currentProject;
  }

  applyFilters() {
    if (this.currentProject?.points) {
      this.currentProject.points.forEach((point) => {
        if (point.type === PointTypeEnum.PROJECT) {
          point.visible = true;
        } else {
          point.visible = this.activeFilters[point.type] || false;
        }
      });
    }
  }

  onFilterChange(filterKey: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.activeFilters[filterKey] = isChecked;
    this.applyFilters();
  }

  toggleBorderVisibility(border: Border, index: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    border['visible'] = isChecked;
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  getBorderPoints(coordinates: { x: number; y: number }[] | undefined): string {
    if (!coordinates || coordinates.length === 0) return '';
    return coordinates
      .map(coord => `${(coord.x / 100) * this.imageWidth},${(coord.y / 100) * this.imageHeight}`)
      .join(' ');
  }

  onBorderClick(point: Point, event?: MouseEvent) {
    if (this.isAddingMode) {
      this.handleAddModeBorderClick(point, event);
    } else {
      this.handleNonAddModeBorderClick(point, event);
    }

    this.selectedBorderPointChange.emit(this.selectedBorderPoint);
  }

  onPointBorderClick(border: Border, event?: MouseEvent) {
    const building = staticBuildings.find((map) => map.id === 1);
    if (building) {
      this.selectedBuilding.emit(building);
    } else {
      this.selectedBuilding.emit(null);
    }
  }

  private handleAddModeBorderClick(point: Point, event?: MouseEvent) {
    if (this.addStage === 6) {
      this.selectedBorderPoint = point;
    }
  }

  private handleNonAddModeBorderClick(point: Point, event?: MouseEvent) {
    this.selectedProjectMap = alharamenProjectMap.find(
      (map) => map.projectId === this.activeProject?.id && map.pointId === point.id
    );

    if (this.selectedProjectMap) {
      this.setShowPartProjectMap(this.selectedProjectMap.mapImage);
      this.showPartProjectMap = true;

      this.selectedBorderPoint = {
        ...point,
        borders: this.selectedProjectMap.data![0]?.borders || []
      };
      this.resetFilters();
    } else {
      console.error('No map found for the selected project and point:', point);
    }
  }

  private onStageChange(newStage?: number) {
    this.handleStageChange(newStage);
  }

  private handleAddModePointClick(point: Point, event?: MouseEvent) {
    if (this.addStage <= 3) {
      if (this.newProject && this.newProject.points && this.addStage === 1 && point.isProject) {
        this.newProject.points = this.newProject.points.filter(p => p.id !== point.id);
      }
      if (this.newProject && this.newProject.points && this.addStage === 2 && point.importance === 1) {
        this.newProject.points = this.newProject.points.filter(p => p.id !== point.id);
      }
      if (this.newProject && this.newProject.points && this.addStage === 3 && point.importance === 0) {
        this.newProject.points = this.newProject.points.filter(p => p.id !== point.id);
      }
    }

    if (this.addStage === 4) {
      if (point.isProject) {
        if (this.selectedProjectPoint !== point) {
          this.selectedProjectPoint = point;
          this.pathDrawn = false;
        }
      } else {
        if (this.selectedPoint !== point) {
          this.selectedPoint = point;
          this.pathDrawn = false;
        }
      }

      this.handleAddStage4PointClick(point);
    }

    if (this.addStage === 5) {
      this.handleAddStage5PointClick(point, event);
    }
  }

  private handleViewModePointClick(point: Point, event?: MouseEvent) {
    if (point.isProject) {
      this.selectedPath = [];
      this.selectedProjectPoint = point;
      this.selectedPoint = null;
    } else {
      this.selectedPath = [];
      this.selectedPoint = point;
    }

    if (this.selectedProjectPoint && this.selectedPoint) {
      this.drawPath();
    }
  }
  
  onMouseWheel(event: WheelEvent) {
    if (!event.ctrlKey) return; // Only zoom if Ctrl key is pressed
    event.preventDefault();

    const scrollContainer = this.scrollContainer.nativeElement as HTMLElement;
    const containerEl = this.mapContainer.nativeElement as HTMLElement;

    const zoomStep = 0.1;
    const isZoomOut = event.deltaY > 0;
    let newContainerScale = this.containerScale + (isZoomOut ? -zoomStep : zoomStep);

    // Clamp the scale between 0.5 and 2
    newContainerScale = Math.max(0.5, Math.min(2, newContainerScale));

    // Apply the new scale
    containerEl.style.zoom = `${newContainerScale}`;

    // Adjust the points' scale
    this.mapPoints.forEach((pointRef) => {
      pointRef.nativeElement.style.zoom = `${1 / newContainerScale}`;
    });
  }

  onContainerClick(event: MouseEvent) {
    if (this.isAddingMode) {
      this.handleAddModeContainerClick(event);
    }
  }

  onPointClick(point: Point, event?: MouseEvent) {
    if (event) event.stopPropagation();
    if (this.isAddingMode) {
      this.handleAddModePointClick(point, event);
    } else {
      this.handleViewModePointClick(point, event);
    }
  }

  drawPath() {
    if (!this.activeProject || !this.selectedProjectPoint || !this.selectedPoint) return;

    const projectPoint = this.activeProject.points!.find(p => p.isProject);
    if (!projectPoint || !projectPoint.paths) return;

    const pathToPoint = projectPoint.paths.find(p => p.point.id === this.selectedPoint!.id);
    if (!pathToPoint) return;

    const pathData = pathToPoint.path
      .map((p, index) => `${index === 0 ? 'M' : 'L'} ${(p.x / 100) * this.imageWidth},${(p.y / 100) * this.imageHeight}`)
      .join(' ');

    this.selectedPath = [{ d: pathData }];
  }

  // Make these methods public
  getMapImageSource(mapImage: string | File | null | undefined): string | null {
    if (!mapImage) return null;
    if (typeof mapImage === 'string') return mapImage;
    if (mapImage instanceof File) {
      if (!this.imageCache.has(mapImage)) {
        const url = URL.createObjectURL(mapImage);
        this.imageCache.set(mapImage, url);
      }
      return this.imageCache.get(mapImage) || null;
    }
    return null;
  }

  applyAdvancedFilters() {
    if (!this.selectedBorderPoint || !this.selectedBorderPoint.borders) {
      this.filteredBorders = [];
      return;
    }

    this.filteredBorders = this.selectedBorderPoint.borders.filter(border => {
      const borderType = border.data?.type;
      const borderFloors = border.data?.floors;
      const borderAreaStr = border.data?.area;
      const borderArea = borderAreaStr ? parseInt(borderAreaStr.replace(/\D/g, ''), 10) : 0;
      const borderOccupancyStr = border.data?.occupancy;
      const borderOccupancy = borderOccupancyStr ? parseInt(borderOccupancyStr.replace(/%/g, ''), 10) : 0;

      return (
        (!borderType || this.activeBorderFilters.types[borderType]) &&
        (!borderFloors || this.activeBorderFilters.floors.includes(borderFloors)) &&
        borderArea >= this.activeBorderFilters.area.min &&
        borderArea <= this.activeBorderFilters.area.max &&
        borderOccupancy >= this.activeBorderFilters.occupancy.min &&
        borderOccupancy <= this.activeBorderFilters.occupancy.max
      );
    });

    console.log('Filtered Borders:', this.filteredBorders);
  }

  resetFilters() {
    if (!this.selectedBorderPoint || !this.selectedBorderPoint.borders) {
      return;
    }

    this.borderTypes.forEach(type => {
      this.activeBorderFilters.types[type] = true;
    });

    this.activeBorderFilters.floors = [...this.uniqueFloors];
    this.activeBorderFilters.area.min = this.areaRange.min;
    this.activeBorderFilters.area.max = this.areaRange.max;
    this.activeBorderFilters.occupancy.min = this.occupancyRange.min;
    this.activeBorderFilters.occupancy.max = this.occupancyRange.max;

    this.filteredBorders = [...this.selectedBorderPoint.borders];
  }

  private handleAddModeContainerClick(event: MouseEvent) {
    const container = this.projectMap.nativeElement as HTMLElement;
    const rect = container.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const xPercent = (offsetX / rect.width) * 100;
    const yPercent = (offsetY / rect.height) * 100;

    if (this.addStage <= 3) {
      this.addNewPoint(xPercent, yPercent);
    } else if (this.addStage === 4) {
      this.handleAddStage4ContainerClick(xPercent, yPercent, event);
    } else if (this.addStage === 5) {
      this.handleAddStage5ContainerClick(xPercent, yPercent, event);
    } else if (this.addStage === 7) {
      if (this.addBuildingBorder) this.handleAddStage7ContainerClick(xPercent, yPercent, event);
    }
  }

  private addNewPoint(xPercent: number, yPercent: number) {
    const point: Point = {
      id: Date.now(),
      name: this.activeProject?.name!,
      type: PointTypeEnum.PROJECT,
      importance: 2,
      logo: this.activeProject?.logo,
      isProject: true,
      position: { x: xPercent, y: yPercent },
      visible: true,
      borders: [],
      paths: []
    };

    if (this.addStage === 2) {
      point.importance = 1;
      point.name = 'اسم النقطة';
      point.isProject = false;
    } else if (this.addStage === 3) {
      point.importance = 0;
      point.name = 'اسم النقطة';
      point.type = this.addingPointType!;
      point.logo = null;
      point.isProject = false;
    }

    if (this.newProject) {
      this.newProject.points = this.newProject.points || [];
      this.newProject.points.push(point);
    } else {
      this.newProject = {
        id: null,
        name: '',
        mapImage: null,
        points: [point],
      };
    }
  }

  private handleAddStage4PointClick(point: Point) {
    if (this.selectedPoint && this.selectedProjectPoint && !this.pathDrawn) {
      const existingPath = this.selectedProjectPoint.paths?.find(
        (p) => p.point.id === this.selectedPoint!.id
      );
      if (existingPath) {
        this.useExistingPath(existingPath.path);
      } else {
        this.initializePath(this.selectedProjectPoint, this.selectedPoint);
      }
    } else if (point === this.selectedProjectPoint && this.selectedPoint && this.pathDrawn) {
      this.resetPath(this.selectedProjectPoint, this.selectedPoint);
    } else if (point === this.selectedPoint && this.pathDrawn) {
      this.finalizePath();
    }
  }

  private handleAddStage5PointClick(point: Point, event?: MouseEvent) {
    if (point.isProject) {
      if (this.selectedProjectPoint !== point) {
        this.selectedProjectPoint = point;
      } else {
        if (this.selectedProjectPoint) {
          this.selectedProjectPoint.borders = [];
          this.selectedProjectPoint.pointMap = null;
        }
      }
    } else {
      console.warn('Only project points can be selected in Stage 5.');
    }
  }

  private handleAddStage4ContainerClick(xPercent: number, yPercent: number, event: MouseEvent) {
    if (this.selectedProjectPoint && this.selectedPoint) {
      if (!this.newPath) {
        this.checkOrCreatePathForStage4();
      } else {
        this.addIntermediatePointToPath(xPercent, yPercent);
      }

      const pathData = this.newPath
        ?.map((p, index) => `${index === 0 ? 'M' : 'L'} ${(p.x / 100) * this.imageWidth},${(p.y / 100) * this.imageHeight}`)
        .join(' ');
      this.selectedPath = pathData ? [{ d: pathData }] : [];
      this.pathDrawn = true;
    }
  }

  private handleAddStage5ContainerClick(xPercent: number, yPercent: number, event: MouseEvent) {
    if (this.selectedProjectPoint) {
      if (!this.selectedProjectPoint.borders?.length) {
        this.selectedProjectPoint.borders = [{
          Cordinates: [],
          visible: true,
          color: 'blue',
          data: { name: 'اسم الحد' }
        }];
      }
      this.selectedProjectPoint.borders[this.selectedProjectPoint.borders.length - 1]
        .Cordinates.push({ x: xPercent, y: yPercent });
    }
  }

  private handleAddStage7ContainerClick(xPercent: number, yPercent: number, event: MouseEvent) {
    if (!this.projectsMap) return;
    if (!this.projectsMap.data || this.projectsMap.data.length === 0) {
      this.projectsMap.data = [{ borders: [] }];
    }

    if (!this.currentBorder) {
      this.currentBorder = {
        Cordinates: [],
        visible: true,
        color: 'blue',
        data: { name: 'اسم الحد' }
      };
      this.projectsMap.data[0].borders.push(this.currentBorder);
    }

    if (this.currentBorder) {
      this.currentBorder.Cordinates.push({ x: xPercent, y: yPercent });
    }
    console.log('Added new coordinate: ', { x: xPercent, y: yPercent });
  }

  private useExistingPath(existing: Path[]) {
    this.newPath = existing.map(coord => ({ x: coord.x, y: coord.y }));
    const pathData = this.newPath
      .map((p, index) => `${index === 0 ? 'M' : 'L'} ${(p.x / 100) * this.imageWidth},${(p.y / 100) * this.imageHeight}`)
      .join(' ');
    this.selectedPath = [{ d: pathData }];
    this.pathDrawn = true;
  }

  private initializePath(projectPoint: Point, targetPoint: Point) {
    this.newPath = [projectPoint.position, targetPoint.position];
    const pathData = this.newPath
      .map((p, index) => `${index === 0 ? 'M' : 'L'} ${(p.x / 100) * this.imageWidth},${(p.y / 100) * this.imageHeight}`)
      .join(' ');
    this.selectedPath = [{ d: pathData }];
    this.pathDrawn = true;
  }

  private resetPath(projectPoint: Point, targetPoint: Point) {
    this.newPath = [projectPoint.position, targetPoint.position];
    const pathData = this.newPath
      .map((p, index) => `${index === 0 ? 'M' : 'L'} ${(p.x / 100) * this.imageWidth},${(p.y / 100) * this.imageHeight}`)
      .join(' ');
    this.selectedPath = [{ d: pathData }];
  }

  private finalizePath() {
    if (!this.newPath) return;
    const projectPoint = this.newProject?.points?.find(p => p.id === this.selectedProjectPoint!.id);
    if (projectPoint) {
      if (!projectPoint.paths) projectPoint.paths = [];
      const existingPathIndex = projectPoint.paths.findIndex(
        p => p.point.id === this.selectedPoint!.id
      );
      if (existingPathIndex !== -1) {
        projectPoint.paths[existingPathIndex].path = this.newPath.map((coord, index) => ({
          id: index + 1,
          x: coord.x,
          y: coord.y,
        }));
      } else {
        projectPoint.paths.push({
          point: this.selectedPoint!,
          path: this.newPath.map((coord, index) => ({
            id: index + 1,
            x: coord.x,
            y: coord.y,
          })),
        });
      }
      this.selectedPoint = null;
      this.newPath = null;
      this.selectedPath = [];
      this.pathDrawn = false;
    }
  }

  private checkOrCreatePathForStage4() {
    const projectPoint = this.currentProject?.points.find(p => p.isProject);
    if (projectPoint && projectPoint.paths) {
      const existingPath = projectPoint.paths.find(
        p => p.point.id === this.selectedPoint!.id
      );
      if (existingPath) {
        this.useExistingPath(existingPath.path);
      } else {
        this.initializePath(this.selectedProjectPoint!, this.selectedPoint!);
      }
    } else {
      this.initializePath(this.selectedProjectPoint!, this.selectedPoint!);
    }
  }

  private addIntermediatePointToPath(xPercent: number, yPercent: number) {
    if (!this.newPath) return;
    const newIntermediatePoint: Path = { x: xPercent, y: yPercent };
    this.newPath.splice(this.newPath.length - 1, 0, newIntermediatePoint);
  }

  private handleStageChange(newStage?: number) {
    this.selectedProjectPoint = null;
    this.selectedPoint = null;
    this.pathDrawn = false;
    this.newPath = null;
    this.selectedPath = [];

    if (this.addStage === 7) {
      if (!this.showPartProjectMap) {
        this.showPartProjectMap = true;
        this.setShowPartProjectMap(this.selectedBorderPoint?.pointMap || null);
      }
    } else {
      if (this.showPartProjectMap) {
        this.showPartProjectMap = false;
        this.setShowPartProjectMap(this.activeProject?.mapImage || null);
      }
    }

    const toggleVisibility = (points: Point[] | undefined) => {
      points?.forEach((point) => {
        if (this.addStage === 5) {
          point.visible = point.isProject;
        } else if (this.addStage === 6) {
          point.visible = false;
        } else {
          point.visible = true;
        }
      });
    };

    toggleVisibility(this.newProject?.points);
    toggleVisibility(this.currentProject?.points);

    console.log('Updated points visibility for stage:', this.addStage);
  }

  onDrawBorder(event: MouseEvent) {
    if (this.addStage === 7 && this.selectedBorderPoint) {
      const container = this.projectMap.nativeElement as HTMLElement;
      const rect = container.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const xPercent = (offsetX / rect.width) * 100;
      const yPercent = (offsetY / rect.height) * 100;

      if (!this.selectedBorderPoint.borders?.length) {
        this.selectedBorderPoint.borders = [{
          Cordinates: [],
          visible: true,
          color: 'blue',
          data: { name: 'اسم الحد' }
        }];
      }
      this.selectedBorderPoint.borders[0].Cordinates.push({ x: xPercent, y: yPercent });

      console.log('Added new border point:', { x: xPercent, y: yPercent });
    } else {
      if (!this.selectedProjectPoint) {
        console.warn('No project point selected for drawing borders.');
        return;
      }

      const container = this.projectMap.nativeElement as HTMLElement;
      const rect = container.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const xPercent = (offsetX / rect.width) * 100;
      const yPercent = (offsetY / rect.height) * 100;

      if (!this.selectedProjectPoint.borders?.length) {
        this.selectedProjectPoint.borders = [{
          Cordinates: [],
          visible: true,
          color: 'blue',
          data: { name: 'اسم الحد' }
        }];
      }
      this.selectedProjectPoint.borders[0].Cordinates.push({ x: xPercent, y: yPercent });

      console.log('Updated borders for selected point:', this.selectedProjectPoint.borders);
    }
  }

  onBorderColorChange(border: Border, event: Event) {
    const newColor = (event.target as HTMLInputElement).value;
    border.color = newColor;
    console.log('Updated border color:', border.color);
  }

  removeBorder(data: any, index: number) {
    if (data.borders && data.borders.length > index) {
      data.borders.splice(index, 1);
      console.log('Border removed at index:', index);
    } else {
      console.error('Invalid border index or data:', index, data);
    }
  }

  toggleDrawingBuildingBorder() {
    this.addBuildingBorder = !this.addBuildingBorder;
  }

  finishCurrentBorder() {
    if (this.currentBorder) {
      console.log('Finishing current border with coords:', this.currentBorder.Cordinates);
      if (this.projectsMap.data) console.log('Borders:', this.projectsMap.data[0].borders);
      this.currentBorder = null;
    } else {
      console.warn('No border is currently in progress to finish!');
    }
  }

  // --- Advanced Filter Methods ---

  /**
   * Handles changes in the type filter checkboxes.
   * @param type The type of border.
   * @param event The change event.
   */
  onTypeFilterChange(type: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.activeBorderFilters.types[type] = isChecked;
    this.applyAdvancedFilters();
  }

  /**
   * Handles changes in the floors filter checkboxes.
   * @param floor The number of floors.
   * @param event The change event.
   */
  onFloorFilterChange(floor: number, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.activeBorderFilters.floors.push(floor);
    } else {
      this.activeBorderFilters.floors = this.activeBorderFilters.floors.filter(f => f !== floor);
    }
    this.applyAdvancedFilters();
  }

  /**
   * Handles changes in the area range sliders.
   */
  onAreaFilterChange() {
    if (this.activeBorderFilters.area.min > this.activeBorderFilters.area.max) {
      this.activeBorderFilters.area.min = this.activeBorderFilters.area.max;
    }
    this.applyAdvancedFilters();
  }

  /**
   * Handles changes in the occupancy range sliders.
   */
  onOccupancyFilterChange() {
    if (this.activeBorderFilters.occupancy.min > this.activeBorderFilters.occupancy.max) {
      this.activeBorderFilters.occupancy.min = this.activeBorderFilters.occupancy.max;
    }
    this.applyAdvancedFilters();
  }

  /**
   * Retrieves the label for a given border type.
   * @param type The type of border.
   * @returns The localized label for the type.
   */
  getTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      'سكني': 'سكني',
      'تجاري': 'تجاري',
      'عيادات': 'عيادات',
      'تسوق': 'تسوق'
    };
    return labels[type] || type;
  }
}