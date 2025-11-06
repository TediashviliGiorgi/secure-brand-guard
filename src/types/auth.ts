export interface User {
  id: string;
  email: string;
  fullName: string;
  companyName: string;
  phone?: string;
  region?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterStepOne {
  companyName: string;
  businessEmail: string;
  phone: string;
  region: string;
}

export interface RegisterStepTwo {
  fullName: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface RegisterData extends RegisterStepOne, RegisterStepTwo {}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ForgotPasswordData {
  email: string;
}
