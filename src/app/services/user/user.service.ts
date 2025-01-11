import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Role, Permission } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Fetch role by role_id
  getRoleById(roleId: number): Observable<Role> {
    return this.http.get<Role>(`${environment.apiUrl}/roles/${roleId}`);
  }

  // Fetch permissions by role_id
  getPermissionsByRoleId(roleId: number): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${environment.apiUrl}/roles/${roleId}/permissions`);
  }
}