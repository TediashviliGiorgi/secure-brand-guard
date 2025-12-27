import React, { useState, useEffect } from 'react';
import { useScanner } from '@/hooks/useScanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Wine, 
  Package, 
  Boxes, 
  ScanLine, 
  Check, 
  AlertCircle,
  Volume2,
  VolumeX,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScannerAppProps {
  bottlesPerCase?: number;
  casesPerPallet?: number;
}

export function ScannerApp({ bottlesPerCase = 6, casesPerPallet = 50 }: ScannerAppProps) {
  const [scanInput, setScanInput] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [flashColor, setFlashColor] = useState<'success' | 'error' | 'complete' | null>(null);

  const {
    activeContainer,
    completedContainers,
    lastScanResult,
    isScanning,
    processScan,
    simulateScan,
    scanInputRef,
    focusScanInput,
  } = useScanner({
    bottlesPerCase,
    casesPerPallet,
    onContainerComplete: (container) => {
      setFlashColor('complete');
      setTimeout(() => setFlashColor(null), 500);
    },
    onScan: (result) => {
      if (result.success) {
        setFlashColor(result.action === 'CLOSE_PARENT' ? 'complete' : 'success');
      } else {
        setFlashColor('error');
      }
      setTimeout(() => setFlashColor(null), 300);
    },
  });

  // Auto-focus on scan input
  useEffect(() => {
    focusScanInput();
  }, [focusScanInput]);

  const handleScanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scanInput.trim()) {
      processScan(scanInput.trim());
      setScanInput('');
    }
  };

  const progress = activeContainer 
    ? (activeContainer.filledCount / activeContainer.capacity) * 100 
    : 0;

  return (
    <div 
      className={cn(
        "min-h-screen p-4 transition-colors duration-300",
        flashColor === 'success' && "bg-success/20",
        flashColor === 'error' && "bg-destructive/20",
        flashColor === 'complete' && "bg-primary/30"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/10">
            <ScanLine className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Scanner App</h1>
            <p className="text-sm text-muted-foreground">Worker View</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
        </Button>
      </div>

      {/* Status Display - Large for worker visibility */}
      <Card className={cn(
        "mb-6 transition-all duration-300",
        activeContainer?.status === 'FULL' && "border-success border-2",
        !activeContainer && "border-warning border-2"
      )}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span>Current Status</span>
            {activeContainer ? (
              <Badge 
                variant={activeContainer.status === 'FULL' ? 'default' : 'secondary'}
                className="text-lg px-4 py-1"
              >
                {activeContainer.status}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-lg px-4 py-1">
                NO ACTIVE CONTAINER
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeContainer ? (
            <div className="space-y-4">
              {/* Container Info */}
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-muted">
                  {activeContainer.type === 'CASE' ? (
                    <Package className="h-12 w-12 text-primary" />
                  ) : (
                    <Boxes className="h-12 w-12 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-3xl font-mono font-bold">{activeContainer.id}</p>
                  <p className="text-muted-foreground">
                    {activeContainer.type === 'CASE' ? 'Scanning Bottles' : 'Scanning Cases'}
                  </p>
                </div>
              </div>

              {/* Progress Counter - Very Large */}
              <div className="text-center py-6 bg-muted/50 rounded-xl">
                <p className="text-7xl font-mono font-bold text-primary">
                  {activeContainer.filledCount}
                  <span className="text-4xl text-muted-foreground">/{activeContainer.capacity}</span>
                </p>
              </div>

              {/* Progress Bar */}
              <Progress value={progress} className="h-4" />

              {/* Item Icons */}
              <div className="flex flex-wrap gap-2 justify-center">
                {Array.from({ length: activeContainer.capacity }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "p-2 rounded-lg transition-all duration-300",
                      i < activeContainer.filledCount
                        ? "bg-success/20 text-success scale-100"
                        : "bg-muted text-muted-foreground scale-90 opacity-50"
                    )}
                  >
                    <Wine className="h-6 w-6" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">
                Scan a case code to begin
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scan Input */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <form onSubmit={handleScanSubmit} className="flex gap-3">
            <Input
              ref={scanInputRef as any}
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder="Scan barcode or enter code..."
              className="text-2xl h-16 font-mono"
              autoFocus
            />
            <Button type="submit" size="lg" className="h-16 px-8" disabled={isScanning}>
              <ScanLine className="h-6 w-6" />
            </Button>
          </form>
          
          {/* Demo button */}
          <Button 
            variant="outline" 
            className="w-full mt-3" 
            onClick={simulateScan}
            disabled={isScanning}
          >
            <Zap className="h-4 w-4 mr-2" />
            Simulate Scan (Demo)
          </Button>
        </CardContent>
      </Card>

      {/* Last Scan Result */}
      {lastScanResult && (
        <Card className={cn(
          "mb-6",
          lastScanResult.success ? "border-success" : "border-destructive"
        )}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              {lastScanResult.success ? (
                <Check className="h-8 w-8 text-success" />
              ) : (
                <AlertCircle className="h-8 w-8 text-destructive" />
              )}
              <div>
                <p className="font-mono text-lg">{lastScanResult.unitId}</p>
                <p className="text-muted-foreground">{lastScanResult.message}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Today */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Completed Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Package className="h-6 w-6 text-success" />
              <span className="text-2xl font-bold">{completedContainers.length}</span>
              <span className="text-muted-foreground">cases</span>
            </div>
            <div className="flex items-center gap-3">
              <Wine className="h-6 w-6 text-success" />
              <span className="text-2xl font-bold">
                {completedContainers.reduce((acc, c) => acc + c.filledCount, 0)}
              </span>
              <span className="text-muted-foreground">bottles</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
