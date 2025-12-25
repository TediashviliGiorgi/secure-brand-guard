import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AreaChart, Area, LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, FileText, TrendingUp, TrendingDown, Users, Eye, MousePointerClick, Clock, Calendar, Activity, QrCode, Radio, Zap, Globe, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ChartSkeleton } from '@/components/ui/chart-skeleton';
import { MetricCardSkeleton } from '@/components/ui/metric-card-skeleton';
import { useDashboardTemplate } from '@/contexts/DashboardTemplateContext';
import { LegacyPageWrapper } from '@/components/dashboard/LegacyPageWrapper';

type TimeRange = '24h' | '7d' | '30d' | '90d';
type MethodFilter = 'all' | 'qr';

// Dynamic data generators based on time range and method
const generateTimeSeriesData = (range: TimeRange, method: MethodFilter) => {
  const multiplier = method === 'all' ? 1 : 1; // Only QR now
  
  switch (range) {
    case '24h':
      return Array.from({ length: 24 }, (_, i) => ({
        date: `${i}:00`,
        qr1: Math.floor((15 + Math.random() * 10) * multiplier),
        qr2: Math.floor((7 + Math.random() * 5) * multiplier),
        cvr: 44 + Math.floor(Math.random() * 4),
      }));
    case '7d':
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
        date: day,
        qr1: Math.floor((420 + Math.random() * 200) * multiplier),
        qr2: Math.floor((185 + Math.random() * 90) * multiplier),
        cvr: 44 + Math.floor(Math.random() * 4),
      }));
    case '30d':
      return Array.from({ length: 7 }, (_, i) => ({
        date: `Jan ${(i + 1) * 5}`,
        qr1: Math.floor((420 + i * 100 + Math.random() * 100) * multiplier),
        qr2: Math.floor((185 + i * 50 + Math.random() * 50) * multiplier),
        cvr: 44 + Math.floor(Math.random() * 4),
      }));
    case '90d':
      return Array.from({ length: 13 }, (_, i) => ({
        date: `Wk ${i + 1}`,
        qr1: Math.floor((2800 + i * 200 + Math.random() * 500) * multiplier),
        qr2: Math.floor((1200 + i * 100 + Math.random() * 200) * multiplier),
        cvr: 44 + Math.floor(Math.random() * 4),
      }));
  }
};

const generateMetrics = (range: TimeRange, method: MethodFilter) => {
  const baseMultiplier = method === 'all' ? 1 : 1; // Only QR now
  const timeMultiplier = range === '24h' ? 0.02 : range === '7d' ? 0.15 : range === '30d' ? 1 : 3.5;
  
  return {
    totalScans: Math.floor(12450 * baseMultiplier * timeMultiplier),
    scansChange: 18 + Math.random() * 10,
    totalVerifications: Math.floor(5680 * baseMultiplier * timeMultiplier),
    verificationsChange: 15 + Math.random() * 8,
    conversionRate: 45.6 + (Math.random() * 2 - 1),
    conversionChange: 1.5 + Math.random() * 1.5,
    avgTime: range === '24h' ? '2m 10s' : range === '7d' ? '2m 35s' : range === '30d' ? '2m 35s' : '2m 42s',
    timeChange: 10 + Math.random() * 10,
  };
};

const DashboardAnalyticsPage = () => {
  const { template } = useDashboardTemplate();
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [methodFilter, setMethodFilter] = useState<MethodFilter>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [timeRange, methodFilter]);

  // Generate dynamic data based on filters
  const timeSeriesData = generateTimeSeriesData(timeRange, methodFilter);
  const metrics = generateMetrics(timeRange, methodFilter);
  
  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case '24h': return 'Last 24 Hours';
      case '7d': return 'Last 7 Days';
      case '30d': return 'Last 30 Days';
      case '90d': return 'Last 90 Days';
    }
  };

  const renderTrendBadge = (value: number, isPositive = true) => {
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const colorClass = isPositive ? 'text-success' : 'text-destructive';
    
    return (
      <div className={`flex items-center gap-1 text-xs font-medium ${colorClass}`}>
        <Icon className="h-3 w-3" />
        <span>{Math.abs(value).toFixed(1)}%</span>
      </div>
    );
  };

  const deviceData = [
    { name: 'Mobile', value: 78, color: 'hsl(var(--primary))' },
    { name: 'Desktop', value: 18, color: 'hsl(var(--secondary))' },
    { name: 'Tablet', value: 4, color: 'hsl(var(--accent))' },
  ];

  const osData = [
    { name: 'iOS', value: 52, color: 'hsl(var(--primary))' },
    { name: 'Android', value: 44, color: 'hsl(var(--secondary))' },
    { name: 'Other', value: 4, color: 'hsl(var(--muted))' },
  ];

  const topProducts = [
    { rank: 1, name: 'Saperavi Reserve 2020', category: 'Wine', qr1: 2450, qr2: 1120, cvr: 45.7 },
    { rank: 2, name: 'Rkatsiteli Qvevri 2019', category: 'Wine', qr1: 1890, qr2: 890, cvr: 47.1 },
    { rank: 3, name: 'Chacha Premium', category: 'Spirits', qr1: 1650, qr2: 720, cvr: 43.6 },
    { rank: 4, name: 'Kindzmarauli 2021', category: 'Wine', qr1: 1420, qr2: 640, cvr: 45.1 },
    { rank: 5, name: 'Georgian Honey', category: 'Other', qr1: 980, qr2: 410, cvr: 41.8 },
  ];

  const peakHoursData = [
    { day: 'Mon', hours: [2, 3, 4, 8, 12, 18, 25, 32, 28, 22, 18, 15, 14, 16, 22, 30, 38, 42, 35, 28, 20, 12, 8, 4] },
    { day: 'Tue', hours: [3, 4, 5, 9, 14, 20, 28, 35, 30, 24, 20, 17, 16, 18, 25, 34, 42, 45, 38, 30, 22, 14, 9, 5] },
    { day: 'Wed', hours: [2, 3, 5, 10, 15, 22, 30, 38, 32, 26, 22, 18, 17, 20, 27, 36, 44, 48, 40, 32, 24, 16, 10, 6] },
    { day: 'Thu', hours: [3, 4, 6, 11, 16, 24, 32, 40, 35, 28, 24, 20, 19, 22, 29, 38, 46, 50, 42, 34, 26, 18, 11, 7] },
    { day: 'Fri', hours: [4, 5, 7, 13, 18, 26, 35, 45, 40, 32, 28, 24, 22, 26, 34, 44, 52, 58, 48, 38, 30, 22, 14, 9] },
    { day: 'Sat', hours: [5, 6, 8, 15, 22, 32, 42, 52, 48, 40, 35, 30, 28, 32, 40, 50, 58, 62, 52, 42, 34, 26, 18, 12] },
    { day: 'Sun', hours: [4, 5, 7, 12, 18, 28, 38, 48, 42, 35, 30, 26, 24, 28, 36, 45, 52, 56, 46, 36, 28, 20, 14, 10] },
  ];

  const getHeatColor = (value: number) => {
    const intensity = Math.min(value / 60, 1);
    return `hsl(var(--primary) / ${0.1 + intensity * 0.9})`;
  };

  const analyticsContent = (
    <div className={template === 'legacy' ? '' : 'container mx-auto px-4 py-8'}>
      {/* Header - only show for modern template */}
      {template === 'modern' && (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
              <span>/</span>
              <span>Analytics</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Analytics Overview</h1>
            <p className="text-muted-foreground">Comprehensive insights into product verification and engagement</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <LanguageSelector />
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <Card className="p-6 mb-8 bg-card border-2">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Time Range Selector */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Time Range</span>
            </div>
            <div className="flex gap-2">
              {(['24h', '7d', '30d', '90d'] as TimeRange[]).map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className="min-w-[70px]"
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>

          {/* Method Filter - Removed since only QR */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Dual QR System</span>
            </div>
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2">
                <QrCode className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">All batches use Dual QR authentication</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Visible QR (marketing) + Hidden QR (security)
              </p>
            </div>
          </div>

          {/* Active Filters Display */}
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <Activity className="h-3 w-3" />
              {getTimeRangeLabel()}
            </Badge>
            <Badge variant="secondary" className="gap-1">
              Dual QR System
            </Badge>
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <MetricCardSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            <Card className="relative overflow-hidden border-2">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12" />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>Total Scans</CardDescription>
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold">{metrics.totalScans.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  {renderTrendBadge(metrics.scansChange)}
                  <span className="text-xs text-muted-foreground">vs previous period</span>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2">
              <div className="absolute top-0 right-0 w-24 h-24 bg-success/5 rounded-full -mr-12 -mt-12" />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>Verifications</CardDescription>
                  <Zap className="h-5 w-5 text-success" />
                </div>
                <CardTitle className="text-3xl font-bold">{metrics.totalVerifications.toLocaleString()}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  {renderTrendBadge(metrics.verificationsChange)}
                  <span className="text-xs text-muted-foreground">vs previous period</span>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2">
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full -mr-12 -mt-12" />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>Conversion Rate</CardDescription>
                  <TrendingUp className="h-5 w-5 text-secondary" />
                </div>
                <CardTitle className="text-3xl font-bold">{metrics.conversionRate.toFixed(1)}%</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  {renderTrendBadge(metrics.conversionChange)}
                  <span className="text-xs text-muted-foreground">vs previous period</span>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-2">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -mr-12 -mt-12" />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardDescription>Engagement Time</CardDescription>
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <CardTitle className="text-3xl font-bold">{metrics.avgTime}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  {renderTrendBadge(metrics.timeChange)}
                  <span className="text-xs text-muted-foreground">vs previous period</span>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Scans Over Time */}
      {isLoading ? (
        <ChartSkeleton />
      ) : (
        <Card className="mb-8 border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Scan Activity Trend
                </CardTitle>
                <CardDescription>Performance over {getTimeRangeLabel().toLowerCase()}</CardDescription>
              </div>
              <Badge variant="outline" className="gap-1">
                <Activity className="h-3 w-3 animate-pulse" />
                Live Data
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={380}>
              <AreaChart data={timeSeriesData}>
                <defs>
                  <linearGradient id="colorQr1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorQr2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '2px solid hsl(var(--border))',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Area 
                  type="monotone" 
                  dataKey="qr1" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorQr1)"
                  name="Initial Scans"
                />
                <Area 
                  type="monotone" 
                  dataKey="qr2" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorQr2)"
                  name="Verifications"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );

  if (template === 'legacy') {
    return (
      <LegacyPageWrapper title="Analytics" subtitle="Comprehensive insights into product verification">
        {analyticsContent}
      </LegacyPageWrapper>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {analyticsContent}
    </div>
  );
};

export default DashboardAnalyticsPage;
