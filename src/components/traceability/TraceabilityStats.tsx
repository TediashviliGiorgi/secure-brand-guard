import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TraceabilityStats as Stats } from '@/types/traceability';
import { mockTraceabilityStats } from '@/lib/mockTraceabilityData';
import { 
  Wine, 
  Package, 
  Boxes, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  CheckCircle,
  Truck
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TraceabilityStatsProps {
  stats?: Stats;
}

export function TraceabilityStatsOverview({ stats = mockTraceabilityStats }: TraceabilityStatsProps) {
  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          icon={<Wine className="h-5 w-5" />}
          label="Total Bottles"
          value={stats.totalBottles}
          color="success"
        />
        <StatsCard
          icon={<Package className="h-5 w-5" />}
          label="Total Cases"
          value={stats.totalCases}
          color="primary"
        />
        <StatsCard
          icon={<Boxes className="h-5 w-5" />}
          label="Total Pallets"
          value={stats.totalPallets}
          color="secondary"
        />
        <StatsCard
          icon={<AlertTriangle className="h-5 w-5" />}
          label="Orphaned Units"
          value={stats.orphanedUnits}
          color="warning"
          showWarning={stats.orphanedUnits > 100}
        />
      </div>

      {/* Today's Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 text-primary" />
            Today's Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">Packed</span>
              </div>
              <p className="text-3xl font-bold text-success">{stats.packedToday.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Shipped</span>
              </div>
              <p className="text-3xl font-bold text-primary">{stats.shippedToday.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span className="text-sm text-muted-foreground">Damaged</span>
              </div>
              <p className="text-3xl font-bold text-destructive">{stats.damagedToday}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Efficiency */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Line Efficiency</p>
              <p className="text-3xl font-bold">{stats.efficiency}%</p>
            </div>
            <div className={cn(
              "flex items-center gap-1 text-sm",
              stats.efficiency > 95 ? "text-success" : "text-warning"
            )}>
              {stats.efficiency > 95 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              {stats.efficiency > 95 ? '+2.3%' : '-1.5%'}
            </div>
          </div>
          <Progress value={stats.efficiency} className="h-3" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Target: 95%</span>
            <span>Current: {stats.efficiency}%</span>
          </div>
        </CardContent>
      </Card>

      {/* Aggregation Hierarchy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Aggregation Hierarchy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {/* L1 */}
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-success/10 mb-2">
                <Wine className="h-8 w-8 text-success" />
              </div>
              <Badge variant="outline">L1</Badge>
              <p className="text-sm font-medium mt-1">Bottle</p>
              <p className="text-xs text-muted-foreground">Individual item</p>
            </div>

            {/* Arrow */}
            <div className="flex-1 flex items-center justify-center">
              <div className="h-0.5 w-full bg-border relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-8 border-transparent border-l-border" />
              </div>
            </div>

            {/* L2 */}
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-primary/10 mb-2">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <Badge variant="outline">L2</Badge>
              <p className="text-sm font-medium mt-1">Case</p>
              <p className="text-xs text-muted-foreground">6-12 bottles</p>
            </div>

            {/* Arrow */}
            <div className="flex-1 flex items-center justify-center">
              <div className="h-0.5 w-full bg-border relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-8 border-transparent border-l-border" />
              </div>
            </div>

            {/* L3 */}
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-secondary/10 mb-2">
                <Boxes className="h-8 w-8 text-secondary" />
              </div>
              <Badge variant="outline">L3</Badge>
              <p className="text-sm font-medium mt-1">Pallet</p>
              <p className="text-xs text-muted-foreground">50 cases</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'success' | 'primary' | 'secondary' | 'warning' | 'destructive';
  showWarning?: boolean;
}

function StatsCard({ icon, label, value, color, showWarning }: StatsCardProps) {
  const colorClasses = {
    success: 'bg-success/10 text-success',
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    warning: 'bg-warning/10 text-warning',
    destructive: 'bg-destructive/10 text-destructive',
  };

  return (
    <Card className={cn(showWarning && "border-warning")}>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <div className={cn("p-2 rounded-lg", colorClasses[color])}>
            {icon}
          </div>
          {showWarning && (
            <Badge variant="destructive" className="text-xs">High</Badge>
          )}
        </div>
        <p className="text-2xl font-bold">{value.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
