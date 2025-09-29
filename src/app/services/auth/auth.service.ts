import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import {
  AuthResponse,
  BaseResponse,
  ForgotPasswordFormData,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  SignInFormData,
  SignUpFormData,
  VerifyOtpPayload,
  VerifyOtpResponse,
} from '@shared/interfaces/auth';
import { IUser } from '@shared/interfaces/global';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  readonly isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  signUp(payload: Omit<SignUpFormData, 'confirmPassword'>): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/sign-up`, payload).pipe(
      tap((res) => {
        // Store tokens
        localStorage.setItem('token', res?.data?.accessToken!);
        localStorage.setItem('refreshToken', res?.data?.refreshToken!);
        localStorage.setItem('user', JSON.stringify(res?.data?.user!));
      })
    );
  }

  signIn(payload: SignInFormData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/sign-in`, payload).pipe(
      tap((res) => {
        // Store tokens
        localStorage.setItem('token', res?.data?.accessToken!);
        localStorage.setItem('refreshToken', res?.data?.refreshToken!);
        localStorage.setItem('user', JSON.stringify(res?.data?.user!));
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
    const userJson = localStorage.getItem('user');
    const userId = userJson ? JSON.parse(userJson)._id : null;

    return this.http
      .post<BaseResponse>(`${environment.apiUrl}/auth/sign-out`, { userId })
      .pipe(
        tap(() => {
          // Always clear client session, even if API call fails
          this.clearSession();
        })
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
