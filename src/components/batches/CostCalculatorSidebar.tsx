import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, QrCode } from 'lucide-react';
import { calculateDualQRCost, getDualQRRecommendation } from '@/lib/costCalculator';

interface CostCalculatorSidebarProps {
  quantity: number;
}

export const CostCalculatorSidebar = ({ quantity }: CostCalculatorSidebarProps) => {
  const cost = calculateDualQRCost(quantity);
  const recommendation = getDualQRRecommendation(quantity);

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5 text-primary" />
          Dual QR Cost Estimate
        </CardTitle>
        <CardDescription>
          Real-time cost calculation for {quantity.toLocaleString()} bottles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dual QR System */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-3 border-b">
            <div>
              <div className="font-semibold text-lg mb-1">Dual QR System</div>
              <div className="text-sm text-muted-foreground">
                Visible QR + Hidden QR
              </div>
            </div>
            <Badge className="bg-primary">
              Included
            </Badge>
          </div>

          {/* Cost per bottle */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cost per bottle:</span>
              <span className="font-semibold">
                {cost.perUnit.min.toFixed(2)} - {cost.perUnit.max.toFixed(2)} ₾
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Average per bottle:</span>
              <span className="font-semibold text-primary">
                {cost.perUnit.avg.toFixed(2)} ₾
              </span>
            </div>
          </div>

          {/* Total cost */}
          <div className="pt-3 border-t">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-sm text-muted-foreground">Total Cost:</span>
              <span className="text-2xl font-bold text-primary">
                {cost.avgTotal.toLocaleString()} ₾
              </span>
            </div>
            <div className="text-xs text-muted-foreground text-right">
              Range: {cost.minTotal.toLocaleString()} - {cost.maxTotal.toLocaleString()} ₾
            </div>
          </div>

          {/* What's included */}
          <div className="space-y-2 pt-3 border-t">
            <div className="text-sm font-medium mb-2">What's Included:</div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Visible QR code for marketing & engagement</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Hidden QR code under cork for verification</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Unlimited scans on visible QR</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>One-time security verification</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                <span>Real-time analytics dashboard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-start gap-2 mb-2">
            <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="font-medium text-sm">Recommendation</div>
          </div>
          <p className="text-sm text-muted-foreground">{recommendation}</p>
        </div>

        {/* Note */}
        <div className="text-xs text-muted-foreground pt-3 border-t">
          <p className="mb-1">
            <strong>Note:</strong> Final pricing may vary based on your subscription tier and production volume.
          </p>
          <p>Contact sales for enterprise pricing.</p>
        </div>
      </CardContent>
    </Card>
  );
};
