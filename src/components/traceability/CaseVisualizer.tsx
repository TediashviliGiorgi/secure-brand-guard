import React from 'react';
import { ActiveContainer, Unit } from '@/types/traceability';
import { Wine, Package, GripVertical, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface CaseVisualizerProps {
  container: ActiveContainer;
  onBottleDragStart?: (bottle: Unit, containerId: string) => void;
  onBottleDrop?: (containerId: string) => void;
  isDragTarget?: boolean;
  isCompact?: boolean;
}

export function CaseVisualizer({ 
  container, 
  onBottleDragStart,
  onBottleDrop,
  isDragTarget = false,
  isCompact = false
}: CaseVisualizerProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onBottleDrop?.(container.id);
  };

  const slots = Array.from({ length: container.capacity });
  
  return (
    <div
      className={cn(
        "relative rounded-xl border-2 transition-all duration-300",
        container.status === 'FULL' 
          ? "border-success bg-success/5" 
          : "border-border bg-card",
        isDragTarget && "border-primary border-dashed bg-primary/10 scale-105",
        isCompact ? "p-2" : "p-4"
      )}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className={cn(
        "flex items-center justify-between mb-3",
        isCompact && "mb-2"
      )}>
        <div className="flex items-center gap-2">
          <Package className={cn(
            "text-primary",
            isCompact ? "h-4 w-4" : "h-5 w-5"
          )} />
          <span className={cn(
            "font-mono font-medium",
            isCompact ? "text-xs" : "text-sm"
          )}>
            {container.id}
          </span>
        </div>
        <Badge 
          variant={container.status === 'FULL' ? 'default' : 'secondary'}
          className={isCompact ? "text-xs px-1.5 py-0" : ""}
        >
          {container.filledCount}/{container.capacity}
        </Badge>
      </div>

      {/* Bottle Grid */}
      <div className={cn(
        "grid gap-2",
        container.capacity <= 6 ? "grid-cols-3" : "grid-cols-4",
        isCompact && "gap-1"
      )}>
        {slots.map((_, index) => {
          const bottle = container.children[index];
          const isFilled = index < container.filledCount;

          return (
            <div
              key={index}
              className={cn(
                "relative aspect-square rounded-lg flex items-center justify-center transition-all duration-300",
                isFilled 
                  ? "bg-success/20 border border-success/30" 
                  : "bg-muted/50 border border-dashed border-muted-foreground/30",
                bottle && onBottleDragStart && "cursor-grab hover:bg-success/30"
              )}
              draggable={!!bottle && !!onBottleDragStart}
              onDragStart={() => bottle && onBottleDragStart?.(bottle, container.id)}
            >
              {isFilled ? (
                <div className="relative">
                  <Wine className={cn(
                    "text-success",
                    isCompact ? "h-4 w-4" : "h-6 w-6"
                  )} />
                  {bottle && onBottleDragStart && (
                    <GripVertical className="absolute -right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100" />
                  )}
                </div>
              ) : (
                <div className={cn(
                  "text-muted-foreground/30",
                  isCompact ? "text-xs" : "text-sm"
                )}>
                  {index + 1}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Animation overlay for newly added items */}
      {container.status === 'OPEN' && container.filledCount > 0 && (
        <div className="absolute -top-1 -right-1">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
        </div>
      )}
    </div>
  );
}

// Scrap/Damaged Zone Component
interface ScrapZoneProps {
  items: Unit[];
  onDrop?: () => void;
  isDragTarget?: boolean;
}

export function ScrapZone({ items, onDrop, isDragTarget }: ScrapZoneProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop?.();
  };

  return (
    <div
      className={cn(
        "rounded-xl border-2 border-dashed p-4 transition-all duration-300",
        isDragTarget 
          ? "border-destructive bg-destructive/10 scale-105" 
          : "border-destructive/30 bg-destructive/5"
      )}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center gap-2 mb-3">
        <Trash2 className="h-5 w-5 text-destructive" />
        <span className="font-medium text-destructive">Scrap / Damaged</span>
        <Badge variant="destructive" className="ml-auto">{items.length}</Badge>
      </div>

      {items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-1 px-2 py-1 bg-destructive/20 rounded text-xs font-mono"
            >
              <Wine className="h-3 w-3 text-destructive" />
              {item.id}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground text-center py-4">
          Drag damaged items here
        </p>
      )}
    </div>
  );
}
