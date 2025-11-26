import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ArrowLeft,
  Search,
  Download,
  Filter,
  MoreVertical,
  Nfc,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Package,
  MapPin,
  Clock,
  Eye,
  Bell,
} from 'lucide-react';
import { SEO } from '@/components/ui/seo';
import { LanguageSelector } from '@/components/LanguageSelector';

// Mock data for NFC tags
const mockNFCTags = [
  {
    id: 'NFC-2024-001',
    tagId: 'E004010012345678',
    productName: 'Saperavi Reserve 2021',
    batchId: 'AUTH-2024-001',
    status: 'active',
    scans: 12,
    lastScan: '2024-11-15 14:30',
    location: 'Tbilisi, Georgia',
    assignedDate: '2024-01-15',
  },
  {
    id: 'NFC-2024-002',
    tagId: 'E004010087654321',
    productName: 'Kindzmarauli Premium',
    batchId: 'AUTH-2024-002',
    status: 'active',
    scans: 5,
    lastScan: '2024-11-14 10:15',
    location: 'Kakheti, Georgia',
    assignedDate: '2024-02-01',
  },
  {
    id: 'NFC-2024-003',
    tagId: 'E004010011112222',
    productName: 'Saperavi Reserve 2021',
    batchId: 'AUTH-2024-001',
    status: 'suspicious',
    scans: 45,
    lastScan: '2024-11-16 09:20',
    location: 'Batumi, Georgia',
    assignedDate: '2024-01-15',
  },
  {
    id: 'NFC-2024-004',
    tagId: 'E004010033334444',
    productName: 'Mukuzani Classic',
    batchId: 'AUTH-2024-003',
    status: 'inactive',
    scans: 1,
    lastScan: '2024-10-20 16:45',
    location: 'Telavi, Georgia',
    assignedDate: '2024-03-10',
  },
  {
    id: 'NFC-2024-005',
    tagId: 'E004010055556666',
    productName: 'Kindzmarauli Premium',
    batchId: 'AUTH-2024-002',
    status: 'active',
    scans: 8,
    lastScan: '2024-11-16 11:00',
    location: 'Kutaisi, Georgia',
    assignedDate: '2024-02-01',
  },
];

// Mock scan history data
const mockScanHistory = [
  {
    id: 1,
    tagId: 'E004010012345678',
    productName: 'Saperavi Reserve 2021',
    timestamp: '2024-11-16 14:30',
    location: 'Tbilisi, Georgia',
    device: 'iPhone 15 Pro',
    status: 'verified',
  },
  {
    id: 2,
    tagId: 'E004010011112222',
    productName: 'Saperavi Reserve 2021',
    timestamp: '2024-11-16 09:20',
    location: 'Batumi, Georgia',
    device: 'Samsung Galaxy S23',
    status: 'suspicious',
  },
  {
    id: 3,
    tagId: 'E004010055556666',
    productName: 'Kindzmarauli Premium',
    timestamp: '2024-11-16 11:00',
    location: 'Kutaisi, Georgia',
    device: 'iPhone 14',
    status: 'verified',
  },
  {
    id: 4,
    tagId: 'E004010012345678',
    productName: 'Saperavi Reserve 2021',
    timestamp: '2024-11-15 16:20',
    location: 'Tbilisi, Georgia',
    device: 'Google Pixel 8',
    status: 'verified',
  },
];

export default function NFCManagementPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Statistics
  const totalTags = mockNFCTags.length;
  const activeTags = mockNFCTags.filter(tag => tag.status === 'active').length;
  const suspiciousTags = mockNFCTags.filter(tag => tag.status === 'suspicious').length;
  const totalScans = mockNFCTags.reduce((sum, tag) => sum + tag.scans, 0);

  // Filtered tags
  const filteredTags = mockNFCTags.filter(tag => {
    const matchesSearch = 
      tag.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.tagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.batchId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || tag.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Active
          </Badge>
        );
      case 'suspicious':
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Suspicious
          </Badge>
        );
      case 'inactive':
        return (
          <Badge variant="secondary">
            <XCircle className="mr-1 h-3 w-3" />
            Inactive
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getScanStatusBadge = (status: string) => {
    return status === 'verified' ? (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Verified</Badge>
    ) : (
      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Suspicious</Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="NFC Tag Management - AuthIt"
        description="Manage and monitor your NFC authentication tags"
      />
      
      {/* Header */}
      <header className="border-b border-border/40 bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                  <Nfc className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Browse All NFC Tags</h1>
                  <p className="text-xs text-muted-foreground">Monitor all NFC tags across batches</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/dashboard/nfc-analytics')}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Analytics
              </Button>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total NFC Tags</CardDescription>
              <CardTitle className="text-3xl">{totalTags}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>Across all batches</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Tags</CardDescription>
              <CardTitle className="text-3xl text-green-600">{activeTags}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span>{Math.round((activeTags / totalTags) * 100)}% of total</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Suspicious Activity</CardDescription>
              <CardTitle className="text-3xl text-amber-600">{suspiciousTags}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-amber-600">
                <AlertTriangle className="h-4 w-4" />
                <span>Requires attention</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Scans</CardDescription>
              <CardTitle className="text-3xl">{totalScans}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>+12% this week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="tags" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tags">
              <Nfc className="mr-2 h-4 w-4" />
              NFC Tags
            </TabsTrigger>
            <TabsTrigger value="history">
              <Clock className="mr-2 h-4 w-4" />
              Scan History
            </TabsTrigger>
            <TabsTrigger value="alerts">
              <Bell className="mr-2 h-4 w-4" />
              Alerts
            </TabsTrigger>
          </TabsList>

          {/* NFC Tags Tab */}
          <TabsContent value="tags" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Active NFC Tags</CardTitle>
                    <CardDescription>
                      Monitor all NFC tags and their current status
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by tag ID, product name, or batch..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspicious">Suspicious</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tag ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Batch ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Scans</TableHead>
                        <TableHead>Last Scan</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTags.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                            No NFC tags found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredTags.map((tag) => (
                          <TableRow key={tag.id}>
                            <TableCell className="font-mono text-sm">
                              {tag.tagId}
                            </TableCell>
                            <TableCell className="font-medium">{tag.productName}</TableCell>
                            <TableCell>
                              <Button
                                variant="link"
                                className="h-auto p-0 font-normal"
                                onClick={() => navigate(`/dashboard/batches/${tag.batchId}`)}
                              >
                                <Badge variant="outline">{tag.batchId}</Badge>
                              </Button>
                            </TableCell>
                            <TableCell>{getStatusBadge(tag.status)}</TableCell>
                            <TableCell className="text-right font-semibold">
                              {tag.scans}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {tag.lastScan}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                {tag.location}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => navigate(`/dashboard/nfc/${tag.id}`)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="mr-2 h-4 w-4" />
                                    Export Data
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    Deactivate Tag
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scan History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Scan History</CardTitle>
                    <CardDescription>
                      Recent NFC tag verification scans
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export History
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tag ID</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockScanHistory.map((scan) => (
                        <TableRow key={scan.id}>
                          <TableCell className="font-mono text-sm">
                            {scan.tagId}
                          </TableCell>
                          <TableCell className="font-medium">{scan.productName}</TableCell>
                          <TableCell className="text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {scan.timestamp}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              {scan.location}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {scan.device}
                          </TableCell>
                          <TableCell>{getScanStatusBadge(scan.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Security Alerts</CardTitle>
                    <CardDescription>
                      Real-time notifications for suspicious activity
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export Alerts
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Critical Alert */}
                  <div className="border border-red-200 dark:border-red-800 rounded-lg p-4 bg-red-50 dark:bg-red-950/30">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-red-900 dark:text-red-100">
                              Multiple Scans from Different Locations
                            </h4>
                            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                              Tag E004010011112222 scanned in Tbilisi and Batumi within 2 hours (350km apart)
                            </p>
                          </div>
                          <Badge className="bg-red-600 text-white hover:bg-red-600">Critical</Badge>
                        </div>
                        <div className="mt-3 flex items-center gap-4 text-sm text-red-600 dark:text-red-400">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>2 hours ago</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7"
                            onClick={() => navigate('/dashboard/nfc/NFC-2024-003')}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Warning Alert */}
                  <div className="border border-amber-200 dark:border-amber-800 rounded-lg p-4 bg-amber-50 dark:bg-amber-950/30">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-amber-900 dark:text-amber-100">
                              Unusual Scan Pattern Detected
                            </h4>
                            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                              Tag E004010012345678 scanned 5 times in 10 minutes from same location
                            </p>
                          </div>
                          <Badge className="bg-amber-600 text-white hover:bg-amber-600">Warning</Badge>
                        </div>
                        <div className="mt-3 flex items-center gap-4 text-sm text-amber-600 dark:text-amber-400">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>5 hours ago</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7"
                            onClick={() => navigate('/dashboard/nfc/NFC-2024-001')}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Info Alert */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">
                              High Activity Batch Detected
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Batch AUTH-2024-002 has seen 45 scans today, 180% above average
                            </p>
                          </div>
                          <Badge variant="outline">Info</Badge>
                        </div>
                        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>1 day ago</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7"
                            onClick={() => navigate('/dashboard/batches/AUTH-2024-002')}
                          >
                            View Batch
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resolved Alert */}
                  <div className="border rounded-lg p-4 opacity-60">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <XCircle className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold line-through">
                              Tag Deactivated After Suspicious Activity
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Tag E004010033334444 was deactivated after multiple suspicious scans
                            </p>
                          </div>
                          <Badge variant="outline">Resolved</Badge>
                        </div>
                        <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>3 days ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
