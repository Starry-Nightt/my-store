import { Injectable } from '@angular/core';
import { User } from '@models/user.model';
import { Observable, of, tap } from 'rxjs';
import { AppHttpClientService } from './app-http-client.service';

export interface LoginData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User;

  constructor(private http: AppHttpClientService) {}

  login(data: LoginData): Observable<User> {
    return this.http.post<User>('/auth/login', data).pipe(
      tap((res) => {
        this.user = res;
      })
    );
  }

  logout(): Observable<boolean> {
    return of(true);
  }
}
