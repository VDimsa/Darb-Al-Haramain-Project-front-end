import { Component } from '@angular/core';
import { ProjectsDashboardComponent } from "../shared/projects-dashboard/projects-dashboard.component";
import { Project } from '../shared/projects-dashboard/project.model';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-dashboard',
  imports: [
    ProjectsDashboardComponent,
    CommonModule,
    BrowserModule,
    TabViewModule,
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  currentProject: Project | null = null;

}
