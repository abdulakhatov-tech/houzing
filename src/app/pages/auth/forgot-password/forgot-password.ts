import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { formErrorHandler } from '@shared/utils/helpers';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ZardFormModule } from '@shared/components/form/form.module';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { ZardButtonComponent } from '@shared/components/button/button.component';

interface FormData {
  email: string;
}

@Component({
  selector: 'app-forgot-password',
  imports: [
    ReactiveFormsModule,
    ZardButtonComponent,
    ZardInputDirective,
    ZardFormModule,
    RouterLink,
  ],
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly isSubmitting = signal(false);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

  isFieldInvalid(fieldName: keyof FormData): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getEmailError(): string {
    const email = this.form.get('email');
    if (email?.hasError('required')) {
      return 'Email is required';
    }
    if (email?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  async handleSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const { email } = this.form.getRawValue();

    this.authService.forgotPassword({ email }).subscribe({
      next: (response) => {
        this.form.reset();

        toast.success(response.message);

        this.router.navigate(['/auth/verify-otp']);
      },
      error: (error) => {
        this.isSubmitting.set(false);

        formErrorHandler({
          message: error?.error?.message,
          duration: 8000, // optional override
          title: 'Forgot Password Error', // optional
        });
      },
      complete: () => this.isSubmitting.set(false),
    });
  }
}
