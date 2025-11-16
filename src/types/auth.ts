export type AccountType = 'producer';
export type UserRole = 'producer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyName?: string;
  consortiumName?: string;
  region?: string;
  industry?: string;
  phone?: string;
  memberCount?: number;
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
  fullName: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  marketingEmails?: boolean;
}

export interface RegisterData {
  accountType: AccountType;
  companyName: string;
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  region?: string;
  industry?: string;
  fullName: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
