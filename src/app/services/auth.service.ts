import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginFormModel } from '../auth/login/login.component.fields';
import { LoginRes, LogoutResponse, MeResponse, ValidRoles, ValidateAuth } from '../types/auth';
import { EmployeeFieldsModel } from '../pages/employees/employee/employee.component.fields';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(formData: LoginFormModel): Observable<LoginRes> {
    return this.http.post<LoginRes>(`${this.apiUrl}/auth/login`, formData).pipe(
      tap(({ routes }) => localStorage.setItem('menu', JSON.stringify(routes))),
      catchError(error => {
        throw error.error.error
      })
    )
  }

  logout(): Observable<LogoutResponse> {
    return this.http.get<LogoutResponse>(`${this.apiUrl}/auth/logout`);
  }

  validateToken(): Observable<boolean> {
    return this.http.get<ValidateAuth>(`${this.apiUrl}/auth/validate-token`).pipe(
      map(res => {
        return res.valid
      })
    );
  }

  validateRole(): Observable<boolean> {
    return this.http.get<ValidateAuth>(`${this.apiUrl}/auth/validate-role`).pipe(
      map(res => {
        return res.valid
      })
    );
  }

  getMe(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.apiUrl}/auth/me`);
  }

  getRole(): Observable<ValidRoles> {
    return this.http.get<MeResponse>(`${this.apiUrl}/auth/me`).pipe(
      map(res => res.me.role)
    )
  }

  updateProfile(data: EmployeeFieldsModel): Observable<MeResponse> {
    return this.http.put<MeResponse>(`${this.apiUrl}/auth/update-profile`, data);
  }

}
