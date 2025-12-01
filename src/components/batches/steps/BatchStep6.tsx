import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Check, Shield, QrCode, Eye, EyeOff, Plus, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BatchStep6Props {
  form: UseFormReturn<any>;
}

const MEDAL_TYPES = ['gold', 'silver', 'bronze', 'other'];

export const BatchStep6 = ({ form }: BatchStep6Props) => {
  const companyHistory = form.watch('companyHistory') || '';
  const productStory = form.watch('productStory') || '';
  const traditionalMethods = form.watch('traditionalMethods') || '';
  const awards = form.watch('awards') || [];

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

  // Set default protection method to 'qr' (Dual QR)
  if (!form.watch('protectionMethod')) {
    form.setValue('protectionMethod', 'qr');
  }

  return (
    <div className="space-y-6">
      {/* Dual QR System Explanation */}
      <Card className="border-2 border-primary bg-primary/5">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2 text-xl mb-2">
                <Shield className="h-6 w-6 text-primary" />
                Dual QR Authentication System
              </CardTitle>
              <CardDescription className="text-base">
                AuthIt uses a comprehensive dual QR code system for complete brand protection
              </CardDescription>
            </div>
            <Badge className="bg-primary">
              Standard
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Two QR Codes Explanation */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Visible QR - Marketing */}
            <Card className="bg-background">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-base">QR Code #1: Visible</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Placed on the main bottle label for consumer engagement
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Unlimited scans</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Product story & information</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Marketing & engagement</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>AI sommelier assistant</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hidden QR - Security */}
            <Card className="bg-background border-amber-500/30">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <EyeOff className="h-5 w-5 text-amber-600" />
                  <CardTitle className="text-base">QR Code #2: Hidden</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Placed under the cork for authenticity verification
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>One-time verification only</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Authenticity confirmation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Tamper detection</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Counterfeit prevention</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Display */}
          <Alert className="bg-background border-primary/30">
            <QrCode className="h-5 w-5 text-primary" />
            <AlertTitle className="text-base mb-2">Pricing: 30-40 ₾ per bottle</AlertTitle>
            <AlertDescription className="text-sm">
              <p className="mb-2">
                Includes both QR codes (visible + hidden), unlimited scans on marketing QR, 
                one-time verification on security QR, and full analytics dashboard.
              </p>
              <p className="text-muted-foreground">
                Average cost: ~35 ₾ per bottle for complete dual QR protection
              </p>
            </AlertDescription>
          </Alert>

          {/* Benefits Summary */}
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>100% smartphone compatible</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Immediate deployment (1 day)</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>No special hardware required</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <span>Print on standard label paper</span>
            </div>
          </div>
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
            <FormDescription className="flex justify-between">
              <span>Share your company's journey</span>
              <span className="text-muted-foreground">{companyHistory.length}/1000</span>
            </FormDescription>
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
            <FormLabel>Product Story</FormLabel>
            <FormDescription>
              Tell the unique story behind this specific product
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="This vintage comes from our oldest vineyard, planted in 1920..."
                className="min-h-[120px] resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription className="flex justify-between">
              <span>What makes this product special?</span>
              <span className="text-muted-foreground">{productStory.length}/1000</span>
            </FormDescription>
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
              <FormLabel>Traditional Methods</FormLabel>
              <Button type="button" variant="outline" size="sm" onClick={useTemplate}>
                Use Template
              </Button>
            </div>
            <FormDescription>
              Describe traditional production methods used
            </FormDescription>
            <FormControl>
              <Textarea
                placeholder="Our products are crafted using time-honored traditional methods..."
                className="min-h-[100px] resize-none"
                {...field}
              />
            </FormControl>
            <FormDescription className="flex justify-between">
              <span>Optional: Highlight traditional craftsmanship</span>
              <span className="text-muted-foreground">{traditionalMethods.length}/500</span>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Awards Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <FormLabel>Awards & Recognition</FormLabel>
            <FormDescription>Add any awards or medals this product has received</FormDescription>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addAward}>
            <Plus className="mr-2 h-4 w-4" />
            Add Award
          </Button>
        </div>

        {awards.length > 0 && (
          <div className="space-y-3">
            {awards.map((award: any, index: number) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`awards.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Award Name</FormLabel>
                            <FormControl>
                              <Input placeholder="International Wine Challenge" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`awards.${index}.year`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="1900"
                                max={new Date().getFullYear()}
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`awards.${index}.medalType`}
                        render={({ field }) => (
                          <FormItem className="md:col-span-3">
                            <FormLabel>Medal Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select medal type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="gold">🥇 Gold</SelectItem>
                                <SelectItem value="silver">🥈 Silver</SelectItem>
                                <SelectItem value="bronze">🥉 Bronze</SelectItem>
                                <SelectItem value="other">🏆 Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAward(index)}
                      className="flex-shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
