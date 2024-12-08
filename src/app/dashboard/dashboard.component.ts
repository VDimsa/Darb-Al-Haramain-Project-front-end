import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProjectsDashboardComponent } from "../shared/projects-dashboard/projects-dashboard.component";
import { Project } from '../shared/projects-dashboard/project.model';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card'; 
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-dashboard',
  imports: [
    IonicModule,
    ProjectsDashboardComponent,
    CommonModule,
    MatTabsModule,
    MatCardModule,
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  currentProject: Project | null = null;

}
