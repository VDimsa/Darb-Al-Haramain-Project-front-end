import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavmenuComponent } from "./shared/navmenu/navmenu.component";
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PreloadComponent } from "./shared/preload/preload.component";
import { PreloaderService } from './shared/preload/preloader.service';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet, NavmenuComponent, HttpClientModule, CommonModule, PreloadComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'درب الحرمين';

  constructor(
    private preloaderService: PreloaderService,
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.preloaderService.hide();
    }, 2000);
  }
}
