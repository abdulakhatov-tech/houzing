export interface ISignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: boolean;
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}
