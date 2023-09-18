import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { FindVehicleResponse, FindVehiclesResponse, NewVehicleResponse, UpdateVehicleResponse } from '../types/vehicles';
import { environment } from 'src/environments/environment';
import { DeleteItemResponse } from '../types/services';
import { VehicleFieldsModel } from '../pages/vehicles/vehicle/vehicle.component.fields';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private apiUrl: string = environment.apiUrl

  constructor(private http: HttpClient) { }

  findAll(page: number, pageSize: number): Observable<FindVehiclesResponse> {
    return this.http.get<FindVehiclesResponse>(`${this.apiUrl}/vehicles?page=${page}&pageSize=${pageSize}`);
  }

  findOne(id: string): Observable<FindVehicleResponse> {
    return this.http.get<FindVehicleResponse>(`${this.apiUrl}/vehicles/${id}`);
  } 

  createOne(data: VehicleFieldsModel): Observable<NewVehicleResponse> {
    return this.http.post<NewVehicleResponse>(`${this.apiUrl}/vehicles`, data).pipe(
      catchError(error => {
        throw error.error.error
      })
    )
  }

  updateOne(data: VehicleFieldsModel, id: string): Observable<UpdateVehicleResponse> {
    return this.http.put<UpdateVehicleResponse>(`${this.apiUrl}/vehicles/${id}`, data).pipe(
      catchError(error => {
        throw error.error.error
      })
    )
  }

  deleteOne(id: string): Observable<DeleteItemResponse> {
    return this.http.delete<DeleteItemResponse>(`${this.apiUrl}/vehicles/${id}`).pipe(
      catchError(error => {
        throw error.error.error
      })
    );
  }
}
