import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface CostBreakdownModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CostBreakdownModal = ({ open, onOpenChange }: CostBreakdownModalProps) => {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [production, setProduction] = useState([25000]);

  const annualProduction = production[0];

  // Platform subscription costs
  const platformCosts = {
    starter: { monthly: 29, annual: 290 },
    professional: { monthly: 99, annual: 990 },
    enterprise: { monthly: 299, annual: 2990 }
  };

  // Per-unit generation costs
  const generationRates = {
    starter: 0.01,
    professional: 0.02,
    enterprise: 0.025
  };

  // Calculate total costs
  const calculateTotalCost = (tier: keyof typeof platformCosts) => {
    const platformCost = billing === "monthly" 
      ? platformCosts[tier].monthly * 12 
      : platformCosts[tier].annual;
    const generationCost = annualProduction * generationRates[tier];
    return {
      platform: platformCost,
      generation: generationCost,
      total: platformCost + generationCost,
      perUnit: (platformCost + generationCost) / annualProduction
    };
  };

  const starterCosts = calculateTotalCost('starter');
  const professionalCosts = calculateTotalCost('professional');
  const enterpriseCosts = calculateTotalCost('enterprise');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Detailed Cost Breakdown</DialogTitle>
          <DialogDescription>
            See your total annual costs including platform subscription and unit generation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Billing Toggle */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-4 p-1 bg-muted rounded-lg">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-6 py-2 rounded-md transition-colors ${
                  billing === "monthly" ? "bg-background shadow-sm" : "text-muted-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={`px-6 py-2 rounded-md transition-colors ${
                  billing === "annual" ? "bg-background shadow-sm" : "text-muted-foreground"
                }`}
              >
                Annual
                <Badge variant="secondary" className="ml-2">Save 20%</Badge>
              </button>
            </div>
          </div>

          {/* Production Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Estimated Annual Production</label>
              <span className="text-sm font-semibold">{production[0].toLocaleString()} units</span>
            </div>
            <Slider
              value={production}
              onValueChange={setProduction}
              min={1000}
              max={100000}
              step={1000}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Adjust your annual production to see projected costs
            </p>
          </div>

          {/* Cost Comparison Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Starter */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg mb-1">Starter</h3>
                  <p className="text-sm text-muted-foreground">For small producers</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Platform Cost</span>
                    <span className="font-semibold">${starterCosts.platform.toLocaleString()}/yr</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Generation Cost</span>
                    <span className="font-semibold">${starterCosts.generation.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-primary">
                    <span className="font-bold">Total Annual Cost</span>
                    <span className="font-bold text-primary">${starterCosts.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Cost per Unit</span>
                    <span className="font-semibold">${starterCosts.perUnit.toFixed(3)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs">Dual QR system</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs">Basic analytics</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs">Email support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional */}
            <Card className="border-primary shadow-lg relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Recommended</Badge>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg mb-1">Professional</h3>
                  <p className="text-sm text-muted-foreground">For growing brands</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Platform Cost</span>
                    <span className="font-semibold">${professionalCosts.platform.toLocaleString()}/yr</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Generation Cost</span>
                    <span className="font-semibold">${professionalCosts.generation.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-primary">
                    <span className="font-bold">Total Annual Cost</span>
                    <span className="font-bold text-primary">${professionalCosts.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Cost per Unit</span>
                    <span className="font-semibold">${professionalCosts.perUnit.toFixed(3)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs">Everything in Starter</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs">Advanced analytics</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs">API access</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg mb-1">Enterprise</h3>
                  <p className="text-sm text-muted-foreground">For large operations</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Platform Cost</span>
                    <span className="font-semibold">${enterpriseCosts.platform.toLocaleString()}/yr</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Generation Cost</span>
                    <span className="font-semibold">${enterpriseCosts.generation.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-primary">
                    <span className="font-bold">Total Annual Cost</span>
                    <span className="font-bold text-primary">${enterpriseCosts.total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Cost per Unit</span>
                    <span className="font-semibold">${enterpriseCosts.perUnit.toFixed(3)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t space-y-2">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs">Everything in Professional</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs">Multi-brand management</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs">24/7 support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Note */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-2">Cost Structure Explained</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Platform Subscription:</strong> Fixed monthly or annual fee for access to features, storage, support, and platform capabilities.
                </p>
                <p>
                  <strong className="text-foreground">Generation Costs:</strong> Pay only when you create Dual QR codes (visible + hidden security code). Rates: Starter ($0.01/unit), Professional ($0.02/unit), Enterprise ($0.025/unit).
                </p>
                <p>
                  <strong className="text-foreground">Total Cost per Unit:</strong> Combined platform and generation costs divided by your annual production volume.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
