import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  MapPin,
  Activity,
  TrendingDown,
  AlertCircle
} from 'lucide-react';

type TimeRange = '24h' | '7d' | '30d' | '90d';

interface BatchSecurityProps {
  batchId: string;
}

export function BatchSecurity({ batchId }: BatchSecurityProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  // Mock data - replace with real API call
  const securityData = {
    healthScore: 94,
    totalThreats: 23,
    blockedAttempts: 187,
    activeAlerts: 3,
    recentIncidents: [
      {
        id: 1,
        type: 'Suspicious Pattern',
        severity: 'medium',
        description: 'Multiple rapid scans detected from same IP',
        location: 'Moscow, Russia',
        timestamp: '2024-01-07 14:23',
        status: 'investigating',
        affectedBottles: 5
      },
      {
        id: 2,
        type: 'Authentication Failure',
        severity: 'low',
        description: 'Failed verification attempt on bottle #1234',
        location: 'Tbilisi, Georgia',
        timestamp: '2024-01-07 12:15',
        status: 'resolved',
        affectedBottles: 1
      },
      {
        id: 3,
        type: 'Counterfeit Alert',
        severity: 'high',
        description: 'Duplicate QR code scan detected',
        location: 'Rome, Italy',
        timestamp: '2024-01-07 09:45',
        status: 'blocked',
        affectedBottles: 2
      },
      {
        id: 4,
        type: 'Location Anomaly',
        severity: 'medium',
        description: 'Scan from unexpected geographic location',
        location: 'Shanghai, China',
        timestamp: '2024-01-06 18:30',
        status: 'monitoring',
        affectedBottles: 3
      },
    ],
    threatsByType: [
      { type: 'Duplicate Scans', count: 12, percentage: 52 },
      { type: 'Location Anomalies', count: 6, percentage: 26 },
      { type: 'Failed Verifications', count: 3, percentage: 13 },
      { type: 'Suspicious Patterns', count: 2, percentage: 9 },
    ],
    threatTrend: [
      { date: '2024-01-01', threats: 5 },
      { date: '2024-01-02', threats: 3 },
      { date: '2024-01-03', threats: 7 },
      { date: '2024-01-04', threats: 4 },
      { date: '2024-01-05', threats: 2 },
      { date: '2024-01-06', threats: 1 },
      { date: '2024-01-07', threats: 1 },
    ],
  };

  const timeRangeOptions = [
    { value: '24h' as TimeRange, label: '24 Hours' },
    { value: '7d' as TimeRange, label: '7 Days' },
    { value: '30d' as TimeRange, label: '30 Days' },
    { value: '90d' as TimeRange, label: '90 Days' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'outline';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved': return 'default';
      case 'blocked': return 'destructive';
      case 'investigating': return 'outline';
      case 'monitoring': return 'secondary';
      default: return 'secondary';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="text-lg font-semibold">Security Monitoring</h3>
          <p className="text-sm text-muted-foreground">
            Track threats and protect against counterfeits
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

      {/* Security Health Score */}
      <Card className="bg-gradient-to-br from-background to-accent/20 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Security Health Score</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Overall security status for this batch
              </p>
            </div>
            <div className="text-center">
              <div className={`text-5xl font-bold ${getHealthColor(securityData.healthScore)}`}>
                {securityData.healthScore}
              </div>
              <p className="text-sm text-muted-foreground mt-1">/ 100</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityData.totalThreats}</div>
            <p className="text-xs text-success mt-1 flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              -15% vs previous period
            </p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked Attempts</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityData.blockedAttempts}</div>
            <p className="text-xs text-muted-foreground mt-1">Automatic protection active</p>
          </CardContent>
        </Card>

        <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityData.activeAlerts}</div>
            <p className="text-xs text-warning mt-1">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Threat Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Threat Detection Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityData.threatTrend.map((item, index) => {
              const maxThreats = Math.max(...securityData.threatTrend.map(d => d.threats));
              const width = (item.threats / maxThreats) * 100 || 10;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{item.date}</span>
                    <Badge variant={item.threats > 5 ? 'destructive' : 'secondary'}>
                      {item.threats} threat{item.threats !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <div className="h-6 bg-muted rounded-lg overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-700 ${
                        item.threats > 5 ? 'bg-destructive' : 'bg-success'
                      }`}
                      style={{ 
                        width: `${width}%`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Threats by Type */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Threats by Type
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {securityData.threatsByType.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.type}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{item.count} incidents</span>
                  <Badge variant="outline">{item.percentage}%</Badge>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-warning to-destructive transition-all duration-700"
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

      {/* Recent Security Incidents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Security Incidents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {securityData.recentIncidents.map((incident) => (
            <div 
              key={incident.id}
              className="p-4 border rounded-lg hover:bg-accent/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className={`h-4 w-4 ${getSeverityColor(incident.severity)}`} />
                    <h4 className="font-semibold">{incident.type}</h4>
                    <Badge variant={getSeverityBadge(incident.severity)}>
                      {incident.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{incident.description}</p>
                </div>
                <Badge variant={getStatusBadge(incident.status)}>
                  {incident.status}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {incident.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {incident.timestamp}
                </div>
                <div className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {incident.affectedBottles} bottle{incident.affectedBottles !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
