export type AccountType = 'producer' | 'consortium';
export type UserRole = 'producer' | 'consortium';

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

export interface RegisterStepOne {
  accountType: AccountType;
}

export interface RegisterProducerStep2 {
  companyName: string;
  businessEmail: string;
  phone: string;
  region: string;
  industry: string;
}

export interface RegisterConsortiumStep2 {
  consortiumName: string;
  email: string;
  phone: string;
  memberCount?: number;
  industryFocus: string;
  regionCoverage?: string;
}

export interface RegisterStep3 {
  fullName: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  marketingEmails?: boolean;
}

export interface RegisterData {
  accountType: AccountType;
  // Producer fields
  companyName?: string;
  region?: string;
  industry?: string;
  // Consortium fields
  consortiumName?: string;
  memberCount?: number;
  industryFocus?: string;
  regionCoverage?: string;
  // Common fields
  email: string;
  phone?: string;
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
