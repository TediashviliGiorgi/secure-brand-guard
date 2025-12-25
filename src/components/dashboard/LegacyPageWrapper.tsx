import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Shield, LogOut, Package, BarChart3, Settings, Plus, 
  Crown, Clock, Search, Server, Database, Activity, HardDrive, Cpu, Gauge
} from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { TemplateSwitcher } from '@/components/dashboard/TemplateSwitcher';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LegacyPageWrapperProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

// Mock system status data
const systemStatus = {
  database: { status: 'online', latency: '12ms', connections: 847 },
  api: { status: 'online', requests: '2.4M/day', uptime: '99.97%' },
  storage: { used: 78.4, total: 500, unit: 'GB' },
  memory: { used: 62, total: 100, unit: '%' },
  cpu: { usage: 34, cores: 8 },
};

export function LegacyPageWrapper({ children, title, subtitle }: LegacyPageWrapperProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

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
            <Separator orientation="vertical" className="h-4" />
            <span className="text-xs font-bold uppercase">{title}</span>
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
          <Button 
            variant={isActive('/dashboard') ? 'secondary' : 'ghost'} 
            size="sm" 
            className="h-6 text-xs px-2" 
            onClick={() => navigate('/dashboard')}
          >
            <Package className="h-3 w-3 mr-1" />
            Dashboard
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <Button 
            variant={isActive('/dashboard/batches') ? 'secondary' : 'ghost'} 
            size="sm" 
            className="h-6 text-xs px-2" 
            onClick={() => navigate('/dashboard/batches')}
          >
            <Package className="h-3 w-3 mr-1" />
            Batches
          </Button>
          <Button 
            variant={isActive('/dashboard/batches/create') ? 'secondary' : 'ghost'} 
            size="sm" 
            className="h-6 text-xs px-2" 
            onClick={() => navigate('/dashboard/batches/create')}
          >
            <Plus className="h-3 w-3 mr-1" />
            New Batch
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <Button 
            variant={isActive('/dashboard/analytics') ? 'secondary' : 'ghost'} 
            size="sm" 
            className="h-6 text-xs px-2" 
            onClick={() => navigate('/dashboard/analytics')}
          >
            <BarChart3 className="h-3 w-3 mr-1" />
            Analytics
          </Button>
          <Button 
            variant={isActive('/dashboard/security') ? 'secondary' : 'ghost'} 
            size="sm" 
            className="h-6 text-xs px-2" 
            onClick={() => navigate('/dashboard/security')}
          >
            <Shield className="h-3 w-3 mr-1" />
            Security
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <Button 
            variant={isActive('/dashboard/settings') ? 'secondary' : 'ghost'} 
            size="sm" 
            className="h-6 text-xs px-2" 
            onClick={() => navigate('/dashboard/settings')}
          >
            <Settings className="h-3 w-3 mr-1" />
            Settings
          </Button>
          <Button 
            variant={isActive('/dashboard/admin') ? 'secondary' : 'ghost'} 
            size="sm" 
            className="h-6 text-xs px-2" 
            onClick={() => navigate('/dashboard/admin')}
          >
            <Crown className="h-3 w-3 mr-1" />
            Admin
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-1">
            <Input 
              placeholder="Search..." 
              className="h-6 text-xs w-48"
            />
            <Button variant="outline" size="sm" className="h-6 text-xs px-2">
              <Search className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Left Sidebar - System Status (collapsed on smaller screens) */}
        <aside className="hidden lg:block w-56 border-r border-border bg-card min-h-[calc(100vh-80px)] p-2 flex-shrink-0">
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
                  Latency: {systemStatus.database.latency}
                </div>
              </div>
              
              <div className="p-2 border border-border rounded bg-muted/30">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    API
                  </span>
                  <Badge variant="outline" className="h-4 text-[10px] bg-green-500/10 text-green-600 border-green-500/30">
                    {systemStatus.api.uptime}
                  </Badge>
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {systemStatus.api.requests}
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
                    CPU
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
        </aside>

        {/* Main Panel */}
        <main className="flex-1 p-4 pb-12">
          {/* Page Title Bar */}
          <div className="mb-4 p-2 border border-border rounded bg-card flex items-center justify-between">
            <div>
              <h1 className="text-sm font-bold uppercase">{title}</h1>
              {subtitle && <p className="text-[10px] text-muted-foreground">{subtitle}</p>}
            </div>
            <div className="text-[10px] text-muted-foreground">
              Path: {location.pathname}
            </div>
          </div>

          {/* Page Content */}
          <ScrollArea className="h-[calc(100vh-180px)]">
            <div className="legacy-content">
              {children}
            </div>
          </ScrollArea>
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
