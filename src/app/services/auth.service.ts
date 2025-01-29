import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginCredentials, AuthResponse, AuthState } from '../models/auth.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private storageService = inject(StorageService);

  private apiUrl = 'https://fakestoreapi.com/auth';
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  private authState = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

  constructor() {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = this.storageService.getItem<string>(this.TOKEN_KEY);
    const user = this.storageService.getItem<AuthResponse['user']>(this.USER_KEY);

    if (token && user) {
      this.authState.next({
        isAuthenticated: true,
        token,
        user
      });
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.storageService.setItem(this.TOKEN_KEY, response.token);
        this.storageService.setItem(this.USER_KEY, response.user);

        this.authState.next({
          isAuthenticated: true,
          token: response.token,
          user: response.user
        });
      })
    );
  }

  logout(): void {
    this.storageService.removeItem(this.TOKEN_KEY);
    this.storageService.removeItem(this.USER_KEY);

    this.authState.next({
      isAuthenticated: false,
      token: null,
      user: null
    });
  }

  getAuthState(): Observable<AuthState> {
    return this.authState.asObservable();
  }

  isAuthenticated(): boolean {
    return this.authState.value.isAuthenticated;
  }

  getToken(): string | null {
    return this.authState.value.token;
  }
}