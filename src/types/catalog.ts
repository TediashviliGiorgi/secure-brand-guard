import { z } from 'zod';

// Brand Schema
export const brandSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Brand name is required'),
  logo: z.string().optional(),
  description: z.string().max(500).optional(),
  website: z.string().url().optional().or(z.literal('')),
  contactEmail: z.string().email().optional().or(z.literal('')),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  region: z.string().optional(),
  foundedYear: z.number().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Product Schema (inherits brand context)
export const productSchema = z.object({
  id: z.string(),
  brandId: z.string(),
  name: z.string().min(2, 'Product name is required'),
  category: z.string().min(1, 'Category is required'),
  grapeVariety: z.array(z.string()).optional(),
  docStatus: z.string().optional(),
  
  // Product Characteristics (moved from batch step 3)
  description: z.string().min(10, 'Description must be at least 10 characters').max(500),
  characteristics: z.string().min(10, 'Characteristics required').max(500),
  servingRecommendation: z.string().max(300).optional(),
  agingPotentialMin: z.number().optional(),
  agingPotentialMax: z.number().optional(),
  
  // Pairing Recommendations (moved from batch step 4)
  foodPairings: z.array(z.string()).optional(),
  notRecommendedWith: z.string().max(200).optional(),
  
  // Media (moved from batch step 5)
  mainPhoto: z.string().optional(),
  galleryPhotos: z.array(z.string()).optional(),
  videoUrl: z.string().url().optional().or(z.literal('')),
  documents: z.array(z.string()).optional(),
  
  // Product Story (moved from batch step 6)
  productStory: z.string().max(1000).optional(),
  traditionalMethods: z.string().max(500).optional(),
  awards: z.array(z.object({
    name: z.string(),
    year: z.number(),
    medalType: z.enum(['gold', 'silver', 'bronze', 'other']),
  })).optional(),
  
  // QR Settings
  qrCodeSize: z.enum(['small', 'medium', 'large']).optional(),
  qrCodeStyle: z.enum(['standard', 'branded', 'artistic']).optional(),
  
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Simplified Batch Schema (only batch-specific data)
export const simplifiedBatchSchema = z.object({
  id: z.string(),
  productId: z.string().min(1, 'Please select a product'),
  vintageYear: z.string().min(1, 'Vintage year is required'),
  numberOfUnits: z.number({ invalid_type_error: 'Please enter a valid number' }).min(100, 'Minimum 100 units required'),
  
  // Production Details
  productionDate: z.date({ required_error: 'Production date is required' }),
  bottlingDate: z.date({ required_error: 'Bottling date is required' }),
  fermentationDuration: z.number().optional(),
  fermentationUnit: z.enum(['days', 'weeks', 'months', 'years']).optional(),
  
  // Certifications
  traditionalMethod: z.boolean().optional(),
  organicCertification: z.boolean().optional(),
  certificateFile: z.string().optional(),
  
  // Batch-specific notes
  batchNotes: z.string().max(500).optional(),
  qualityGrade: z.enum(['standard', 'reserve', 'premium', 'grand-reserve']).optional(),
  
  status: z.enum(['draft', 'pending', 'active', 'completed', 'cancelled']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Types
export type Brand = z.infer<typeof brandSchema>;
export type Product = z.infer<typeof productSchema>;
export type SimplifiedBatch = z.infer<typeof simplifiedBatchSchema>;

// Form schemas for creation (without id, timestamps)
export const createBrandSchema = brandSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const createProductSchema = productSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const createBatchSchema = simplifiedBatchSchema
  .omit({ id: true, createdAt: true, updatedAt: true, status: true })
  .refine((data) => data.bottlingDate >= data.productionDate, {
    message: 'Bottling date must be after production date',
    path: ['bottlingDate'],
  });

export type CreateBrand = z.infer<typeof createBrandSchema>;
export type CreateProduct = z.infer<typeof createProductSchema>;
