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
  Radio
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for mini charts
const scanTrendData = {
  all: [
    { day: 'Mon', scans: 245 },
    { day: 'Tue', scans: 312 },
    { day: 'Wed', scans: 289 },
    { day: 'Thu', scans: 398 },
    { day: 'Fri', scans: 445 },
    { day: 'Sat', scans: 523 },
    { day: 'Sun', scans: 478 },
  ],
  qr: [
    { day: 'Mon', scans: 165 },
    { day: 'Tue', scans: 218 },
    { day: 'Wed', scans: 195 },
    { day: 'Thu', scans: 275 },
    { day: 'Fri', scans: 312 },
    { day: 'Sat', scans: 368 },
    { day: 'Sun', scans: 334 },
  ],
  nfc: [
    { day: 'Mon', scans: 80 },
    { day: 'Tue', scans: 94 },
    { day: 'Wed', scans: 94 },
    { day: 'Thu', scans: 123 },
    { day: 'Fri', scans: 133 },
    { day: 'Sat', scans: 155 },
    { day: 'Sun', scans: 144 },
  ],
};

export const AnalyticsOverview = () => {
  const navigate = useNavigate();

  // Mock analytics data by protection method
  const analytics = {
    all: {
      totalScans: 2690,
      scansChange: 18.2,
      verifications: 2604,
      verificationRate: 96.8,
      verificationChange: 2.3,
      uniqueUsers: 1847,
      usersChange: 12.7,
      avgScanTime: '1.8s',
      scanTimeChange: -0.3,
      topCountry: 'United States',
      topCountryPercentage: 42,
      mobilePercentage: 74,
      peakHour: '14:00',
    },
    qr: {
      totalScans: 1867,
      scansChange: 21.5,
      verifications: 1776,
      verificationRate: 95.1,
      verificationChange: 1.8,
      uniqueUsers: 1289,
      usersChange: 15.2,
      avgScanTime: '1.5s',
      scanTimeChange: -0.5,
      topCountry: 'United States',
      topCountryPercentage: 45,
      mobilePercentage: 82,
      peakHour: '13:00',
    },
    nfc: {
      totalScans: 823,
      scansChange: 12.4,
      verifications: 814,
      verificationRate: 98.9,
      verificationChange: 3.1,
      uniqueUsers: 558,
      usersChange: 8.9,
      avgScanTime: '2.4s',
      scanTimeChange: 0.2,
      topCountry: 'Germany',
      topCountryPercentage: 38,
      mobilePercentage: 91,
      peakHour: '15:00',
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

  const renderMetricsSection = (data: typeof analytics.all, trendData: typeof scanTrendData.all) => (
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
          <div className="text-xs text-muted-foreground">Last 7 days</div>
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
          <span className="text-xs text-muted-foreground">7 days</span>
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

  return (
    <Card className="hover-lift border-green-500/20 bg-gradient-to-br from-green-500/5 via-transparent to-transparent">
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
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all" className="gap-2 text-xs">
              <Activity className="h-3.5 w-3.5" />
              All Methods
            </TabsTrigger>
            <TabsTrigger value="qr" className="gap-2 text-xs">
              <QrCode className="h-3.5 w-3.5" />
              QR Codes
            </TabsTrigger>
            <TabsTrigger value="nfc" className="gap-2 text-xs">
              <Radio className="h-3.5 w-3.5" />
              NFC Tags
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {renderMetricsSection(analytics.all, scanTrendData.all)}
          </TabsContent>

          <TabsContent value="qr" className="space-y-4">
            {renderMetricsSection(analytics.qr, scanTrendData.qr)}
          </TabsContent>

          <TabsContent value="nfc" className="space-y-4">
            {renderMetricsSection(analytics.nfc, scanTrendData.nfc)}
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
