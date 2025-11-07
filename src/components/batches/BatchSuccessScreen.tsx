import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Download, Eye, Home, Package } from 'lucide-react';

interface BatchSuccessScreenProps {
  batchId: string;
  productName: string;
  numberOfUnits: number;
  onNavigateToDashboard: () => void;
  onNavigateToBatches: () => void;
}

export const BatchSuccessScreen = ({
  batchId,
  productName,
  numberOfUnits,
  onNavigateToDashboard,
  onNavigateToBatches,
}: BatchSuccessScreenProps) => {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-lg">
        <CardContent className="pt-12 pb-8 px-8">
          <div className="text-center space-y-6">
            {/* Success Icon with Animation */}
            <div className="flex justify-center">
              <div className="relative">
                <CheckCircle2 className="h-24 w-24 text-success animate-in zoom-in-50 duration-500" />
                <div className="absolute inset-0 bg-success/20 rounded-full animate-ping" />
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Batch Created Successfully!
              </h1>
              <p className="text-muted-foreground">
                Your product batch has been created and is ready for QR code generation.
              </p>
            </div>

            {/* Batch Details */}
            <div className="bg-muted rounded-lg p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Batch ID:</span>
                <span className="font-mono font-semibold text-lg">{batchId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Product:</span>
                <span className="font-medium">{productName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Quantity:</span>
                <span className="font-medium">{numberOfUnits.toLocaleString()} units</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <Button size="lg" className="w-full" disabled>
                <Download className="mr-2 h-5 w-5" />
                Download QR Labels
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg" disabled>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview Page
                </Button>
                <Button variant="outline" size="lg" onClick={onNavigateToDashboard}>
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </div>

              <Button
                variant="ghost"
                size="lg"
                className="w-full"
                onClick={onNavigateToBatches}
              >
                <Package className="mr-2 h-4 w-4" />
                Back to Batches
              </Button>
            </div>

            {/* Next Steps */}
            <div className="pt-6 border-t">
              <h3 className="text-sm font-semibold mb-3">Next Steps:</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Download and print your QR code labels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Preview the product landing page to ensure everything looks perfect</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Track scans and verifications in your dashboard analytics</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
