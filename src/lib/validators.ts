import { z } from 'zod';

// Georgian regions
export const GEORGIAN_REGIONS = [
  'Kakheti',
  'Kartli',
  'Imereti',
  'Racha-Lechkhumi',
  'Samegrelo',
  'Adjara',
  'Guria',
  'Samtskhe-Javakheti',
  'Kvemo Kartli',
  'Mtskheta-Mtianeti',
  'Shida Kartli',
  'Tbilisi'
] as const;

// Login validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

// Registration Step 1 validation schema
export const registerStep1Schema = z.object({
  companyName: z
    .string()
    .min(1, 'Company name is required')
    .max(100, 'Company name must be less than 100 characters'),
  businessEmail: z
    .string()
    .min(1, 'Business email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+995\s\d{3}\s\d{3}\s\d{3}$/, 'Phone must be in format: +995 XXX XXX XXX'),
  region: z
    .string()
    .min(1, 'Region is required'),
});

// Registration Step 2 validation schema
export const registerStep2Schema = z.object({
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .max(100, 'Full name must be less than 100 characters'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, 'You must agree to the terms and conditions'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Forgot password validation schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

// Password strength checker
export const getPasswordStrength = (password: string): {
  score: number;
  label: string;
  color: string;
} => {
  let score = 0;
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  
  if (score <= 2) return { score, label: 'Weak', color: 'bg-destructive' };
  if (score <= 4) return { score, label: 'Medium', color: 'bg-warning' };
  return { score, label: 'Strong', color: 'bg-success' };
};
