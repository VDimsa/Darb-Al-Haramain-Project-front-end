import { Component, Inject, PLATFORM_ID, NgZone, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PreloadComponent } from "../preload/preload.component";

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss'],
})
export class NavmenuComponent implements AfterViewInit {
  constructor(@Inject(PLATFORM_ID) private platformId: any, private ngZone: NgZone) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      import('bootstrap').then(bootstrap => {
        this.ngZone.runOutsideAngular(() => {
          const dropdowns = document.querySelectorAll('.dropdown-toggle');
          dropdowns.forEach(dropdown => {
            new bootstrap.Dropdown(dropdown);
          });
        });
      });
    }
  }
  }
