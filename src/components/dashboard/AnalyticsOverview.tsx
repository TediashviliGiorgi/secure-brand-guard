import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  CheckCircle2, 
  Globe, 
  Smartphone, 
  Clock,
  ArrowRight,
  Activity,
  Users,
  Zap,
  QrCode,
  Radio,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { MetricCardSkeleton } from '@/components/ui/metric-card-skeleton';
import { MiniChartSkeleton } from '@/components/ui/chart-skeleton';

type TimeRange = '24h' | '7d' | '30d' | '90d';

// Mock data generator for different time ranges
const generateScanTrendData = (timeRange: TimeRange, method: 'all' | 'qr' | 'nfc') => {
  const multiplier = method === 'all' ? 1 : method === 'qr' ? 0.7 : 0.3;
  
  switch (timeRange) {
    case '24h':
      return Array.from({ length: 24 }, (_, i) => ({
        day: `${i}:00`,
        scans: Math.floor((200 + Math.random() * 150) * multiplier)
      }));
    case '7d':
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
        day,
        scans: Math.floor((300 + Math.random() * 200) * multiplier)
      }));
    case '30d':
      return Array.from({ length: 30 }, (_, i) => ({
        day: `Day ${i + 1}`,
        scans: Math.floor((280 + Math.random() * 180) * multiplier)
      }));
    case '90d':
      return Array.from({ length: 13 }, (_, i) => ({
        day: `Wk ${i + 1}`,
        scans: Math.floor((2000 + Math.random() * 1000) * multiplier)
      }));
  }
};

// Mock analytics data generator for different time ranges
const generateAnalyticsData = (timeRange: TimeRange, method: 'all' | 'qr' | 'nfc') => {
  const baseMultiplier = method === 'all' ? 1 : method === 'qr' ? 0.69 : 0.31;
  const timeMultiplier = timeRange === '24h' ? 0.1 : timeRange === '7d' ? 1 : timeRange === '30d' ? 4.2 : 12.8;
  
  const totalScans = Math.floor(2690 * baseMultiplier * timeMultiplier);
  const verifications = Math.floor(totalScans * 0.968);
  const uniqueUsers = Math.floor(totalScans * 0.686);
  
  return {
    totalScans,
    scansChange: 12.2 + Math.random() * 12,
    verifications,
    verificationRate: 96.8,
    verificationChange: 1.5 + Math.random() * 2,
    uniqueUsers,
    usersChange: 8.9 + Math.random() * 8,
    avgScanTime: method === 'nfc' ? '2.4s' : method === 'qr' ? '1.5s' : '1.8s',
    scanTimeChange: -0.5 + Math.random() * 0.8,
    topCountry: method === 'nfc' ? 'Germany' : 'United States',
    topCountryPercentage: 38 + Math.floor(Math.random() * 10),
    mobilePercentage: method === 'nfc' ? 91 : method === 'qr' ? 82 : 74,
    peakHour: method === 'nfc' ? '15:00' : method === 'qr' ? '13:00' : '14:00',
  };
};

export const AnalyticsOverview = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [activeMethod, setActiveMethod] = useState<'all' | 'qr' | 'nfc'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [timeRange, activeMethod]);

  // Generate dynamic analytics data based on selected time range
  const analytics = {
    all: generateAnalyticsData(timeRange, 'all'),
    qr: generateAnalyticsData(timeRange, 'qr'),
    nfc: generateAnalyticsData(timeRange, 'nfc'),
  };

  const scanTrendData = {
    all: generateScanTrendData(timeRange, 'all'),
    qr: generateScanTrendData(timeRange, 'qr'),
    nfc: generateScanTrendData(timeRange, 'nfc'),
  };

  const getTimeRangeLabel = (range: TimeRange) => {
    switch (range) {
      case '24h': return 'Last 24 Hours';
      case '7d': return 'Last 7 Days';
      case '30d': return 'Last 30 Days';
      case '90d': return 'Last 90 Days';
    }
  };

  const renderTrendBadge = (value: number) => {
    const isPositive = value > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const colorClass = isPositive ? 'text-success' : 'text-destructive';
    
    return (
      <div className={`flex items-center gap-1 text-xs font-medium ${colorClass}`}>
        <Icon className="h-3 w-3" />
        <span>{Math.abs(value)}%</span>
      </div>
    );
  };

  const renderMetricsSection = (data: typeof analytics.all, trendData: typeof scanTrendData.all) => {
    if (isLoading) {
      return (
        <>
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <MetricCardSkeleton key={i} />
            ))}
          </div>
          <MiniChartSkeleton />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <MetricCardSkeleton key={i} />
            ))}
          </div>
        </>
      );
    }

    return (
    <>
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        
        {/* Total Scans */}
        <div className="space-y-2 p-3 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Eye className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Total Scans</span>
            </div>
            {renderTrendBadge(data.scansChange)}
          </div>
          <div className="text-2xl font-bold">{data.totalScans.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">{getTimeRangeLabel(timeRange)}</div>
        </div>

        {/* Verification Rate */}
        <div className="space-y-2 p-3 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Verified</span>
            </div>
            {renderTrendBadge(data.verificationChange)}
          </div>
          <div className="text-2xl font-bold">{data.verificationRate}%</div>
          <div className="text-xs text-muted-foreground">{data.verifications.toLocaleString()} total</div>
        </div>

        {/* Unique Users */}
        <div className="space-y-2 p-3 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Unique Users</span>
            </div>
            {renderTrendBadge(data.usersChange)}
          </div>
          <div className="text-2xl font-bold">{data.uniqueUsers.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Active consumers</div>
        </div>

        {/* Avg Scan Time */}
        <div className="space-y-2 p-3 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Scan Speed</span>
            </div>
            {renderTrendBadge(data.scanTimeChange)}
          </div>
          <div className="text-2xl font-bold">{data.avgScanTime}</div>
          <div className="text-xs text-muted-foreground">Average time</div>
        </div>

      </div>

      {/* Scan Trend Mini Chart */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Activity className="h-4 w-4 text-green-500" />
            Scan Activity Trend
          </h4>
          <span className="text-xs text-muted-foreground">{getTimeRangeLabel(timeRange)}</span>
        </div>
        <div className="h-24 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="scanGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px',
                  fontSize: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="scans" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                fill="url(#scanGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Quick Insights</h4>
        
        {/* Geographic Distribution */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-blue-500" />
            <div className="text-xs">
              <div className="font-medium">Top Location: {data.topCountry}</div>
              <div className="text-muted-foreground">{data.topCountryPercentage}% of scans</div>
            </div>
          </div>
          <Progress value={data.topCountryPercentage} className="w-20 h-2" />
        </div>

        {/* Device Distribution */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-purple-500" />
            <div className="text-xs">
              <div className="font-medium">Mobile Dominant</div>
              <div className="text-muted-foreground">{data.mobilePercentage}% mobile</div>
            </div>
          </div>
          <Progress value={data.mobilePercentage} className="w-20 h-2" />
        </div>

        {/* Peak Time */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-500" />
            <div className="text-xs">
              <div className="font-medium">Peak Hour: {data.peakHour}</div>
              <div className="text-muted-foreground">Highest activity</div>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            Best time
          </Badge>
        </div>
      </div>
    </>
    );
  };

  return (
    <Card className="border-green-500/20 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Analytics Overview</CardTitle>
              <CardDescription>Performance by protection method</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="gap-1 bg-green-500/10 text-green-600 border-green-500/20">
            <Activity className="h-3 w-3" />
            Live
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Time Range Selector */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Time Range:</span>
            <span className="text-foreground">{getTimeRangeLabel(timeRange)}</span>
          </div>
          <div className="flex gap-1">
            {(['24h', '7d', '30d', '90d'] as TimeRange[]).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="h-7 px-3 text-xs"
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={(v) => setActiveMethod(v as any)}>
          <TabsList className="grid w-full grid-cols-1 mb-4">
            <TabsTrigger value="all" className="gap-2 text-xs">
              <QrCode className="h-3.5 w-3.5" />
              Dual QR System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {renderMetricsSection(analytics.all, scanTrendData.all)}
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/dashboard/analytics')}
            className="w-full"
          >
            Full Analytics
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            disabled
            className="w-full"
          >
            Export Report
          </Button>
        </div>

      </CardContent>
    </Card>
  );
};
