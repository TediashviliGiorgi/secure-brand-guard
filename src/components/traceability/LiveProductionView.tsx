import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CaseVisualizer, ScrapZone } from './CaseVisualizer';
import { 
  ActiveContainer, 
  Unit, 
  ProductionLine,
  TraceabilityStats 
} from '@/types/traceability';
import { 
  mockProductionLines, 
  mockTraceabilityStats,
  generateMockBottles,
  generateUnitId
} from '@/lib/mockTraceabilityData';
import { 
  Activity, 
  Package, 
  Wine, 
  Boxes, 
  AlertTriangle,
  TrendingUp,
  RefreshCw,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function LiveProductionView() {
  const [productionLines, setProductionLines] = useState<ProductionLine[]>(mockProductionLines);
  const [stats, setStats] = useState<TraceabilityStats>(mockTraceabilityStats);
  const [draggedItem, setDraggedItem] = useState<{ bottle: Unit; fromContainerId: string } | null>(null);
  const [scrapZone, setScrapZone] = useState<Unit[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setProductionLines(prev => {
        return prev.map(line => ({
          ...line,
          activeContainers: line.activeContainers.map(container => {
            if (container.status === 'FULL') return container;
            if (Math.random() > 0.3) return container;

            // Add a bottle
            const newBottle: Unit = {
              id: generateUnitId('BOTTLE'),
              type: 'BOTTLE',
              parentId: container.id,
              batchId: 'batch-001',
              status: 'PACKED',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            const newFilledCount = container.filledCount + 1;
            const isNowFull = newFilledCount >= container.capacity;

            return {
              ...container,
              children: [...container.children, newBottle],
              filledCount: newFilledCount,
              status: isNowFull ? 'FULL' as const : 'OPEN' as const,
            };
          }),
        }));
      });

      // Update stats
      setStats(prev => ({
        ...prev,
        packedToday: prev.packedToday + Math.floor(Math.random() * 3),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const handleBottleDragStart = (bottle: Unit, containerId: string) => {
    setDraggedItem({ bottle, fromContainerId: containerId });
  };

  const handleBottleDrop = (toContainerId: string) => {
    if (!draggedItem) return;

    // Move bottle between containers
    setProductionLines(prev => {
      return prev.map(line => ({
        ...line,
        activeContainers: line.activeContainers.map(container => {
          // Remove from source
          if (container.id === draggedItem.fromContainerId) {
            const newChildren = container.children.filter(c => c.id !== draggedItem.bottle.id);
            return {
              ...container,
              children: newChildren,
              filledCount: newChildren.length,
              status: 'OPEN' as const,
            };
          }
          // Add to target
          if (container.id === toContainerId && container.status !== 'FULL') {
            const newChildren = [...container.children, { ...draggedItem.bottle, parentId: toContainerId }];
            const isNowFull = newChildren.length >= container.capacity;
            return {
              ...container,
              children: newChildren,
              filledCount: newChildren.length,
              status: isNowFull ? 'FULL' as const : 'OPEN' as const,
            };
          }
          return container;
        }),
      }));
    });

    toast.success(`Moved ${draggedItem.bottle.id} to ${toContainerId}`);
    setDraggedItem(null);
  };

  const handleScrapDrop = () => {
    if (!draggedItem) return;

    // Remove from container and add to scrap
    setProductionLines(prev => {
      return prev.map(line => ({
        ...line,
        activeContainers: line.activeContainers.map(container => {
          if (container.id === draggedItem.fromContainerId) {
            const newChildren = container.children.filter(c => c.id !== draggedItem.bottle.id);
            return {
              ...container,
              children: newChildren,
              filledCount: newChildren.length,
              status: 'OPEN' as const,
            };
          }
          return container;
        }),
      }));
    });

    setScrapZone(prev => [...prev, { ...draggedItem.bottle, status: 'DAMAGED', parentId: null }]);
    setStats(prev => ({ ...prev, damagedToday: prev.damagedToday + 1 }));
    toast.info(`${draggedItem.bottle.id} marked as damaged`);
    setDraggedItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Wine className="h-5 w-5" />}
          label="Bottles Today"
          value={stats.packedToday}
          trend="+12%"
          color="success"
        />
        <StatCard
          icon={<Package className="h-5 w-5" />}
          label="Cases Complete"
          value={Math.floor(stats.packedToday / 6)}
          trend="+8%"
          color="primary"
        />
        <StatCard
          icon={<Boxes className="h-5 w-5" />}
          label="Pallets Ready"
          value={stats.totalPallets}
          color="secondary"
        />
        <StatCard
          icon={<AlertTriangle className="h-5 w-5" />}
          label="Damaged"
          value={stats.damagedToday}
          color="destructive"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn(
            "h-3 w-3 rounded-full",
            isSimulating ? "bg-success animate-pulse" : "bg-muted"
          )} />
          <span className="text-sm text-muted-foreground">
            {isSimulating ? 'Live Updates Active' : 'Simulation Paused'}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant={isSimulating ? 'destructive' : 'default'}
            size="sm"
            onClick={() => setIsSimulating(!isSimulating)}
          >
            {isSimulating ? (
              <>Stop Simulation</>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-1" />
                Start Simulation
              </>
            )}
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Production Lines */}
      {productionLines.map((line) => (
        <Card key={line.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                {line.name}
              </CardTitle>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-success">
                  ✓ {line.completedToday} complete
                </span>
                {line.errorsToday > 0 && (
                  <span className="text-destructive">
                    ⚠ {line.errorsToday} errors
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {line.activeContainers.map((container) => (
                <CaseVisualizer
                  key={container.id}
                  container={container}
                  onBottleDragStart={handleBottleDragStart}
                  onBottleDrop={handleBottleDrop}
                  isDragTarget={draggedItem !== null && container.id !== draggedItem.fromContainerId && container.status !== 'FULL'}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Scrap Zone */}
      <ScrapZone
        items={scrapZone}
        onDrop={handleScrapDrop}
        isDragTarget={draggedItem !== null}
      />

      {/* Efficiency Meter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Line Efficiency</span>
            <span className="text-2xl font-bold text-success">{stats.efficiency}%</span>
          </div>
          <Progress value={stats.efficiency} className="h-3" />
        </CardContent>
      </Card>
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  trend?: string;
  color: 'success' | 'primary' | 'secondary' | 'destructive';
}

function StatCard({ icon, label, value, trend, color }: StatCardProps) {
  const colorClasses = {
    success: 'bg-success/10 text-success',
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    destructive: 'bg-destructive/10 text-destructive',
  };

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-2">
          <div className={cn("p-2 rounded-lg", colorClasses[color])}>
            {icon}
          </div>
          {trend && (
            <div className="flex items-center text-xs text-success">
              <TrendingUp className="h-3 w-3 mr-1" />
              {trend}
            </div>
          )}
        </div>
        <p className="text-2xl font-bold">{value.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
