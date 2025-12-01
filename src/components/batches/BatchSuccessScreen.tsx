import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, Download, Eye, Home, Package, QrCode, Shield, FileText, AlertCircle } from 'lucide-react';

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
                Your product batch has been created and is ready for Dual QR code generation.
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
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Technology:</span>
                <Badge variant="outline">
                  <QrCode className="mr-1 h-3 w-3" />
                  Dual QR System
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              {/* Main QR Code for Packaging */}
              <Alert className="bg-blue-500/10 border-blue-500/50">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-xs">
                  <strong>Main QR Code:</strong> Download the batch-level QR code for outer packaging/labels (same for all bottles)
                </AlertDescription>
              </Alert>
              
              <Button size="lg" className="w-full" disabled>
                <Download className="mr-2 h-5 w-5" />
                Download Main QR Code (Packaging)
              </Button>
              
              <Separator className="my-2" />
              
              <Button size="lg" className="w-full" variant="outline" disabled>
                <Download className="mr-2 h-5 w-5" />
                Download Individual Bottle QR Codes
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" disabled>
                  <FileText className="mr-2 h-4 w-4" />
                  A4 PDF
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <Package className="mr-2 h-4 w-4" />
                  Roll PDF
                </Button>
              </div>
              
              {/* Navigation Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
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
                  <span className="text-primary mt-1">1.</span>
                  <span>Download and print QR code labels on adhesive paper</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">2.</span>
                  <span>Apply QR #1 (Marketing) to front label</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">3.</span>
                  <span>Apply QR #2 (Security) under cork/seal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">4.</span>
                  <span>Track scans and verifications in your dashboard</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
