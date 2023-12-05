import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FindSparePartResponse, NewSparePartResponse, UpdateSparePartResponse } from '../types/spare-parts';
import { SparePartFieldsModel } from '../pages/spare-parts/spare-part/spare-part.component.fields';

@Injectable({
  providedIn: 'root'
})
export class SparePartsService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findOne(id: string): Observable<FindSparePartResponse> {
    return this.http.get<FindSparePartResponse>(`${this.apiUrl}/spare-parts/${id}`);
  }

  createOne(data: SparePartFieldsModel): Observable<NewSparePartResponse> {
    return this.http.post<NewSparePartResponse>(`${this.apiUrl}/spare-parts`, data).pipe(
      catchError(error => {
        throw error.error.error
      })
    );
  }

  updateOne(data: SparePartFieldsModel, id: string): Observable<UpdateSparePartResponse> {
    return this.http.put<UpdateSparePartResponse>(`${this.apiUrl}/spare-parts/${id}`, data).pipe(
      catchError(error => {
        throw error.error.error
      })
    );
  }
}
