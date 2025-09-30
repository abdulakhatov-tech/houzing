import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from '@shared/interfaces/global';
import { BaseResponse } from '@shared/interfaces/auth';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class MeService {
  constructor(private http: HttpClient) {}

  getMe(): Observable<BaseResponse<IUser>> {
    return this.http.get<BaseResponse<IUser>>(`${environment.apiUrl}/me`);
  }

  get me(): Observable<IUser | undefined> {
    return this.getMe().pipe(map((res) => res.data));
  }
}
