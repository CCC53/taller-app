import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DeleteItemResponse, DynamicTableData } from '../types/shared';

@Injectable({
  providedIn: 'root'
})
export class DynamicTableService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDataFromSearch(table: string, search: string, page: number, pageSize: number): Observable<DynamicTableData> {
    return this.http.get<DynamicTableData>(`${this.apiUrl}/search/${table}?search=${search}&page=${page}&pageSize=${pageSize}`);
  }

  loadData(table: string, page: number, pageSize: number): Observable<DynamicTableData> {
    return this.http.get<DynamicTableData>(`${this.apiUrl}/${table}?page=${page}&pageSize=${pageSize}`);
  }

  removeRow(table: string, row: any): Observable<DeleteItemResponse> {
    return this.http.delete<DeleteItemResponse>(`${this.apiUrl}/${table}/${row.id}`).pipe(
      catchError(error => {
        throw error.error.error
      })
    );
  }
}
