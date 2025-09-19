import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Component, inject, signal } from '@angular/core';
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
  ],
  template: `
    <section id="verify-otp">
      <div class="container">
        <div class="min-h-[60vh] flex flex-col items-center justify-center">
          <h1 class="text-2xl sm:text-3xl font-bold mb-6">Verify OTP</h1>
          <form [formGroup]="form" (ngSubmit)="handleSubmit()" class="space-y-6 w-fit">
            <!-- Verify OTP Field -->

            <z-form-field class="w-full">
              <label z-form-label zRequired for="code_1">OTP Code</label>
              <div class="grid grid-cols-[43px_43px_43px_43px] gap-4">
                <z-form-control>
                  <input
                    z-input
                    id="code_1"
                    type="text"
                    placeholder=""
                    formControlName="code_1"
                    [class]="{ 'border-red-500': isFieldInvalid('code_1') }"
                    (input)="handleOtpInput($event, 'code_1')"
                  />
                </z-form-control>

                <z-form-control>
                  <input
                    z-input
                    id="code_2"
                    type="text"
                    placeholder=""
                    formControlName="code_2"
                    [class]="{ 'border-red-500 ': isFieldInvalid('code_2') }"
                    (input)="handleOtpInput($event, 'code_2')"
                  />
                </z-form-control>

                <z-form-control>
                  <input
                    z-input
                    id="code_3"
                    type="text"
                    placeholder=""
                    formControlName="code_3"
                    [class]="{ 'border-red-500 ': isFieldInvalid('code_3') }"
                    (input)="handleOtpInput($event, 'code_3')"
                  />
                </z-form-control>

                <z-form-control>
                  <input
                    z-input
                    id="code_4"
                    type="text"
                    placeholder=""
                    formControlName="code_4"
                    [class]="{ 'border-red-500': isFieldInvalid('code_4') }"
                    (input)="handleOtpInput($event, 'code_4')"
                  />
                </z-form-control>
              </div>
            </z-form-field>

            <!-- Action Buttons -->
            <button
              z-button
              zType="default"
              type="submit"
              [disabled]="isSubmitting()"
              class="w-full"
            >
              {{ isSubmitting() ? 'Verifying OTP...' : 'Verify OTP' }}
            </button>

            <!-- Success Message -->
            @if (showSuccess()) {
            <div class="p-4 bg-green-50 border border-green-200 rounded-md">
              <z-form-message zType="success">✓ You've verified OTP successfully!</z-form-message>
            </div>
            }
          </form>
        </div>
      </div>
    </section>
  `,
  styleUrl: './verify-otp.css',
})
export class VerifyOtp {
  private readonly fb = inject(FormBuilder);

  readonly showSuccess = signal(false);
  readonly isSubmitting = signal(false);

  readonly form = this.fb.nonNullable.group({
    code_1: ['', [Validators.required]],
    code_2: ['', [Validators.required]],
    code_3: ['', [Validators.required]],
    code_4: ['', [Validators.required]],
  });

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

    await this.simulateApiCall();

    this.isSubmitting.set(false);
    this.showSuccess.set(true);
    // this.form.reset();

    console.log('Form submitted:', this.form.getRawValue());

    setTimeout(() => {
      this.showSuccess.set(false);
    }, 5000);
  }

  resetForm(): void {
    this.form.reset();
    this.showSuccess.set(false);
  }

  private simulateApiCall(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 1000));
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
