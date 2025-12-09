import { z } from 'zod';

// Georgian regions
export const GEORGIAN_REGIONS = [
  'Kakheti',
  'Kartli',
  'Imereti',
  'Racha-Lechkhumi',
  'Adjara',
  'Other'
] as const;

// Industries
export const INDUSTRIES = [
  'Wine',
  'Spirits',
  'Cheese',
  'Olive Oil',
  'Honey',
  'Craft Products',
  'Other'
] as const;

// Industry focus for consortiums
export const INDUSTRY_FOCUS = [
  'Wine',
  'Food & Beverages',
  'Mixed Products',
  'Other'
] as const;

// Region coverage
export const REGION_COVERAGE = [
  'Single Region',
  'Multiple Regions',
  'Nationwide',
  'International'
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

// Registration Step 1: Company Information
export const registerStep1Schema = z.object({
  companyName: z
    .string()
    .min(2, 'Company name is required')
    .max(100, 'Company name must be less than 100 characters'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .optional(),
  country: z
    .string()
    .optional(),
  address: z
    .string()
    .optional(),
  website: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  instagram: z
    .string()
    .optional(),
  facebook: z
    .string()
    .optional(),
  region: z
    .string()
    .optional(),
  industry: z
    .string()
    .optional(),
});

// Registration Step 2: Personal/Admin Info
export const registerStep2Schema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[0-9]/, 'Must contain number')
    .regex(/[^A-Za-z0-9]/, 'Must contain special character'),
  confirmPassword: z
    .string()
    .min(1, 'Please confirm your password'),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, 'You must agree to terms and conditions'),
  marketingEmails: z
    .boolean()
    .optional(),
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
