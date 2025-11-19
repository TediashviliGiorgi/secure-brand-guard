import { z } from 'zod';

// Step 1: Basic Information
export const batchStep1Schema = z.object({
  productName: z
    .string()
    .min(2, 'Product name is required')
    .max(100, 'Product name must be less than 100 characters'),
  vintageYear: z
    .string()
    .min(1, 'Vintage year is required'),
  category: z
    .string()
    .min(1, 'Category is required'),
  grapeVariety: z
    .array(z.string())
    .optional(),
  numberOfUnits: z
    .number({ invalid_type_error: 'Please enter a valid number' })
    .min(100, 'Minimum 100 units required'),
  region: z
    .string()
    .min(1, 'Region is required'),
  docStatus: z
    .string()
    .optional(),
});

// Step 2: Production Details
const batchStep2Base = z.object({
  productionDate: z
    .date({ required_error: 'Production date is required' }),
  bottlingDate: z
    .date({ required_error: 'Bottling/packaging date is required' }),
  fermentationDuration: z
    .number()
    .optional(),
  fermentationUnit: z
    .enum(['days', 'weeks', 'months', 'years'])
    .optional(),
  traditionalMethod: z
    .boolean()
    .optional(),
  organicCertification: z
    .boolean()
    .optional(),
  certificateFile: z
    .any()
    .optional(),
});

export const batchStep2Schema = batchStep2Base.refine((data) => {
  if (data.bottlingDate && data.productionDate) {
    return data.bottlingDate >= data.productionDate;
  }
  return true;
}, {
  message: 'Bottling date must be after production date',
  path: ['bottlingDate'],
});

// Step 3: Product Characteristics
export const batchStep3Schema = z.object({
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters'),
  characteristics: z
    .string()
    .min(10, 'Characteristics are required (min 10 characters)')
    .max(500, 'Characteristics must be less than 500 characters'),
  servingRecommendation: z
    .string()
    .max(300, 'Serving recommendation must be less than 300 characters')
    .optional(),
  agingPotentialMin: z
    .number()
    .optional(),
  agingPotentialMax: z
    .number()
    .optional(),
  qrCodeSize: z
    .enum(['small', 'medium', 'large'])
    .optional(),
  qrCodeStyle: z
    .enum(['standard', 'branded', 'artistic'])
    .optional(),
  nfcChipType: z
    .enum(['ntag213', 'ntag215', 'ntag216'])
    .optional(),
  nfcFormFactor: z
    .enum(['sticker', 'label', 'embedded'])
    .optional(),
  nfcWriteProtection: z
    .boolean()
    .optional(),
});

// Step 4: Pairing Recommendations
export const batchStep4Schema = z.object({
  foodPairings: z
    .array(z.string())
    .optional(),
  notRecommendedWith: z
    .string()
    .max(200, 'Must be less than 200 characters')
    .optional(),
});

// Step 5: Media Upload
export const batchStep5Schema = z.object({
  mainPhoto: z
    .any()
    .refine((file) => file !== null && file !== undefined, 'Main photo is required'),
  galleryPhotos: z
    .array(z.any())
    .optional(),
  videoUrl: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  documents: z
    .array(z.any())
    .optional(),
});

// Step 6: Brand Story
export const batchStep6Schema = z.object({
  companyHistory: z
    .string()
    .min(20, 'Company history must be at least 20 characters')
    .max(1000, 'Company history must be less than 1000 characters'),
  productStory: z
    .string()
    .min(20, 'Product story must be at least 20 characters')
    .max(1000, 'Product story must be less than 1000 characters'),
  traditionalMethods: z
    .string()
    .max(500, 'Traditional methods must be less than 500 characters')
    .optional(),
  awards: z
    .array(
      z.object({
        name: z.string().min(1, 'Award name is required'),
        year: z.number().min(1900).max(new Date().getFullYear()),
        medalType: z.enum(['gold', 'silver', 'bronze', 'other']),
      })
    )
    .optional(),
});

// Step 7: Review & Confirm
export const batchStep7Schema = z.object({
  companyName: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Invalid email').optional(),
  website: z.string().url('Invalid URL').optional().or(z.literal('')),
  socialMedia: z.string().optional(),
  protectionMethod: z
    .enum(['qr', 'nfc', 'both'])
    .default('qr'),
});

// Complete batch schema
export const completeBatchSchema = batchStep1Schema
  .merge(batchStep2Base)
  .merge(batchStep3Schema)
  .merge(batchStep4Schema)
  .merge(batchStep5Schema)
  .merge(batchStep6Schema)
  .merge(batchStep7Schema);

export type BatchStep1 = z.infer<typeof batchStep1Schema>;
export type BatchStep2 = z.infer<typeof batchStep2Base>;
export type BatchStep3 = z.infer<typeof batchStep3Schema>;
export type BatchStep4 = z.infer<typeof batchStep4Schema>;
export type BatchStep5 = z.infer<typeof batchStep5Schema>;
export type BatchStep6 = z.infer<typeof batchStep6Schema>;
export type BatchStep7 = z.infer<typeof batchStep7Schema>;
export type CompleteBatch = z.infer<typeof completeBatchSchema>;
