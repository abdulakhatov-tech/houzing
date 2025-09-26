import {
  Validators,
  FormBuilder,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule,
} from '@angular/forms';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Component, inject, signal } from '@angular/core';

import { ISignUpFormData } from '@shared/interfaces/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ZardFormModule } from '@shared/components/form/form.module';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { formErrorHandler } from '@shared/utils/helpers';

const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
  } else {
    if (confirmPassword?.hasError('passwordMismatch')) {
      confirmPassword.setErrors(null); // clear only passwordMismatch error
    }
  }
  return null;
};

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
  template: `
    <section id="sign-up">
      <div class="container">
        <div class="pt-10 sm:pt-15 md:pt-20 mb-24 flex flex-col items-center">
          <h1 class="text-2xl sm:text-3xl font-bold mb-6">Sign Up</h1>
          <form [formGroup]="form" (ngSubmit)="handleSubmit()" class="space-y-6 max-w-md w-full">
            <!-- Name Fields Row -->
            <z-form-field class="w-full">
              <label z-form-label zRequired for="firstName">First Name</label>
              <z-form-control
                [errorMessage]="isFieldInvalid('firstName') ? 'First name is required' : ''"
              >
                <input
                  z-input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  formControlName="firstName"
                />
              </z-form-control>
            </z-form-field>

            <z-form-field class="w-full">
              <label z-form-label zRequired for="lastName">Last Name</label>
              <z-form-control
                [errorMessage]="isFieldInvalid('lastName') ? 'Last name is required' : ''"
              >
                <input
                  z-input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  formControlName="lastName"
                />
              </z-form-control>
            </z-form-field>

            <!-- Email Field -->
            <z-form-field class="w-full">
              <label z-form-label zRequired for="email">Email</label>
              <z-form-control [errorMessage]="isFieldInvalid('email') ? getEmailError() : ''">
                <input
                  z-input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  formControlName="email"
                />
              </z-form-control>
            </z-form-field>

            <z-form-field class="w-full">
              <label z-form-label zRequired for="password">Password</label>
              <z-form-control
                [errorMessage]="isFieldInvalid('password') ? 'Password is required' : ''"
              >
                <input
                  z-input
                  id="password"
                  type="password"
                  placeholder="Password"
                  formControlName="password"
                />
              </z-form-control>
            </z-form-field>

            <z-form-field class="w-full">
              <label z-form-label zRequired for="confirmPassword">Confirm Password</label>
              <z-form-control
                [errorMessage]="
                  isFieldInvalid('confirmPassword')
                    ? form.get('confirmPassword')?.hasError('passwordMismatch')
                      ? 'Passwords do not match'
                      : 'Confirm Password is required'
                    : ''
                "
              >
                <input
                  z-input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  formControlName="confirmPassword"
                />
              </z-form-control>
            </z-form-field>

            <!-- Action Buttons -->
            <button
              z-button
              zType="default"
              type="submit"
              [disabled]="isSubmitting()"
              class="w-full"
            >
              {{ isSubmitting() ? 'Signing Up...' : 'Sign Up' }}
            </button>

            <p class="text-center">
              Already have an account?
              <a routerLink="/auth/sign-in" class="text-secondary-blue underline">Sign In</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  `,
})
export class SignUp {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

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

  isFieldInvalid(fieldName: keyof ISignUpFormData): boolean {
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
