import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from '@shared/utils/auth.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [],
})
export class AppModule {}
