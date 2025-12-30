import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Wine, 
  FileText, 
  UtensilsCrossed, 
  Image as ImageIcon, 
  Award,
  QrCode,
  X,
  Plus
} from 'lucide-react';
import { createProductSchema, type CreateProduct } from '@/types/catalog';
import { mockBrands } from '@/lib/mockCatalogData';
import { toast } from '@/hooks/use-toast';

const CATEGORIES = ['Wine', 'Spirits', 'Cheese', 'Olive Oil', 'Honey', 'Other'];
const GRAPE_VARIETIES = ['Saperavi', 'Rkatsiteli', 'Kisi', 'Mtsvane', 'Khikhvi', 'Chinuri', 'Tavkveri', 'Other'];
const DOC_STATUSES = ['DOC', 'PDO', 'PGI', 'None'];
const FOOD_PAIRINGS = ['Grilled meat', 'Roasted poultry', 'Seafood', 'Aged cheeses', 'Soft cheeses', 'Dark chocolate', 'Spiced dishes', 'Light salads', 'Pasta', 'Desserts'];

export default function CreateProductPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic');
  const [selectedPairings, setSelectedPairings] = useState<string[]>([]);
  const [awards, setAwards] = useState<Array<{ name: string; year: number; medalType: 'gold' | 'silver' | 'bronze' | 'other' }>>([]);

  const form = useForm<CreateProduct>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      brandId: '',
      name: '',
      category: '',
      grapeVariety: [],
      docStatus: '',
      description: '',
      characteristics: '',
      servingRecommendation: '',
      foodPairings: [],
      notRecommendedWith: '',
      productStory: '',
      traditionalMethods: '',
      qrCodeSize: 'medium',
      qrCodeStyle: 'standard',
    },
  });

  const selectedCategory = form.watch('category');

  const togglePairing = (pairing: string) => {
    const updated = selectedPairings.includes(pairing)
      ? selectedPairings.filter(p => p !== pairing)
      : [...selectedPairings, pairing];
    setSelectedPairings(updated);
    form.setValue('foodPairings', updated);
  };

  const addAward = () => {
    const newAward = { name: '', year: new Date().getFullYear(), medalType: 'gold' as const };
    const updated = [...awards, newAward];
    setAwards(updated);
    form.setValue('awards', updated);
  };

  const removeAward = (index: number) => {
    const updated = awards.filter((_, i) => i !== index);
    setAwards(updated);
    form.setValue('awards', updated);
  };

  const updateAward = (index: number, field: string, value: any) => {
    const updated = awards.map((award, i) => 
      i === index ? { ...award, [field]: value } : award
    );
    setAwards(updated);
    form.setValue('awards', updated);
  };

  const onSubmit = async (data: CreateProduct) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    toast({
      title: 'Product Created',
      description: `${data.name} has been created successfully.`,
    });
    
    navigate('/dashboard/catalog/products');
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Wine },
    { id: 'characteristics', label: 'Characteristics', icon: FileText },
    { id: 'pairings', label: 'Pairings', icon: UtensilsCrossed },
    { id: 'media', label: 'Media', icon: ImageIcon },
    { id: 'story', label: 'Story & Awards', icon: Award },
    { id: 'qr', label: 'QR Settings', icon: QrCode },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard/catalog/products')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wine className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Create New Product</CardTitle>
                <CardDescription>
                  Define all product specifications. Batches will inherit this information.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                    {tabs.map(tab => (
                      <TabsTrigger key={tab.id} value={tab.id} className="gap-1.5 text-xs sm:text-sm">
                        <tab.icon className="h-4 w-4 hidden sm:block" />
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {/* Basic Info Tab */}
                  <TabsContent value="basic" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="brandId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select brand" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mockBrands.map((brand) => (
                                <SelectItem key={brand.id} value={brand.id}>
                                  {brand.name}
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
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Saperavi Reserve" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
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
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {DOC_STATUSES.map((status) => (
                                  <SelectItem key={status} value={status}>{status}</SelectItem>
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
                            <Select 
                              onValueChange={(value) => field.onChange([value])} 
                              value={field.value?.[0]}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select grape variety" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {GRAPE_VARIETIES.map((variety) => (
                                  <SelectItem key={variety} value={variety}>{variety}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </TabsContent>

                  {/* Characteristics Tab */}
                  <TabsContent value="characteristics" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe your product..."
                              className="resize-none"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>10-500 characters</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="characteristics"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tasting Notes / Characteristics *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Color, aroma, taste profile..."
                              className="resize-none"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
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
                            <Input placeholder="e.g., Serve at 16-18°C" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="agingPotentialMin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Min Aging (years)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min={0}
                                placeholder="e.g., 3"
                                {...field}
                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="agingPotentialMax"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Aging (years)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                min={0}
                                placeholder="e.g., 15"
                                {...field}
                                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>

                  {/* Pairings Tab */}
                  <TabsContent value="pairings" className="space-y-4">
                    <div>
                      <FormLabel className="mb-3 block">Food Pairings</FormLabel>
                      <div className="flex flex-wrap gap-2">
                        {FOOD_PAIRINGS.map((pairing) => (
                          <Badge
                            key={pairing}
                            variant={selectedPairings.includes(pairing) ? 'default' : 'outline'}
                            className="cursor-pointer transition-colors"
                            onClick={() => togglePairing(pairing)}
                          >
                            {pairing}
                            {selectedPairings.includes(pairing) && (
                              <X className="h-3 w-3 ml-1" />
                            )}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="notRecommendedWith"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Not Recommended With</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Delicate fish, light salads" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  {/* Media Tab */}
                  <TabsContent value="media" className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-2">Upload Product Photos</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop or click to upload
                      </p>
                      <Button variant="outline" type="button">Choose Files</Button>
                    </div>

                    <FormField
                      control={form.control}
                      name="videoUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://youtube.com/..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  {/* Story & Awards Tab */}
                  <TabsContent value="story" className="space-y-4">
                    <FormField
                      control={form.control}
                      name="productStory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Story</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell the story behind this product..."
                              className="resize-none"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="traditionalMethods"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Traditional Methods</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe any traditional production methods..."
                              className="resize-none"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <FormLabel>Awards</FormLabel>
                        <Button type="button" variant="outline" size="sm" onClick={addAward}>
                          <Plus className="h-4 w-4 mr-1" />
                          Add Award
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {awards.map((award, index) => (
                          <div key={index} className="flex gap-2 items-start p-3 border rounded-lg">
                            <Input
                              placeholder="Award name"
                              value={award.name}
                              onChange={(e) => updateAward(index, 'name', e.target.value)}
                              className="flex-1"
                            />
                            <Input
                              type="number"
                              placeholder="Year"
                              value={award.year}
                              onChange={(e) => updateAward(index, 'year', parseInt(e.target.value))}
                              className="w-24"
                            />
                            <Select
                              value={award.medalType}
                              onValueChange={(value) => updateAward(index, 'medalType', value)}
                            >
                              <SelectTrigger className="w-28">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gold">Gold</SelectItem>
                                <SelectItem value="silver">Silver</SelectItem>
                                <SelectItem value="bronze">Bronze</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeAward(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* QR Settings Tab */}
                  <TabsContent value="qr" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="qrCodeSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>QR Code Size</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="small">Small (2cm)</SelectItem>
                                <SelectItem value="medium">Medium (3cm)</SelectItem>
                                <SelectItem value="large">Large (4cm)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="qrCodeStyle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>QR Code Style</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="branded">Branded (with logo)</SelectItem>
                                <SelectItem value="artistic">Artistic</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="p-6 bg-muted rounded-lg text-center">
                      <QrCode className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">
                        QR code preview will appear here based on your settings
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t">
                  <div className="text-sm text-muted-foreground">
                    {activeTab !== 'basic' && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          const currentIndex = tabs.findIndex(t => t.id === activeTab);
                          if (currentIndex > 0) {
                            setActiveTab(tabs[currentIndex - 1].id);
                          }
                        }}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/dashboard/catalog/products')}
                    >
                      Cancel
                    </Button>
                    {activeTab !== 'qr' ? (
                      <Button
                        type="button"
                        onClick={() => {
                          const currentIndex = tabs.findIndex(t => t.id === activeTab);
                          if (currentIndex < tabs.length - 1) {
                            setActiveTab(tabs[currentIndex + 1].id);
                          }
                        }}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button type="submit">
                        Create Product
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
