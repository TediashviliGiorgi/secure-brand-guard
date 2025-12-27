import { 
  Product, 
  Batch, 
  Unit, 
  ProductionOrder, 
  ActiveContainer,
  ProductionLine,
  TraceabilityStats 
} from '@/types/traceability';

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Saperavi 2024',
    gtin: '4860001234567',
    description: 'Premium Georgian red wine',
    category: 'Red Wine',
  },
  {
    id: 'prod-002',
    name: 'Rkatsiteli 2024',
    gtin: '4860001234568',
    description: 'Classic Georgian white wine',
    category: 'White Wine',
  },
  {
    id: 'prod-003',
    name: 'Kindzmarauli 2023',
    gtin: '4860001234569',
    description: 'Semi-sweet red wine',
    category: 'Red Wine',
  },
];

export const mockBatches: Batch[] = [
  {
    id: 'batch-001',
    productId: 'prod-001',
    product: mockProducts[0],
    manufacturingDate: '2024-12-20',
    totalQuantity: 10000,
    status: 'IN_PRODUCTION',
  },
  {
    id: 'batch-002',
    productId: 'prod-002',
    product: mockProducts[1],
    manufacturingDate: '2024-12-18',
    totalQuantity: 5000,
    status: 'COMPLETED',
  },
];

export const mockProductionOrders: ProductionOrder[] = [
  {
    id: 'po-001',
    productId: 'prod-001',
    product: mockProducts[0],
    batchId: 'batch-001',
    quantity: 10000,
    bottleCodes: 10000,
    caseCodes: 1667,
    palletCodes: 34,
    status: 'IN_PROGRESS',
    createdAt: '2024-12-20T08:00:00Z',
    createdBy: 'manager@example.com',
    bottlesPerCase: 6,
    casesPerPallet: 50,
  },
  {
    id: 'po-002',
    productId: 'prod-002',
    product: mockProducts[1],
    batchId: 'batch-002',
    quantity: 5000,
    bottleCodes: 5000,
    caseCodes: 834,
    palletCodes: 17,
    status: 'COMPLETED',
    createdAt: '2024-12-18T08:00:00Z',
    createdBy: 'manager@example.com',
    bottlesPerCase: 6,
    casesPerPallet: 50,
  },
];

// Generate mock units for a case
export const generateMockBottles = (caseId: string, count: number): Unit[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `BTL-${caseId}-${String(i + 1).padStart(3, '0')}`,
    type: 'BOTTLE' as const,
    parentId: caseId,
    batchId: 'batch-001',
    status: 'PACKED' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
};

// Mock active containers for live view
export const mockActiveContainers: ActiveContainer[] = [
  {
    id: 'BOX-001',
    type: 'CASE',
    status: 'OPEN',
    capacity: 6,
    filledCount: 4,
    children: generateMockBottles('BOX-001', 4),
  },
  {
    id: 'BOX-002',
    type: 'CASE',
    status: 'OPEN',
    capacity: 6,
    filledCount: 2,
    children: generateMockBottles('BOX-002', 2),
  },
  {
    id: 'BOX-003',
    type: 'CASE',
    status: 'FULL',
    capacity: 6,
    filledCount: 6,
    children: generateMockBottles('BOX-003', 6),
  },
  {
    id: 'BOX-004',
    type: 'CASE',
    status: 'OPEN',
    capacity: 6,
    filledCount: 0,
    children: [],
  },
];

export const mockProductionLines: ProductionLine[] = [
  {
    id: 'line-001',
    name: 'Production Line A',
    activeContainers: mockActiveContainers,
    completedToday: 245,
    errorsToday: 3,
  },
  {
    id: 'line-002',
    name: 'Production Line B',
    activeContainers: [
      {
        id: 'BOX-101',
        type: 'CASE',
        status: 'OPEN',
        capacity: 6,
        filledCount: 5,
        children: generateMockBottles('BOX-101', 5),
      },
    ],
    completedToday: 189,
    errorsToday: 1,
  },
];

export const mockTraceabilityStats: TraceabilityStats = {
  totalBottles: 45678,
  totalCases: 7613,
  totalPallets: 153,
  orphanedUnits: 234,
  packedToday: 2456,
  shippedToday: 1200,
  damagedToday: 12,
  efficiency: 97.8,
};

// Helper to generate unique IDs
export const generateUnitId = (type: 'BOTTLE' | 'CASE' | 'PALLET'): string => {
  const prefix = type === 'BOTTLE' ? 'BTL' : type === 'CASE' ? 'BOX' : 'PLT';
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${random}`;
};
