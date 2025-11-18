import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Plus, X, FileText, QrCode, Nfc, Shield } from 'lucide-react';

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

  return (
    <div className="space-y-6">
      {/* Protection Method Selection */}
      <FormField
        control={form.control}
        name="protectionMethod"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Protection Method *</FormLabel>
            <FormDescription>
              Choose how you want to protect your products
            </FormDescription>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value || 'qr'}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <Card className={`relative cursor-pointer p-4 hover:border-primary transition-colors ${field.value === 'qr' ? 'border-primary bg-primary/5' : ''}`}>
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="qr" />
                    </FormControl>
                    <div className="space-y-1 leading-none flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <QrCode className="h-5 w-5 text-primary" />
                        <FormLabel className="font-semibold cursor-pointer">
                          QR Code Only
                        </FormLabel>
                      </div>
                      <FormDescription className="text-xs">
                        Traditional QR code scanning. Perfect for most products.
                      </FormDescription>
                    </div>
                  </FormItem>
                </Card>

                <Card className={`relative cursor-pointer p-4 hover:border-primary transition-colors ${field.value === 'nfc' ? 'border-primary bg-primary/5' : ''}`}>
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="nfc" />
                    </FormControl>
                    <div className="space-y-1 leading-none flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Nfc className="h-5 w-5 text-primary" />
                        <FormLabel className="font-semibold cursor-pointer">
                          NFC Tag Only
                        </FormLabel>
                      </div>
                      <FormDescription className="text-xs">
                        Near Field Communication tags. Premium authentication experience.
                      </FormDescription>
                    </div>
                  </FormItem>
                </Card>

                <Card className={`relative cursor-pointer p-4 hover:border-primary transition-colors ${field.value === 'both' ? 'border-primary bg-primary/5' : ''}`}>
                  <FormItem className="flex items-start space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="both" />
                    </FormControl>
                    <div className="space-y-1 leading-none flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-5 w-5 text-primary" />
                        <FormLabel className="font-semibold cursor-pointer">
                          QR + NFC
                        </FormLabel>
                      </div>
                      <FormDescription className="text-xs">
                        Maximum security with both QR codes and NFC tags.
                      </FormDescription>
                    </div>
                  </FormItem>
                </Card>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="companyHistory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company History *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell the story of your company..."
                className="min-h-[150px] resize-none"
                maxLength={1000}
                {...field}
              />
            </FormControl>
            <FormDescription className="flex justify-between">
              <span>Share your company's heritage and values</span>
              <span className="text-muted-foreground">{companyHistory.length}/1000</span>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="productStory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>This Product's Story *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="What makes this product special..."
                className="min-h-[150px] resize-none"
                maxLength={1000}
                {...field}
              />
            </FormControl>
            <FormDescription className="flex justify-between">
              <span>Share what makes this product unique</span>
              <span className="text-muted-foreground">{productStory.length}/1000</span>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="traditionalMethods"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Traditional Methods</FormLabel>
              <Button type="button" variant="outline" size="sm" onClick={useTemplate}>
                <FileText className="mr-2 h-4 w-4" />
                Use Template
              </Button>
            </div>
            <FormControl>
              <Textarea
                placeholder="Describe traditional production methods..."
                className="min-h-[100px] resize-none"
                maxLength={500}
                {...field}
              />
            </FormControl>
            <FormDescription className="flex justify-between">
              <span>Optional: Traditional techniques used</span>
              <span className="text-muted-foreground">{traditionalMethods.length}/500</span>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <FormLabel>Awards & Recognition</FormLabel>
          <Button type="button" variant="outline" size="sm" onClick={addAward}>
            <Plus className="mr-2 h-4 w-4" />
            Add Award
          </Button>
        </div>

        {awards.length > 0 ? (
          <div className="space-y-4">
            {awards.map((award: any, index: number) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">Award {index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAward(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`awards.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Award Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Gold Medal" {...field} />
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
                </div>

                <FormField
                  control={form.control}
                  name={`awards.${index}.medalType`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medal Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed rounded-lg">
            <p className="text-sm text-muted-foreground">
              No awards added yet. Click "Add Award" to include recognition.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
