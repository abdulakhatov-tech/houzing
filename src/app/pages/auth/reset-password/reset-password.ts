import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth/auth.service';
import { ZardFormModule } from '@shared/components/form/form.module';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { formErrorHandler, passwordMatchValidator } from '@shared/utils/helpers';
import { ZardButtonComponent } from '@shared/components/button/button.component';

interface FormData {
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    ZardButtonComponent,
    ZardInputDirective,
    ZardFormModule,
    RouterLink,
  ],
  templateUrl: './reset-password.html',
})
export class ResetPassword {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  readonly isSubmitting = signal(false);
  private readonly email = signal(localStorage.getItem('userEmail'));

  readonly form = this.fb.nonNullable.group(
    {
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: passwordMatchValidator,
    }
  );

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

    const { password } = this.form.getRawValue();

    if (this.email()) {
      this.authService
        .resetPassword({
          email: this.email()!,
          newPassword: password,
        })
        .subscribe({
          next: (response) => {
            this.form.reset();

            toast.success(response?.message || 'You have successfully reset your password!');

            this.router.navigate(['/auth/sign-in']);
            localStorage.removeItem('userEmail')
          },
          error: (error) => {
            this.isSubmitting.set(false);

            formErrorHandler({
              message: error?.error?.message,
              duration: 8000,
              title: 'Reset Password Error',
            });
          },
          complete: () => this.isSubmitting.set(false),
        });
    }
  }
}
