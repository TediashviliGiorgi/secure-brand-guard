import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  AlertTriangle, CheckCircle2, XCircle, Shield, TrendingUp, TrendingDown,
  MapPin, Download, Settings, Bell, Mail, Smartphone, Activity, Clock, 
  Calendar, Filter, QrCode, Radio, Eye, Zap
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { LanguageSelector } from '@/components/LanguageSelector';
import { SecurityWidgetSkeleton, SecurityListSkeleton } from '@/components/ui/security-widget-skeleton';
import { ChartSkeleton } from '@/components/ui/chart-skeleton';

type TimeRange = '24h' | '7d' | '30d' | '90d';
type MethodFilter = 'all' | 'qr';

interface Alert {
  id: string;
  priority: 'high' | 'medium' | 'low';
  type: string;
  productId: string;
  productName: string;
  description: string;
  timestamp: string;
  location: string;
  details?: {
    firstScan?: { date: string; location: string };
    secondScan?: { date: string; location: string };
    distance?: string;
  };
}

// Dynamic data generators
const generateAlerts = (range: TimeRange, method: MethodFilter): Alert[] => {
  const multiplier = method === 'all' ? 1 : 1; // Only QR now
  const baseCount = range === '24h' ? 1 : range === '7d' ? 3 : range === '30d' ? 5 : 8;
  const count = Math.floor(baseCount * multiplier);
  
  const alerts: Alert[] = [
    {
      id: 'alert-001',
      priority: 'high',
      type: 'Re-scan Detected',
      productId: 'AUTH-2024-001-0234',
      productName: 'Saperavi Reserve 2021',
      description: 'Product scanned twice in different locations',
      timestamp: '2 hours ago',
      location: 'Tbilisi, Georgia',
      details: {
        firstScan: { date: 'Jan 10, 14:30', location: 'Batumi, Georgia' },
        secondScan: { date: 'Jan 15, 16:45', location: 'Tbilisi, Georgia' },
        distance: '350 km, 5 days later',
      },
    },
    {
      id: 'alert-002',
      priority: 'medium',
      type: 'Geographic Anomaly',
      productId: 'AUTH-2024-001-0856',
      productName: 'Rkatsiteli Classic 2022',
      description: 'Product scanned outside expected distribution area',
      timestamp: '5 hours ago',
      location: 'Beijing, China',
    },
    {
      id: 'alert-003',
      priority: 'low',
      type: 'Invalid Scan Attempt',
      productId: 'FAKE-CODE-123',
      productName: 'Unknown',
      description: 'Invalid QR code scanned',
      timestamp: '1 day ago',
      location: 'Unknown',
    },
  ];
  
  return alerts.slice(0, Math.max(1, count));
};

const generateVerificationData = (range: TimeRange, method: MethodFilter) => {
  const multiplier = method === 'all' ? 1 : 1; // Only QR now
  
  switch (range) {
    case '24h':
      return Array.from({ length: 24 }, (_, i) => ({
        date: `${i}:00`,
        valid: Math.floor((3 + Math.random() * 2) * multiplier),
        suspicious: Math.floor(Math.random() * 0.5 * multiplier),
        invalid: Math.floor(Math.random() * 0.3 * multiplier),
      }));
    case '7d':
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
        date: day,
        valid: Math.floor((45 + Math.random() * 20) * multiplier),
        suspicious: Math.floor((2 + Math.random() * 2) * multiplier),
        invalid: Math.floor((0.5 + Math.random() * 1) * multiplier),
      }));
    case '30d':
      return Array.from({ length: 7 }, (_, i) => ({
        date: `Jan ${(i + 1) * 5}`,
        valid: Math.floor((45 + i * 10 + Math.random() * 20) * multiplier),
        suspicious: Math.floor((2 + Math.random() * 3) * multiplier),
        invalid: Math.floor((0.5 + Math.random() * 1.5) * multiplier),
      }));
    case '90d':
      return Array.from({ length: 13 }, (_, i) => ({
        date: `Wk ${i + 1}`,
        valid: Math.floor((280 + i * 50 + Math.random() * 100) * multiplier),
        suspicious: Math.floor((15 + Math.random() * 10) * multiplier),
        invalid: Math.floor((3 + Math.random() * 5) * multiplier),
      }));
  }
};

const generateMetrics = (range: TimeRange, method: MethodFilter) => {
  const baseMultiplier = method === 'all' ? 1 : method === 'qr' ? 0.69 : 0.31;
  const timeMultiplier = range === '24h' ? 0.025 : range === '7d' ? 0.2 : range === '30d' ? 1 : 3.8;
  
  const totalVerifications = Math.floor(1120 * baseMultiplier * timeMultiplier);
  const suspiciousCount = Math.floor(12 * baseMultiplier * timeMultiplier);
  const invalidCount = Math.floor(3 * baseMultiplier * timeMultiplier);
  const validCount = totalVerifications - suspiciousCount - invalidCount;
  
  return {
    totalVerifications,
    verificationsChange: 12 + Math.random() * 8,
    authenticRate: ((validCount / totalVerifications) * 100).toFixed(1),
    authenticChange: 0.5 + Math.random() * 1,
    suspiciousCount,
    suspiciousChange: -2 + Math.random() * 4,
    invalidCount,
    invalidChange: -1 + Math.random() * 2,
    healthScore: Math.min(99.5, ((validCount / totalVerifications) * 100) + Math.random() * 2),
  };
};

export default function SecurityMonitoringPage() {
  const [showSettings, setShowSettings] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState('immediate');
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [methodFilter, setMethodFilter] = useState<MethodFilter>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1100);
    return () => clearTimeout(timer);
  }, [timeRange, methodFilter]);

  // Generate dynamic data based on filters
  const alerts = generateAlerts(timeRange, methodFilter);
  const verificationData = generateVerificationData(timeRange, methodFilter);
  const metrics = generateMetrics(timeRange, methodFilter);

  const statusDistribution = [
    { name: 'Authentic', value: metrics.totalVerifications - metrics.suspiciousCount - metrics.invalidCount, color: 'hsl(142, 76%, 36%)' },
    { name: 'Suspicious', value: metrics.suspiciousCount, color: 'hsl(38, 92%, 50%)' },
    { name: 'Invalid', value: metrics.invalidCount, color: 'hsl(0, 84%, 60%)' },
  ];

  const recentActivity = [
    { id: 1, time: '10:30 AM', productId: 'AUTH-2024-001-1234', event: 'Valid Verification', location: 'Tbilisi, Georgia', status: 'valid' },
    { id: 2, time: '10:25 AM', productId: 'AUTH-2024-001-1235', event: 'Valid Verification', location: 'Kakheti, Georgia', status: 'valid' },
    { id: 3, time: '10:15 AM', productId: 'AUTH-2024-001-0234', event: 'Re-scan Detected', location: 'Tbilisi, Georgia', status: 'suspicious' },
    { id: 4, time: '09:45 AM', productId: 'AUTH-2024-001-1236', event: 'Valid Verification', location: 'Batumi, Georgia', status: 'valid' },
    { id: 5, time: '09:30 AM', productId: 'INVALID-CODE', event: 'Invalid Code Scanned', location: 'Unknown', status: 'invalid' },
  ];

  const getTimeRangeLabel = () => {
    switch (timeRange) {
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
        <span>{Math.abs(value).toFixed(1)}%</span>
      </div>
    );
  };

  const getStatusBadge = () => {
    if (metrics.healthScore >= 95) {
      return <Badge className="bg-success/10 text-success border-success/20">🟢 All Clear</Badge>;
    } else if (metrics.healthScore >= 85) {
      return <Badge className="bg-warning/10 text-warning border-warning/20">🟡 Warnings</Badge>;
    } else {
      return <Badge variant="destructive">🔴 Critical</Badge>;
    }
  };

  const getPriorityColor = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-l-destructive bg-destructive/5';
      case 'medium': return 'border-l-4 border-l-warning bg-warning/5';
      case 'low': return 'border-l-4 border-l-primary bg-primary/5';
    }
  };

  const getPriorityBadge = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive">HIGH</Badge>;
      case 'medium': return <Badge className="bg-warning/10 text-warning border-warning/20">MEDIUM</Badge>;
      case 'low': return <Badge variant="secondary">LOW</Badge>;
    }
  };

  const getActivityIcon = (status: string) => {
    switch (status) {
      case 'valid': return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'suspicious': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'invalid': return <XCircle className="h-4 w-4 text-destructive" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background sticky top-0 z-10 backdrop-blur-sm bg-background/95">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
                <span>/</span>
                <span>Security</span>
              </div>
              <h1 className="text-4xl font-bold mb-2">Security Monitoring</h1>
              <p className="text-muted-foreground">Real-time threat detection and verification tracking</p>
            </div>
            <div className="flex items-center gap-3">
              {getStatusBadge()}
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Filters Section */}
        <Card className="p-6 bg-card border-2">
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
                <Clock className="h-3 w-3" />
                {getTimeRangeLabel()}
              </Badge>
              <Badge variant="secondary" className="gap-1">
                {methodFilter === 'all' ? 'All Methods' : methodFilter === 'qr' ? 'QR Codes' : 'NFC Tags'}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Security Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <>
              <SecurityWidgetSkeleton />
              <SecurityWidgetSkeleton />
              <SecurityWidgetSkeleton />
              <SecurityWidgetSkeleton />
            </>
          ) : (
            <>
          <Card className="relative overflow-hidden border-2">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Verifications</span>
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold mb-2">{metrics.totalVerifications.toLocaleString()}</p>
              <div className="flex items-center justify-between">
                {renderTrendBadge(metrics.verificationsChange)}
                <span className="text-xs text-muted-foreground">vs previous</span>
              </div>
            </div>
          </Card>

          <Card className="relative overflow-hidden border-2">
            <div className="absolute top-0 right-0 w-24 h-24 bg-success/5 rounded-full -mr-12 -mt-12" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Authentic Rate</span>
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <p className="text-3xl font-bold text-success mb-2">{metrics.authenticRate}%</p>
              <div className="flex items-center justify-between">
                {renderTrendBadge(metrics.authenticChange)}
                <span className="text-xs text-muted-foreground">vs previous</span>
              </div>
            </div>
          </Card>

          <Card className="relative overflow-hidden border-2">
            <div className="absolute top-0 right-0 w-24 h-24 bg-warning/5 rounded-full -mr-12 -mt-12" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Suspicious</span>
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <p className="text-3xl font-bold text-warning mb-2">{metrics.suspiciousCount}</p>
              <div className="flex items-center justify-between">
                {renderTrendBadge(metrics.suspiciousChange)}
                <span className="text-xs text-muted-foreground">vs previous</span>
              </div>
            </div>
          </Card>

          <Card className="relative overflow-hidden border-2">
            <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/5 rounded-full -mr-12 -mt-12" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Invalid</span>
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <p className="text-3xl font-bold text-destructive mb-2">{metrics.invalidCount}</p>
              <div className="flex items-center justify-between">
                {renderTrendBadge(metrics.invalidChange)}
                <span className="text-xs text-muted-foreground">vs previous</span>
              </div>
            </div>
          </Card>
            </>
          )}
        </div>

        {/* Health Score */}
        <Card className="p-8 bg-card border-2 border-success/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Security Health Score</p>
              <p className="text-6xl font-bold text-success">{metrics.healthScore.toFixed(1)}%</p>
              <div className="flex items-center gap-2 mt-4">
                <Badge className="bg-success/10 text-success border-success/20">
                  🟢 Excellent
                </Badge>
                <span className="text-sm text-muted-foreground">Your security is robust</span>
              </div>
            </div>
            <Shield className="h-32 w-32 text-success opacity-10" />
          </div>
        </Card>

        {/* Active Alerts */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Active Alerts</h2>
            <Badge variant="outline" className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              {alerts.length} active
            </Badge>
          </div>

          {isLoading ? (
            <SecurityListSkeleton />
          ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <Card key={alert.id} className={`p-6 ${getPriorityColor(alert.priority)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 mt-1 flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {getPriorityBadge(alert.priority)}
                        <span className="font-semibold">{alert.type}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {alert.productName} • {alert.productId}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                </div>

                <p className="mb-4">{alert.description}</p>

                {alert.details && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                    {alert.details.firstScan && (
                      <div className="bg-background/50 p-3 rounded-md border">
                        <p className="font-medium mb-1">First Scan</p>
                        <p className="text-muted-foreground">{alert.details.firstScan.date}</p>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.details.firstScan.location}
                        </p>
                      </div>
                    )}
                    {alert.details.secondScan && (
                      <div className="bg-background/50 p-3 rounded-md border">
                        <p className="font-medium mb-1">Second Scan</p>
                        <p className="text-muted-foreground">{alert.details.secondScan.date}</p>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.details.secondScan.location}
                        </p>
                      </div>
                    )}
                    {alert.details.distance && (
                      <div className="md:col-span-2 bg-background/50 p-3 rounded-md border">
                        <p className="font-medium">Distance: <span className="text-warning">{alert.details.distance}</span></p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <Button size="sm">Investigate</Button>
                  <Button size="sm" variant="outline">Mark False Positive</Button>
                  <Button size="sm" variant="destructive">Block Product</Button>
                </div>
              </Card>
            ))}
          </div>
          )}
        </section>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Verification Timeline */}
          <Card className="p-6 lg:col-span-2 border-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Verification Timeline
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{getTimeRangeLabel()}</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={verificationData}>
                <defs>
                  <linearGradient id="validGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '2px solid hsl(var(--border))',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '16px' }} />
                <Area type="monotone" dataKey="valid" stackId="1" stroke="hsl(142, 76%, 36%)" strokeWidth={2} fill="url(#validGradient)" name="Valid" />
                <Area type="monotone" dataKey="suspicious" stackId="1" stroke="hsl(38, 92%, 50%)" strokeWidth={2} fill="hsl(38, 92%, 50%)" fillOpacity={0.3} name="Suspicious" />
                <Area type="monotone" dataKey="invalid" stackId="1" stroke="hsl(0, 84%, 60%)" strokeWidth={2} fill="hsl(0, 84%, 60%)" fillOpacity={0.3} name="Invalid" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Status Distribution */}
          <Card className="p-6 border-2">
            <h3 className="font-semibold text-lg mb-6">Status Distribution</h3>
            
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-3 mt-6">
              {statusDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 border-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-lg">Recent Activity Log</h3>
              <p className="text-sm text-muted-foreground mt-1">Latest verification events</p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Product ID</TableHead>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id} className="hover:bg-muted/50">
                    <TableCell className="text-sm font-medium">{activity.time}</TableCell>
                    <TableCell className="font-mono text-sm">{activity.productId}</TableCell>
                    <TableCell>{activity.event}</TableCell>
                    <TableCell className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {activity.location}
                    </TableCell>
                    <TableCell>{getActivityIcon(activity.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Alert Settings */}
        <Card className="p-6 border-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-full flex items-center justify-between hover:opacity-70 transition-opacity"
          >
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              <h3 className="font-semibold text-lg">Alert Settings</h3>
            </div>
            <Badge variant="outline">{showSettings ? 'Hide' : 'Show'}</Badge>
          </button>

          {showSettings && (
            <div className="mt-6 space-y-6">
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email-alerts" className="text-base font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground mb-3">Choose when to receive email alerts</p>
                  <Tabs value={emailAlerts} onValueChange={setEmailAlerts}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="immediate">Immediate</TabsTrigger>
                      <TabsTrigger value="daily">Daily Digest</TabsTrigger>
                      <TabsTrigger value="off">Off</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-alerts" className="text-base font-medium flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      SMS Alerts
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                  </div>
                  <Switch
                    id="sms-alerts"
                    checked={smsAlerts}
                    onCheckedChange={setSmsAlerts}
                  />
                </div>
              </div>

              <Separator />

              <Button className="w-full">
                <Bell className="h-4 w-4 mr-2" />
                Save Alert Settings
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}