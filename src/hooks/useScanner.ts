import { useState, useCallback, useRef, useEffect } from 'react';
import { ActiveContainer, Unit, ScanResult, UnitType } from '@/types/traceability';
import { generateUnitId } from '@/lib/mockTraceabilityData';

// Audio context for sound feedback
const playSound = (type: 'beep' | 'double-beep' | 'error' | 'ding') => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  switch (type) {
    case 'beep':
      oscillator.frequency.value = 880;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.3;
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
      break;
    case 'double-beep':
      oscillator.frequency.value = 880;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.3;
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.08);
      setTimeout(() => {
        const osc2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();
        osc2.connect(gain2);
        gain2.connect(audioContext.destination);
        osc2.frequency.value = 1100;
        osc2.type = 'sine';
        gain2.gain.value = 0.3;
        osc2.start();
        osc2.stop(audioContext.currentTime + 0.15);
      }, 120);
      break;
    case 'ding':
      oscillator.frequency.value = 1200;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.4;
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
      break;
    case 'error':
      oscillator.frequency.value = 200;
      oscillator.type = 'square';
      gainNode.gain.value = 0.3;
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.4);
      break;
  }
};

interface UseScannerOptions {
  bottlesPerCase?: number;
  casesPerPallet?: number;
  onContainerComplete?: (container: ActiveContainer) => void;
  onScan?: (result: ScanResult) => void;
}

export function useScanner(options: UseScannerOptions = {}) {
  const { 
    bottlesPerCase = 6, 
    casesPerPallet = 50,
    onContainerComplete,
    onScan 
  } = options;

  const [activeContainer, setActiveContainer] = useState<ActiveContainer | null>(null);
  const [scrapZone, setScrapZone] = useState<Unit[]>([]);
  const [completedContainers, setCompletedContainers] = useState<ActiveContainer[]>([]);
  const [lastScanResult, setLastScanResult] = useState<ScanResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const scanInputRef = useRef<HTMLInputElement>(null);

  // Focus on scan input
  const focusScanInput = useCallback(() => {
    scanInputRef.current?.focus();
  }, []);

  // Open a new parent container (Case or Pallet)
  const openContainer = useCallback((containerId: string, type: 'CASE' | 'PALLET') => {
    const capacity = type === 'CASE' ? bottlesPerCase : casesPerPallet;
    const newContainer: ActiveContainer = {
      id: containerId,
      type,
      status: 'OPEN',
      capacity,
      filledCount: 0,
      children: [],
    };
    
    setActiveContainer(newContainer);
    playSound('beep');
    
    const result: ScanResult = {
      success: true,
      unitId: containerId,
      unitType: type,
      action: 'OPEN_PARENT',
      message: `Opened ${type.toLowerCase()} ${containerId}. Ready to scan items.`,
      soundType: 'beep',
    };
    
    setLastScanResult(result);
    onScan?.(result);
    
    return result;
  }, [bottlesPerCase, casesPerPallet, onScan]);

  // Associate a child unit with the active container
  const scanChild = useCallback((childId: string) => {
    if (!activeContainer) {
      playSound('error');
      const result: ScanResult = {
        success: false,
        unitId: childId,
        unitType: 'BOTTLE',
        action: 'ERROR',
        message: 'No active container. Please scan a case first.',
        soundType: 'error',
      };
      setLastScanResult(result);
      onScan?.(result);
      return result;
    }

    if (activeContainer.filledCount >= activeContainer.capacity) {
      playSound('error');
      const result: ScanResult = {
        success: false,
        unitId: childId,
        unitType: 'BOTTLE',
        action: 'ERROR',
        message: `Container ${activeContainer.id} is already full.`,
        soundType: 'error',
      };
      setLastScanResult(result);
      onScan?.(result);
      return result;
    }

    const childType: UnitType = activeContainer.type === 'CASE' ? 'BOTTLE' : 'CASE';
    const newChild: Unit = {
      id: childId,
      type: childType,
      parentId: activeContainer.id,
      batchId: 'batch-001', // Would come from context in real app
      status: 'PACKED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      scannedAt: new Date().toISOString(),
    };

    const newFilledCount = activeContainer.filledCount + 1;
    const isNowFull = newFilledCount >= activeContainer.capacity;

    const updatedContainer: ActiveContainer = {
      ...activeContainer,
      children: [...activeContainer.children, newChild],
      filledCount: newFilledCount,
      status: isNowFull ? 'FULL' : 'OPEN',
    };

    setActiveContainer(updatedContainer);

    if (isNowFull) {
      playSound('double-beep');
      setCompletedContainers(prev => [...prev, updatedContainer]);
      setActiveContainer(null);
      onContainerComplete?.(updatedContainer);
      
      const result: ScanResult = {
        success: true,
        unitId: childId,
        unitType: childType,
        action: 'CLOSE_PARENT',
        message: `Container ${activeContainer.id} is now FULL! (${newFilledCount}/${activeContainer.capacity})`,
        soundType: 'double-beep',
      };
      setLastScanResult(result);
      onScan?.(result);
      return result;
    } else {
      playSound('beep');
      const result: ScanResult = {
        success: true,
        unitId: childId,
        unitType: childType,
        action: 'ASSOCIATE',
        message: `Added ${childType.toLowerCase()} to ${activeContainer.id} (${newFilledCount}/${activeContainer.capacity})`,
        soundType: 'beep',
      };
      setLastScanResult(result);
      onScan?.(result);
      return result;
    }
  }, [activeContainer, onContainerComplete, onScan]);

  // Process a scan (determines if it's a container or child)
  const processScan = useCallback((code: string) => {
    setIsScanning(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Determine type based on prefix
      if (code.startsWith('BOX-') || code.startsWith('CASE-')) {
        if (!activeContainer || activeContainer.type === 'PALLET') {
          openContainer(code, 'CASE');
        } else {
          // If we have an active case and scan another case, close current and open new
          if (activeContainer.filledCount > 0) {
            setCompletedContainers(prev => [...prev, activeContainer]);
          }
          openContainer(code, 'CASE');
        }
      } else if (code.startsWith('PLT-') || code.startsWith('PALLET-')) {
        openContainer(code, 'PALLET');
      } else {
        // Assume it's a bottle/item
        scanChild(code);
      }
      
      setIsScanning(false);
    }, 100);
  }, [activeContainer, openContainer, scanChild]);

  // Move unit to scrap
  const moveToScrap = useCallback((unitId: string, reason?: string) => {
    if (!activeContainer) return;

    const unitIndex = activeContainer.children.findIndex(c => c.id === unitId);
    if (unitIndex === -1) return;

    const unit = activeContainer.children[unitIndex];
    const updatedUnit: Unit = {
      ...unit,
      status: 'DAMAGED',
      parentId: null,
      notes: reason,
    };

    setScrapZone(prev => [...prev, updatedUnit]);
    
    const updatedChildren = activeContainer.children.filter(c => c.id !== unitId);
    setActiveContainer({
      ...activeContainer,
      children: updatedChildren,
      filledCount: updatedChildren.length,
      status: 'OPEN',
    });

    playSound('ding');
  }, [activeContainer]);

  // Quick scan simulation (for demo)
  const simulateScan = useCallback(() => {
    const randomId = generateUnitId('BOTTLE');
    processScan(randomId);
  }, [processScan]);

  return {
    activeContainer,
    scrapZone,
    completedContainers,
    lastScanResult,
    isScanning,
    scanInputRef,
    focusScanInput,
    openContainer,
    scanChild,
    processScan,
    moveToScrap,
    simulateScan,
    setActiveContainer,
  };
}
