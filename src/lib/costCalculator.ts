// Shared cost calculation utilities for Dual QR system pricing
// Dual QR: One visible QR (marketing) + One hidden QR under cork (security)

export const DUAL_QR_RATE = {
  min: 0.30, // 30 tetri per bottle
  max: 0.40, // 40 tetri per bottle  
  avg: 0.35  // 35 tetri average per bottle
} as const;

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

export function calculateDualQRCost(quantity: number): CostBreakdown {
  return {
    minTotal: quantity * DUAL_QR_RATE.min,
    maxTotal: quantity * DUAL_QR_RATE.max,
    avgTotal: quantity * DUAL_QR_RATE.avg,
    perUnit: {
      min: DUAL_QR_RATE.min,
      max: DUAL_QR_RATE.max,
      avg: DUAL_QR_RATE.avg
    }
  };
}

export function getDualQRRecommendation(quantity: number): string {
  if (quantity < 1000) {
    return 'Dual QR system provides excellent authentication for small batches with immediate deployment.';
  }
  
  if (quantity >= 1000 && quantity < 10000) {
    return 'Dual QR system offers the best balance of cost, security, and consumer engagement for medium batches.';
  }
  
  return 'Dual QR system is highly cost-effective for large volume production with proven anti-counterfeiting protection.';
}
