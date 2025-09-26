import { toast } from 'ngx-sonner';
import { Router, RouterLink } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { formErrorHandler } from '@shared/utils/helpers';
import { ISignInFormData } from '@shared/interfaces/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ZardFormModule } from '@shared/components/form/form.module';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardCheckboxComponent } from '@shared/components/checkbox/checkbox.component';

@Component({
  selector: 'app-sign-in',
  imports: [
    ReactiveFormsModule,
    ZardButtonComponent,
    ZardInputDirective,
    ZardFormModule,
    ZardCheckboxComponent,
    RouterLink,
  ],
  template: `
    <section id="sign-in">
      <div class="container">
        <div class="pt-10 sm:pt-15 md:pt-20 mb-24 flex flex-col items-center">
          <h1 class="text-2xl sm:text-3xl font-bold mb-6">Sign In</h1>
          <form [formGroup]="form" (ngSubmit)="handleSubmit()" class="space-y-6 max-w-md w-full">
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

            <div class="flex items-center justify-between w-full">
              <z-form-field>
                <z-form-control
                  [errorMessage]="isFieldInvalid('rememberMe') ? 'Something' : ''"
                  class="flex flex-col"
                >
                  <div class="flex items-center space-x-2">
                    <z-checkbox id="rememberMe" formControlName="rememberMe" />
                    <label z-form-label class="!mb-0" for="rememberMe">Remember me</label>
                  </div>
                </z-form-control>
              </z-form-field>

              <a routerLink="/auth/forgot-password" class="text-secondary-blue underline"
                >Forgot password?</a
              >
            </div>

            <!-- Action Buttons -->
            <button
              z-button
              zType="default"
              type="submit"
              [disabled]="isSubmitting()"
              class="w-full"
            >
              {{ isSubmitting() ? 'Signing In...' : 'Sign In' }}
            </button>

            <p class="text-center">
              Don't have an account?
              <a routerLink="/auth/sign-up" class="text-secondary-blue underline">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  `,
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

  isFieldInvalid(fieldName: keyof ISignInFormData): boolean {
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
