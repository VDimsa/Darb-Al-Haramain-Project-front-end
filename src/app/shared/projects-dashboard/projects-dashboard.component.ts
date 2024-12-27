// src\app\shared\projects-dashboard\projects-dashboard.component.ts
import { Component, ElementRef, ViewChild, Input, Output, EventEmitter, SimpleChanges } from '@angular/core'
import { CommonModule } from '@angular/common'
import { pointTypes, PointType, Project, Point, PointTypeEnum, Path, Border } from './project.model'
import { PreloaderService } from '../preload/preloader.service'
import path from 'node:path'
import { alharamenProjectMap } from '../../../assets/staticPaths'

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
  @Input() currentProject: Project | null = null
  @Input() newProject: Partial<Project> | null = null
  @Input() newPointBoarder: Partial<Point> | null = null
  @Input() isAddingMode = false
  @Input() showNewMapImage: boolean = false
  @Input() selectedBorderPoint: Point | null = null
  @Input() addingPointType: PointTypeEnum | null = null
  @Input() showSidebar = true
  @Input() addStage = 0
  @Output() dataCleared = new EventEmitter<void>()
  @Output() selectedBorderPointChange = new EventEmitter<Point | null>();
  @ViewChild('scrollContainer') scrollContainer!: ElementRef
  @ViewChild('mapContainer') mapContainer!: ElementRef
  @ViewChild('projectMap') projectMap!: ElementRef

  selectedProjectPoint: Point | null = null
  selectedPoint: Point | null = null
  newPath: Path[] | null = null
  showFilters = false

  private isDragging = false
  private offsetX = 0
  private offsetY = 0
  private scale = 1
  private transformX = 0
  private transformY = 0

  private imageCache = new Map<File, string>()

  filterOptions: { type: string; label: string }[] = []
  activeFilters: { [key: string]: boolean } = {}

  selectedPath: { d: string }[] = []
  pathDrawn = false

  currentMapImage: string | File | null = null
  showPartProjectMap = false

  constructor(
    private preloaderService: PreloaderService
  ) {
    this.preloaderService.show()
  }

  ngOnInit() {
    if (this.activeProject?.mapImage) {
      this.currentMapImage = this.getMapImageSource(this.activeProject.mapImage)
    }

    this.filterOptions = pointTypes
      .filter((pt) => pt.type !== PointTypeEnum.PROJECT)
      .map((pt) => ({
        type: pt.type,
        label: this.getFilterLabel(pt.type),
      }))

    this.activeFilters = this.filterOptions.reduce(
      (filters, option) => ({ ...filters, [option.type]: true }),
      {}
    )
    
    this.selectFirstProjectPoint();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['addStage']) {
      this.onStageChange();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.preloaderService.hide();
    }, 2000)
  }

  ngOnDestroy() {
    this.clearCachedURLs()
  }

  getFilterLabel(type: string): string {
    const labels: { [key: string]: string } = {
      mosque: 'مساجد',
      school: 'مدارس',
      restaurant: 'مطاعم',
      mall: 'مولات',
      hospital: 'مستشفيات',
    }
    return labels[type] || type
  }

  selectFirstProjectPoint() {
    if (this.currentProject && this.currentProject.points) {
      const firstProjectPoint = this.currentProject.points.find(point => point.isProject)
      if (firstProjectPoint) {
        this.onPointClick(firstProjectPoint)
      }
    }
  }

  onMouseWheel(event: WheelEvent) {
    if (event.ctrlKey) {
      event.preventDefault();
  
      const zoomFactor = 0.1;
  
      // 1. Calculate new scale.
      let newScale = this.scale + (event.deltaY > 0 ? -zoomFactor : zoomFactor);
  
      // 2. Clamp between your desired min/max scale.
      newScale = Math.max(0.5, Math.min(2, newScale));
  
      const container = this.mapContainer.nativeElement as HTMLElement;
      const scrollContainer = this.scrollContainer.nativeElement as HTMLElement;
  
      // 3. Temporarily apply the new scale to measure the container's size.
      container.style.zoom = `${newScale}`;
  
      // 4. Retrieve bounding boxes of each container.
      //    getBoundingClientRect() will reflect the current layout (including zoom).
      const containerRect = container.getBoundingClientRect();
      const scrollRect = scrollContainer.getBoundingClientRect();
  
      // 5. Check if the container is now smaller than the scroll container
      //    in either width or height.
      if (containerRect.width < scrollRect.width || containerRect.height < scrollRect.height) {
        // Compute how much we need to scale up so that
        // containerRect >= scrollRect in both dimensions.
  
        const widthRatio = scrollRect.width / containerRect.width;
        const heightRatio = scrollRect.height / containerRect.height;
  
        // Use the larger ratio so container matches/exceeds both dimensions.
        const neededRatio = Math.max(widthRatio, heightRatio);
  
        // Adjust newScale accordingly.
        newScale *= neededRatio;
  
        // Still keep it within the maximum allowed scale, e.g., 2 in this case.
        newScale = Math.min(newScale, 2);
  
        // Reapply the corrected scale.
        container.style.zoom = `${newScale}`;
      }
  
      // 6. Store the final scale value.
      this.scale = newScale;
    }
  }

  onPointClick(point: Point, event?: MouseEvent) {
    if (event) event.stopPropagation()
    if (this.isAddingMode) {
      this.handleAddModePointClick(point, event)
    } else {
      this.handleViewModePointClick(point, event)
    }
  }

  onContainerClick(event: MouseEvent) {
    if (this.isAddingMode) {
      this.handleAddModeContainerClick(event)
    }
  }

  drawPath() {
    if (!this.activeProject || !this.selectedProjectPoint || !this.selectedPoint) return
    const projectPoint = this.activeProject.points!.find(p => p.isProject)
    if (!projectPoint || !projectPoint.paths) return
    const pathToPoint = projectPoint.paths.find(p => p.point.id === this.selectedPoint!.id)
    if (!pathToPoint) return
    const pathData = pathToPoint.path
      .map((p, index) => `${index === 0 ? 'M' : 'L'} ${p.x * 20},${p.y * 10.83}`)
      .join(' ')
    this.selectedPath = [{ d: pathData }]
  }

  autoScroll() {
    if (this.currentProject?.autoScroll && this.scrollContainer) {
      const { x, y } = this.currentProject.autoScroll
      const scrollElement = this.scrollContainer.nativeElement
      const scrollLeft = (x / 100) * scrollElement.scrollWidth
      const scrollTop = (y / 100) * scrollElement.scrollHeight
      scrollElement.scrollLeft = -scrollLeft
      scrollElement.scrollTop = scrollTop
    }
  }

  onImageLoad() {
    this.autoScroll()
  }

  onImageError() {
  }

  getMapImageSource(mapImage: string | File | null | undefined): string | null {
    if (!mapImage) return null
    if (typeof mapImage === 'string') return mapImage
    if (mapImage instanceof File) {
      if (!this.imageCache.has(mapImage)) {
        const url = URL.createObjectURL(mapImage)
        this.imageCache.set(mapImage, url)
      }
      return this.imageCache.get(mapImage) || null
    }
    return null
  }

  getPointClass(type: string): string {
    const pointType = pointTypes.find((pt: PointType) => pt.type === type)
    return pointType ? pointType.class : ''
  }

  clearCachedURLs() {
    this.imageCache.forEach((url) => URL.revokeObjectURL(url))
    this.imageCache.clear()
  }

  clearData() {
    this.clearCachedURLs()
    this.selectedBorderPoint = null
    this.showPartProjectMap = false
    if (this.activeProject?.mapImage) {
      this.currentMapImage = this.getMapImageSource(this.activeProject.mapImage)
    }
    this.currentProject = null
    this.selectedPath = []
    this.dataCleared.emit()
  }

  get activeProject(): Project | Partial<Project> | null {
    return this.isAddingMode ? this.newProject : this.currentProject
  }

  applyFilters() {
    if (this.currentProject?.points) {
      this.currentProject.points.forEach((point) => {
        if (point.type === PointTypeEnum.PROJECT) {
          point.visible = true
        } else {
          point.visible = this.activeFilters[point.type] || false
        }
      })
    }
  }

  onFilterChange(filterKey: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked
    this.activeFilters[filterKey] = isChecked
    this.applyFilters()
  }

  toggleFilters() {
    this.showFilters = !this.showFilters
  }

  /**
   * Before fix:
   * getBorderPoints(borders: { x: number; y: number }[] | undefined): string {
   *   if (!borders || borders.length === 0) return ''
   *   return borders
   *     .map(border => `${border.x * 20},${border.y * 10.83}`)
   *     .join(' ')
   * }
   */
  getBorderPoints(coordinates: { x: number; y: number }[] | undefined): string {
    if (!coordinates || coordinates.length === 0) return '';
    return coordinates
      .map(coord => `${coord.x * 20},${coord.y * 10.83}`)
      .join(' ');
  }

  onBorderClick(point: Point, event?: MouseEvent) {
    if (this.isAddingMode) {
      this.handleAddModeBorderClick(point, event);
    } else {
      this.handleNonAddModeBorderClick(point, event);
    }

    // Emit the updated border point
    this.selectedBorderPointChange.emit(this.selectedBorderPoint);
  }
  
  private handleAddModeBorderClick(point: Point, event?: MouseEvent) {
    if(this.addStage === 6) {
      this.selectedBorderPoint = point;
    }
  }
  
  private handleNonAddModeBorderClick(point: Point, event?: MouseEvent) {
    const selectedProjectMap = alharamenProjectMap.find(
      (map) => map.projectId === this.activeProject?.id && map.pointId === point.id
    );

    if (selectedProjectMap) {
      this.currentMapImage = selectedProjectMap.mapImage;
      this.showPartProjectMap = true;
      // OLD: this.selectedBorderPoint = { ...point, borders: selectedProjectMap.data![0]?.borders[0]?.Cordinates || [] };
      // Instead we must preserve the shape: Point => { borders: Border[] }, each Border must have Cordinates
      // We'll create a new Border[] from the existing selectedProjectMap data:
      this.selectedBorderPoint = {
        ...point,
        borders: selectedProjectMap.data![0]?.borders || []
      };
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
        this.newProject.points = this.newProject.points.filter(p => p.id !== point.id)
      }
      if (this.newProject && this.newProject.points && this.addStage === 2 && point.importance === 1) {
        this.newProject.points = this.newProject.points.filter(p => p.id !== point.id)
      }
      if (this.newProject && this.newProject.points && this.addStage === 3 && point.importance === 0) {
        this.newProject.points = this.newProject.points.filter(p => p.id !== point.id)
      }
    }

    if (this.addStage === 4) {

      if (point.isProject) {
        if (this.selectedProjectPoint !== point) {
          this.selectedProjectPoint = point;
          this.pathDrawn = false;
          console.log('Selected project point:', this.selectedProjectPoint);
        }
      } else {
        if (this.selectedPoint !== point) {
          this.selectedPoint = point;
          this.pathDrawn = false;
          console.log('Selected point:', this.selectedPoint);
        }
      }

      this.handleAddStage4PointClick(point)
    }

    if (this.addStage === 5) {
      this.handleAddStage5PointClick(point, event);
    }
  }

  private handleViewModePointClick(point: Point, event?: MouseEvent) {
    if (point.isProject) {
      this.selectedPath = []
      this.selectedProjectPoint = point
      this.selectedPoint = null
    } else {
      this.selectedPath = []
      this.selectedPoint = point
    }

    if (this.selectedProjectPoint && this.selectedPoint) {
      this.drawPath()
    }
  }

  private handleAddModeContainerClick(event: MouseEvent) {
    const container = this.projectMap.nativeElement as HTMLElement
    const rect = container.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const offsetY = event.clientY - rect.top
    const xPercent = (offsetX / rect.width) * 100
    const yPercent = (offsetY / rect.height) * 100

    if (this.addStage <= 3) {
      this.addNewPoint(xPercent, yPercent)
    } else if (this.addStage === 4) {
      this.handleAddStage4ContainerClick(xPercent, yPercent, event)
    } else if (this.addStage === 5) {
      this.handleAddStage5ContainerClick(xPercent, yPercent, event)
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
      position: {
        x: xPercent,
        y: yPercent,
      },
      visible: true,
      // For type safety, add an empty array for borders & paths if needed
      borders: [],
      paths: []
    }

    if (this.addStage === 2) {
      point.importance = 1
      point.name = 'اسم النقطة'
      point.isProject = false
    } else if (this.addStage === 3) {
      point.importance = 0
      point.name = 'اسم النقطة'
      point.type = this.addingPointType!
      point.logo = null
      point.isProject = false
    }

    if (this.newProject) {
      this.newProject.points = this.newProject.points || []
      this.newProject.points.push(point)
    } else {
      this.newProject = {
        id: null,
        name: '',
        mapImage: null,
        points: [point],
      }
    }
  }

  private handleAddStage4PointClick(point: Point) {
    if (this.selectedPoint && this.selectedProjectPoint && !this.pathDrawn) {
      const existingPath = this.selectedProjectPoint.paths?.find(
        (p) => p.point.id === this.selectedPoint!.id
      )
      if (existingPath) {
        this.useExistingPath(existingPath.path)
      } else {
        this.initializePath(this.selectedProjectPoint, this.selectedPoint)
      }
    }

    else if (point === this.selectedProjectPoint && this.selectedPoint && this.pathDrawn) {
      this.resetPath(this.selectedProjectPoint, this.selectedPoint)
      return
    }

    else if (point === this.selectedPoint && this.pathDrawn) {
      this.finalizePath()
      return
    }
  }

  private handleAddStage4ContainerClick(xPercent: number, yPercent: number, event: MouseEvent) {
    if (this.selectedProjectPoint && this.selectedPoint) {
      if (!this.newPath) {
        this.checkOrCreatePathForStage4()
      } else {
        this.addIntermediatePointToPath(xPercent, yPercent)
      }

      const pathData = this.newPath
        ?.map((p, index) => `${index === 0 ? 'M' : 'L'} ${p.x * 20},${p.y * 10.83}`)
        .join(' ')
      this.selectedPath = pathData ? [{ d: pathData }] : []
      this.pathDrawn = true
    }
  }

  private handleAddStage5PointClick(point: Point, event?: MouseEvent) {
    if (point.isProject) {
      if (this.selectedProjectPoint !== point) {
        this.selectedProjectPoint = point;
        console.log('Selected project point for Stage 5:', this.selectedProjectPoint);
      } else {
        if (this.selectedProjectPoint) {
          // Clean up the existing borders (which are an array of Border objects)
          this.selectedProjectPoint.borders = [];
          this.selectedProjectPoint.pointMap = null;
        }
      }
    } else {
      console.warn('Only project points can be selected in Stage 5.');
    }
  }

  private handleAddStage5ContainerClick(xPercent: number, yPercent: number, event: MouseEvent) {
    if (this.selectedProjectPoint) {
      // Instead of pushing {x, y} directly into `borders` (which is an array of Border),
      // we need to push into the .Cordinates of a Border.
      if (!this.selectedProjectPoint.borders?.length) {
        // Create the first Border if none exists
        this.selectedProjectPoint.borders = [{
          Cordinates: []
        }];
      }
      // Then push to the last border's Cordinates
      this.selectedProjectPoint.borders[this.selectedProjectPoint.borders.length - 1]
        .Cordinates.push({ x: xPercent, y: yPercent });
    }
  }

  private useExistingPath(existing: Path[]) {
    this.newPath = existing.map(coord => ({ x: coord.x, y: coord.y }))
    const pathData = this.newPath
      .map((p, index) => `${index === 0 ? 'M' : 'L'} ${p.x * 20},${p.y * 10.83}`)
      .join(' ')
    this.selectedPath = [{ d: pathData }]
    this.pathDrawn = true
  }

  private initializePath(projectPoint: Point, targetPoint: Point) {
    this.newPath = [projectPoint.position, targetPoint.position]
    const pathData = this.newPath
      .map((p, index) => `${index === 0 ? 'M' : 'L'} ${p.x * 20},${p.y * 10.83}`)
      .join(' ')
    this.selectedPath = [{ d: pathData }]
    this.pathDrawn = true
  }

  private resetPath(projectPoint: Point, targetPoint: Point) {
    this.newPath = [projectPoint.position, targetPoint.position]
    const pathData = this.newPath
      .map((p, index) => `${index === 0 ? 'M' : 'L'} ${p.x * 20},${p.y * 10.83}`)
      .join(' ')
    this.selectedPath = [{ d: pathData }]
  }

  private finalizePath() {
    if (!this.newPath) return
    const projectPoint = this.newProject?.points?.find(p => p.id === this.selectedProjectPoint!.id)
    if (projectPoint) {
      if (!projectPoint.paths) projectPoint.paths = []
      const existingPathIndex = projectPoint.paths.findIndex(
        p => p.point.id === this.selectedPoint!.id
      )
      if (existingPathIndex !== -1) {
        projectPoint.paths[existingPathIndex].path = this.newPath.map((coord, index) => ({
          id: index + 1,
          x: coord.x,
          y: coord.y,
        }))
      } else {
        projectPoint.paths.push({
          point: this.selectedPoint!,
          path: this.newPath.map((coord, index) => ({
            id: index + 1,
            x: coord.x,
            y: coord.y,
          })),
        })
      }
      this.selectedPoint = null
      this.newPath = null
      this.selectedPath = []
      this.pathDrawn = false
    }
  }

  private checkOrCreatePathForStage4() {
    const projectPoint = this.currentProject?.points.find(p => p.isProject)
    if (projectPoint && projectPoint.paths) {
      const existingPath = projectPoint.paths.find(
        p => p.point.id === this.selectedPoint!.id
      )
      if (existingPath) {
        this.useExistingPath(existingPath.path)
      } else {
        this.initializePath(this.selectedProjectPoint!, this.selectedPoint!)
      }
    } else {
      this.initializePath(this.selectedProjectPoint!, this.selectedPoint!)
    }
  }

  private addIntermediatePointToPath(xPercent: number, yPercent: number) {
    if (!this.newPath) return
    const newIntermediatePoint: Path = { x: xPercent, y: yPercent }
    this.newPath.splice(this.newPath.length - 1, 0, newIntermediatePoint)
  }
    
  private handleStageChange(newStage?: number) {
    this.selectedProjectPoint = null;
    this.selectedPoint = null;
    this.pathDrawn = false;
    this.newPath = null;
    this.selectedPath = [];

    if (this.addStage === 7) {
      this.showPartProjectMap = true;
      this.currentMapImage = this.selectedBorderPoint?.pointMap || null;
    } else {
      this.showPartProjectMap = false;
      this.currentMapImage = this.activeProject?.mapImage || null;
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
  
    console.log('Updated points visibility for stage:', newStage);
  }

  onDrawBorder(event: MouseEvent) {
    if (this.addStage === 7 && this.selectedBorderPoint) {
      const container = this.projectMap.nativeElement as HTMLElement;
      const rect = container.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const xPercent = (offsetX / rect.width) * 100;
      const yPercent = (offsetY / rect.height) * 100;

      // Instead of pushing directly to .borders, we push to the .Cordinates of a Border
      if (!this.selectedBorderPoint.borders?.length) {
        this.selectedBorderPoint.borders = [{
          Cordinates: []
        }];
      }
      this.selectedBorderPoint.borders[0].Cordinates.push({ x: xPercent, y: yPercent });

      console.log('Added new border point:', { x: xPercent, y: yPercent });
    } 
    else {
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
  
      // OLD (invalid):
      // this.selectedProjectPoint.borders.push({ x: xPercent, y: yPercent });
      // FIX: push to the .Cordinates of an existing or new Border
      if (!this.selectedProjectPoint.borders?.length) {
        this.selectedProjectPoint.borders = [{
          Cordinates: []
        }];
      }
      this.selectedProjectPoint.borders[0].Cordinates.push({ x: xPercent, y: yPercent });

      console.log('Updated borders for selected point:', this.selectedProjectPoint.borders);
    }
  }
}