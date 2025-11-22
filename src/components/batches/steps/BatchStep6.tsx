import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Calculator, Check, AlertTriangle, Shield, Lightbulb, Star, Info, Plus, X, FileText, QrCode, Nfc } from 'lucide-react';
import { ComparisonModal } from '@/components/batches/ComparisonModal';
import { calculateCost } from '@/lib/costCalculator';

interface BatchStep6Props {
  form: UseFormReturn<any>;
}

const MEDAL_TYPES = ['gold', 'silver', 'bronze', 'other'];

export const BatchStep6 = ({ form }: BatchStep6Props) => {
  const companyHistory = form.watch('companyHistory') || '';
  const productStory = form.watch('productStory') || '';
  const traditionalMethods = form.watch('traditionalMethods') || '';
  const awards = form.watch('awards') || [];
  const quantity = form.watch('numberOfUnits') || 5000;
  
  const qrCost = calculateCost('qr', quantity);
  const nfcCost = calculateCost('nfc', quantity);
  const bothCost = calculateCost('both', quantity);

  const addAward = () => {
    const currentAwards = form.getValues('awards') || [];
    form.setValue('awards', [
      ...currentAwards,
      { name: '', year: new Date().getFullYear(), medalType: 'gold' },
    ]);
  };

  const removeAward = (index: number) => {
    const currentAwards = form.getValues('awards') || [];
    form.setValue(
      'awards',
      currentAwards.filter((_: any, i: number) => i !== index)
    );
  };

  const useTemplate = () => {
    form.setValue(
      'traditionalMethods',
      'Our products are crafted using time-honored traditional methods passed down through generations. We maintain strict adherence to authentic production techniques while ensuring the highest quality standards.'
    );
  };

  return (
    <div className="space-y-6">
      {/* Protection Method Selection with Pricing */}
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Choose Protection Method</CardTitle>
            <CardDescription>
              Select the authentication technology for your {quantity.toLocaleString()} bottles
            </CardDescription>
          </div>
          <ComparisonModal 
            quantity={quantity}
            trigger={
              <Button variant="outline" size="sm">
                <Info className="mr-2 h-4 w-4" />
                Compare Options
              </Button>
            }
          />
        </div>
      </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="protectionMethod"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value || 'qr'}
                    className="space-y-4"
                  >
                    
                    {/* Option 1: QR Code Only */}
                    <Card className={`relative cursor-pointer p-6 hover:border-primary transition-colors ${
                      field.value === 'qr' ? 'border-primary border-2 bg-primary/5' : ''
                    }`}>
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="qr" />
                        </FormControl>
                        <div className="flex-1 space-y-4">
                          
                          {/* Header with Price */}
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <QrCode className="h-5 w-5 text-primary" />
                                <FormLabel className="text-lg font-semibold cursor-pointer">
                                  QR Code Only
                                </FormLabel>
                              </div>
                              <FormDescription className="text-sm">
                                Cost-effective dual QR system. Perfect for most products.
                              </FormDescription>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">
                                6-10 ₾
                              </div>
                              <div className="text-xs text-muted-foreground">
                                per bottle
                              </div>
                            </div>
                          </div>

                          {/* Cost Calculation */}
                          <Alert className="bg-primary/5 border-primary/20">
                            <Calculator className="h-4 w-4" />
                            <AlertDescription>
                              <div className="flex items-baseline gap-2">
                                <strong>Total Cost:</strong>
                                <span className="text-lg font-bold">
                                  {qrCost.minTotal.toLocaleString()} - {qrCost.maxTotal.toLocaleString()} ₾
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Average: {qrCost.avgTotal.toLocaleString()} ₾ ({quantity.toLocaleString()} bottles × 8 ₾)
                              </div>
                            </AlertDescription>
                          </Alert>

                          {/* Benefits */}
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary" />
                              <span>100% smartphone compatibility</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary" />
                              <span>Immediate deployment (1 day)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary" />
                              <span>Dual system: Marketing + Security</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary" />
                              <span>Print on standard label paper</span>
                            </div>
                          </div>
                        </div>
                      </FormItem>
                    </Card>

                    {/* Option 2: NFC Tag Only */}
                    <Card className={`relative cursor-pointer p-6 hover:border-primary transition-colors ${
                      field.value === 'nfc' ? 'border-primary border-2 bg-amber-500/5' : ''
                    }`}>
                      <Badge className="absolute top-4 right-4 bg-amber-500">
                        Premium
                      </Badge>
                      
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="nfc" />
                        </FormControl>
                        <div className="flex-1 space-y-4">
                          
                          {/* Header with Price */}
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Nfc className="h-5 w-5 text-amber-600" />
                                <FormLabel className="text-lg font-semibold cursor-pointer">
                                  NFC Tag Only
                                </FormLabel>
                              </div>
                              <FormDescription className="text-sm">
                                Hardware-level security. Premium authentication experience.
                              </FormDescription>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-2xl font-bold text-amber-600">
                                50-200 ₾
                              </div>
                              <div className="text-xs text-muted-foreground">
                                per bottle
                              </div>
                            </div>
                          </div>

                          {/* Cost Calculation */}
                          <Alert className="bg-amber-500/5 border-amber-500/20">
                            <Calculator className="h-4 w-4 text-amber-600" />
                            <AlertDescription>
                              <div className="flex items-baseline gap-2">
                                <strong>Total Cost:</strong>
                                <span className="text-lg font-bold text-amber-600">
                                  {nfcCost.minTotal.toLocaleString()} - {nfcCost.maxTotal.toLocaleString()} ₾
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Average: {nfcCost.avgTotal.toLocaleString()} ₾ ({quantity.toLocaleString()} bottles × 100 ₾)
                              </div>
                              <div className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                                <AlertTriangle className="h-3 w-3" />
                                Production lead time: 2-3 weeks
                              </div>
                            </AlertDescription>
                          </Alert>

                          {/* Benefits */}
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-amber-600" />
                              <span>Near-impossible to counterfeit</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-amber-600" />
                              <span>Unique hardware UID (unclonable)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-amber-600" />
                              <span>Cannot be photographed/copied</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-amber-600" />
                              <span>Requires NFC-enabled phone (~60% compatibility)</span>
                            </div>
                          </div>
                        </div>
                      </FormItem>
                    </Card>

                    {/* Option 3: Both (QR + NFC) */}
                    <Card className={`relative cursor-pointer p-6 hover:border-primary transition-colors ${
                      field.value === 'both' ? 'border-primary border-2 bg-gradient-to-br from-primary/5 to-amber-500/5' : ''
                    }`}>
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-primary to-amber-500 text-white">
                        Maximum Security
                      </Badge>
                      
                      <FormItem className="flex items-start space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="both" />
                        </FormControl>
                        <div className="flex-1 space-y-4">
                          
                          {/* Header with Price */}
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Shield className="h-5 w-5" />
                                <FormLabel className="text-lg font-semibold cursor-pointer">
                                  QR + NFC Combo
                                </FormLabel>
                              </div>
                              <FormDescription className="text-sm">
                                Maximum security with both QR codes and NFC tags.
                              </FormDescription>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-amber-600 bg-clip-text text-transparent">
                                56-210 ₾
                              </div>
                              <div className="text-xs text-muted-foreground">
                                per bottle
                              </div>
                            </div>
                          </div>

                          {/* Cost Calculation */}
                          <Alert className="bg-gradient-to-r from-primary/5 to-amber-500/5 border-primary/20">
                            <Calculator className="h-4 w-4" />
                            <AlertDescription>
                              <div className="flex items-baseline gap-2">
                                <strong>Total Cost:</strong>
                                <span className="text-lg font-bold">
                                  {bothCost.minTotal.toLocaleString()} - {bothCost.maxTotal.toLocaleString()} ₾
                                </span>
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Average: {bothCost.avgTotal.toLocaleString()} ₾ ({quantity.toLocaleString()} bottles × 108 ₾)
                              </div>
                            </AlertDescription>
                          </Alert>

                          {/* Benefits */}
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary" />
                              <span>All QR benefits + NFC security</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Shield className="h-4 w-4 text-amber-600" />
                              <span>Redundant protection system</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-amber-500" />
                              <span>Best for premium/luxury products</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-amber-500" />
                              <span>Ideal for export markets</span>
                            </div>
                          </div>
                        </div>
                      </FormItem>
                    </Card>

                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Smart Recommendation */}
          <Alert className="bg-blue-500/5 border-blue-500/20 mt-4">
            <Lightbulb className="h-4 w-4 text-blue-500" />
            <AlertTitle className="text-blue-600">💡 Recommendation</AlertTitle>
            <AlertDescription>
              {quantity < 1000 && (
                <p>For small batches, <strong>NFC tags</strong> provide excellent ROI despite higher per-unit cost.</p>
              )}
              {quantity >= 1000 && quantity < 10000 && (
                <p>For medium batches, <strong>QR codes</strong> offer the best balance of cost and security.</p>
              )}
              {quantity >= 10000 && (
                <p>For high-volume production, <strong>QR codes</strong> are most cost-effective. Consider NFC for premium sub-lines.</p>
              )}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Company History */}
      <FormField
        control={form.control}
        name="companyHistory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company History</FormLabel>
            <FormDescription>
              Tell the story of your company's heritage and traditions
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="Founded in 1895, our family winery has been producing authentic Georgian wines using traditional qvevri methods..."
                className="min-h-[120px] resize-none"
                {...field}
              />
            </FormControl>
            <div className="flex justify-between items-center">
              <FormDescription className="text-xs">
                {companyHistory.length}/500 characters
              </FormDescription>
              {companyHistory.length > 500 && (
                <span className="text-xs text-destructive">
                  Exceeds maximum length
                </span>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Product Story */}
      <FormField
        control={form.control}
        name="productStory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Story *</FormLabel>
            <FormDescription>
              Share what makes this product unique and special
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="This vintage Saperavi is aged in oak barrels for 18 months, resulting in..."
                className="min-h-[120px] resize-none"
                {...field}
              />
            </FormControl>
            <div className="flex justify-between items-center">
              <FormDescription className="text-xs">
                {productStory.length}/500 characters
              </FormDescription>
              {productStory.length > 500 && (
                <span className="text-xs text-destructive">
                  Exceeds maximum length
                </span>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Traditional Methods */}
      <FormField
        control={form.control}
        name="traditionalMethods"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Traditional Production Methods</FormLabel>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={useTemplate}
                className="h-8"
              >
                <FileText className="mr-2 h-4 w-4" />
                Use Template
              </Button>
            </div>
            <FormDescription>
              Describe the authentic and traditional methods used
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="We use traditional qvevri clay vessels buried underground for natural fermentation..."
                className="min-h-[120px] resize-none"
                {...field}
              />
            </FormControl>
            <div className="flex justify-between items-center">
              <FormDescription className="text-xs">
                {traditionalMethods.length}/500 characters
              </FormDescription>
              {traditionalMethods.length > 500 && (
                <span className="text-xs text-destructive">
                  Exceeds maximum length
                </span>
              )}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Awards Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <FormLabel>Awards & Recognition</FormLabel>
            <FormDescription>
              Add any awards or recognitions this product has received
            </FormDescription>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addAward}>
            <Plus className="mr-2 h-4 w-4" />
            Add Award
          </Button>
        </div>

        {awards.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed rounded-lg border-border">
            <p className="text-sm text-muted-foreground mb-3">
              No awards added yet
            </p>
            <Button type="button" variant="outline" size="sm" onClick={addAward}>
              <Plus className="mr-2 h-4 w-4" />
              Add First Award
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {awards.map((award: any, index: number) => (
              <Card key={index} className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6">
                    <FormField
                      control={form.control}
                      name={`awards.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Award Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Gold Medal at Wine Expo"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name={`awards.${index}.year`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Year</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1900}
                              max={new Date().getFullYear()}
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <FormField
                      control={form.control}
                      name={`awards.${index}.medalType`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm">Medal Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {MEDAL_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type.charAt(0).toUpperCase() + type.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-1 flex items-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAward(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
