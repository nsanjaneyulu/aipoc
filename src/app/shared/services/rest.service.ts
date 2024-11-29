import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  baseUrl: string = environment.API_Base_URL;

  constructor(private http: HttpClient) {}

  getAll<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }
  getbyId<T>(url: string, id: T): Observable<T> {
    return this.http.get<T>(url);
  }
  patch<T>(url: string, body: T): Observable<T> {
    return this.http.patch<T>(url, body);
  }
  put<T>(url: string, body: T): Observable<T> {
    return this.http.put<T>(url, body);
  }
  delete<T>(url: string, id: T): Observable<T> {
    return this.http.delete<T>(url);
  }

  handleResponce<T>() {}
  handleRequest<T>() {}
}
