import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, Edit } from 'lucide-react';
import { useState } from 'react';
import type { CompleteBatch } from '@/lib/batchValidators';

interface BatchStep7Props {
  form: UseFormReturn<any>;
  formData: Partial<CompleteBatch>;
}

export const BatchStep7 = ({ form, formData }: BatchStep7Props) => {
  const [openSections, setOpenSections] = useState<string[]>(['basic', 'contact']);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Review Your Batch</h3>
        <p className="text-sm text-muted-foreground">
          Review all information before creating the batch. Click "Edit" to jump back to any section.
        </p>
      </div>

      {/* Basic Information */}
      <Collapsible open={openSections.includes('basic')}>
        <div className="border rounded-lg">
          <CollapsibleTrigger
            onClick={() => toggleSection('basic')}
            className="flex items-center justify-between w-full p-4 hover:bg-muted/50"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">✓ Basic Information</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Product Name:</span>
                <p className="font-medium">{formData.productName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Vintage Year:</span>
                <p className="font-medium">{formData.vintageYear}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Category:</span>
                <p className="font-medium">{formData.category}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Number of Units:</span>
                <p className="font-medium">{formData.numberOfUnits}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Region:</span>
                <p className="font-medium">{formData.region}</p>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Production Details */}
      <Collapsible open={openSections.includes('production')}>
        <div className="border rounded-lg">
          <CollapsibleTrigger
            onClick={() => toggleSection('production')}
            className="flex items-center justify-between w-full p-4 hover:bg-muted/50"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">✓ Production Details</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Production Date:</span>
                <p className="font-medium">
                  {formData.productionDate ? new Date(formData.productionDate).toLocaleDateString() : '-'}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground">Bottling Date:</span>
                <p className="font-medium">
                  {formData.bottlingDate ? new Date(formData.bottlingDate).toLocaleDateString() : '-'}
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Characteristics */}
      <Collapsible open={openSections.includes('characteristics')}>
        <div className="border rounded-lg">
          <CollapsibleTrigger
            onClick={() => toggleSection('characteristics')}
            className="flex items-center justify-between w-full p-4 hover:bg-muted/50"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">✓ Product Characteristics</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 space-y-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Description:</span>
              <p className="font-medium">
                {formData.description ? String(formData.description).substring(0, 100) + '...' : '-'}
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Brand Story */}
      <Collapsible open={openSections.includes('story')}>
        <div className="border rounded-lg">
          <CollapsibleTrigger
            onClick={() => toggleSection('story')}
            className="flex items-center justify-between w-full p-4 hover:bg-muted/50"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">✓ Brand Story</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 space-y-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Awards:</span>
              <p className="font-medium">
                {Array.isArray(formData.awards) ? formData.awards.length : 0} award(s) added
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Contact Details */}
      <Collapsible open={openSections.includes('contact')}>
        <div className="border rounded-lg">
          <CollapsibleTrigger
            onClick={() => toggleSection('contact')}
            className="flex items-center justify-between w-full p-4 hover:bg-muted/50"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">Contact Details</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 pt-0 space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              These details will be shown on the product landing page.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+995 555 123 456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="contact@company.ge" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourcompany.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Company address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="socialMedia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social Media</FormLabel>
                  <FormControl>
                    <Input placeholder="Facebook, Instagram handles..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};
