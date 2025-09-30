import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { inject, Injectable, signal } from '@angular/core';

import {
  AuthResponse,
  BaseResponse,
  SignInFormData,
  SignUpFormData,
  VerifyOtpPayload,
  VerifyOtpResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  ForgotPasswordResponse,
  ForgotPasswordFormData,
} from '@shared/interfaces/auth';
import { MeService } from '../me/me.service';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  readonly meService =inject(MeService)

  readonly isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  signUp(payload: Omit<SignUpFormData, 'confirmPassword'>): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/sign-up`, payload).pipe(
      tap((res) => {
        // Store tokens
        localStorage.setItem('token', res?.data?.accessToken!);
        localStorage.setItem('refreshToken', res?.data?.refreshToken!);
      })
    );
  }

  signIn(payload: SignInFormData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/sign-in`, payload).pipe(
      tap((res) => {
        // Store tokens
        localStorage.setItem('token', res?.data?.accessToken!);
        localStorage.setItem('refreshToken', res?.data?.refreshToken!);
      })
    );
  }

  forgotPassword(payload: ForgotPasswordFormData): Observable<ForgotPasswordResponse> {
    return this.http
      .post<ForgotPasswordResponse>(`${environment.apiUrl}/auth/forgot-password`, payload)
      .pipe(
        tap((res) => {
          // Store OTP code and Expires time
          localStorage.setItem('otpCode', res?.data?.otpCode!);
          localStorage.setItem('expiresIn', String(res?.data?.expiresIn!));
          localStorage.setItem('userEmail', payload.email);
        })
      );
  }

  verifyOTP(payload: VerifyOtpPayload): Observable<VerifyOtpResponse> {
    return this.http.post<VerifyOtpResponse>(`${environment.apiUrl}/auth/verify-otp`, payload).pipe(
      tap(() => {
        localStorage.removeItem('otpCode');
        localStorage.removeItem('expiresIn');
      })
    );
  }

  resetPassword(payload: ResetPasswordPayload): Observable<ResetPasswordResponse> {
    return this.http.patch<ResetPasswordResponse>(
      `${environment.apiUrl}/auth/reset-password`,
      payload
    );
  }

  signOut(): Observable<BaseResponse> {
    return this.meService.me.pipe(
    switchMap((user) => {
      if (!user?._id) return of({ message: 'No user logged in' } as BaseResponse);

      return this.http.post<BaseResponse>(`${environment.apiUrl}/auth/sign-out`, {
        userId: user._id,
      }).pipe(
        tap(() => this.clearSession())
      );
    })
  );
  }

  refreshToken(): Observable<string | undefined> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return throwError(() => new Error('No refresh token'));

    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/auth/refresh-token`, { refreshToken })
      .pipe(
        tap((res) => {
          if (res.data?.accessToken && res.data?.refreshToken) {
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);
          }
        }),
        map((res) => res?.data?.accessToken)
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  get isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: 'customer' | 'seller' | 'admin'): boolean {
    const token = this.getToken();

    if (!token) return false;

    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload.roles.includes(role);

    // <button *ngIf="authService.hasRole('admin')">Admin Panel</button>
  }

  private clearSession(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.isLoggedIn.set(false);
  }
}
