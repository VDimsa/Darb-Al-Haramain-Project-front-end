import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IiifTestComponent } from './iiif-test/iiif-test.component';

export const routes: Routes = [
  
  {
    path: 'ar',
    component: HomeComponent,
  },
  {
    path: 'ar/login',
    component: LoginComponent,
  },
  {
    path: 'ar/profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ar/settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ar/dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ar/iiif-test',
    component: IiifTestComponent,
    canActivate: [AuthGuard],
  },

  { path: '', redirectTo: '/ar', pathMatch: 'full' },
  { path: '**', redirectTo: '/ar' },
];
