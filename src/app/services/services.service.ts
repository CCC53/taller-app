import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { DeleteItemResponse, FindServiceResponse, FindServicesResponse, NewServiceResponse, UpdateServiceResponse } from '../types/services';
import { environment } from 'src/environments/environment';
import { ServiceFieldsModel } from '../pages/services/service/service.component.fields';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  findAll(page: number, pageSize: number): Observable<FindServicesResponse> {
    return this.http.get<FindServicesResponse>(`${this.apiUrl}/services?page=${page}&pageSize=${pageSize}`);
  }

  findOne(id: string): Observable<FindServiceResponse> {
    return this.http.get<FindServiceResponse>(`${this.apiUrl}/services/${id}`);
  }

  createOne(formData: ServiceFieldsModel): Observable<NewServiceResponse> {
    return this.http.post<NewServiceResponse>(`${this.apiUrl}/services`, formData);
  }

  updateOne(formData: ServiceFieldsModel, id: string): Observable<UpdateServiceResponse> {
    return this.http.put<UpdateServiceResponse>(`${this.apiUrl}/services/${id}`, formData);
  }

  deleteOne(id: string): Observable<DeleteItemResponse> {
    return this.http.delete<DeleteItemResponse>(`${this.apiUrl}/services/${id}`).pipe(
      catchError(error => {
        throw error.error.error
      })
    );
  }
}
