import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicTableData } from '../types/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDataFromSearch(table: string, search: string, page: number, pageSize: number): Observable<DynamicTableData> {
    return this.http.get<DynamicTableData>(`${this.apiUrl}/search/${table}?search=${search}&page=${page}&pageSize=${pageSize}`);
  }

  restoreData(table: string, page: number, pageSize: number): Observable<DynamicTableData> {
    return this.http.get<DynamicTableData>(`${this.apiUrl}/search/restore/${table}?page=${page}&pageSize=${pageSize}`);
  }
}
