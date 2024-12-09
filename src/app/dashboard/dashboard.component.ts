import { Component } from '@angular/core';
import { ProjectsDashboardComponent } from "../shared/projects-dashboard/projects-dashboard.component";
import { Project } from '../shared/projects-dashboard/project.model';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-dashboard',
  imports: [
    ProjectsDashboardComponent,
    CommonModule,
    MatTabsModule,
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  currentProject: Project | null = null;

}
