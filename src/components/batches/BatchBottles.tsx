import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Wine, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Clock,
  MapPin,
  Eye,
  Download
} from 'lucide-react';

interface BatchBottlesProps {
  batchId: string;
  totalBottles: number;
}

type BottleStatus = 'active' | 'scanned' | 'verified' | 'suspicious' | 'blocked';

interface Bottle {
  id: string;
  qrCode: string;
  status: BottleStatus;
  firstScan?: string;
  lastScan?: string;
  scanCount: number;
  location?: string;
  verificationStatus: 'verified' | 'pending' | 'failed';
}

export function BatchBottles({ batchId, totalBottles }: BatchBottlesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BottleStatus | 'all'>('all');

  // Mock data - replace with real API call
  const bottles: Bottle[] = Array.from({ length: 50 }, (_, i) => {
    const statuses: BottleStatus[] = ['active', 'scanned', 'verified', 'suspicious', 'blocked'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: `BTL-${String(i + 1).padStart(5, '0')}`,
      qrCode: `QR-${batchId}-${String(i + 1).padStart(5, '0')}`,
      status: randomStatus,
      firstScan: randomStatus !== 'active' ? '2024-01-05 14:23' : undefined,
      lastScan: randomStatus !== 'active' ? '2024-01-07 16:45' : undefined,
      scanCount: randomStatus !== 'active' ? Math.floor(Math.random() * 20) + 1 : 0,
      location: randomStatus !== 'active' ? ['Tbilisi', 'Moscow', 'Rome', 'Paris'][Math.floor(Math.random() * 4)] : undefined,
      verificationStatus: randomStatus === 'verified' ? 'verified' : randomStatus === 'suspicious' || randomStatus === 'blocked' ? 'failed' : 'pending',
    };
  });

  const filteredBottles = bottles.filter(bottle => {
    const matchesSearch = bottle.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bottle.qrCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bottle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: bottles.length,
    active: bottles.filter(b => b.status === 'active').length,
    scanned: bottles.filter(b => b.status === 'scanned').length,
    verified: bottles.filter(b => b.status === 'verified').length,
    suspicious: bottles.filter(b => b.status === 'suspicious').length,
    blocked: bottles.filter(b => b.status === 'blocked').length,
  };

  const getStatusBadge = (status: BottleStatus) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="gap-1"><Wine className="h-3 w-3" /> Active</Badge>;
      case 'scanned':
        return <Badge variant="secondary" className="gap-1"><Eye className="h-3 w-3" /> Scanned</Badge>;
      case 'verified':
        return <Badge variant="default" className="bg-success gap-1"><CheckCircle className="h-3 w-3" /> Verified</Badge>;
      case 'suspicious':
        return <Badge variant="outline" className="gap-1 text-warning border-warning"><AlertTriangle className="h-3 w-3" /> Suspicious</Badge>;
      case 'blocked':
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" /> Blocked</Badge>;
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-lg font-semibold">Individual Bottle Tracking</h3>
          <p className="text-sm text-muted-foreground">
            Monitor each bottle's status and scan history
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export List
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="cursor-pointer hover:bg-accent/50 transition-all duration-300" onClick={() => setStatusFilter('all')}>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="text-2xl font-bold">{statusCounts.all}</div>
            <p className="text-xs text-muted-foreground mt-1">Total Bottles</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-accent/50 transition-all duration-300" onClick={() => setStatusFilter('active')}>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="text-2xl font-bold">{statusCounts.active}</div>
            <p className="text-xs text-muted-foreground mt-1">Active</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-accent/50 transition-all duration-300" onClick={() => setStatusFilter('scanned')}>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="text-2xl font-bold">{statusCounts.scanned}</div>
            <p className="text-xs text-muted-foreground mt-1">Scanned</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-accent/50 transition-all duration-300" onClick={() => setStatusFilter('verified')}>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="text-2xl font-bold text-success">{statusCounts.verified}</div>
            <p className="text-xs text-muted-foreground mt-1">Verified</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-accent/50 transition-all duration-300" onClick={() => setStatusFilter('suspicious')}>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="text-2xl font-bold text-warning">{statusCounts.suspicious}</div>
            <p className="text-xs text-muted-foreground mt-1">Suspicious</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-accent/50 transition-all duration-300" onClick={() => setStatusFilter('blocked')}>
          <CardContent className="pt-4 pb-3 px-4">
            <div className="text-2xl font-bold text-destructive">{statusCounts.blocked}</div>
            <p className="text-xs text-muted-foreground mt-1">Blocked</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Bottle ID or QR Code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'verified' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('verified')}
              >
                Verified
              </Button>
              <Button
                variant={statusFilter === 'suspicious' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('suspicious')}
              >
                Suspicious
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bottle ID</TableHead>
                  <TableHead>QR Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead>Scans</TableHead>
                  <TableHead>First Scan</TableHead>
                  <TableHead>Last Scan</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBottles.map((bottle) => (
                  <TableRow key={bottle.id} className="hover:bg-accent/50 transition-colors duration-200">
                    <TableCell className="font-medium">{bottle.id}</TableCell>
                    <TableCell className="font-mono text-sm">{bottle.qrCode}</TableCell>
                    <TableCell>{getStatusBadge(bottle.status)}</TableCell>
                    <TableCell>{getVerificationIcon(bottle.verificationStatus)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{bottle.scanCount}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {bottle.firstScan || '—'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {bottle.lastScan || '—'}
                    </TableCell>
                    <TableCell>
                      {bottle.location ? (
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {bottle.location}
                        </div>
                      ) : (
                        '—'
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredBottles.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No bottles found matching your search criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
