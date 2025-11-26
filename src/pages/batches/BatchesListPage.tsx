import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Package, Plus, Search, TrendingUp, Shield, ArrowLeft,
  Eye, AlertTriangle, QrCode, Radio
} from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';

interface BatchItem {
  id: string;
  product: string;
  image: string;
  batchNumber: string;
  status: 'active' | 'draft' | 'archived';
  bottles: number;
  qr1Scans: number;
  qr2Verified: number;
  conversionRate: number;
  activeAlerts: number;
  protectionMethod: 'qr' | 'nfc' | 'both';
}

// Mock data
const mockBatches: BatchItem[] = [
  {
    id: 'AUTH-2024-001',
    product: 'Saperavi Reserve 2021',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=100',
    batchNumber: 'AUTH-2024-001',
    status: 'active',
    bottles: 5000,
    qr1Scans: 12847,
    qr2Verified: 3421,
    conversionRate: 26.6,
    activeAlerts: 3,
    protectionMethod: 'qr',
  },
  {
    id: 'AUTH-2024-002',
    product: 'Rkatsiteli Qvevri 2022',
    image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=100',
    batchNumber: 'AUTH-2024-002',
    status: 'active',
    bottles: 3000,
    qr1Scans: 8456,
    qr2Verified: 2134,
    conversionRate: 25.2,
    activeAlerts: 1,
    protectionMethod: 'nfc',
  },
  {
    id: 'AUTH-2023-045',
    product: 'Mukuzani Classic 2020',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=100',
    batchNumber: 'AUTH-2023-045',
    status: 'active',
    bottles: 8000,
    qr1Scans: 24123,
    qr2Verified: 7234,
    conversionRate: 30.0,
    activeAlerts: 0,
    protectionMethod: 'both',
  },
];

export default function BatchesListPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get technology filter from URL
  const technologyFilter = searchParams.get('technology') as 'qr' | 'nfc' | null;

  const filteredBatches = mockBatches.filter(batch => {
    const matchesSearch = 
      batch.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.batchNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by technology if specified
    const matchesTechnology = !technologyFilter || 
      batch.protectionMethod === technologyFilter;
    
    return matchesSearch && matchesTechnology;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'draft': return 'bg-warning text-warning-foreground';
      case 'archived': return 'bg-muted text-muted-foreground';
      default: return '';
    }
  };

  const getConversionColor = (rate: number) => {
    if (rate >= 30) return 'text-success';
    if (rate >= 20) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <LanguageSelector />
        </div>

        <div className="mb-6 flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {technologyFilter === 'nfc' && 'NFC Batches'}
              {technologyFilter === 'qr' && 'QR Code Batches'}
              {!technologyFilter && 'All Batches'}
            </h1>
            <p className="text-muted-foreground">
              {technologyFilter === 'nfc' && 'Manage your NFC-authenticated product batches'}
              {technologyFilter === 'qr' && 'Manage your QR code-authenticated product batches'}
              {!technologyFilter && 'Manage all your product batches'}
            </p>
          </div>
          <Button onClick={() => navigate('/dashboard/batches/create' + (technologyFilter ? `?type=${technologyFilter}` : ''))}>
            <Plus className="mr-2 h-4 w-4" />
            Create New Batch
          </Button>
        </div>

        {/* Technology filter tabs */}
        <Card className="mb-6 p-4">
          <div className="flex gap-2">
            <Button 
              variant={!technologyFilter ? 'default' : 'outline'}
              size="sm"
              onClick={() => navigate('/dashboard/batches')}
            >
              All
            </Button>
            <Button 
              variant={technologyFilter === 'qr' ? 'default' : 'outline'}
              size="sm"
              onClick={() => navigate('/dashboard/batches?technology=qr')}
            >
              <QrCode className="mr-2 h-4 w-4" />
              QR Only
            </Button>
            <Button 
              variant={technologyFilter === 'nfc' ? 'default' : 'outline'}
              size="sm"
              onClick={() => navigate('/dashboard/batches?technology=nfc')}
            >
              <Radio className="mr-2 h-4 w-4" />
              NFC Only
            </Button>
          </div>
        </Card>

        <Card className="mb-6 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search batches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </Card>

        {filteredBatches.length === 0 ? (
          <Card className="p-12 text-center">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No batches found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? 'Try adjusting your search terms' : 'Create your first batch to get started'}
            </p>
            {!searchQuery && (
              <Button onClick={() => navigate('/dashboard/batches/create')}>
                <Plus className="mr-2 h-4 w-4" />
                Create First Batch
              </Button>
            )}
          </Card>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Batch Number</TableHead>
                    <TableHead>Technology</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Bottles</TableHead>
                    <TableHead className="text-right">QR1 Scans</TableHead>
                    <TableHead className="text-right">QR2 Verified</TableHead>
                    <TableHead className="text-right">Conversion</TableHead>
                    <TableHead className="text-center">Alerts</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBatches.map((batch) => (
                    <TableRow key={batch.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={batch.image}
                            alt={batch.product}
                            className="h-10 w-10 rounded object-cover"
                          />
                          <span className="font-medium">{batch.product}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          {batch.batchNumber}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          {batch.protectionMethod === 'qr' && (
                            <>
                              <QrCode className="h-3 w-3" />
                              QR
                            </>
                          )}
                          {batch.protectionMethod === 'nfc' && (
                            <>
                              <Radio className="h-3 w-3" />
                              NFC
                            </>
                          )}
                          {batch.protectionMethod === 'both' && (
                            <>
                              <Shield className="h-3 w-3" />
                              QR+NFC
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(batch.status)}>
                          {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {batch.bottles.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <TrendingUp className="h-3 w-3 text-primary" />
                          <span className="font-medium">{batch.qr1Scans.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Shield className="h-3 w-3 text-primary" />
                          <span className="font-medium">{batch.qr2Verified.toLocaleString()}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge 
                          variant="outline"
                          className={getConversionColor(batch.conversionRate)}
                        >
                          {batch.conversionRate}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {batch.activeAlerts > 0 ? (
                          <Badge variant="destructive" className="gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {batch.activeAlerts}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/dashboard/batches/${batch.id}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
