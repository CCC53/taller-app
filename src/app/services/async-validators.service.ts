import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CheckEmailResponse } from '../types/validators';
import { CheckEmailData } from '../types/validators';

@Injectable({
  providedIn: 'root'
})
export class AsyncValidatorsService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  checkEmail(data: CheckEmailData): Observable<boolean> {
    return this.http.post<CheckEmailResponse>(`${this.apiUrl}/auth/check-email`, data).pipe(
      map(({ existent }) => existent)
    )
  }
  
}
