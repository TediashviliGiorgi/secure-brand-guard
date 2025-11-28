import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MapPin, 
  Clock, 
  Smartphone,
  CheckCircle,
  XCircle,
  Calendar
} from 'lucide-react';

type TimeRange = '24h' | '7d' | '30d' | '90d';

interface BatchAnalyticsProps {
  batchId: string;
}

export function BatchAnalytics({ batchId }: BatchAnalyticsProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  // Mock data - replace with real API call
  const analyticsData = {
    totalScans: 15847,
    uniqueUsers: 12453,
    verificationRate: 87.3,
    avgScanTime: '2.4s',
    topLocation: 'Tbilisi, Georgia',
    topDevice: 'iOS',
    scanTrend: [
      { date: '2024-01-01', scans: 450, verifications: 392 },
      { date: '2024-01-02', scans: 523, verifications: 458 },
      { date: '2024-01-03', scans: 612, verifications: 531 },
      { date: '2024-01-04', scans: 589, verifications: 514 },
      { date: '2024-01-05', scans: 701, verifications: 615 },
      { date: '2024-01-06', scans: 834, verifications: 728 },
      { date: '2024-01-07', scans: 945, verifications: 825 },
    ],
    geographicData: [
      { country: 'Georgia', scans: 8245, percentage: 52 },
      { country: 'Russia', scans: 3169, percentage: 20 },
      { country: 'Italy', scans: 2377, percentage: 15 },
      { country: 'France', scans: 1585, percentage: 10 },
      { country: 'Other', scans: 471, percentage: 3 },
    ],
    deviceData: [
      { device: 'iOS', percentage: 45, scans: 7131 },
      { device: 'Android', percentage: 42, scans: 6656 },
      { device: 'Desktop', percentage: 13, scans: 2060 },
    ],
    hourlyData: [
      { hour: '00:00', scans: 234 },
      { hour: '04:00', scans: 123 },
      { hour: '08:00', scans: 567 },
      { hour: '12:00', scans: 892 },
      { hour: '16:00', scans: 1234 },
      { hour: '20:00', scans: 945 },
    ],
  };

  const timeRangeOptions = [
    { value: '24h' as TimeRange, label: '24 Hours' },
    { value: '7d' as TimeRange, label: '7 Days' },
    { value: '30d' as TimeRange, label: '30 Days' },
    { value: '90d' as TimeRange, label: '90 Days' },
  ];

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Track scan activity and user engagement
          </p>
        </div>
        <div className="flex gap-2">
          {timeRangeOptions.map((option) => (
            <Button
              key={option.value}
              variant={timeRange === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalScans.toLocaleString()}</div>
            <p className="text-xs text-success mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +23% vs previous period
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.uniqueUsers.toLocaleString()}</div>
            <p className="text-xs text-success mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +18% vs previous period
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verification Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.verificationRate}%</div>
            <p className="text-xs text-success mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +2.3% vs previous period
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Scan Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.avgScanTime}</div>
            <p className="text-xs text-muted-foreground mt-1">Fast verification</p>
          </CardContent>
        </Card>
      </div>

      {/* Scan Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Scan Activity Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.scanTrend.map((item, index) => {
              const maxScans = Math.max(...analyticsData.scanTrend.map(d => d.scans));
              const scanWidth = (item.scans / maxScans) * 100;
              const verificationWidth = (item.verifications / maxScans) * 100;

              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.date}</span>
                    <div className="flex gap-4">
                      <span className="text-primary font-medium">{item.scans} scans</span>
                      <span className="text-success font-medium">{item.verifications} verified</span>
                    </div>
                  </div>
                  <div className="relative h-8 bg-muted rounded-lg overflow-hidden">
                    <div 
                      className="absolute h-full bg-primary/30 transition-all duration-700"
                      style={{ width: `${scanWidth}%`, animationDelay: `${index * 0.1}s` }}
                    />
                    <div 
                      className="absolute h-full bg-success/50 transition-all duration-700"
                      style={{ width: `${verificationWidth}%`, animationDelay: `${index * 0.1 + 0.05}s` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Geographic & Device Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.geographicData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.country}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{item.scans.toLocaleString()}</span>
                    <Badge variant="outline">{item.percentage}%</Badge>
                  </div>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-700"
                    style={{ 
                      width: `${item.percentage}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Device Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary" />
              Device Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative h-48 flex items-end justify-around gap-4">
              {analyticsData.deviceData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-primary to-secondary rounded-t-lg transition-all duration-1000"
                      style={{ 
                        height: `${item.percentage * 3}px`,
                        animationDelay: `${index * 0.2}s`
                      }}
                    />
                    <Badge className="mt-2">{item.percentage}%</Badge>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{item.device}</p>
                    <p className="text-xs text-muted-foreground">{item.scans.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Most Active Device</span>
                <span className="font-medium">{analyticsData.topDevice}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Peak Hour</span>
                <span className="font-medium">16:00 - 20:00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Hourly Activity Pattern
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between gap-2 h-32">
            {analyticsData.hourlyData.map((item, index) => {
              const maxScans = Math.max(...analyticsData.hourlyData.map(d => d.scans));
              const height = (item.scans / maxScans) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs text-muted-foreground">{item.scans}</span>
                  <div 
                    className="w-full bg-gradient-to-t from-primary/70 to-secondary/70 rounded-t transition-all duration-1000 hover:from-primary hover:to-secondary cursor-pointer"
                    style={{ 
                      height: `${height}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  />
                  <span className="text-xs font-medium">{item.hour}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
