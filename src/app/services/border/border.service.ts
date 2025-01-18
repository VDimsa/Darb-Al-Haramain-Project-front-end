import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BorderService {
  private apiUrl = `${environment.apiUrl}/borders`;

  constructor(private http: HttpClient) {}

  getBorders(): Observable<Border[]> {
    return this.http.get<Border[]>(this.apiUrl);
  }

  getBorderById(id: number): Observable<Border> {
    return this.http.get<Border>(`${this.apiUrl}/${id}`);
  }

  createBorder(border: Border): Observable<Border> {
    return this.http.post<Border>(this.apiUrl, border);
  }

  updateBorder(id: number, border: Border): Observable<Border> {
    return this.http.put<Border>(`${this.apiUrl}/${id}`, border);
  }

  deleteBorder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}