import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FindServiceResponse, NewServiceResponse, UpdateServiceResponse } from '../types/services';
import { environment } from 'src/environments/environment';
import { ServiceFieldsModel } from '../pages/services/service/service.component.fields';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  findOne(id: string): Observable<FindServiceResponse> {
    return this.http.get<FindServiceResponse>(`${this.apiUrl}/services/${id}`);
  }

  createOne(formData: ServiceFieldsModel): Observable<NewServiceResponse> {
    return this.http.post<NewServiceResponse>(`${this.apiUrl}/services`, formData);
  }

  updateOne(formData: ServiceFieldsModel, id: string): Observable<UpdateServiceResponse> {
    return this.http.put<UpdateServiceResponse>(`${this.apiUrl}/services/${id}`, formData);
  }
}
