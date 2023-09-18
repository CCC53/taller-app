import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FindEmployeesResponse, FindEmployeeResponse, NewEmployeeResponse, UpdateEmployeeResponse } from '../types/employees';
import { DeleteItemResponse } from '../types/services';
import { EmployeeFieldsModel } from '../pages/employees/employee/employee.component.fields';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findAll(page: number, pageSize: number): Observable<FindEmployeesResponse> {
    return this.http.get<FindEmployeesResponse>(`${this.apiUrl}/employees?page=${page}&pageSize=${pageSize}`);
  }

  findOne(id: string): Observable<FindEmployeeResponse> {
    return this.http.get<FindEmployeeResponse>(`${this.apiUrl}/employees/${id}`);
  }

  createOne(data: EmployeeFieldsModel): Observable<NewEmployeeResponse> {
    return this.http.post<NewEmployeeResponse>(`${this.apiUrl}/employees`, data).pipe(
      catchError(error => {
        throw error.error.error
      })
    );
  }

  updateOne(data: EmployeeFieldsModel, id: string): Observable<UpdateEmployeeResponse> {
    return this.http.put<UpdateEmployeeResponse>(`${this.apiUrl}/employees/${id}`, data).pipe(
      catchError(error => {
        throw error.error.error
      })
    );
  }

  deleteOne(id: string): Observable<DeleteItemResponse> {
    return this.http.delete<DeleteItemResponse>(`${this.apiUrl}/employees/${id}`).pipe(
      catchError(error => {
        throw error.error.error
      })
    );
  }

}
