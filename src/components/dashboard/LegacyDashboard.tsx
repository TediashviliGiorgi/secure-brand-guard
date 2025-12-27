import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Shield, LogOut, QrCode, Package, BarChart3, Settings, Plus, FileText, 
  Crown, Database, Users, AlertTriangle, Activity, Clock, CheckCircle,
  XCircle, RefreshCw, Download, Upload, Search, Filter, ChevronRight,
  Server, HardDrive, Cpu, MemoryStick, Gauge, Bell, Lock, Eye,
  Layers, Grid3X3, List, Calendar, TrendingUp, TrendingDown, Minus
} from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { TemplateSwitcher } from '@/components/dashboard/TemplateSwitcher';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for legacy enterprise display
const systemStatus = {
  database: { status: 'online', latency: '12ms', connections: 847 },
  api: { status: 'online', requests: '2.4M/day', uptime: '99.97%' },
  storage: { used: 78.4, total: 500, unit: 'GB' },
  memory: { used: 62, total: 100, unit: '%' },
  cpu: { usage: 34, cores: 8 },
};

const recentEvents = [
  { id: 1, type: 'success', message: 'Batch #B-2024-0892 verification completed', time: '2 min ago', code: 'VRF-001' },
  { id: 2, type: 'warning', message: 'High scan volume detected in region EU-WEST', time: '5 min ago', code: 'ALT-003' },
  { id: 3, type: 'success', message: 'New batch created: Premium Reserve 2019', time: '12 min ago', code: 'BCH-NEW' },
  { id: 4, type: 'error', message: 'Failed authentication attempt blocked', time: '18 min ago', code: 'SEC-401' },
  { id: 5, type: 'info', message: 'System backup completed successfully', time: '1 hour ago', code: 'SYS-BKP' },
  { id: 6, type: 'success', message: 'QR codes generated for batch #B-2024-0891', time: '2 hours ago', code: 'QR-GEN' },
  { id: 7, type: 'warning', message: 'Certificate renewal required in 30 days', time: '3 hours ago', code: 'CRT-RNW' },
  { id: 8, type: 'info', message: 'Monthly analytics report generated', time: '5 hours ago', code: 'RPT-001' },
];

const batchQueue = [
  { id: 'B-2024-0893', name: 'Château Margaux 2020', status: 'processing', progress: 67, bottles: 2400 },
  { id: 'B-2024-0894', name: 'Dom Pérignon Vintage', status: 'queued', progress: 0, bottles: 1200 },
  { id: 'B-2024-0895', name: 'Opus One Reserve', status: 'queued', progress: 0, bottles: 800 },
  { id: 'B-2024-0896', name: 'Penfolds Grange', status: 'pending', progress: 0, bottles: 600 },
];

const quickStats = [
  { label: 'Total Batches', value: '1,247', change: '+12', trend: 'up' },
  { label: 'Active Codes', value: '847,293', change: '+2,847', trend: 'up' },
  { label: 'Verifications (24h)', value: '12,847', change: '-847', trend: 'down' },
  { label: 'Fraud Attempts', value: '23', change: '0', trend: 'neutral' },
  { label: 'API Calls (24h)', value: '2.4M', change: '+127K', trend: 'up' },
  { label: 'Active Sessions', value: '847', change: '+23', trend: 'up' },
];

export function LegacyDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-3 w-3 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-3 w-3 text-yellow-600" />;
      case 'error': return <XCircle className="h-3 w-3 text-red-600" />;
      default: return <Activity className="h-3 w-3 text-blue-600" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-red-600" />;
      default: return <Minus className="h-3 w-3 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 font-mono text-sm">
      {/* Legacy Header Bar */}
      <header className="bg-card border-b-2 border-border sticky top-0 z-50">
        <div className="flex items-center justify-between px-2 py-1 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-bold">
              <Shield className="h-3 w-3" />
              AUTHIT
            </div>
            <span className="text-xs text-muted-foreground">v3.2.1 | Enterprise Edition</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Session: {user?.companyName || 'ADMIN'} | 
              <Clock className="h-3 w-3 inline mx-1" />
              {new Date().toLocaleTimeString()}
            </span>
            <TemplateSwitcher />
            <LanguageSelector />
            <ThemeSwitcher />
            <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={logout}>
              <LogOut className="h-3 w-3 mr-1" />
              LOGOUT
            </Button>
          </div>
        </div>
        
        {/* Menu Bar */}
        <div className="flex items-center gap-1 px-2 py-1 bg-muted/50">
          <Button variant="ghost" size="sm" className="h-6 text-xs px-2" onClick={() => navigate('/dashboard')}>
            <Package className="h-3 w-3 mr-1" />
            Dashboard
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <Button variant="ghost" size="sm" className="h-6 text-xs px-2" onClick={() => navigate('/dashboard/batches')}>
            <Layers className="h-3 w-3 mr-1" />
            Batches
          </Button>
          <Button variant="ghost" size="sm" className="h-6 text-xs px-2" onClick={() => navigate('/dashboard/batches/create')}>
            <Plus className="h-3 w-3 mr-1" />
            New Batch
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <Button variant="ghost" size="sm" className="h-6 text-xs px-2" onClick={() => navigate('/dashboard/analytics')}>
            <BarChart3 className="h-3 w-3 mr-1" />
            Analytics
          </Button>
          <Button variant="ghost" size="sm" className="h-6 text-xs px-2" onClick={() => navigate('/dashboard/security')}>
            <Shield className="h-3 w-3 mr-1" />
            Security
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <Button variant="ghost" size="sm" className="h-6 text-xs px-2" onClick={() => navigate('/dashboard/settings')}>
            <Settings className="h-3 w-3 mr-1" />
            Settings
          </Button>
          <Button variant="ghost" size="sm" className="h-6 text-xs px-2" onClick={() => navigate('/dashboard/admin')}>
            <Crown className="h-3 w-3 mr-1" />
            Admin
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-1">
            <Input 
              placeholder="Search batches, codes..." 
              className="h-6 text-xs w-48"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline" size="sm" className="h-6 text-xs px-2">
              <Search className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar - System Status */}
        <aside className="w-64 border-r border-border bg-card min-h-[calc(100vh-80px)] p-2">
          <div className="mb-4">
            <h3 className="text-xs font-bold uppercase text-muted-foreground mb-2 flex items-center gap-1">
              <Server className="h-3 w-3" />
              System Status
            </h3>
            <div className="space-y-2">
              <div className="p-2 border border-border rounded bg-muted/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs flex items-center gap-1">
                    <Database className="h-3 w-3" />
                    Database
                  </span>
                  <Badge variant="outline" className="h-4 text-[10px] bg-green-500/10 text-green-600 border-green-500/30">
                    ONLINE
                  </Badge>
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Latency: {systemStatus.database.latency} | Conn: {systemStatus.database.connections}
                </div>
              </div>
              
              <div className="p-2 border border-border rounded bg-muted/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    API Gateway
                  </span>
                  <Badge variant="outline" className="h-4 text-[10px] bg-green-500/10 text-green-600 border-green-500/30">
                    {systemStatus.api.uptime}
                  </Badge>
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Requests: {systemStatus.api.requests}
                </div>
              </div>
              
              <div className="p-2 border border-border rounded bg-muted/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs flex items-center gap-1">
                    <HardDrive className="h-3 w-3" />
                    Storage
                  </span>
                  <span className="text-[10px]">{systemStatus.storage.used}/{systemStatus.storage.total} GB</span>
                </div>
                <Progress value={(systemStatus.storage.used / systemStatus.storage.total) * 100} className="h-1" />
              </div>
              
              <div className="p-2 border border-border rounded bg-muted/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs flex items-center gap-1">
                    <Cpu className="h-3 w-3" />
                    CPU ({systemStatus.cpu.cores} cores)
                  </span>
                  <span className="text-[10px]">{systemStatus.cpu.usage}%</span>
                </div>
                <Progress value={systemStatus.cpu.usage} className="h-1" />
              </div>
              
              <div className="p-2 border border-border rounded bg-muted/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs flex items-center gap-1">
                    <Gauge className="h-3 w-3" />
                    Memory
                  </span>
                  <span className="text-[10px]">{systemStatus.memory.used}%</span>
                </div>
                <Progress value={systemStatus.memory.used} className="h-1" />
              </div>
            </div>
          </div>

          <Separator className="my-3" />
          
          <div>
            <h3 className="text-xs font-bold uppercase text-muted-foreground mb-2 flex items-center gap-1">
              <Layers className="h-3 w-3" />
              Batch Queue
            </h3>
            <ScrollArea className="h-48">
              <div className="space-y-2">
                {batchQueue.map((batch) => (
                  <div key={batch.id} className="p-2 border border-border rounded bg-muted/30 text-[10px]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-mono font-bold">{batch.id}</span>
                      <Badge 
                        variant="outline" 
                        className={`h-4 text-[9px] ${
                          batch.status === 'processing' ? 'bg-blue-500/10 text-blue-600 border-blue-500/30' :
                          batch.status === 'queued' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/30' :
                          'bg-muted text-muted-foreground'
                        }`}
                      >
                        {batch.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground truncate mb-1">{batch.name}</div>
                    {batch.status === 'processing' && (
                      <Progress value={batch.progress} className="h-1" />
                    )}
                    <div className="text-muted-foreground mt-1">{batch.bottles.toLocaleString()} bottles</div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* Main Panel */}
        <main className="flex-1 p-4">
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-6 gap-2 mb-4">
            {quickStats.map((stat, idx) => (
              <div key={idx} className="p-2 border border-border rounded bg-card">
                <div className="text-[10px] text-muted-foreground uppercase">{stat.label}</div>
                <div className="text-lg font-bold font-mono">{stat.value}</div>
                <div className="flex items-center gap-1 text-[10px]">
                  {getTrendIcon(stat.trend)}
                  <span className={
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 
                    'text-muted-foreground'
                  }>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Tabbed Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="h-8">
              <TabsTrigger value="overview" className="text-xs h-6">
                <Grid3X3 className="h-3 w-3 mr-1" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="batches" className="text-xs h-6">
                <Package className="h-3 w-3 mr-1" />
                Batches
              </TabsTrigger>
              <TabsTrigger value="security" className="text-xs h-6">
                <Shield className="h-3 w-3 mr-1" />
                Security
              </TabsTrigger>
              <TabsTrigger value="reports" className="text-xs h-6">
                <FileText className="h-3 w-3 mr-1" />
                Reports
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {/* Action Toolbar */}
              <div className="flex items-center gap-2 p-2 border border-border rounded bg-card">
                <Button size="sm" className="h-7 text-xs" onClick={() => navigate('/dashboard/batches/create')}>
                  <Plus className="h-3 w-3 mr-1" />
                  New Batch
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <Upload className="h-3 w-3 mr-1" />
                  Import
                </Button>
                <Separator orientation="vertical" className="h-5" />
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <Filter className="h-3 w-3 mr-1" />
                  Filters
                </Button>
                <div className="flex-1" />
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <Grid3X3 className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <List className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Recent Activity Log */}
                <div className="border border-border rounded bg-card">
                  <div className="p-2 border-b border-border bg-muted/50 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      System Event Log
                    </span>
                    <Button variant="ghost" size="sm" className="h-5 text-[10px] px-2">
                      View All <ChevronRight className="h-3 w-3" />
                    </Button>
                  </div>
                  <ScrollArea className="h-64">
                    <div className="divide-y divide-border">
                      {recentEvents.map((event) => (
                        <div key={event.id} className="p-2 hover:bg-muted/30 transition-colors">
                          <div className="flex items-start gap-2">
                            {getStatusIcon(event.type)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <code className="text-[10px] px-1 bg-muted rounded">{event.code}</code>
                                <span className="text-[10px] text-muted-foreground">{event.time}</span>
                              </div>
                              <p className="text-xs truncate">{event.message}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Quick Actions Panel */}
                <div className="border border-border rounded bg-card">
                  <div className="p-2 border-b border-border bg-muted/50">
                    <span className="text-xs font-bold uppercase flex items-center gap-1">
                      <Settings className="h-3 w-3" />
                      Quick Actions
                    </span>
                  </div>
                  <div className="p-3 grid grid-cols-2 gap-2">
                    <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => navigate('/dashboard/batches/create')}>
                      <Plus className="h-4 w-4" />
                      <span className="text-xs">Create Batch</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => navigate('/dashboard/batches')}>
                      <Package className="h-4 w-4" />
                      <span className="text-xs">View Batches</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => navigate('/dashboard/analytics')}>
                      <BarChart3 className="h-4 w-4" />
                      <span className="text-xs">Analytics</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => navigate('/dashboard/security')}>
                      <Shield className="h-4 w-4" />
                      <span className="text-xs">Security</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-3 flex-col gap-1">
                      <QrCode className="h-4 w-4" />
                      <span className="text-xs">Scan Codes</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-3 flex-col gap-1">
                      <Download className="h-4 w-4" />
                      <span className="text-xs">Export Data</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-3 flex-col gap-1">
                      <Users className="h-4 w-4" />
                      <span className="text-xs">Users</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => navigate('/dashboard/admin')}>
                      <Crown className="h-4 w-4" />
                      <span className="text-xs">Admin Panel</span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bottom Panels */}
              <div className="grid grid-cols-3 gap-4">
                {/* Alerts Panel */}
                <div className="border border-border rounded bg-card">
                  <div className="p-2 border-b border-border bg-muted/50 flex items-center gap-1">
                    <Bell className="h-3 w-3" />
                    <span className="text-xs font-bold uppercase">Active Alerts</span>
                    <Badge className="ml-auto h-4 text-[10px]">3</Badge>
                  </div>
                  <div className="p-2 space-y-2">
                    <div className="p-2 border-l-2 border-yellow-500 bg-yellow-500/5 text-xs">
                      <div className="font-bold">Certificate Expiry Warning</div>
                      <div className="text-[10px] text-muted-foreground">SSL certificate expires in 30 days</div>
                    </div>
                    <div className="p-2 border-l-2 border-blue-500 bg-blue-500/5 text-xs">
                      <div className="font-bold">High Traffic Notice</div>
                      <div className="text-[10px] text-muted-foreground">Above average scan activity</div>
                    </div>
                    <div className="p-2 border-l-2 border-green-500 bg-green-500/5 text-xs">
                      <div className="font-bold">Backup Complete</div>
                      <div className="text-[10px] text-muted-foreground">Daily backup finished successfully</div>
                    </div>
                  </div>
                </div>

                {/* Security Overview */}
                <div className="border border-border rounded bg-card">
                  <div className="p-2 border-b border-border bg-muted/50 flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    <span className="text-xs font-bold uppercase">Security Status</span>
                  </div>
                  <div className="p-2 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span>Threat Level</span>
                      <Badge variant="outline" className="h-4 text-[10px] bg-green-500/10 text-green-600">LOW</Badge>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span>Blocked Attempts (24h)</span>
                      <span className="font-mono">23</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span>Active Sessions</span>
                      <span className="font-mono">847</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span>Last Audit</span>
                      <span className="font-mono">2h ago</span>
                    </div>
                    <Separator />
                    <Button variant="outline" size="sm" className="w-full h-6 text-xs" onClick={() => navigate('/dashboard/security')}>
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Upcoming Tasks */}
                <div className="border border-border rounded bg-card">
                  <div className="p-2 border-b border-border bg-muted/50 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span className="text-xs font-bold uppercase">Scheduled Tasks</span>
                  </div>
                  <div className="p-2 space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="flex-1">Database Backup</span>
                      <span className="text-muted-foreground">02:00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="flex-1">Report Generation</span>
                      <span className="text-muted-foreground">06:00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="flex-1">Certificate Check</span>
                      <span className="text-muted-foreground">12:00</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="flex-1">Analytics Sync</span>
                      <span className="text-muted-foreground">18:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="batches">
              <div className="border border-border rounded bg-card p-4">
                <p className="text-center text-muted-foreground">
                  Navigate to{' '}
                  <Button variant="link" className="p-0 h-auto text-xs" onClick={() => navigate('/dashboard/batches')}>
                    Batches Management
                  </Button>
                  {' '}for full batch controls.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="border border-border rounded bg-card p-4">
                <p className="text-center text-muted-foreground">
                  Navigate to{' '}
                  <Button variant="link" className="p-0 h-auto text-xs" onClick={() => navigate('/dashboard/security')}>
                    Security Monitoring
                  </Button>
                  {' '}for full security controls.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="reports">
              <div className="border border-border rounded bg-card p-4">
                <p className="text-center text-muted-foreground">
                  Navigate to{' '}
                  <Button variant="link" className="p-0 h-auto text-xs" onClick={() => navigate('/dashboard/analytics')}>
                    Analytics & Reports
                  </Button>
                  {' '}for detailed reporting.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 py-1 flex items-center justify-between text-[10px] text-muted-foreground z-40">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            System Online
          </span>
          <span>Database: {systemStatus.database.latency}</span>
          <span>API: {systemStatus.api.uptime}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Session: {user?.email || 'admin@company.com'}</span>
          <span>AuthIt Enterprise v3.2.1</span>
        </div>
      </footer>
    </div>
  );
}
