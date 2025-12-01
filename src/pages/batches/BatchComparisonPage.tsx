import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Package,
  TrendingUp,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  QrCode,
  Radio,
  Clock,
  Users,
  MapPin,
  Calendar,
} from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BatchComparisonData {
  id: string;
  product: string;
  image: string;
  batchNumber: string;
  status: 'active' | 'draft' | 'archived';
  bottles: number;
  protectionMethod: 'qr';
  qr1Scans: number;
  qr2Verified: number;
  conversionRate: number;
  activeAlerts: number;
  totalThreats: number;
  avgScanTime: string;
  uniqueUsers: number;
  topLocation: string;
  verificationRate: number;
  securityScore: number;
}

// Mock historical data for time-based comparison
const mockHistoricalData = {
  '7d': [
    { date: 'Day 1', 'AUTH-2024-001': 12000, 'AUTH-2024-002': 7800, 'AUTH-2023-045': 23000 },
    { date: 'Day 2', 'AUTH-2024-001': 12200, 'AUTH-2024-002': 8000, 'AUTH-2023-045': 23400 },
    { date: 'Day 3', 'AUTH-2024-001': 12400, 'AUTH-2024-002': 8100, 'AUTH-2023-045': 23600 },
    { date: 'Day 4', 'AUTH-2024-001': 12550, 'AUTH-2024-002': 8200, 'AUTH-2023-045': 23800 },
    { date: 'Day 5', 'AUTH-2024-001': 12700, 'AUTH-2024-002': 8300, 'AUTH-2023-045': 23950 },
    { date: 'Day 6', 'AUTH-2024-001': 12800, 'AUTH-2024-002': 8400, 'AUTH-2023-045': 24050 },
    { date: 'Day 7', 'AUTH-2024-001': 12847, 'AUTH-2024-002': 8456, 'AUTH-2023-045': 24123 },
  ],
  '30d': [
    { date: 'Week 1', 'AUTH-2024-001': 10000, 'AUTH-2024-002': 6000, 'AUTH-2023-045': 20000 },
    { date: 'Week 2', 'AUTH-2024-001': 11200, 'AUTH-2024-002': 7000, 'AUTH-2023-045': 21500 },
    { date: 'Week 3', 'AUTH-2024-001': 12200, 'AUTH-2024-002': 7800, 'AUTH-2023-045': 23000 },
    { date: 'Week 4', 'AUTH-2024-001': 12847, 'AUTH-2024-002': 8456, 'AUTH-2023-045': 24123 },
  ],
  '90d': [
    { date: 'Month 1', 'AUTH-2024-001': 5000, 'AUTH-2024-002': 3000, 'AUTH-2023-045': 15000 },
    { date: 'Month 2', 'AUTH-2024-001': 9000, 'AUTH-2024-002': 6000, 'AUTH-2023-045': 20000 },
    { date: 'Month 3', 'AUTH-2024-001': 12847, 'AUTH-2024-002': 8456, 'AUTH-2023-045': 24123 },
  ],
};

const mockSecurityHistoricalData = {
  '7d': [
    { date: 'Day 1', 'AUTH-2024-001': 91, 'AUTH-2024-002': 95, 'AUTH-2023-045': 97 },
    { date: 'Day 2', 'AUTH-2024-001': 91, 'AUTH-2024-002': 95, 'AUTH-2023-045': 97 },
    { date: 'Day 3', 'AUTH-2024-001': 91, 'AUTH-2024-002': 96, 'AUTH-2023-045': 98 },
    { date: 'Day 4', 'AUTH-2024-001': 92, 'AUTH-2024-002': 96, 'AUTH-2023-045': 98 },
    { date: 'Day 5', 'AUTH-2024-001': 92, 'AUTH-2024-002': 96, 'AUTH-2023-045': 98 },
    { date: 'Day 6', 'AUTH-2024-001': 92, 'AUTH-2024-002': 96, 'AUTH-2023-045': 98 },
    { date: 'Day 7', 'AUTH-2024-001': 92, 'AUTH-2024-002': 96, 'AUTH-2023-045': 98 },
  ],
  '30d': [
    { date: 'Week 1', 'AUTH-2024-001': 88, 'AUTH-2024-002': 93, 'AUTH-2023-045': 95 },
    { date: 'Week 2', 'AUTH-2024-001': 90, 'AUTH-2024-002': 94, 'AUTH-2023-045': 96 },
    { date: 'Week 3', 'AUTH-2024-001': 91, 'AUTH-2024-002': 95, 'AUTH-2023-045': 97 },
    { date: 'Week 4', 'AUTH-2024-001': 92, 'AUTH-2024-002': 96, 'AUTH-2023-045': 98 },
  ],
  '90d': [
    { date: 'Month 1', 'AUTH-2024-001': 85, 'AUTH-2024-002': 90, 'AUTH-2023-045': 92 },
    { date: 'Month 2', 'AUTH-2024-001': 89, 'AUTH-2024-002': 94, 'AUTH-2023-045': 96 },
    { date: 'Month 3', 'AUTH-2024-001': 92, 'AUTH-2024-002': 96, 'AUTH-2023-045': 98 },
  ],
};

// Mock data - in real app, fetch based on selected batch IDs
const mockComparisonData: BatchComparisonData[] = [
  {
    id: 'AUTH-2024-001',
    product: 'Saperavi Reserve 2021',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=100',
    batchNumber: 'AUTH-2024-001',
    status: 'active',
    bottles: 5000,
    protectionMethod: 'qr',
    qr1Scans: 12847,
    qr2Verified: 3421,
    conversionRate: 26.6,
    activeAlerts: 3,
    totalThreats: 12,
    avgScanTime: '2.1s',
    uniqueUsers: 8234,
    topLocation: 'Tbilisi, Georgia',
    verificationRate: 87.3,
    securityScore: 92,
  },
  {
    id: 'AUTH-2024-002',
    product: 'Rkatsiteli Qvevri 2022',
    image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=100',
    batchNumber: 'AUTH-2024-002',
    status: 'active',
    bottles: 3000,
    protectionMethod: 'qr',
    qr1Scans: 8456,
    qr2Verified: 2134,
    conversionRate: 25.2,
    activeAlerts: 1,
    totalThreats: 3,
    avgScanTime: '1.8s',
    uniqueUsers: 5643,
    topLocation: 'Moscow, Russia',
    verificationRate: 91.2,
    securityScore: 96,
  },
  {
    id: 'AUTH-2023-045',
    product: 'Mukuzani Classic 2020',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=100',
    batchNumber: 'AUTH-2023-045',
    status: 'active',
    bottles: 8000,
    protectionMethod: 'qr',
    qr1Scans: 24123,
    qr2Verified: 7234,
    conversionRate: 30.0,
    activeAlerts: 0,
    totalThreats: 5,
    avgScanTime: '2.4s',
    uniqueUsers: 15234,
    topLocation: 'Rome, Italy',
    verificationRate: 94.5,
    securityScore: 98,
  },
];

export default function BatchComparisonPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  
  // Get batch IDs from URL params
  const batchIds = searchParams.get('batches')?.split(',') || [];
  
  // Filter data based on selected batches
  const comparisonBatches = mockComparisonData.filter(batch => 
    batchIds.includes(batch.id)
  );

  const historicalData = mockHistoricalData[timeRange];
  const securityHistoricalData = mockSecurityHistoricalData[timeRange];

  const batchColors = {
    'AUTH-2024-001': 'hsl(var(--chart-1))',
    'AUTH-2024-002': 'hsl(var(--chart-2))',
    'AUTH-2023-045': 'hsl(var(--chart-3))',
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'draft': return 'bg-warning text-warning-foreground';
      case 'archived': return 'bg-muted text-muted-foreground';
      default: return '';
    }
  };

  const getSecurityScoreColor = (score: number) => {
    if (score >= 95) return 'text-success';
    if (score >= 85) return 'text-warning';
    return 'text-destructive';
  };

  const getBestValue = (values: number[], index: number) => {
    const max = Math.max(...values);
    return values[index] === max;
  };

  if (comparisonBatches.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={() => navigate('/dashboard/batches')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Batches
            </Button>
            <LanguageSelector />
          </div>
          <Card className="p-12 text-center">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No batches selected</h3>
            <p className="text-muted-foreground mb-6">
              Please select batches from the batch list to compare
            </p>
            <Button onClick={() => navigate('/dashboard/batches')}>
              Go to Batch List
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={() => navigate('/dashboard/batches')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Batches
          </Button>
          <LanguageSelector />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Batch Comparison</h1>
              <p className="text-muted-foreground">
                Compare metrics, security, and performance across {comparisonBatches.length} batches
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="flex gap-2">
                {(['7d', '30d', '90d'] as const).map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                  >
                    {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Time-Based Comparison Tabs */}
        <Tabs defaultValue="snapshot" className="mb-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="snapshot">Snapshot Comparison</TabsTrigger>
            <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="snapshot" className="space-y-6 mt-6">

            {/* Basic Information */}
            <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisonBatches.map((batch) => (
                <div key={batch.id} className="space-y-4 p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-3">
                    <img
                      src={batch.image}
                      alt={batch.product}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{batch.product}</h3>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {batch.batchNumber}
                      </code>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      <Badge className={getStatusColor(batch.status)}>
                        {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Technology</span>
                      <Badge variant="outline" className="gap-1">
                        <Shield className="h-3 w-3" />
                        Dual QR
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Bottles</span>
                      <span className="font-medium">{batch.bottles.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

            {/* Performance Metrics */}
            <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Metric
                    </th>
                    {comparisonBatches.map((batch) => (
                      <th key={batch.id} className="text-center py-3 px-4 text-sm font-medium">
                        {batch.product}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium">Total Scans</td>
                    {comparisonBatches.map((batch, index) => {
                      const isBest = getBestValue(
                        comparisonBatches.map(b => b.qr1Scans),
                        index
                      );
                      return (
                        <td key={batch.id} className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className={isBest ? 'font-bold text-success' : ''}>
                              {batch.qr1Scans.toLocaleString()}
                            </span>
                            {isBest && <CheckCircle className="h-4 w-4 text-success" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium">Verified</td>
                    {comparisonBatches.map((batch, index) => {
                      const isBest = getBestValue(
                        comparisonBatches.map(b => b.qr2Verified),
                        index
                      );
                      return (
                        <td key={batch.id} className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className={isBest ? 'font-bold text-success' : ''}>
                              {batch.qr2Verified.toLocaleString()}
                            </span>
                            {isBest && <CheckCircle className="h-4 w-4 text-success" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium">Conversion Rate</td>
                    {comparisonBatches.map((batch, index) => {
                      const isBest = getBestValue(
                        comparisonBatches.map(b => b.conversionRate),
                        index
                      );
                      return (
                        <td key={batch.id} className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Badge 
                              variant="outline"
                              className={isBest ? 'font-bold text-success' : ''}
                            >
                              {batch.conversionRate}%
                            </Badge>
                            {isBest && <CheckCircle className="h-4 w-4 text-success" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium">Verification Rate</td>
                    {comparisonBatches.map((batch, index) => {
                      const isBest = getBestValue(
                        comparisonBatches.map(b => b.verificationRate),
                        index
                      );
                      return (
                        <td key={batch.id} className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className={isBest ? 'font-bold text-success' : ''}>
                              {batch.verificationRate}%
                            </span>
                            {isBest && <CheckCircle className="h-4 w-4 text-success" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      Avg Scan Time
                    </td>
                    {comparisonBatches.map((batch) => (
                      <td key={batch.id} className="py-4 px-4 text-center">
                        {batch.avgScanTime}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      Unique Users
                    </td>
                    {comparisonBatches.map((batch, index) => {
                      const isBest = getBestValue(
                        comparisonBatches.map(b => b.uniqueUsers),
                        index
                      );
                      return (
                        <td key={batch.id} className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span className={isBest ? 'font-bold text-success' : ''}>
                              {batch.uniqueUsers.toLocaleString()}
                            </span>
                            {isBest && <CheckCircle className="h-4 w-4 text-success" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      Top Location
                    </td>
                    {comparisonBatches.map((batch) => (
                      <td key={batch.id} className="py-4 px-4 text-center text-sm">
                        {batch.topLocation}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

            {/* Security Analysis */}
            <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Security Metric
                    </th>
                    {comparisonBatches.map((batch) => (
                      <th key={batch.id} className="text-center py-3 px-4 text-sm font-medium">
                        {batch.product}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium">Security Score</td>
                    {comparisonBatches.map((batch, index) => {
                      const isBest = getBestValue(
                        comparisonBatches.map(b => b.securityScore),
                        index
                      );
                      return (
                        <td key={batch.id} className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <span 
                              className={`font-bold ${getSecurityScoreColor(batch.securityScore)} ${isBest ? 'text-success' : ''}`}
                            >
                              {batch.securityScore}%
                            </span>
                            {isBest && <CheckCircle className="h-4 w-4 text-success" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium">Active Alerts</td>
                    {comparisonBatches.map((batch) => (
                      <td key={batch.id} className="py-4 px-4 text-center">
                        {batch.activeAlerts > 0 ? (
                          <Badge variant="destructive" className="gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {batch.activeAlerts}
                          </Badge>
                        ) : (
                          <div className="flex items-center justify-center gap-2">
                            <span className="text-muted-foreground">0</span>
                            <CheckCircle className="h-4 w-4 text-success" />
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium">Total Threats Detected</td>
                    {comparisonBatches.map((batch) => (
                      <td key={batch.id} className="py-4 px-4 text-center">
                        <Badge variant={batch.totalThreats > 10 ? 'destructive' : 'outline'}>
                          {batch.totalThreats}
                        </Badge>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

            {/* Summary */}
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Comparison Insights</h4>
                    <p className="text-sm text-muted-foreground">
                      Best performing batch: <span className="font-medium text-foreground">
                        {comparisonBatches.reduce((best, current) => 
                          current.conversionRate > best.conversionRate ? current : best
                        ).product}
                      </span> with {comparisonBatches.reduce((best, current) => 
                        current.conversionRate > best.conversionRate ? current : best
                      ).conversionRate}% conversion rate
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Most secure batch: <span className="font-medium text-foreground">
                        {comparisonBatches.reduce((best, current) => 
                          current.securityScore > best.securityScore ? current : best
                        ).product}
                      </span> with {comparisonBatches.reduce((best, current) => 
                        current.securityScore > best.securityScore ? current : best
                      ).securityScore}% security score
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6 mt-6">
            {/* Scan Volume Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Scan Volume Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    {comparisonBatches.map((batch) => (
                      <Line
                        key={batch.id}
                        type="monotone"
                        dataKey={batch.id}
                        name={batch.product}
                        stroke={batchColors[batch.id as keyof typeof batchColors]}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Security Score Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security Score Evolution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={securityHistoricalData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="date" 
                      className="text-xs"
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis 
                      className="text-xs"
                      domain={[80, 100]}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    {comparisonBatches.map((batch) => (
                      <Line
                        key={batch.id}
                        type="monotone"
                        dataKey={batch.id}
                        name={batch.product}
                        stroke={batchColors[batch.id as keyof typeof batchColors]}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Trend Analysis Summary */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-success/10 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-success" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">Growth Leader</h4>
                        <p className="text-sm text-muted-foreground">
                          Fastest growing batch over the selected period based on scan volume
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">Security Improvement</h4>
                        <p className="text-sm text-muted-foreground">
                          All batches show consistent security score improvement over time
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
