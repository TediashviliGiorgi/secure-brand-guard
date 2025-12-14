import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CountryRegionSelect } from '@/components/ui/country-region-select';
import { Country, COUNTRIES } from '@/lib/countries';

const CATEGORIES = ['Wine', 'Spirits', 'Cheese', 'Olive Oil', 'Honey', 'Other'];
const GRAPE_VARIETIES = [
  'Saperavi',
  'Rkatsiteli',
  'Kisi',
  'Mtsvane',
  'Khikhvi',
  'Chinuri',
  'Tavkveri',
  'Other',
];
const DOC_STATUSES = ['DOC', 'PDO', 'PGI', 'None'];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 25 }, (_, i) => currentYear - i);

interface Step1Props {
  form: UseFormReturn<any>;
}

export const BatchStep1 = ({ form }: Step1Props) => {
  const selectedCategory = form.watch('category');
  const [selectedCountryCode, setSelectedCountryCode] = useState(form.watch('country') || 'GE');

  const handleCountryChange = (country: Country) => {
    setSelectedCountryCode(country.code);
    form.setValue('country', country.code);
    form.setValue('region', ''); // Reset region when country changes
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="productName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Product Name *</FormLabel>
            <FormControl>
              <Input placeholder="Enter product name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="vintageYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vintage Year *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {YEARS.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {selectedCategory === 'Wine' && (
        <FormField
          control={form.control}
          name="grapeVariety"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grape Variety</FormLabel>
              <Select onValueChange={(value) => field.onChange([value])} value={field.value?.[0]}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grape variety" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {GRAPE_VARIETIES.map((variety) => (
                    <SelectItem key={variety} value={variety}>
                      {variety}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="numberOfUnits"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Units *</FormLabel>
            <FormControl>
              <Input
                type="number"
                min="100"
                placeholder="Minimum 100"
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="region"
        render={({ field }) => (
          <FormItem>
            <CountryRegionSelect
              countryCode={selectedCountryCode}
              region={field.value || ''}
              onCountryChange={handleCountryChange}
              onRegionChange={field.onChange}
              countryLabel="Country *"
              regionLabel="Region *"
              countryPlaceholder="Select country"
              regionPlaceholder="Select region"
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="docStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>DOC/PDO/PGI Status</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select status (optional)" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {DOC_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
