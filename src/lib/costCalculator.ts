// Shared cost calculation utilities for batch protection methods

export const PROTECTION_METHOD_RATES = {
  qr: { min: 6, max: 10, avg: 8 },
  nfc: { min: 50, max: 200, avg: 100 },
  both: { min: 56, max: 210, avg: 108 }
} as const;

export type ProtectionMethod = keyof typeof PROTECTION_METHOD_RATES;

export interface CostBreakdown {
  minTotal: number;
  maxTotal: number;
  avgTotal: number;
  perUnit: {
    min: number;
    max: number;
    avg: number;
  };
}

export function calculateCost(
  method: ProtectionMethod,
  quantity: number
): CostBreakdown {
  const rate = PROTECTION_METHOD_RATES[method];
  
  return {
    minTotal: quantity * rate.min,
    maxTotal: quantity * rate.max,
    avgTotal: quantity * rate.avg,
    perUnit: {
      min: rate.min,
      max: rate.max,
      avg: rate.avg
    }
  };
}

export function getRecommendation(quantity: number): {
  recommended: ProtectionMethod;
  reason: string;
} {
  if (quantity < 1000) {
    return {
      recommended: 'nfc',
      reason: 'For small batches, NFC tags provide excellent ROI despite higher per-unit cost.'
    };
  }
  
  if (quantity >= 1000 && quantity < 10000) {
    return {
      recommended: 'qr',
      reason: 'For medium batches, QR codes offer the best balance of cost and security.'
    };
  }
  
  return {
    recommended: 'qr',
    reason: 'For high-volume production, QR codes are most cost-effective. Consider NFC for premium sub-lines.'
  };
}
