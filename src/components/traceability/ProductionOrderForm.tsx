import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Product, ProductionOrder } from '@/types/traceability';
import { mockProducts } from '@/lib/mockTraceabilityData';
import { 
  Wine, 
  Package, 
  Boxes, 
  QrCode, 
  Calculator,
  Printer,
  Check,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

interface ProductionOrderFormProps {
  onSubmit?: (order: Partial<ProductionOrder>) => void;
}

export function ProductionOrderForm({ onSubmit }: ProductionOrderFormProps) {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1000);
  const [bottlesPerCase, setBottlesPerCase] = useState<number>(6);
  const [casesPerPallet, setCasesPerPallet] = useState<number>(50);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOrder, setGeneratedOrder] = useState<Partial<ProductionOrder> | null>(null);

  const selectedProduct = mockProducts.find(p => p.id === selectedProductId);

  // Calculate code quantities
  const calculations = useMemo(() => {
    const bottleCodes = quantity;
    const caseCodes = Math.ceil(quantity / bottlesPerCase);
    const palletCodes = Math.ceil(caseCodes / casesPerPallet);
    
    return {
      bottleCodes,
      caseCodes,
      palletCodes,
      totalCodes: bottleCodes + caseCodes + palletCodes,
    };
  }, [quantity, bottlesPerCase, casesPerPallet]);

  const handleGenerate = async () => {
    if (!selectedProductId) {
      toast.error('Please select a product');
      return;
    }

    setIsGenerating(true);

    // Simulate code generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const order: Partial<ProductionOrder> = {
      id: `PO-${Date.now()}`,
      productId: selectedProductId,
      product: selectedProduct,
      quantity,
      bottleCodes: calculations.bottleCodes,
      caseCodes: calculations.caseCodes,
      palletCodes: calculations.palletCodes,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      createdBy: 'current-user',
      bottlesPerCase,
      casesPerPallet,
    };

    setGeneratedOrder(order);
    setIsGenerating(false);
    toast.success('QR codes generated successfully!');
    onSubmit?.(order);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            Create Production Order
          </CardTitle>
          <CardDescription>
            Generate unique QR codes for bottles, cases, and pallets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Product Selection */}
          <div className="space-y-2">
            <Label htmlFor="product">Product</Label>
            <Select value={selectedProductId} onValueChange={setSelectedProductId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a product..." />
              </SelectTrigger>
              <SelectContent>
                {mockProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    <div className="flex items-center gap-2">
                      <Wine className="h-4 w-4 text-primary" />
                      {product.name}
                      <Badge variant="outline" className="ml-2 text-xs">
                        {product.gtin}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Total Bottles</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              min={1}
              className="font-mono"
            />
          </div>

          {/* Aggregation Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bottlesPerCase">Bottles per Case</Label>
              <Select 
                value={bottlesPerCase.toString()} 
                onValueChange={(v) => setBottlesPerCase(parseInt(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4 bottles</SelectItem>
                  <SelectItem value="6">6 bottles</SelectItem>
                  <SelectItem value="12">12 bottles</SelectItem>
                  <SelectItem value="24">24 bottles</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="casesPerPallet">Cases per Pallet</Label>
              <Select 
                value={casesPerPallet.toString()} 
                onValueChange={(v) => setCasesPerPallet(parseInt(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25 cases</SelectItem>
                  <SelectItem value="50">50 cases</SelectItem>
                  <SelectItem value="100">100 cases</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Code Calculation Preview */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              <span className="font-medium">Code Generation Preview</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-muted/50 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Wine className="h-5 w-5 text-success" />
                  <span className="text-sm text-muted-foreground">L1 - Bottles</span>
                </div>
                <p className="text-2xl font-bold font-mono">
                  {calculations.bottleCodes.toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Package className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">L2 - Cases</span>
                </div>
                <p className="text-2xl font-bold font-mono">
                  {calculations.caseCodes.toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Boxes className="h-5 w-5 text-secondary" />
                  <span className="text-sm text-muted-foreground">L3 - Pallets</span>
                </div>
                <p className="text-2xl font-bold font-mono">
                  {calculations.palletCodes.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10">
              <span className="font-medium">Total QR Codes</span>
              <span className="text-xl font-bold font-mono text-primary">
                {calculations.totalCodes.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Note about orphaned status */}
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/30">
            <p className="text-sm text-warning-foreground">
              <strong>Note:</strong> Generated codes will be in "Orphaned" status until 
              physically scanned and associated during packaging.
            </p>
          </div>

          {/* Generate Button */}
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleGenerate}
            disabled={isGenerating || !selectedProductId}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Generating Codes...
              </>
            ) : (
              <>
                <QrCode className="h-5 w-5 mr-2" />
                Generate QR Codes
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Order Summary */}
      {generatedOrder && (
        <Card className="border-success">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-success">
              <Check className="h-5 w-5" />
              Production Order Created
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Order ID</span>
                <p className="font-mono font-bold">{generatedOrder.id}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Product</span>
                <p className="font-medium">{generatedOrder.product?.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline">{generatedOrder.status}</Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Created</span>
                <p>{new Date(generatedOrder.createdAt!).toLocaleString()}</p>
              </div>
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Printer className="h-4 w-4 mr-2" />
                Print Labels
              </Button>
              <Button variant="outline" className="flex-1">
                Export Codes
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
