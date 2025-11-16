import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  AlertTriangle, CheckCircle2, XCircle, Shield, TrendingUp,
  MapPin, Download, Settings, Bell, Mail, Smartphone
} from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { LanguageSelector } from '@/components/LanguageSelector';

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

const mockAlerts: Alert[] = [
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

const verificationData = [
  { date: 'Jan 1', valid: 45, suspicious: 2, invalid: 1 },
  { date: 'Jan 5', valid: 58, suspicious: 3, invalid: 0 },
  { date: 'Jan 10', valid: 72, suspicious: 5, invalid: 1 },
  { date: 'Jan 15', valid: 65, suspicious: 4, invalid: 2 },
  { date: 'Jan 20', valid: 89, suspicious: 6, invalid: 1 },
  { date: 'Jan 25', valid: 94, suspicious: 3, invalid: 0 },
  { date: 'Jan 30', valid: 102, suspicious: 4, invalid: 1 },
];

const statusDistribution = [
  { name: 'Authentic', value: 1105, color: 'hsl(142, 76%, 36%)' },
  { name: 'Suspicious', value: 12, color: 'hsl(38, 92%, 50%)' },
  { name: 'Invalid', value: 3, color: 'hsl(0, 84%, 60%)' },
];

const recentActivity = [
  { id: 1, time: '10:30 AM', productId: 'AUTH-2024-001-1234', event: 'Valid Verification', location: 'Tbilisi, Georgia', status: 'valid' },
  { id: 2, time: '10:25 AM', productId: 'AUTH-2024-001-1235', event: 'Valid Verification', location: 'Kakheti, Georgia', status: 'valid' },
  { id: 3, time: '10:15 AM', productId: 'AUTH-2024-001-0234', event: 'Re-scan Detected', location: 'Tbilisi, Georgia', status: 'suspicious' },
  { id: 4, time: '09:45 AM', productId: 'AUTH-2024-001-1236', event: 'Valid Verification', location: 'Batumi, Georgia', status: 'valid' },
  { id: 5, time: '09:30 AM', productId: 'INVALID-CODE', event: 'Invalid Code Scanned', location: 'Unknown', status: 'invalid' },
];

export default function SecurityMonitoringPage() {
  const [showSettings, setShowSettings] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState('immediate');
  const [smsAlerts, setSmsAlerts] = useState(true);

  const healthScore = 98.7;
  const totalVerifications = 1120;
  const authenticRate = 98.7;
  const suspiciousCount = 12;
  const invalidCount = 3;

  const getStatusBadge = () => {
    if (healthScore >= 95) {
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">🟢 All Clear</Badge>;
    } else if (healthScore >= 85) {
      return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">🟡 Warnings</Badge>;
    } else {
      return <Badge variant="destructive">🔴 Critical</Badge>;
    }
  };

  const getPriorityColor = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20';
      case 'medium': return 'border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-950/20';
      case 'low': return 'border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950/20';
    }
  };

  const getPriorityBadge = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive">HIGH</Badge>;
      case 'medium': return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">MEDIUM</Badge>;
      case 'low': return <Badge variant="secondary">LOW</Badge>;
    }
  };

  const getActivityIcon = (status: string) => {
    switch (status) {
      case 'valid': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'suspicious': return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case 'invalid': return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
                <span>/</span>
                <span>Security</span>
              </div>
              <h1 className="text-2xl font-bold">Security Monitoring</h1>
              <p className="text-sm text-muted-foreground">Real-time security alerts and verification tracking</p>
            </div>
            <div className="flex items-center gap-3">
              {getStatusBadge()}
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Active Alerts */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Active Alerts</h2>
            <Badge variant="outline">{mockAlerts.length} active</Badge>
          </div>

          <div className="space-y-4">
            {mockAlerts.map((alert) => (
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
                      <div className="bg-background/50 p-3 rounded-md">
                        <p className="font-medium mb-1">First Scan</p>
                        <p className="text-muted-foreground">{alert.details.firstScan.date}</p>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.details.firstScan.location}
                        </p>
                      </div>
                    )}
                    {alert.details.secondScan && (
                      <div className="bg-background/50 p-3 rounded-md">
                        <p className="font-medium mb-1">Second Scan</p>
                        <p className="text-muted-foreground">{alert.details.secondScan.date}</p>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.details.secondScan.location}
                        </p>
                      </div>
                    )}
                    {alert.details.distance && (
                      <div className="md:col-span-2 bg-background/50 p-3 rounded-md">
                        <p className="font-medium">Distance: <span className="text-amber-600">{alert.details.distance}</span></p>
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
        </section>

        {/* Security Statistics */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Security Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Total Verifications</span>
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold">{totalVerifications.toLocaleString()}</p>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3" />
                +15% from last month
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Authentic Rate</span>
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-3xl font-bold text-green-600">{authenticRate}%</p>
              <p className="text-xs text-muted-foreground mt-2">Excellent security health</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Suspicious</span>
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
              <p className="text-3xl font-bold text-amber-600">{suspiciousCount}</p>
              <p className="text-xs text-muted-foreground mt-2">{((suspiciousCount / totalVerifications) * 100).toFixed(1)}% of total</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Invalid</span>
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-3xl font-bold text-red-600">{invalidCount}</p>
              <p className="text-xs text-muted-foreground mt-2">{((invalidCount / totalVerifications) * 100).toFixed(1)}% of total</p>
            </Card>
          </div>
        </section>

        {/* Health Score */}
        <section>
          <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Security Health Score</p>
                <p className="text-5xl font-bold text-green-600">{healthScore}%</p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    🟢 Excellent
                  </Badge>
                  <span className="text-sm text-muted-foreground">Your security health is strong</span>
                </div>
              </div>
              <Shield className="h-24 w-24 text-green-600 opacity-20" />
            </div>
          </Card>
        </section>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Verification Timeline */}
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Verification Timeline</h3>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={verificationData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--background))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="valid" stackId="1" stroke="hsl(142, 76%, 36%)" fill="hsl(142, 76%, 36%)" name="Valid" />
                <Area type="monotone" dataKey="suspicious" stackId="1" stroke="hsl(38, 92%, 50%)" fill="hsl(38, 92%, 50%)" name="Suspicious" />
                <Area type="monotone" dataKey="invalid" stackId="1" stroke="hsl(0, 84%, 60%)" fill="hsl(0, 84%, 60%)" name="Invalid" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Status Distribution */}
          <Card className="p-6">
            <h3 className="font-semibold mb-6">Status Distribution</h3>
            
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-2 mt-4">
              {statusDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <section>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Recent Activity Log</h3>
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
                    <TableRow key={activity.id}>
                      <TableCell className="text-sm">{activity.time}</TableCell>
                      <TableCell className="font-mono text-sm">{activity.productId}</TableCell>
                      <TableCell>{activity.event}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{activity.location}</TableCell>
                      <TableCell>{getActivityIcon(activity.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </section>

        {/* Alert Settings */}
        <section>
          <Card className="p-6">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5" />
                <h3 className="font-semibold">Alert Settings</h3>
              </div>
              <span className="text-muted-foreground">{showSettings ? '−' : '+'}</span>
            </button>

            {showSettings && (
              <div className="mt-6 space-y-6">
                <Separator />
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email-frequency" className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4" />
                      Email Alerts
                    </Label>
                    <Select value={emailAlerts} onValueChange={setEmailAlerts}>
                      <SelectTrigger id="email-frequency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Summary</SelectItem>
                        <SelectItem value="off">Off</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms-alerts" className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      SMS Alerts (Critical Only)
                    </Label>
                    <Switch
                      id="sms-alerts"
                      checked={smsAlerts}
                      onCheckedChange={setSmsAlerts}
                    />
                  </div>

                  <Separator />

                  <div>
                    <Label className="mb-2 block">Alert Thresholds</Label>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Re-scan threshold</span>
                        <span className="font-medium">After 1 scan</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Geographic distance</span>
                        <span className="font-medium">&gt; 100 km</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Time between scans</span>
                        <span className="font-medium">&lt; 24 hours</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button className="w-full">Save Settings</Button>
              </div>
            )}
          </Card>
        </section>
      </div>
    </div>
  );
}
