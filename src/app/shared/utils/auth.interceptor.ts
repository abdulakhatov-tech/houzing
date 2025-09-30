import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { AuthService } from 'src/app/services/auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // If 401, try refreshing once
      if (error.status === 401 && !req.url.endsWith('/auth/refresh-token')) {
        return authService.refreshToken().pipe(
          switchMap((newToken) => {
            const retryReq = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
            return next(retryReq);
          }),
          catchError((refreshErr) => {
            // Refresh failed: log out
            authService.signOut().subscribe();
            return throwError(() => refreshErr);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
