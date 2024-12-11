import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  private loadingSubject = new BehaviorSubject<boolean>(true);  // default is true
  loading$ = this.loadingSubject.asObservable();

  constructor() {}

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }
}
