import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PointService {
    private apiUrl = `${environment.apiUrl}/points`;
  

  constructor(private http: HttpClient) {}

  getPoints(): Observable<Point[]> {
    return this.http.get<Point[]>(this.apiUrl);
  }

  getPointById(id: number): Observable<Point> {
    return this.http.get<Point>(`${this.apiUrl}/${id}`);
  }

  createPoint(point: Point): Observable<Point> {
    return this.http.post<Point>(this.apiUrl, point);
  }

  updatePoint(id: number, point: Point): Observable<Point> {
    return this.http.put<Point>(`${this.apiUrl}/${id}`, point);
  }

  deletePoint(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}