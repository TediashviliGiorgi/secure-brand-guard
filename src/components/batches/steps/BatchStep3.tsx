import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Sparkles, AlertCircle, Shield } from 'lucide-react';
import { CompleteBatch } from '@/lib/batchValidators';

interface BatchStep3Props {
  form: UseFormReturn<any>;
}

export const BatchStep3 = ({ form }: BatchStep3Props) => {
  const description = form.watch('description') || '';
  const characteristics = form.watch('characteristics') || '';
  const servingRecommendation = form.watch('servingRecommendation') || '';

  return (
    <div className="space-y-6">
      {/* Product Description Fields - Always Show */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center justify-between">
              <FormLabel>Description *</FormLabel>
              <Button type="button" variant="outline" size="sm" disabled>
                <Sparkles className="mr-2 h-4 w-4" />
                AI Assistance
              </Button>
            </div>
            <FormControl>
              <Textarea
                placeholder="Describe your product..."
                className="min-h-[120px] resize-none"
                maxLength={500}
                {...field}
              />
            </FormControl>
            <FormDescription className="flex justify-between">
              <span>Tell the story of this product</span>
              <span className="text-muted-foreground">
                {description.length}/500
              </span>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="characteristics"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Characteristics *</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Aroma, taste, texture..."
                className="min-h-[120px] resize-none"
                maxLength={500}
                {...field}
              />
            </FormControl>
            <FormDescription className="flex justify-between">
              <span>Describe sensory characteristics</span>
              <span className="text-muted-foreground">
                {characteristics.length}/500
              </span>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="servingRecommendation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Serving Recommendation</FormLabel>
            <FormControl>
              <Textarea
                placeholder="How to best serve this product..."
                className="min-h-[80px] resize-none"
                maxLength={300}
                {...field}
              />
            </FormControl>
            <FormDescription className="flex justify-between">
              <span>Temperature, glassware, serving suggestions</span>
              <span className="text-muted-foreground">
                {servingRecommendation.length}/300
              </span>
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <FormLabel>Aging Potential (Years)</FormLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="agingPotentialMin"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-muted-foreground">Minimum</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={50}
                    step={1}
                    value={[field.value || 0]}
                    onValueChange={(value) => field.onChange(value[0])}
                    className="py-4"
                  />
                </FormControl>
                <div className="text-center">
                  <span className="text-2xl font-bold text-primary">
                    {field.value || 0}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">years</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agingPotentialMax"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm text-muted-foreground">Maximum</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={50}
                    step={1}
                    value={[field.value || 0]}
                    onValueChange={(value) => field.onChange(value[0])}
                    className="py-4"
                  />
                </FormControl>
                <div className="text-center">
                  <span className="text-2xl font-bold text-primary">
                    {field.value || 0}
                  </span>
                  <span className="text-sm text-muted-foreground ml-1">years</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};
