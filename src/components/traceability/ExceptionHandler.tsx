import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CaseVisualizer, ScrapZone } from './CaseVisualizer';
import { ActiveContainer, Unit, DragDropAction } from '@/types/traceability';
import { mockActiveContainers, generateMockBottles } from '@/lib/mockTraceabilityData';
import { 
  Search, 
  AlertTriangle, 
  ArrowRight,
  History,
  Undo2,
  Wine,
  Package,
  Trash2,
  MoveRight,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function ExceptionHandler() {
  const [containers, setContainers] = useState<ActiveContainer[]>(mockActiveContainers);
  const [scrapZone, setScrapZone] = useState<Unit[]>([]);
  const [draggedItem, setDraggedItem] = useState<{ bottle: Unit; fromContainerId: string } | null>(null);
  const [actionHistory, setActionHistory] = useState<DragDropAction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState<'move' | 'scrap' | null>(null);
  const [manualMoveDialogOpen, setManualMoveDialogOpen] = useState(false);
  const [manualMoveData, setManualMoveData] = useState({
    unitId: '',
    fromContainerId: '',
    toContainerId: '',
    reason: '',
  });

  // Filter containers by search
  const filteredContainers = containers.filter(c => 
    c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.children.some(child => child.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleBottleDragStart = (bottle: Unit, containerId: string) => {
    setDraggedItem({ bottle, fromContainerId: containerId });
  };

  const handleBottleDrop = (toContainerId: string) => {
    if (!draggedItem) return;

    const targetContainer = containers.find(c => c.id === toContainerId);
    if (!targetContainer || targetContainer.status === 'FULL') {
      toast.error('Cannot move to this container');
      setDraggedItem(null);
      return;
    }

    // Record the action
    const action: DragDropAction = {
      unitId: draggedItem.bottle.id,
      fromContainerId: draggedItem.fromContainerId,
      toContainerId,
      action: 'MOVE',
      performedBy: 'manager@example.com',
      performedAt: new Date().toISOString(),
    };
    setActionHistory(prev => [action, ...prev]);

    // Update containers
    setContainers(prev => prev.map(container => {
      if (container.id === draggedItem.fromContainerId) {
        const newChildren = container.children.filter(c => c.id !== draggedItem.bottle.id);
        return {
          ...container,
          children: newChildren,
          filledCount: newChildren.length,
          status: 'OPEN' as const,
        };
      }
      if (container.id === toContainerId) {
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
    }));

    toast.success(`Moved ${draggedItem.bottle.id} from ${draggedItem.fromContainerId} to ${toContainerId}`);
    setDraggedItem(null);
  };

  const handleScrapDrop = () => {
    if (!draggedItem) return;

    // Record the action
    const action: DragDropAction = {
      unitId: draggedItem.bottle.id,
      fromContainerId: draggedItem.fromContainerId,
      toContainerId: null,
      action: 'SCRAP',
      performedBy: 'manager@example.com',
      performedAt: new Date().toISOString(),
    };
    setActionHistory(prev => [action, ...prev]);

    // Remove from container
    setContainers(prev => prev.map(container => {
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
    }));

    // Add to scrap
    setScrapZone(prev => [...prev, { ...draggedItem.bottle, status: 'DAMAGED', parentId: null }]);
    toast.info(`${draggedItem.bottle.id} marked as damaged/scrap`);
    setDraggedItem(null);
  };

  const handleManualMove = () => {
    const { unitId, fromContainerId, toContainerId, reason } = manualMoveData;
    
    const sourceContainer = containers.find(c => c.id === fromContainerId);
    const bottle = sourceContainer?.children.find(c => c.id === unitId);
    
    if (!bottle) {
      toast.error('Unit not found in specified container');
      return;
    }

    // Record action
    const action: DragDropAction = {
      unitId,
      fromContainerId,
      toContainerId: toContainerId || null,
      action: toContainerId ? 'REASSIGN' : 'SCRAP',
      reason,
      performedBy: 'manager@example.com',
      performedAt: new Date().toISOString(),
    };
    setActionHistory(prev => [action, ...prev]);

    // Update state
    if (toContainerId) {
      handleBottleDrop(toContainerId);
    } else {
      setScrapZone(prev => [...prev, { ...bottle, status: 'DAMAGED', parentId: null }]);
      setContainers(prev => prev.map(container => {
        if (container.id === fromContainerId) {
          const newChildren = container.children.filter(c => c.id !== unitId);
          return {
            ...container,
            children: newChildren,
            filledCount: newChildren.length,
            status: 'OPEN' as const,
          };
        }
        return container;
      }));
    }

    setManualMoveDialogOpen(false);
    setManualMoveData({ unitId: '', fromContainerId: '', toContainerId: '', reason: '' });
    toast.success('Action completed successfully');
  };

  const undoLastAction = () => {
    if (actionHistory.length === 0) return;
    
    const lastAction = actionHistory[0];
    // Implementation would reverse the action
    toast.info(`Undo: Would reverse ${lastAction.action} of ${lastAction.unitId}`);
    setActionHistory(prev => prev.slice(1));
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Exception Handler
          </CardTitle>
          <CardDescription>
            Drag and drop items between containers or to scrap zone to correct errors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by unit or container ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Dialog open={manualMoveDialogOpen} onOpenChange={setManualMoveDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <MoveRight className="h-4 w-4 mr-2" />
                    Manual Move
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Manual Unit Transfer</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Unit ID</Label>
                      <Input
                        placeholder="BTL-XXX-001"
                        value={manualMoveData.unitId}
                        onChange={(e) => setManualMoveData(prev => ({ ...prev, unitId: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>From Container</Label>
                      <Select 
                        value={manualMoveData.fromContainerId}
                        onValueChange={(v) => setManualMoveData(prev => ({ ...prev, fromContainerId: v }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select source container" />
                        </SelectTrigger>
                        <SelectContent>
                          {containers.map(c => (
                            <SelectItem key={c.id} value={c.id}>{c.id}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>To Container (leave empty for scrap)</Label>
                      <Select 
                        value={manualMoveData.toContainerId}
                        onValueChange={(v) => setManualMoveData(prev => ({ ...prev, toContainerId: v }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select target or leave for scrap" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Scrap / Damaged</SelectItem>
                          {containers.filter(c => c.status !== 'FULL').map(c => (
                            <SelectItem key={c.id} value={c.id}>{c.id}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Reason</Label>
                      <Textarea
                        placeholder="Describe the reason for this action..."
                        value={manualMoveData.reason}
                        onChange={(e) => setManualMoveData(prev => ({ ...prev, reason: e.target.value }))}
                      />
                    </div>
                    <Button className="w-full" onClick={handleManualMove}>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirm Transfer
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button 
                variant="outline" 
                onClick={undoLastAction}
                disabled={actionHistory.length === 0}
              >
                <Undo2 className="h-4 w-4 mr-2" />
                Undo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Container Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredContainers.map((container) => (
          <CaseVisualizer
            key={container.id}
            container={container}
            onBottleDragStart={handleBottleDragStart}
            onBottleDrop={handleBottleDrop}
            isDragTarget={draggedItem !== null && container.id !== draggedItem.fromContainerId && container.status !== 'FULL'}
          />
        ))}
      </div>

      {/* Scrap Zone */}
      <ScrapZone
        items={scrapZone}
        onDrop={handleScrapDrop}
        isDragTarget={draggedItem !== null}
      />

      {/* Action History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <History className="h-4 w-4" />
            Action History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {actionHistory.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No actions recorded yet
            </p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {actionHistory.map((action, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 p-2 rounded-lg bg-muted/50 text-sm"
                >
                  {action.action === 'SCRAP' ? (
                    <Trash2 className="h-4 w-4 text-destructive" />
                  ) : (
                    <ArrowRight className="h-4 w-4 text-primary" />
                  )}
                  <span className="font-mono">{action.unitId}</span>
                  <span className="text-muted-foreground">
                    {action.fromContainerId} → {action.toContainerId || 'SCRAP'}
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {new Date(action.performedAt).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
