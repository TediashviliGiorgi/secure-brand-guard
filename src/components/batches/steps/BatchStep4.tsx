import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const FOOD_PAIRINGS = [
  { category: 'Meat', items: ['Beef', 'Lamb', 'Pork', 'Poultry', 'Game'] },
  { category: 'Seafood', items: ['Fish', 'Shellfish', 'Smoked Fish'] },
  { category: 'Cheese', items: ['Soft Cheese', 'Hard Cheese', 'Blue Cheese', 'Goat Cheese'] },
  { category: 'Vegetables', items: ['Grilled Vegetables', 'Roasted Vegetables', 'Salads'] },
  { category: 'Pasta & Grains', items: ['Pasta', 'Risotto', 'Bread'] },
  { category: 'Desserts', items: ['Chocolate', 'Fruit Desserts', 'Pastries'] },
];

interface BatchStep4Props {
  form: UseFormReturn<any>;
}

export const BatchStep4 = ({ form }: BatchStep4Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const selectedPairings = form.watch('foodPairings') || [];

  const filteredPairings = FOOD_PAIRINGS.map((category) => ({
    ...category,
    items: category.items.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((category) => category.items.length > 0);

  return (
    <div className="space-y-6">
      <div>
        <FormLabel>Food Pairings</FormLabel>
        <FormDescription>Select foods that pair well with this product</FormDescription>
        
        <Input
          placeholder="Search food pairings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-3 mb-4"
        />

        <FormField
          control={form.control}
          name="foodPairings"
          render={() => (
            <FormItem>
              <div className="space-y-4 max-h-[400px] overflow-y-auto border rounded-md p-4">
                {filteredPairings.map((category) => (
                  <div key={category.category}>
                    <h4 className="font-medium text-sm mb-2">{category.category}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-4">
                      {category.items.map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="foodPairings"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    const current = field.value || [];
                                    const updated = checked
                                      ? [...current, item]
                                      : current.filter((val: string) => val !== item);
                                    field.onChange(updated);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal cursor-pointer">
                                {item}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {selectedPairings.length > 0 && (
                <FormDescription>
                  {selectedPairings.length} pairing{selectedPairings.length !== 1 ? 's' : ''} selected
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="notRecommendedWith"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Not Recommended With</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Foods or beverages that don't pair well..."
                className="min-h-[80px] resize-none"
                maxLength={200}
                {...field}
              />
            </FormControl>
            <FormDescription>
              Optional: List any foods to avoid pairing with this product
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
