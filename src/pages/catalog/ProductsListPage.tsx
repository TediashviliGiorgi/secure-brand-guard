import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Wine, 
  Package,
  MoreHorizontal,
  Edit,
  Trash2,
  Award,
  Star
} from 'lucide-react';
import { mockProducts, mockBrands, mockSimplifiedBatches } from '@/lib/mockCatalogData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

export default function ProductsListPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === 'all' || product.brandId === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  const getBrandName = (brandId: string) => 
    mockBrands.find(b => b.id === brandId)?.name || 'Unknown Brand';

  const getBatchCount = (productId: string) => 
    mockSimplifiedBatches.filter(b => b.productId === productId).length;

  const handleDelete = () => {
    toast({
      title: 'Product Deleted',
      description: 'The product has been removed successfully.',
    });
    setDeleteDialogOpen(false);
    setSelectedProductId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground mt-1">
              Manage your product catalog with all specifications
            </p>
          </div>
          <Button onClick={() => navigate('/dashboard/catalog/products/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {mockBrands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Wine className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchQuery || selectedBrand !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Get started by creating your first product'}
              </p>
              {!searchQuery && selectedBrand === 'all' && (
                <Button onClick={() => navigate('/dashboard/catalog/products/new')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Product
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="hover:shadow-lg transition-shadow cursor-pointer group overflow-hidden"
                onClick={() => navigate(`/dashboard/catalog/products/${product.id}`)}
              >
                {/* Product Image */}
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <img 
                    src={product.mainPhoto || '/placeholder.svg'} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.docStatus && product.docStatus !== 'None' && (
                    <Badge className="absolute top-3 left-3 bg-primary/90">
                      {product.docStatus}
                    </Badge>
                  )}
                  {product.awards && product.awards.length > 0 && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-500/90 text-white px-2 py-1 rounded-md text-xs">
                      <Award className="h-3 w-3" />
                      {product.awards.length}
                    </div>
                  )}
                </div>

                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardDescription className="text-xs">
                        {getBrandName(product.brandId)}
                      </CardDescription>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {product.name}
                      </CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/dashboard/catalog/products/${product.id}/edit`);
                        }}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProductId(product.id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline">{product.category}</Badge>
                    {product.grapeVariety?.map((grape) => (
                      <Badge key={grape} variant="secondary" className="text-xs">
                        {grape}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <Badge variant="secondary" className="gap-1">
                      <Package className="h-3 w-3" />
                      {getBatchCount(product.id)} Batches
                    </Badge>
                    {product.agingPotentialMax && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {product.agingPotentialMin}-{product.agingPotentialMax}y aging
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the product and all associated batches.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
