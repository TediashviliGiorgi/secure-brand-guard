import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  Activity,
  Lock,
  AlertOctagon,
  Eye,
  Clock,
  ArrowRight,
  TrendingDown,
  Bell,
  ShieldCheck,
  Skull,
  QrCode,
  Radio,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { SecurityWidgetSkeleton, SecurityAlertSkeleton } from '@/components/ui/security-widget-skeleton';

type TimeRange = '24h' | '7d' | '30d' | '90d';

// Mock security data generator for different time ranges
const generateSecurityData = (timeRange: TimeRange, method: 'all' | 'qr' | 'nfc') => {
  const baseMultiplier = method === 'all' ? 1 : method === 'qr' ? 0.69 : 0.31;
  const timeMultiplier = timeRange === '24h' ? 0.1 : timeRange === '7d' ? 1 : timeRange === '30d' ? 4.2 : 12.8;
  
  const totalVerifications = Math.floor(2690 * baseMultiplier * timeMultiplier);
  const authenticVerifications = Math.floor(totalVerifications * 0.968);
  const suspiciousScans = totalVerifications - authenticVerifications;
  const blockedAttempts = Math.floor(suspiciousScans * 0.547);
  
  const healthScore = method === 'nfc' ? 98 : method === 'qr' ? 92 : 94;
  
  return {
    healthScore,
    riskLevel: healthScore >= 90 ? 'Low' as const : healthScore >= 70 ? 'Medium' as const : 'High' as const,
    criticalAlerts: method === 'nfc' ? 1 : method === 'qr' ? 1 : 2,
    warningAlerts: method === 'nfc' ? 1 : method === 'qr' ? 4 : 5,
    infoAlerts: method === 'nfc' ? 3 : method === 'qr' ? 5 : 8,
    totalVerifications,
    authenticVerifications,
    suspiciousScans,
    blockedAttempts,
    blockedLast24h: Math.floor(blockedAttempts * 0.255),
    lastThreat: timeRange === '24h' ? '30 min ago' : '2 hours ago',
    lastThreatType: method === 'qr' ? 'QR code screenshot fraud' : method === 'nfc' ? 'Tag manipulation attempt' : 'Counterfeit attempt detected',
    lastThreatLocation: method === 'nfc' ? 'Western Europe' : method === 'qr' ? 'Asia Pacific' : 'Southeast Asia',
    recentIncidents: method === 'qr' ? [
      { id: 1, type: 'warning', message: 'QR code screenshot detected', time: '1h ago', product: 'Saperavi Reserve 2021' },
      { id: 2, type: 'critical', message: 'Cloned QR code identified', time: '4h ago', product: 'Kindzmarauli Premium' },
      { id: 3, type: 'info', message: 'High scan velocity pattern', time: '7h ago', product: 'Mukuzani Classic' },
    ] : method === 'nfc' ? [
      { id: 1, type: 'warning', message: 'Unauthorized NFC read attempt', time: '3h ago', product: 'Premium Saperavi' },
      { id: 2, type: 'critical', message: 'Potential tag cloning detected', time: '6h ago', product: 'Limited Edition' },
      { id: 3, type: 'info', message: 'Rapid successive scans', time: '12h ago', product: 'Classic Collection' },
    ] : [
      { id: 1, type: 'warning', message: 'Unusual scan pattern from multiple IPs', time: '2h ago', product: 'Saperavi Reserve 2021' },
      { id: 2, type: 'critical', message: 'Multiple failed verifications detected', time: '5h ago', product: 'Kindzmarauli Premium' },
      { id: 3, type: 'info', message: 'New device registration spike', time: '8h ago', product: 'Mukuzani Classic' },
    ],
  };
};

export const SecurityOverview = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [activeMethod, setActiveMethod] = useState<'all' | 'qr' | 'nfc'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, [timeRange, activeMethod]);

  // Generate dynamic security data based on selected time range
  const security = {
    all: generateSecurityData(timeRange, 'all'),
    qr: generateSecurityData(timeRange, 'qr'),
    nfc: generateSecurityData(timeRange, 'nfc'),
  };

  const getTimeRangeLabel = (range: TimeRange) => {
    switch (range) {
      case '24h': return 'Last 24 Hours';
      case '7d': return 'Last 7 Days';
      case '30d': return 'Last 30 Days';
      case '90d': return 'Last 90 Days';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-green-500';
    if (score >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const getHealthBgColor = (score: number) => {
    if (score >= 90) return 'bg-success/10';
    if (score >= 70) return 'bg-green-500/10';
    if (score >= 50) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case 'Low': return 'default';
      case 'Medium': return 'secondary';
      case 'High': return 'destructive';
      case 'Critical': return 'destructive';
      default: return 'default';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'info': return <Activity className="h-4 w-4 text-blue-500" />;
      default: return <CheckCircle2 className="h-4 w-4 text-success" />;
    }
  };

  const renderSecuritySection = (data: typeof security.all) => {
    if (isLoading) {
      return (
        <>
          <SecurityWidgetSkeleton />
          <div className="grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2 p-3 rounded-lg skeleton h-20" />
            ))}
          </div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <SecurityAlertSkeleton key={i} />
            ))}
          </div>
        </>
      );
    }

    return (
    <>
      {/* Security Health Score - Prominent */}
      <div className={cn(
        "p-4 rounded-lg border-2",
        data.healthScore >= 70 ? "bg-success/5 border-success/20" : "bg-warning/5 border-warning/20"
      )}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-1">Security Health Score</div>
            <div className={cn("text-3xl font-bold", getHealthColor(data.healthScore))}>
              {data.healthScore}/100
            </div>
          </div>
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center",
            getHealthBgColor(data.healthScore)
          )}>
            <ShieldCheck className={cn("w-8 h-8", getHealthColor(data.healthScore))} />
          </div>
        </div>
        <Progress 
          value={data.healthScore} 
          className={cn(
            "h-2",
            data.healthScore >= 70 ? "[&>div]:bg-success" : "[&>div]:bg-warning"
          )}
        />
          <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
          <TrendingDown className="h-3 w-3 text-success" />
          <span>Threats down 23% in {getTimeRangeLabel(timeRange).toLowerCase()}</span>
        </div>
      </div>

      {/* Active Alerts Summary */}
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
          <div className="flex items-center gap-1.5 text-destructive">
            <AlertOctagon className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">Critical</span>
          </div>
          <div className="text-2xl font-bold text-destructive">{data.criticalAlerts}</div>
        </div>

        <div className="space-y-1 p-3 rounded-lg bg-warning/5 border border-warning/20">
          <div className="flex items-center gap-1.5 text-warning">
            <AlertTriangle className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">Warning</span>
          </div>
          <div className="text-2xl font-bold text-warning">{data.warningAlerts}</div>
        </div>

        <div className="space-y-1 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
          <div className="flex items-center gap-1.5 text-blue-500">
            <Activity className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">Info</span>
          </div>
          <div className="text-2xl font-bold text-blue-500">{data.infoAlerts}</div>
        </div>
      </div>

      {/* Key Security Metrics */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium flex items-center gap-2">
          <Eye className="h-4 w-4 text-red-500" />
          Security Metrics
        </h4>
        
        {/* Verification Success Rate */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <div className="text-xs">
              <div className="font-medium">Authentic Verifications</div>
              <div className="text-muted-foreground">
                {data.authenticVerifications.toLocaleString()} / {data.totalVerifications.toLocaleString()}
              </div>
            </div>
          </div>
          <Badge variant="outline" className="bg-success/10 text-success border-success/20">
            {((data.authenticVerifications / data.totalVerifications) * 100).toFixed(1)}%
          </Badge>
        </div>

        {/* Suspicious Activity */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
          <div className="flex items-center gap-2">
            <Skull className="h-4 w-4 text-warning" />
            <div className="text-xs">
              <div className="font-medium">Suspicious Scans</div>
              <div className="text-muted-foreground">Flagged for review</div>
            </div>
          </div>
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
            {data.suspiciousScans}
          </Badge>
        </div>

        {/* Blocked Attempts */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-destructive" />
            <div className="text-xs">
              <div className="font-medium">Blocked Attempts</div>
              <div className="text-muted-foreground">{data.blockedLast24h} in last 24h</div>
            </div>
          </div>
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
            {data.blockedAttempts}
          </Badge>
        </div>
      </div>

      {/* Recent Security Incidents */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Bell className="h-4 w-4 text-red-500" />
            Recent Alerts
          </h4>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard/security')}
            className="h-6 text-xs"
          >
            View All
          </Button>
        </div>
        
        <div className="space-y-2">
          {data.recentIncidents.slice(0, 3).map((incident) => (
            <Alert key={incident.id} className="py-2 px-3">
              <div className="flex items-start gap-2">
                {getAlertIcon(incident.type)}
                <div className="flex-1 space-y-0.5">
                  <AlertDescription className="text-xs font-medium">
                    {incident.message}
                  </AlertDescription>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{incident.time}</span>
                    <span>•</span>
                    <span className="truncate">{incident.product}</span>
                  </div>
                </div>
              </div>
            </Alert>
          ))}
        </div>
      </div>

      {/* Last Threat Info */}
      {data.lastThreat && (
        <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
          <div className="flex items-start gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
            <div className="flex-1">
              <div className="text-xs font-medium text-amber-600">Last Detected Threat</div>
              <div className="text-xs text-muted-foreground mt-1">{data.lastThreatType}</div>
              <div className="text-xs text-muted-foreground">{data.lastThreatLocation}</div>
            </div>
            <div className="text-xs text-muted-foreground">{data.lastThreat}</div>
          </div>
        </div>
      )}
    </>
    );
  };

  return (
    <Card className="border-red-500/20 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Security Monitor</CardTitle>
              <CardDescription>Threat detection by method</CardDescription>
            </div>
          </div>
          <Badge 
            variant={getRiskBadgeVariant(security.all.riskLevel)}
            className="gap-1"
          >
            <ShieldCheck className="h-3 w-3" />
            {security.all.riskLevel} Risk
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
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="all" className="gap-2 text-xs">
              <Shield className="h-3.5 w-3.5" />
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
            {renderSecuritySection(security.all)}
          </TabsContent>

          <TabsContent value="qr" className="space-y-4">
            {renderSecuritySection(security.qr)}
          </TabsContent>

          <TabsContent value="nfc" className="space-y-4">
            {renderSecuritySection(security.nfc)}
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/dashboard/security')}
            className="w-full"
          >
            Security Center
            <ArrowRight className="ml-2 h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            disabled
            className="w-full"
          >
            Configure Alerts
          </Button>
        </div>

      </CardContent>
    </Card>
  );
};
