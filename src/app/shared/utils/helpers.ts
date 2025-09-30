import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { toast } from 'ngx-sonner';

export interface FormErrorOptions {
  /** Message(s) coming from the API */
  message: unknown;
  /** Optional toast duration (ms) */
  duration?: number;
  /** Optional title for each toast */
  title?: string;
}

/**
 * Show one or multiple error toasts in a predictable way.
 */
export function formErrorHandler({
  message,
  duration = 6000,
  title = 'Error'
}: FormErrorOptions): void {
  if (!message) {
    toast.error(title, { description: 'An unknown error occurred.', duration });
    return;
  }

  // If backend sent an array of strings
  if (Array.isArray(message) && message.every(m => typeof m === 'string')) {
    (message as string[]).forEach((err, idx) => {
      toast.error(`${title} (${idx + 1})`, {
        description: err,
        duration
      });
    });
    return;
  }

  // If backend sent a single string
  if (typeof message === 'string') {
    toast.error(title, { description: message, duration });
    return;
  }

  // Fallback for unexpected shapes (object, number, etc.)
  toast.error(title, {
    description: JSON.stringify(message, null, 2),
    duration
  });
}

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
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

export function formatUzPhone(raw: string | null | undefined): string {
  if (!raw) return '';

  const digits = raw.replace(/\D/g, ''); // keep only numbers
  // Match: 998995289896 -> +998 99 528 98 96
  const match = digits.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);
  return match
    ? `+(${match[1]}) ${match[2]} ${match[3]}-${match[4]}-${match[5]}`
    : raw;
}