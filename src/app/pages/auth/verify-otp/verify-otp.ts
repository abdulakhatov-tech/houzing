import { toast } from 'ngx-sonner';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { formErrorHandler } from '@shared/utils/helpers';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ZardFormModule } from '@shared/components/form/form.module';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { ZardButtonComponent } from '@shared/components/button/button.component';

interface FormData {
  code_1: string;
  code_2: string;
  code_3: string;
  code_4: string;
}

@Component({
  selector: 'app-verify-otp',
  imports: [
    ReactiveFormsModule,
    ZardButtonComponent,
    ZardInputDirective,
    ZardFormModule,
    RouterLink,
    CommonModule
],
  templateUrl: './verify-otp.html',
})
export class VerifyOtp {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private timerId?: ReturnType<typeof setInterval>;

  readonly isSubmitting = signal(false);
  readonly isResending = signal(false);
  readonly isOTPExpired = signal(false);
  readonly otpCode = signal(localStorage.getItem('otpCode'));

  // read the absolute expiry timestamp (ms) from storage or API
  private readonly expiryMs = signal( Number(localStorage.getItem('expiresIn')) || 0);

  // remaining seconds signal
  readonly remainingSeconds = signal(this.calcRemainingSeconds());

  // derived signal to format m:ss
  readonly formattedTime = signal(this.formatTime(this.remainingSeconds()));

  ngOnInit(): void {
    this.timerId = setInterval(() => {
      const secs = this.calcRemainingSeconds();
      this.remainingSeconds.set(secs);
      this.formattedTime.set(this.formatTime(secs));

      if (secs <= 0) {
        this.isOTPExpired.set(true)
        clearInterval(this.timerId);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timerId);
  }

  private calcRemainingSeconds(): number {
    const diff = this.expiryMs() - Date.now();
    return diff > 0 ? Math.floor(diff / 1000) : 0;
  }

  private formatTime(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  readonly form = this.fb.nonNullable.group({
    code_1: ['', [Validators.required]],
    code_2: ['', [Validators.required]],
    code_3: ['', [Validators.required]],
    code_4: ['', [Validators.required]],
  });

  // ---- Form methods ----
  isFieldInvalid(fieldName: keyof FormData): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async handleSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const { code_1, code_2, code_3, code_4 } = this.form.getRawValue();

    this.authService
      .verifyOTP({
        email: localStorage.getItem('userEmail') ?? '',
        otpCode: `${code_1}${code_2}${code_3}${code_4}`,
      })
      .subscribe({
        next: (response) => {
          this.form.reset();

          toast.success(response?.message);

          this.router.navigate(['/auth/reset-password']);
        },
        error: (error) => {
          this.isSubmitting.set(false);

          formErrorHandler({
            message: error?.error?.message,
            duration: 8000, // optional override
            title: 'Verify OTP Error', // optional
          });
        },
        complete: () => this.isSubmitting.set(false),
      });
  }

  async handleResent():Promise<void> {
    this.isResending.set(true);

    const email = localStorage.getItem('userEmail') as string;

    this.authService.forgotPassword({email}).subscribe({
      next: (response) => {
        toast.success(response.message);
        this.isOTPExpired.set(false)
        this.expiryMs.set(response.data?.expiresIn!)
        localStorage.setItem('otpCode', response?.data?.otpCode!)
        localStorage.setItem('expiresIn', String(response?.data?.expiresIn!))
        this.otpCode.set(response?.data?.otpCode!)
        this.ngOnInit()
      },
      error: (error) => {
        formErrorHandler({
          message: error?.error?.message,
          duration: 8000, // optional override
          title: 'Resend OTP Error', // optional
        });
      },
      complete: () => this.isResending.set(false),
    })


  }

  handleOtpInput(event: Event, currentInput: keyof FormData) {
    const input = event.target as HTMLInputElement;

    // Keep only the first character
    input.value = input.value.slice(0, 1);
    this.form.get(currentInput)?.setValue(input.value);

    // Determine the next input field
    const inputOrder: (keyof FormData)[] = ['code_1', 'code_2', 'code_3', 'code_4'];
    const currentIndex = inputOrder.indexOf(currentInput);

    if (input.value && currentIndex < inputOrder.length - 1) {
      const nextInputId = inputOrder[currentIndex + 1];
      const nextInput = document.getElementById(nextInputId) as HTMLInputElement;
      nextInput?.focus();
    }
  }
}
