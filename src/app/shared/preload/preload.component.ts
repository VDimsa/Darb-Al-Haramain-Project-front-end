import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PreloaderService } from './preloader.service';

@Component({
  selector: 'app-preload',
  imports: [CommonModule],
  templateUrl: './preload.component.html',
  styleUrl: './preload.component.scss'
})

export class PreloadComponent {
  loading$: Observable<boolean>;

  constructor(private preloaderService: PreloaderService) {
    this.loading$ = this.preloaderService.loading$;
  }
}
