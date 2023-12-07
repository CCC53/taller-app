import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AssignmentResponse, FindItemsAviableSelect,
        FindVehiclesSelect, RemoveFromServiceResponse } from '../types/assignments';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findItemsAviable(table: string): Observable<FindItemsAviableSelect> {
    return this.http.get<FindItemsAviableSelect>(`${this.apiUrl}/assignments/${table}`).pipe(
      catchError(error => {
        throw error.error.error
      })
    );
  }

  assignEmployeeToService(id: string, data: any): Observable<AssignmentResponse> {
    return this.http.put<AssignmentResponse>(`${this.apiUrl}/assignments/employee/${id}`, data).pipe(
      catchError(error => {
        throw error.error.error
      })
    );
  }

  assignSparePartToService(id: string, data: any): Observable<AssignmentResponse> {
    return this.http.put<AssignmentResponse>(`${this.apiUrl}/assignments/spare-part/${id}`, data).pipe(
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
