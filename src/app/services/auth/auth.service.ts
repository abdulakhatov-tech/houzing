import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IAuthResponse, ISignUpFormData } from '@shared/interfaces/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:8000/api/auth';

  constructor(private http: HttpClient) {}

  signUp(payload: Omit<ISignUpFormData, 'confirmPassword'>): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${this.apiUrl}/sign-up`, payload).pipe(
      tap((res) => {
        // Store tokens
        localStorage.setItem('token', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(res.data.user))
      })
    );
  }

  signOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  get isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
