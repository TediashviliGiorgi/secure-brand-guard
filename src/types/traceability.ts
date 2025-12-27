// Aggregation & Traceability Module Types

export type UnitType = 'BOTTLE' | 'CASE' | 'PALLET';

export type UnitStatus = 
  | 'ORPHANED'      // Generated but not associated
  | 'OPEN'          // Parent container open, accepting children
  | 'PACKED'        // Associated with a parent
  | 'FULL'          // Container is full
  | 'WAREHOUSE'     // In warehouse storage
  | 'SHIPPED'       // Shipped to customer
  | 'DAMAGED'       // Marked as damaged/scrap
  | 'RECALLED';     // Product recall

export interface Product {
  id: string;
  name: string;
  gtin: string; // Global barcode
  description?: string;
  category?: string;
  imageUrl?: string;
}

export interface Batch {
  id: string;
  productId: string;
  product?: Product;
  manufacturingDate: string;
  expiryDate?: string;
  totalQuantity: number;
  status: 'PLANNING' | 'IN_PRODUCTION' | 'COMPLETED' | 'ARCHIVED';
}

export interface Unit {
  id: string;
  type: UnitType;
  parentId: string | null;
  batchId: string;
  status: UnitStatus;
  createdAt: string;
  updatedAt: string;
  scannedAt?: string;
  scannedBy?: string;
  notes?: string;
}

export interface ProductionOrder {
  id: string;
  productId: string;
  product?: Product;
  batchId?: string;
  quantity: number;
  bottleCodes: number;
  caseCodes: number;
  palletCodes: number;
  status: 'DRAFT' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  createdBy: string;
  bottlesPerCase: number;
  casesPerPallet: number;
}

// Aggregation levels
export interface AggregationLevel {
  level: 1 | 2 | 3;
  name: string;
  type: UnitType;
  icon: string;
  capacity?: number;
}

export const AGGREGATION_LEVELS: AggregationLevel[] = [
  { level: 1, name: 'Item (Bottle)', type: 'BOTTLE', icon: 'wine' },
  { level: 2, name: 'Case (Box)', type: 'CASE', icon: 'package', capacity: 6 },
  { level: 3, name: 'Pallet', type: 'PALLET', icon: 'boxes', capacity: 50 },
];

// Scanner types
export interface ScanResult {
  success: boolean;
  unitId: string;
  unitType: UnitType;
  action: 'OPEN_PARENT' | 'ASSOCIATE' | 'CLOSE_PARENT' | 'ERROR';
  message: string;
  soundType: 'beep' | 'double-beep' | 'error' | 'ding';
}

export interface ActiveContainer {
  id: string;
  type: UnitType;
  status: 'OPEN' | 'FULL';
  children: Unit[];
  capacity: number;
  filledCount: number;
}

// Live production view
export interface ProductionLine {
  id: string;
  name: string;
  activeContainers: ActiveContainer[];
  completedToday: number;
  errorsToday: number;
}

// Exception handling
export interface DragDropAction {
  unitId: string;
  fromContainerId: string | null;
  toContainerId: string | null;
  action: 'MOVE' | 'SCRAP' | 'REASSIGN';
  reason?: string;
  performedBy: string;
  performedAt: string;
}

// Dashboard statistics
export interface TraceabilityStats {
  totalBottles: number;
  totalCases: number;
  totalPallets: number;
  orphanedUnits: number;
  packedToday: number;
  shippedToday: number;
  damagedToday: number;
  efficiency: number; // percentage
}
