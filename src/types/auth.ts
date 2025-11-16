// Single company model - no roles or account types

export interface User {
  id: string;
  email: string;
  companyName: string;
  region?: string;
  industry?: string;
  phone?: string;
  logoUrl?: string;
  website?: string;
  address?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterStep1 {
  companyName: string;
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  region?: string;
  industry?: string;
}

export interface RegisterStep2 {
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  marketingEmails?: boolean;
}

export interface RegisterData {
  companyName: string;
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  region?: string;
  industry?: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
