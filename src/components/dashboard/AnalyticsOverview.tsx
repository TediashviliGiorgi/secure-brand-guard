import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for mini charts
const scanTrendData = [
  { day: 'Mon', scans: 145 },
  { day: 'Tue', scans: 180 },
  { day: 'Wed', scans: 165 },
  { day: 'Thu', scans: 220 },
  { day: 'Fri', scans: 280 },
  { day: 'Sat', scans: 310 },
  { day: 'Sun', scans: 265 },
];

const verificationTrendData = [
  { day: 'Mon', rate: 35 },
  { day: 'Tue', rate: 38 },
  { day: 'Wed', rate: 37 },
  { day: 'Thu', rate: 41 },
  { day: 'Fri', rate: 39 },
  { day: 'Sat', rate: 42 },
  { day: 'Sun', rate: 40 },
];

export const AnalyticsOverview = () => {
  const navigate = useNavigate();

  // Mock analytics data
  const analytics = {
    totalScans: 4567,
    scansChange: 23.5,
    scansChangePositive: true,
    
    verifications: 1823,
    verificationRate: 39.9,
    verificationChange: 5.2,
    verificationChangePositive: true,
    
    uniqueUsers: 3241,
    usersChange: 12.3,
    usersChangePositive: true,
    
    avgScanTime: '2.4s',
    scanTimeChange: -8.1,
    scanTimeChangePositive: true, // negative is good for time
    
    topCountry: 'Georgia',
    topCountryScans: 2834,
    topCountryPercentage: 62,
    
    mobileScans: 3892,
    mobilePercentage: 85,
    
    peakHour: '18:00',
    peakHourScans: 487,
  };

  const renderTrendBadge = (value: number, isPositive: boolean) => {
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const colorClass = isPositive ? 'text-success' : 'text-destructive';
    
    return (
      <div className={`flex items-center gap-1 text-xs font-medium ${colorClass}`}>
        <Icon className="h-3 w-3" />
        <span>{Math.abs(value)}%</span>
      </div>
    );
  };

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
              <CardDescription>Real-time performance metrics</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="gap-1 bg-green-500/10 text-green-600 border-green-500/20">
            <Activity className="h-3 w-3" />
            Live
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* Total Scans */}
          <div className="space-y-2 p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Total Scans</span>
              </div>
              {renderTrendBadge(analytics.scansChange, analytics.scansChangePositive)}
            </div>
            <div className="text-2xl font-bold">{analytics.totalScans.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Last 7 days</div>
          </div>

          {/* Verification Rate */}
          <div className="space-y-2 p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Verified</span>
              </div>
              {renderTrendBadge(analytics.verificationChange, analytics.verificationChangePositive)}
            </div>
            <div className="text-2xl font-bold">{analytics.verificationRate}%</div>
            <div className="text-xs text-muted-foreground">{analytics.verifications.toLocaleString()} total</div>
          </div>

          {/* Unique Users */}
          <div className="space-y-2 p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Unique Users</span>
              </div>
              {renderTrendBadge(analytics.usersChange, analytics.usersChangePositive)}
            </div>
            <div className="text-2xl font-bold">{analytics.uniqueUsers.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Active consumers</div>
          </div>

          {/* Avg Scan Time */}
          <div className="space-y-2 p-3 rounded-lg bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Zap className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Scan Speed</span>
              </div>
              {renderTrendBadge(analytics.scanTimeChange, analytics.scanTimeChangePositive)}
            </div>
            <div className="text-2xl font-bold">{analytics.avgScanTime}</div>
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
              <AreaChart data={scanTrendData}>
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
                <div className="font-medium">Top Location: {analytics.topCountry}</div>
                <div className="text-muted-foreground">{analytics.topCountryScans.toLocaleString()} scans</div>
              </div>
            </div>
            <Progress value={analytics.topCountryPercentage} className="w-20 h-2" />
          </div>

          {/* Device Distribution */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-purple-500" />
              <div className="text-xs">
                <div className="font-medium">Mobile Dominant</div>
                <div className="text-muted-foreground">{analytics.mobileScans.toLocaleString()} mobile scans</div>
              </div>
            </div>
            <Progress value={analytics.mobilePercentage} className="w-20 h-2" />
          </div>

          {/* Peak Time */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              <div className="text-xs">
                <div className="font-medium">Peak Hour: {analytics.peakHour}</div>
                <div className="text-muted-foreground">{analytics.peakHourScans} scans</div>
              </div>
            </div>
            <Badge variant="secondary" className="text-xs">
              Best time
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
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
