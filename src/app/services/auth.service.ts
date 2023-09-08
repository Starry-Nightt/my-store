import { Injectable } from '@angular/core';
import { User } from '@models/user.model';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { AppHttpClientService } from './app-http-client.service';
import { CartService } from './cart.service';

export interface LoginData {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User>(undefined);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  constructor(private http: AppHttpClientService) {}

  login(data: LoginData): Observable<User> {
    return this.http.post<User>('/auth/login', data).pipe(
      tap((res) => {
        this.user$.next(res);
        this.isLoggedIn$.next(true);
      })
    );
  }

  logout(): Observable<boolean> {
    return of(true).pipe(
      tap((res) => {
        if (!res) return;
        this.user$.next(undefined);
        this.isLoggedIn$.next(false);
      })
    );
  }
}
