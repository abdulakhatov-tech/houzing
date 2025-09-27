/** Common API response wrapper */
export interface BaseResponse<T = void> {
  success: boolean;
  message: string;
  data?: T;
}

/** Auth – Sign Up */
export interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/** Auth – Sign In */
export interface SignInFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/** Auth – User info returned from backend */
export interface AuthUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

/** Auth – Sign In/Up response */
export type AuthResponse = BaseResponse<{
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}>;

/** Forgot password */
export interface ForgotPasswordFormData {
  readonly email: string;
}

export type ForgotPasswordResponse = BaseResponse<{
  readonly otpCode: string;
  readonly expiresIn: number;
}>;

/** Verify OTP */
export interface VerifyOtpPayload {
  readonly email: string;
  readonly otpCode: string;
}

export type VerifyOtpResponse = BaseResponse;

/** Reset password */
export interface ResetPasswordPayload {
  readonly email: string;
  readonly newPassword: string;
}

export type ResetPasswordResponse = BaseResponse;
