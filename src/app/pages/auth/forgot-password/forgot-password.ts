import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
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
  template: `
    <section id="sign-in">
      <div class="container">
        <div class="pt-10 sm:pt-15 md:pt-20 mb-24 flex flex-col items-center">
          <h1 class="text-2xl sm:text-3xl font-bold mb-6">Forgot Password</h1>
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

            <!-- Action Buttons -->
            <button
              z-button
              zType="default"
              type="submit"
              [disabled]="isSubmitting()"
              class="w-full"
            >
              {{ isSubmitting() ? 'Submitting...' : 'Submit' }}
            </button>

            <p class="text-center">
              Remember Password?
              <a routerLink="/auth/sign-in" class="text-secondary-blue underline">Sign in</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  `,
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly showSuccess = signal(false);
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

    await this.simulateApiCall();

    this.isSubmitting.set(false);
    this.showSuccess.set(true);
    // this.form.reset();


    console.log('Form submitted:', this.form.getRawValue());

    setTimeout(() => {
      this.showSuccess.set(false);
      this.router.navigate(['/auth/verify-otp'])
    }, 5000);
  }

  resetForm(): void {
    this.form.reset();
    this.showSuccess.set(false);
  }

  private simulateApiCall(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
