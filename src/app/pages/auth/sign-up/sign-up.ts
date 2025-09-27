import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Component, inject, signal } from '@angular/core';

import { SignUpFormData } from '@shared/interfaces/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ZardFormModule } from '@shared/components/form/form.module';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { formErrorHandler, passwordMatchValidator } from '@shared/utils/helpers';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ZardButtonComponent,
    ZardInputDirective,
    ZardFormModule,
    RouterLink,
  ],
  templateUrl: './sign-up.html',
})
export class SignUp {
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  readonly isSubmitting = signal(false);

  readonly form = this.fb.nonNullable.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: passwordMatchValidator }
  );

  isFieldInvalid(fieldName: keyof SignUpFormData): boolean {
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

    const { firstName, lastName, email, password } = this.form.getRawValue();

    this.authService.signUp({ firstName, lastName, email, password }).subscribe({
      next: (response) => {
        console.log('Sign-up successful:', response);
        this.form.reset();

        toast.success(`${response?.data?.user?.firstName} ${response?.data?.user?.lastName}`, {
          description: 'Your account has been created successfully.',
        });

        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isSubmitting.set(false);

        formErrorHandler({
          message: error?.error?.message,
          duration: 8000, // optional override
          title: 'Sign Up Error', // optional
        });
      },
      complete: () => this.isSubmitting.set(false),
    });
  }
}
