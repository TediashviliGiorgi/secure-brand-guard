import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QrCode, Radio, Shield, TrendingUp } from 'lucide-react';
import { calculateCost, getRecommendation } from '@/lib/costCalculator';
import { Separator } from '@/components/ui/separator';

interface CostCalculatorSidebarProps {
  quantity: number;
}

export const CostCalculatorSidebar = ({ quantity }: CostCalculatorSidebarProps) => {
  const qrCost = calculateCost('qr', quantity);
  const nfcCost = calculateCost('nfc', quantity);
  const bothCost = calculateCost('both', quantity);
  const recommendation = getRecommendation(quantity);

  return (
    <div className="sticky top-4">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Generation Cost Calculator
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Per-unit charges when generating QR/NFC codes
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            {quantity > 0 ? (
              <>For <strong className="text-foreground">{quantity.toLocaleString()}</strong> units:</>
            ) : (
              <>Enter quantity to see costs</>
            )}
          </div>

          {quantity > 0 && (
            <>
              {/* QR Option */}
              <div className="space-y-2 p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">QR Only</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    ${qrCost.perUnit.avg.toFixed(3)}/unit
                  </Badge>
                </div>
                <div className="text-lg font-bold text-primary">
                  ${qrCost.avgTotal.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Starter Plan
                </div>
              </div>

              {/* NFC Option */}
              <div className="space-y-2 p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="h-4 w-4 text-amber-600" />
                    <span className="font-medium text-sm">NFC Only</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    ${nfcCost.perUnit.avg.toFixed(3)}/unit
                  </Badge>
                </div>
                <div className="text-lg font-bold text-amber-600">
                  ${nfcCost.avgTotal.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Professional Plan
                </div>
              </div>

              {/* Both Option */}
              <div className="space-y-2 p-3 rounded-lg bg-gradient-to-br from-primary/5 to-amber-500/5 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium text-sm">QR + NFC</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    ${bothCost.perUnit.avg.toFixed(3)}/unit
                  </Badge>
                </div>
                <div className="text-lg font-bold">
                  ${bothCost.avgTotal.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Enterprise Plan
                </div>
              </div>

              <Separator />

              {/* Recommendation */}
              <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                <div className="text-xs font-semibold text-blue-600 mb-1">
                  💡 Recommended
                </div>
                <div className="text-sm font-medium capitalize mb-1">
                  {recommendation.recommended === 'qr' && 'QR Code System'}
                  {recommendation.recommended === 'nfc' && 'NFC Tag System'}
                  {recommendation.recommended === 'both' && 'QR + NFC Combo'}
                </div>
                <div className="text-xs text-muted-foreground">
                  {recommendation.reason}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
