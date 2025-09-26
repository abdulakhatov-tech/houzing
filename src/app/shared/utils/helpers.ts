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
