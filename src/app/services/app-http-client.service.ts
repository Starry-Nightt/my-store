import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppHttpClientService {
  prefix = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  get<T>(url: string, params: any = {}): Observable<T> {
    const queryString = '?' + new URLSearchParams(params).toString();
    return this.http.get<T>(this.prefix + url + queryString);
  }

  post<T>(url: string, data: any = {}): Observable<T> {
    return this.http.post<T>(this.prefix + url, data);
  }

  put<T>(url: string, data: any = {}): Observable<T> {
    return this.http.put<T>(this.prefix + url, data);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(this.prefix + url);
  }
}
