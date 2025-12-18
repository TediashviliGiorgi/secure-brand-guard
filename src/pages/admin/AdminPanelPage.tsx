import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  DollarSign,
  Settings,
  Package,
  Shield,
  Users,
  TrendingUp,
  Calculator,
  Percent,
  Gift,
  Save,
  RefreshCcw,
  Check,
  X,
  Edit2,
  Plus,
  Trash2,
  BarChart3,
  Clock,
  CreditCard,
  AlertTriangle,
  QrCode
} from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { DEFAULT_PRICING_CONFIG, PricingPlan, CostPolicy, AdminPricingConfig } from '@/types/pricing';

const AdminPanelPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('pricing');
  const [config, setConfig] = useState<AdminPricingConfig>(DEFAULT_PRICING_CONFIG);
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [editingPolicy, setEditingPolicy] = useState<string | null>(null);

  // Summary statistics
  const stats = {
    activePlans: config.plans.filter(p => p.isActive).length,
    totalPlans: config.plans.length,
    activePolicies: config.costPolicies.filter(p => p.isActive).length,
    avgPerUnitRate: (config.plans.reduce((sum, p) => sum + p.perUnitRate, 0) / config.plans.length).toFixed(3),
    trialDays: config.trialConfig.durationDays
  };

  const handleSaveConfig = () => {
    toast({
      title: 'Configuration Saved',
      description: 'Pricing and policy changes have been saved successfully.',
    });
  };

  const handleResetToDefaults = () => {
    setConfig(DEFAULT_PRICING_CONFIG);
    toast({
      title: 'Reset Complete',
      description: 'Configuration has been reset to default values.',
    });
  };

  const handleUpdatePlan = (planId: string, updates: Partial<PricingPlan>) => {
    setConfig(prev => ({
      ...prev,
      plans: prev.plans.map(p => p.id === planId ? { ...p, ...updates } : p)
    }));
  };

  const handleUpdatePolicy = (policyId: string, updates: Partial<CostPolicy>) => {
    setConfig(prev => ({
      ...prev,
      costPolicies: prev.costPolicies.map(p => p.id === policyId ? { ...p, ...updates } : p)
    }));
  };

  const handleTogglePlanActive = (planId: string) => {
    const plan = config.plans.find(p => p.id === planId);
    if (plan) {
      handleUpdatePlan(planId, { isActive: !plan.isActive });
    }
  };

  const handleTogglePolicyActive = (policyId: string) => {
    const policy = config.costPolicies.find(p => p.id === policyId);
    if (policy) {
      handleUpdatePolicy(policyId, { isActive: !policy.isActive });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('common.back')}
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">Admin Panel</h1>
                  <Badge variant="destructive" className="text-xs">Admin Only</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Manage pricing plans, cost policies, and system configuration</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeSwitcher />
              <Button variant="outline" onClick={handleResetToDefaults}>
                <RefreshCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button onClick={handleSaveConfig}>
                <Save className="w-4 h-4 mr-2" />
                Save All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Active Plans</p>
                  <p className="text-xl font-bold">{stats.activePlans}/{stats.totalPlans}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-success/5 border-success/20">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-success" />
                <div>
                  <p className="text-xs text-muted-foreground">Cost Policies</p>
                  <p className="text-xl font-bold">{stats.activePolicies}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-secondary/5 border-secondary/20">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-secondary-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Avg Rate/Unit</p>
                  <p className="text-xl font-bold">${stats.avgPerUnitRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-accent-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Trial Period</p>
                  <p className="text-xl font-bold">{stats.trialDays} days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2">
                <Percent className="w-5 h-5 text-destructive" />
                <div>
                  <p className="text-xs text-muted-foreground">Annual Discount</p>
                  <p className="text-xl font-bold">{config.annualDiscountPercentage}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 max-w-4xl">
            <TabsTrigger value="pricing">
              <DollarSign className="w-4 h-4 mr-2" />
              Pricing Plans
            </TabsTrigger>
            <TabsTrigger value="costs">
              <Calculator className="w-4 h-4 mr-2" />
              Cost Policies
            </TabsTrigger>
            <TabsTrigger value="trial">
              <Gift className="w-4 h-4 mr-2" />
              Free Trial
            </TabsTrigger>
            <TabsTrigger value="roi">
              <TrendingUp className="w-4 h-4 mr-2" />
              ROI Settings
            </TabsTrigger>
            <TabsTrigger value="system">
              <Settings className="w-4 h-4 mr-2" />
              System
            </TabsTrigger>
          </TabsList>

          {/* Pricing Plans Tab */}
          <TabsContent value="pricing" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Subscription Plans</h2>
                <p className="text-sm text-muted-foreground">Manage pricing tiers and features</p>
              </div>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Plan
              </Button>
            </div>

            <div className="grid gap-6">
              {config.plans.map((plan) => (
                <Card key={plan.id} className={`relative ${!plan.isActive ? 'opacity-60' : ''}`}>
                  {plan.isPopular && (
                    <Badge className="absolute -top-3 left-4">Most Popular</Badge>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {plan.name}
                            {!plan.isActive && <Badge variant="secondary">Inactive</Badge>}
                          </CardTitle>
                          <CardDescription>{plan.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={plan.isActive}
                          onCheckedChange={() => handleTogglePlanActive(plan.id)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingPlan(editingPlan === plan.id ? null : plan.id)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-6">
                      {/* Pricing */}
                      <div className="space-y-3">
                        <Label className="text-xs text-muted-foreground">PRICING</Label>
                        {editingPlan === plan.id ? (
                          <div className="space-y-2">
                            <div>
                              <Label className="text-xs">Monthly ($)</Label>
                              <Input
                                type="number"
                                value={plan.monthlyPrice}
                                onChange={(e) => handleUpdatePlan(plan.id, { monthlyPrice: Number(e.target.value) })}
                                className="h-8"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Annual ($)</Label>
                              <Input
                                type="number"
                                value={plan.annualPrice}
                                onChange={(e) => handleUpdatePlan(plan.id, { annualPrice: Number(e.target.value) })}
                                className="h-8"
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-2xl font-bold">${plan.monthlyPrice}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                            <p className="text-sm text-muted-foreground">${plan.annualPrice}/yr</p>
                          </div>
                        )}
                      </div>

                      {/* Per Unit Rate */}
                      <div className="space-y-3">
                        <Label className="text-xs text-muted-foreground">PER UNIT RATE</Label>
                        {editingPlan === plan.id ? (
                          <div>
                            <Label className="text-xs">Rate ($)</Label>
                            <Input
                              type="number"
                              step="0.001"
                              value={plan.perUnitRate}
                              onChange={(e) => handleUpdatePlan(plan.id, { perUnitRate: Number(e.target.value) })}
                              className="h-8"
                            />
                          </div>
                        ) : (
                          <div>
                            <p className="text-2xl font-bold">${plan.perUnitRate}</p>
                            <p className="text-sm text-muted-foreground">per unit generated</p>
                          </div>
                        )}
                      </div>

                      {/* Storage & Support */}
                      <div className="space-y-3">
                        <Label className="text-xs text-muted-foreground">RESOURCES</Label>
                        {editingPlan === plan.id ? (
                          <div className="space-y-2">
                            <div>
                              <Label className="text-xs">Storage</Label>
                              <Input
                                value={plan.storage}
                                onChange={(e) => handleUpdatePlan(plan.id, { storage: e.target.value })}
                                className="h-8"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Support</Label>
                              <Input
                                value={plan.support}
                                onChange={(e) => handleUpdatePlan(plan.id, { support: e.target.value })}
                                className="h-8"
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="font-medium">{plan.storage} Storage</p>
                            <p className="text-sm text-muted-foreground">{plan.support} Support</p>
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      <div className="space-y-3">
                        <Label className="text-xs text-muted-foreground">FEATURES ({plan.features.length})</Label>
                        <ul className="space-y-1">
                          {plan.features.slice(0, 4).map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm">
                              <Check className="w-3 h-3 text-primary flex-shrink-0" />
                              <span className="truncate">{feature}</span>
                            </li>
                          ))}
                          {plan.features.length > 4 && (
                            <li className="text-xs text-muted-foreground">+{plan.features.length - 4} more</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cost Policies Tab */}
          <TabsContent value="costs" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Cost Policies</h2>
                <p className="text-sm text-muted-foreground">Configure Dual QR system pricing rates</p>
              </div>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Policy
              </Button>
            </div>

            <div className="grid gap-6">
              {config.costPolicies.map((policy) => (
                <Card key={policy.id} className={!policy.isActive ? 'opacity-60' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <QrCode className="w-8 h-8 text-primary" />
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {policy.name}
                            {!policy.isActive && <Badge variant="secondary">Inactive</Badge>}
                          </CardTitle>
                          <CardDescription>
                            Quantity range: {policy.minQuantity.toLocaleString()} - {policy.maxQuantity.toLocaleString()} units
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={policy.isActive}
                          onCheckedChange={() => handleTogglePolicyActive(policy.id)}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingPolicy(editingPolicy === policy.id ? null : policy.id)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Rate Min */}
                      <div className="space-y-2">
                        <Label>Minimum Rate (₾)</Label>
                        {editingPolicy === policy.id ? (
                          <Input
                            type="number"
                            step="0.01"
                            value={policy.rateMin}
                            onChange={(e) => handleUpdatePolicy(policy.id, { rateMin: Number(e.target.value) })}
                          />
                        ) : (
                          <p className="text-2xl font-bold text-muted-foreground">{policy.rateMin.toFixed(2)} ₾</p>
                        )}
                      </div>

                      {/* Rate Avg */}
                      <div className="space-y-2">
                        <Label>Average Rate (₾)</Label>
                        {editingPolicy === policy.id ? (
                          <Input
                            type="number"
                            step="0.01"
                            value={policy.rateAvg}
                            onChange={(e) => handleUpdatePolicy(policy.id, { rateAvg: Number(e.target.value) })}
                          />
                        ) : (
                          <p className="text-2xl font-bold text-primary">{policy.rateAvg.toFixed(2)} ₾</p>
                        )}
                      </div>

                      {/* Rate Max */}
                      <div className="space-y-2">
                        <Label>Maximum Rate (₾)</Label>
                        {editingPolicy === policy.id ? (
                          <Input
                            type="number"
                            step="0.01"
                            value={policy.rateMax}
                            onChange={(e) => handleUpdatePolicy(policy.id, { rateMax: Number(e.target.value) })}
                          />
                        ) : (
                          <p className="text-2xl font-bold text-muted-foreground">{policy.rateMax.toFixed(2)} ₾</p>
                        )}
                      </div>
                    </div>

                    {/* Visual Rate Slider */}
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <Label className="text-sm text-muted-foreground mb-3 block">Rate Range Visualization</Label>
                      <div className="relative h-2 bg-muted rounded-full">
                        <div
                          className="absolute h-2 bg-gradient-to-r from-primary/30 via-primary to-primary/30 rounded-full"
                          style={{
                            left: `${(policy.rateMin / policy.rateMax) * 100 * 0.7}%`,
                            right: `${(1 - 1) * 100}%`,
                            width: `${((policy.rateMax - policy.rateMin) / policy.rateMax) * 100}%`
                          }}
                        />
                        <div
                          className="absolute w-3 h-3 bg-primary rounded-full top-1/2 -translate-y-1/2 shadow"
                          style={{ left: `${((policy.rateAvg - policy.rateMin) / (policy.rateMax - policy.rateMin)) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Min: {policy.rateMin.toFixed(2)} ₾</span>
                        <span className="text-primary font-medium">Avg: {policy.rateAvg.toFixed(2)} ₾</span>
                        <span>Max: {policy.rateMax.toFixed(2)} ₾</span>
                      </div>
                    </div>

                    {/* Example Calculations */}
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                      {[1000, 5000, 10000].map((qty) => (
                        <div key={qty} className="p-3 bg-card rounded-lg border">
                          <p className="text-xs text-muted-foreground">{qty.toLocaleString()} bottles</p>
                          <p className="font-bold text-primary">{(qty * policy.rateAvg).toLocaleString()} ₾</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Free Trial Tab */}
          <TabsContent value="trial" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5 text-primary" />
                  Free Trial Configuration
                </CardTitle>
                <CardDescription>Configure trial period settings and included features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Trial Duration (Days)</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[config.trialConfig.durationDays]}
                          onValueChange={([value]) => setConfig(prev => ({
                            ...prev,
                            trialConfig: { ...prev.trialConfig, durationDays: value }
                          }))}
                          min={7}
                          max={180}
                          step={7}
                          className="flex-1"
                        />
                        <span className="text-2xl font-bold w-20 text-right">{config.trialConfig.durationDays}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Units Included</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          value={[config.trialConfig.unitsIncluded]}
                          onValueChange={([value]) => setConfig(prev => ({
                            ...prev,
                            trialConfig: { ...prev.trialConfig, unitsIncluded: value }
                          }))}
                          min={100}
                          max={5000}
                          step={100}
                          className="flex-1"
                        />
                        <span className="text-2xl font-bold w-20 text-right">{config.trialConfig.unitsIncluded.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <Label>Require Credit Card</Label>
                        <p className="text-sm text-muted-foreground">Ask for payment info upfront</p>
                      </div>
                      <Switch
                        checked={config.trialConfig.requiresCreditCard}
                        onCheckedChange={(checked) => setConfig(prev => ({
                          ...prev,
                          trialConfig: { ...prev.trialConfig, requiresCreditCard: checked }
                        }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Trial Features</Label>
                    <div className="space-y-2">
                      {config.trialConfig.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-3 rounded-lg border">
                          <Check className="w-4 h-4 text-primary" />
                          <span className="flex-1">{feature}</span>
                          <Button variant="ghost" size="sm">
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Feature
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Trial Preview Card */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">{config.trialConfig.durationDays}-Day Free Trial</h3>
                      <p className="text-muted-foreground mb-4">
                        Includes {config.trialConfig.unitsIncluded.toLocaleString()} units
                        {config.trialConfig.requiresCreditCard ? ' • Credit card required' : ' • No credit card required'}
                      </p>
                      <div className="flex justify-center gap-4 text-sm">
                        {config.trialConfig.features.map((f, i) => (
                          <Badge key={i} variant="secondary">{f}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ROI Settings Tab */}
          <TabsContent value="roi" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  ROI Calculator Defaults
                </CardTitle>
                <CardDescription>Configure default values for the ROI calculator on pricing page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>Default Annual Production</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[config.roiDefaults.defaultAnnualProduction]}
                        onValueChange={([value]) => setConfig(prev => ({
                          ...prev,
                          roiDefaults: { ...prev.roiDefaults, defaultAnnualProduction: value }
                        }))}
                        min={1000}
                        max={100000}
                        step={1000}
                        className="flex-1"
                      />
                      <span className="font-bold w-24 text-right">{config.roiDefaults.defaultAnnualProduction.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Default Price per Unit (₾)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[config.roiDefaults.defaultPricePerUnit]}
                        onValueChange={([value]) => setConfig(prev => ({
                          ...prev,
                          roiDefaults: { ...prev.roiDefaults, defaultPricePerUnit: value }
                        }))}
                        min={10}
                        max={200}
                        step={5}
                        className="flex-1"
                      />
                      <span className="font-bold w-16 text-right">{config.roiDefaults.defaultPricePerUnit} ₾</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Fraud Loss Percentage (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[config.roiDefaults.fraudLossPercentage]}
                        onValueChange={([value]) => setConfig(prev => ({
                          ...prev,
                          roiDefaults: { ...prev.roiDefaults, fraudLossPercentage: value }
                        }))}
                        min={1}
                        max={15}
                        step={0.5}
                        className="flex-1"
                      />
                      <span className="font-bold w-12 text-right">{config.roiDefaults.fraudLossPercentage}%</span>
                    </div>
                  </div>
                </div>

                {/* ROI Preview */}
                <Separator />
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-4">Preview with Default Values</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {(() => {
                      const production = config.roiDefaults.defaultAnnualProduction;
                      const price = config.roiDefaults.defaultPricePerUnit;
                      const authItCost = production * 0.02; // Using Professional tier
                      const revenue = production * price;
                      const fraudLoss = revenue * (config.roiDefaults.fraudLossPercentage / 100);
                      const netBenefit = fraudLoss - authItCost;
                      const roi = ((netBenefit / authItCost) * 100).toFixed(0);

                      return (
                        <>
                          <div className="text-center p-3 bg-card rounded-lg">
                            <p className="text-xs text-muted-foreground">AuthIt Cost</p>
                            <p className="text-lg font-bold">${authItCost.toLocaleString()}</p>
                          </div>
                          <div className="text-center p-3 bg-card rounded-lg">
                            <p className="text-xs text-muted-foreground">Potential Fraud Loss</p>
                            <p className="text-lg font-bold text-destructive">${fraudLoss.toLocaleString()}</p>
                          </div>
                          <div className="text-center p-3 bg-card rounded-lg">
                            <p className="text-xs text-muted-foreground">Net Benefit</p>
                            <p className="text-lg font-bold text-primary">${netBenefit.toLocaleString()}</p>
                          </div>
                          <div className="text-center p-3 bg-primary/10 rounded-lg border-2 border-primary">
                            <p className="text-xs text-muted-foreground">ROI</p>
                            <p className="text-2xl font-bold text-primary">{roi}%</p>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6 mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Percent className="w-5 h-5 text-primary" />
                    Discount Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Annual Billing Discount (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[config.annualDiscountPercentage]}
                        onValueChange={([value]) => setConfig(prev => ({
                          ...prev,
                          annualDiscountPercentage: value
                        }))}
                        min={0}
                        max={40}
                        step={5}
                        className="flex-1"
                      />
                      <span className="text-2xl font-bold w-16 text-right">{config.annualDiscountPercentage}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Users who choose annual billing get {config.annualDiscountPercentage}% off the total cost.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Currency Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Primary Currency</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {['USD', 'EUR', 'GEL'].map((curr) => (
                        <Button
                          key={curr}
                          variant={config.currency === curr ? 'default' : 'outline'}
                          onClick={() => setConfig(prev => ({ ...prev, currency: curr }))}
                          className="w-full"
                        >
                          {curr}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Configuration Summary
                  </CardTitle>
                  <CardDescription>Overview of current pricing configuration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Plans</p>
                      <p className="text-lg font-bold">{stats.activePlans} active / {stats.totalPlans} total</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Price Range</p>
                      <p className="text-lg font-bold">
                        ${Math.min(...config.plans.map(p => p.monthlyPrice))} - ${Math.max(...config.plans.map(p => p.monthlyPrice))}/mo
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Per Unit Range</p>
                      <p className="text-lg font-bold">
                        ${Math.min(...config.plans.map(p => p.perUnitRate))} - ${Math.max(...config.plans.map(p => p.perUnitRate))}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Trial Value</p>
                      <p className="text-lg font-bold">
                        {config.trialConfig.durationDays} days + {config.trialConfig.unitsIncluded.toLocaleString()} units
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Danger Zone */}
            <div className="border-2 border-destructive rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold text-lg">Danger Zone</h3>
              </div>
              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-base">Reset All Configuration</CardTitle>
                  <CardDescription>
                    This will reset all pricing plans, cost policies, and settings to their default values.
                    This action cannot be undone.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" onClick={handleResetToDefaults}>
                    <RefreshCcw className="w-4 h-4 mr-2" />
                    Reset to Defaults
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanelPage;
