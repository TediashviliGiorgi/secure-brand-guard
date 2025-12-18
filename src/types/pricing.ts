// Pricing plans and cost configuration types

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  perUnitRate: number;
  features: string[];
  storage: string;
  support: string;
  isPopular?: boolean;
  isActive: boolean;
}

export interface CostPolicy {
  id: string;
  name: string;
  minQuantity: number;
  maxQuantity: number;
  rateMin: number;
  rateMax: number;
  rateAvg: number;
  isActive: boolean;
}

export interface TrialConfig {
  durationDays: number;
  unitsIncluded: number;
  features: string[];
  requiresCreditCard: boolean;
}

export interface ROIDefaults {
  fraudLossPercentage: number;
  defaultAnnualProduction: number;
  defaultPricePerUnit: number;
}

export interface AdminPricingConfig {
  plans: PricingPlan[];
  costPolicies: CostPolicy[];
  trialConfig: TrialConfig;
  roiDefaults: ROIDefaults;
  annualDiscountPercentage: number;
  currency: string;
}

// Default pricing configuration based on existing app
export const DEFAULT_PRICING_CONFIG: AdminPricingConfig = {
  plans: [
    {
      id: 'starter',
      name: 'Starter',
      description: 'For small producers',
      monthlyPrice: 29,
      annualPrice: 290,
      perUnitRate: 0.01,
      features: [
        'Dual QR system',
        'Basic analytics',
        'Email support',
        '5GB storage'
      ],
      storage: '5GB',
      support: 'Email',
      isActive: true
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'For growing brands',
      monthlyPrice: 99,
      annualPrice: 990,
      perUnitRate: 0.02,
      features: [
        'Everything in Starter',
        'Advanced analytics',
        'API access',
        'Priority support',
        '20GB storage',
        'White-label'
      ],
      storage: '20GB',
      support: 'Priority',
      isPopular: true,
      isActive: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large operations',
      monthlyPrice: 299,
      annualPrice: 2990,
      perUnitRate: 0.025,
      features: [
        'Everything in Professional',
        'Multi-brand management',
        'Dedicated manager',
        '24/7 support',
        '100GB storage',
        'SLA guarantee'
      ],
      storage: '100GB',
      support: '24/7',
      isActive: true
    }
  ],
  costPolicies: [
    {
      id: 'dual-qr-default',
      name: 'Dual QR Default',
      minQuantity: 1,
      maxQuantity: 999999,
      rateMin: 0.30,
      rateMax: 0.40,
      rateAvg: 0.35,
      isActive: true
    }
  ],
  trialConfig: {
    durationDays: 90,
    unitsIncluded: 1000,
    features: ['Full platform access', 'All Professional features', 'No credit card required'],
    requiresCreditCard: false
  },
  roiDefaults: {
    fraudLossPercentage: 5,
    defaultAnnualProduction: 25000,
    defaultPricePerUnit: 50
  },
  annualDiscountPercentage: 20,
  currency: 'USD'
};
