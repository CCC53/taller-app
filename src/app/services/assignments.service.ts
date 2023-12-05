import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AssignmentEmployeeResponse, AssignmentSparePartResponse, FindEmployeesAviableSelect, FindSparePartsAviableSelect,
        FindVehiclesSelect, RemoveFromServiceResponse } from '../types/assignments';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findVehiclesSelect(): Observable<FindVehiclesSelect> {
    return this.http.get<FindVehiclesSelect>(`${this.apiUrl}/vehicles/select`).pipe(
      catchError(error => {
        throw error.error.error
      })
    );
  }

  findEmployeesAviable(): Observable<FindEmployeesAviableSelect> {
    return this.http.get<FindEmployeesAviableSelect>(`${this.apiUrl}/assignments/employees`).pipe(
      catchError(error => {
        throw error.error.error
      })
    );
  }

  findSparePartsAviable(): Observable<FindSparePartsAviableSelect> {
    return this.http.get<FindSparePartsAviableSelect>(`${this.apiUrl}/assignments/spare-parts`).pipe(
      catchError(error => {
        throw error.error.error
      })
    )
  }

  assignEmployeeToService(id: string, data: any): Observable<AssignmentEmployeeResponse> {
    return this.http.put<AssignmentEmployeeResponse>(`${this.apiUrl}/assignments/employee/${id}`, data).pipe(
      catchError(error => {
        throw error.error.error
      })
    );
  }

  assignSparePartToService(id: string, data: any): Observable<AssignmentSparePartResponse> {
    return this.http.put<AssignmentSparePartResponse>(`${this.apiUrl}/assignments/spare-part/${id}`, data).pipe(
      catchError(error => {
        throw error.error.error
      })
    );
  }

  removeFromService(item: any, table: 'spare-part' | 'employee'): Observable<RemoveFromServiceResponse> {
    return this.http.delete<RemoveFromServiceResponse>(`${this.apiUrl}/assignments/${table}/${item.id}`).pipe(
      catchError(error => {
        throw error.error.error
      })
    )
  }

}
