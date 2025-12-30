import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Package, CalendarIcon, Wine } from 'lucide-react';
import { mockProducts, mockBrands } from '@/lib/mockCatalogData';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CostCalculatorSidebar } from '@/components/batches/CostCalculatorSidebar';

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 25 }, (_, i) => currentYear - i);
const QUALITY_GRADES = [
  { value: 'standard', label: 'Standard' },
  { value: 'reserve', label: 'Reserve' },
  { value: 'premium', label: 'Premium' },
  { value: 'grand-reserve', label: 'Grand Reserve' },
];

export default function SimplifiedCreateBatchPage() {
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState('');

  const form = useForm({
    defaultValues: {
      productId: '',
      vintageYear: '',
      numberOfUnits: 0,
      productionDate: undefined as Date | undefined,
      bottlingDate: undefined as Date | undefined,
      fermentationDuration: undefined as number | undefined,
      fermentationUnit: 'months',
      traditionalMethod: false,
      organicCertification: false,
      qualityGrade: 'standard',
      batchNotes: '',
    },
  });

  const selectedProduct = mockProducts.find(p => p.id === selectedProductId);
  const selectedBrand = selectedProduct ? mockBrands.find(b => b.id === selectedProduct.brandId) : null;
  const quantity = form.watch('numberOfUnits') || 0;

  const onSubmit = async (data: any) => {
    if (!data.productId) {
      toast({ title: 'Error', description: 'Please select a product', variant: 'destructive' });
      return;
    }
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const batchId = `BATCH-${Date.now().toString(36).toUpperCase()}`;
    toast({
      title: 'Batch Created',
      description: `Batch ${batchId} created with ${data.numberOfUnits} units.`,
    });
    
    navigate('/dashboard/batches');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => navigate('/dashboard/batches')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Batches
            </Button>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Create New Batch</CardTitle>
                    <CardDescription>
                      Select a product and enter batch-specific details
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Product Selection */}
                    <FormField
                      control={form.control}
                      name="productId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Product *</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedProductId(value);
                            }} 
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a product" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockProducts.map((product) => {
                                const brand = mockBrands.find(b => b.id === product.brandId);
                                return (
                                  <SelectItem key={product.id} value={product.id}>
                                    <div className="flex items-center gap-2">
                                      <Wine className="h-4 w-4" />
                                      {product.name}
                                      <span className="text-muted-foreground">({brand?.name})</span>
                                    </div>
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Product Preview */}
                    {selectedProduct && (
                      <div className="p-4 bg-muted rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{selectedProduct.name}</span>
                          <Badge>{selectedProduct.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{selectedBrand?.name}</p>
                        <p className="text-sm line-clamp-2">{selectedProduct.description}</p>
                      </div>
                    )}

                    {/* Batch Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="numberOfUnits"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Units *</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={100}
                                placeholder="Min 100"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="productionDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Production Date *</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                  >
                                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bottlingDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Bottling Date *</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                  >
                                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Quality & Certifications */}
                    <FormField
                      control={form.control}
                      name="qualityGrade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Quality Grade</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {QUALITY_GRADES.map((grade) => (
                                <SelectItem key={grade.value} value={grade.value}>{grade.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-wrap gap-6">
                      <FormField
                        control={form.control}
                        name="traditionalMethod"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-3">
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="!mt-0">Traditional Method</FormLabel>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="organicCertification"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-3">
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormLabel className="!mt-0">Organic Certified</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="batchNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Batch Notes</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Any special notes for this batch..." rows={3} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button type="button" variant="outline" onClick={() => navigate('/dashboard/batches')}>
                        Cancel
                      </Button>
                      <Button type="submit">Create Batch</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="hidden lg:block">
            <CostCalculatorSidebar quantity={quantity} />
          </div>
        </div>
      </div>
    </div>
  );
}
