import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QrCode, Radio, Shield, TrendingUp, TrendingDown, DollarSign, Package } from 'lucide-react';
import { mockBatch } from '@/lib/mockBatchData';
import { MetricCardSkeleton } from '@/components/ui/metric-card-skeleton';

// Create array from single mock batch for statistics
const mockBatches = [
  { ...mockBatch, id: 1, batchNumber: 'AUTH-2024-001', protectionMethod: 'qr' as const, bottles: 5000, product: 'Saperavi Reserve 2021', image: mockBatch.mainPhoto },
  { ...mockBatch, id: 2, batchNumber: 'AUTH-2024-002', protectionMethod: 'nfc' as const, bottles: 3000, product: 'Kindzmarauli Premium', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800' },
  { ...mockBatch, id: 3, batchNumber: 'AUTH-2024-003', protectionMethod: 'both' as const, bottles: 10000, product: 'Mukuzani Classic', image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800' },
];

export const BatchStatistics = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Calculate statistics from mock data
  const totalBatches = mockBatches.length;
  const qrBatches = mockBatches.filter(b => b.protectionMethod === 'qr').length;
  const nfcBatches = mockBatches.filter(b => b.protectionMethod === 'nfc').length;
  const bothBatches = mockBatches.filter(b => b.protectionMethod === 'both').length;
  
  const totalBottles = mockBatches.reduce((sum, b) => sum + b.bottles, 0);
  const qrBottles = mockBatches.filter(b => b.protectionMethod === 'qr').reduce((sum, b) => sum + b.bottles, 0);
  const nfcBottles = mockBatches.filter(b => b.protectionMethod === 'nfc').reduce((sum, b) => sum + b.bottles, 0);
  const bothBottles = mockBatches.filter(b => b.protectionMethod === 'both').reduce((sum, b) => sum + b.bottles, 0);
  
  // Calculate average costs (using avg rates from costCalculator)
  const avgQrCost = qrBottles * 8;
  const avgNfcCost = nfcBottles * 100;
  const avgBothCost = bothBottles * 108;
  const totalCost = avgQrCost + avgNfcCost + avgBothCost;
  const avgCostPerBottle = totalBottles > 0 ? totalCost / totalBottles : 0;
  
  // Most popular method
  const methods = [
    { name: 'QR', count: qrBatches },
    { name: 'NFC', count: nfcBatches },
    { name: 'Both', count: bothBatches }
  ];
  const mostPopular = methods.sort((a, b) => b.count - a.count)[0];
  
  // Calculate mock ROI (scans vs cost)
  const totalScans = mockBatches.reduce((sum, b) => sum + b.qr1Scans, 0);
  const mockRevenue = totalScans * 0.5; // Assume 0.5₾ value per scan
  const roi = totalCost > 0 ? ((mockRevenue - totalCost) / totalCost * 100).toFixed(1) : 0;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold">Batch Statistics</h3>
          <p className="text-sm text-muted-foreground">Overview of your authentication methods and costs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <MetricCardSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
        {/* Total Batches by Method */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Batches</CardDescription>
            <CardTitle className="text-3xl">{totalBatches}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <QrCode className="h-3 w-3 text-primary" />
                  <span>QR Only</span>
                </div>
                <Badge variant="outline">{qrBatches}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Radio className="h-3 w-3 text-amber-600" />
                  <span>NFC Only</span>
                </div>
                <Badge variant="outline">{nfcBatches}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3" />
                  <span>Both</span>
                </div>
                <Badge variant="outline">{bothBatches}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Average Cost Per Bottle */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg Cost Per Bottle</CardDescription>
            <CardTitle className="text-3xl">{avgCostPerBottle.toFixed(0)} ₾</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-3 w-3 text-green-500" />
                <span>12% lower than industry avg</span>
              </div>
              <div className="mt-2 pt-2 border-t space-y-1">
                <div>QR: {(avgQrCost / (qrBottles || 1)).toFixed(0)} ₾/bottle</div>
                <div>NFC: {(avgNfcCost / (nfcBottles || 1)).toFixed(0)} ₾/bottle</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Most Popular Method */}
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Most Popular Method</CardDescription>
            <CardTitle className="text-2xl flex items-center gap-2">
              {mostPopular.name === 'QR' && <QrCode className="h-6 w-6 text-primary" />}
              {mostPopular.name === 'NFC' && <Radio className="h-6 w-6 text-amber-600" />}
              {mostPopular.name === 'Both' && <Shield className="h-6 w-6" />}
              {mostPopular.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Package className="h-3 w-3" />
                <span>{mostPopular.count} batches ({((mostPopular.count / totalBatches) * 100).toFixed(0)}%)</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <TrendingUp className="h-3 w-3" />
                <span>+23% vs last quarter</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ROI Analytics */}
        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader className="pb-3">
            <CardDescription>Estimated ROI</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {Number(roi) > 0 ? '+' : ''}{roi}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <DollarSign className="h-3 w-3" />
                <span>Total investment: {totalCost.toLocaleString()} ₾</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3" />
                <span>{totalScans.toLocaleString()} consumer scans</span>
              </div>
              <div className="text-xs text-green-600 mt-2">
                Authentication protecting {totalBottles.toLocaleString()} bottles
              </div>
            </div>
          </CardContent>
        </Card>
          </>
        )}
      </div>
    </section>
  );
};
