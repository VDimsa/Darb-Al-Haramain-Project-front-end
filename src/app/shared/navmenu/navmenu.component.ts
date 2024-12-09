import { Component, Inject, PLATFORM_ID, NgZone, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navmenu',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss'],
})
export class NavmenuComponent implements AfterViewInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any, 
    private ngZone: NgZone,
    private router: Router,
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      import('bootstrap').then((bootstrap) => {
        this.ngZone.runOutsideAngular(() => {
          const dropdowns = document.querySelectorAll('.dropdown-toggle');

          // Initialize each dropdown
          dropdowns.forEach((dropdown) => {
            try {
              new bootstrap.Dropdown(dropdown); // Initialize dropdown
              console.log('Dropdown initialized:', dropdown);
            } catch (error) {
              console.error('Error initializing dropdown:', error);
            }
          });
        });
      }).catch((error) => {
        console.error('Bootstrap import error:', error);
      });
    }
  }
  // Check if the user is logged in by checking if a token exists in localStorage
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }
}
