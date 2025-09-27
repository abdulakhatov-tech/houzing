import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { formErrorHandler } from '@shared/utils/helpers';
import { SignInFormData } from '@shared/interfaces/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ZardFormModule } from '@shared/components/form/form.module';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardCheckboxComponent } from '@shared/components/checkbox/checkbox.component';

@Component({
  selector: 'app-sign-in',
  imports: [
    ZardCheckboxComponent,
    ReactiveFormsModule,
    ZardButtonComponent,
    ZardInputDirective,
    ZardFormModule,
    RouterLink,
  ],
  templateUrl: './sign-in.html',
})
export class SignIn {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    rememberMe: [false],
  });

  isFieldInvalid(fieldName: keyof SignInFormData): boolean {
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

    const { email, password, rememberMe } = this.form.getRawValue();

    this.authService.signIn({ email, password, rememberMe }).subscribe({
      next: (response) => {
        this.form.reset();

        toast.success(`${response?.data?.user?.firstName} ${response?.data?.user?.lastName}`, {
          description: 'You successfully signed in.',
        });

        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isSubmitting.set(false);

        formErrorHandler({
          message: error?.error?.message,
          duration: 8000, // optional override
          title: 'Sign In Error', // optional
        });
      },
      complete: () => this.isSubmitting.set(false),
    });
  }
}
