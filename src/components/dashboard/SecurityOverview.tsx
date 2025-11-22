import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  Skull
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const SecurityOverview = () => {
  const navigate = useNavigate();

  // Mock security data
  const security = {
    healthScore: 87,
    healthStatus: 'Good' as 'Excellent' | 'Good' | 'Warning' | 'Critical',
    
    activeAlerts: 3,
    criticalAlerts: 0,
    warningAlerts: 2,
    infoAlerts: 1,
    
    totalVerifications: 4567,
    authenticVerifications: 4489,
    suspiciousScans: 78,
    
    blockedAttempts: 12,
    blockedLast24h: 3,
    
    lastThreat: '2 hours ago',
    lastThreatType: 'Duplicate scan pattern',
    lastThreatLocation: 'Unknown location',
    
    riskLevel: 'Low' as 'Low' | 'Medium' | 'High' | 'Critical',
    
    recentIncidents: [
      { 
        id: 1, 
        type: 'warning', 
        message: 'Multiple scans from same IP', 
        time: '2h ago',
        product: 'Saperavi Reserve 2021'
      },
      { 
        id: 2, 
        type: 'info', 
        message: 'Unusual geographic pattern detected', 
        time: '5h ago',
        product: 'Kindzmarauli Premium'
      },
      { 
        id: 3, 
        type: 'warning', 
        message: 'Rapid succession scans', 
        time: '8h ago',
        product: 'Mukuzani Classic'
      },
    ],
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

  return (
    <Card className="hover-lift border-red-500/20 bg-gradient-to-br from-red-500/5 via-transparent to-transparent">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <CardTitle className="text-lg">Security Monitor</CardTitle>
              <CardDescription>Real-time threat detection</CardDescription>
            </div>
          </div>
          <Badge 
            variant={getRiskBadgeVariant(security.riskLevel)}
            className="gap-1"
          >
            <ShieldCheck className="h-3 w-3" />
            {security.riskLevel} Risk
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        
        {/* Security Health Score - Prominent */}
        <div className={cn(
          "p-4 rounded-lg border-2",
          security.healthScore >= 70 ? "bg-success/5 border-success/20" : "bg-warning/5 border-warning/20"
        )}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-medium text-muted-foreground mb-1">Security Health Score</div>
              <div className={cn("text-3xl font-bold", getHealthColor(security.healthScore))}>
                {security.healthScore}/100
              </div>
            </div>
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              getHealthBgColor(security.healthScore)
            )}>
              <ShieldCheck className={cn("w-8 h-8", getHealthColor(security.healthScore))} />
            </div>
          </div>
          <Progress 
            value={security.healthScore} 
            className={cn(
              "h-2",
              security.healthScore >= 70 ? "[&>div]:bg-success" : "[&>div]:bg-warning"
            )}
          />
          <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
            <TrendingDown className="h-3 w-3 text-success" />
            <span>Threats down 23% this week</span>
          </div>
        </div>

        {/* Active Alerts Summary */}
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
            <div className="flex items-center gap-1.5 text-destructive">
              <AlertOctagon className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Critical</span>
            </div>
            <div className="text-2xl font-bold text-destructive">{security.criticalAlerts}</div>
          </div>

          <div className="space-y-1 p-3 rounded-lg bg-warning/5 border border-warning/20">
            <div className="flex items-center gap-1.5 text-warning">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Warning</span>
            </div>
            <div className="text-2xl font-bold text-warning">{security.warningAlerts}</div>
          </div>

          <div className="space-y-1 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
            <div className="flex items-center gap-1.5 text-blue-500">
              <Activity className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Info</span>
            </div>
            <div className="text-2xl font-bold text-blue-500">{security.infoAlerts}</div>
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
                  {security.authenticVerifications.toLocaleString()} / {security.totalVerifications.toLocaleString()}
                </div>
              </div>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              {((security.authenticVerifications / security.totalVerifications) * 100).toFixed(1)}%
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
              {security.suspiciousScans}
            </Badge>
          </div>

          {/* Blocked Attempts */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-destructive" />
              <div className="text-xs">
                <div className="font-medium">Blocked Attempts</div>
                <div className="text-muted-foreground">{security.blockedLast24h} in last 24h</div>
              </div>
            </div>
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
              {security.blockedAttempts}
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
            {security.recentIncidents.slice(0, 3).map((incident) => (
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
        {security.lastThreat && (
          <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
            <div className="flex items-start gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-xs font-medium text-amber-600">Last Detected Threat</div>
                <div className="text-xs text-muted-foreground mt-1">{security.lastThreatType}</div>
                <div className="text-xs text-muted-foreground">{security.lastThreatLocation}</div>
              </div>
              <div className="text-xs text-muted-foreground">{security.lastThreat}</div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
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
