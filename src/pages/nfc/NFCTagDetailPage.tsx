import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  ArrowLeft,
  Nfc,
  MapPin,
  Clock,
  Smartphone,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Download,
  Ban,
} from 'lucide-react';
import { SEO } from '@/components/ui/seo';
import { LanguageSelector } from '@/components/LanguageSelector';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useToast } from '@/hooks/use-toast';

// Mock data for detailed tag view
const mockTagDetail = {
  id: 'NFC-2024-001',
  tagId: 'E004010012345678',
  productName: 'Saperavi Reserve 2021',
  batchId: 'AUTH-2024-001',
  status: 'active',
  assignedDate: '2024-01-15',
  totalScans: 12,
  uniqueLocations: 3,
  lastScan: '2024-11-15 14:30',
  scanHistory: [
    {
      id: 1,
      timestamp: '2024-11-16 14:30',
      location: 'Tbilisi, Georgia',
      coordinates: [44.8271, 41.7151] as [number, number],
      device: 'iPhone 15 Pro',
      status: 'verified',
      ipAddress: '185.xx.xx.12',
    },
    {
      id: 2,
      timestamp: '2024-11-15 10:20',
      location: 'Tbilisi, Georgia',
      coordinates: [44.8171, 41.7251] as [number, number],
      device: 'Samsung Galaxy S23',
      status: 'verified',
      ipAddress: '185.xx.xx.34',
    },
    {
      id: 3,
      timestamp: '2024-11-14 16:45',
      location: 'Kakheti, Georgia',
      coordinates: [45.7048, 41.6488] as [number, number],
      device: 'iPhone 14',
      status: 'verified',
      ipAddress: '185.xx.xx.56',
    },
    {
      id: 4,
      timestamp: '2024-11-13 09:15',
      location: 'Tbilisi, Georgia',
      coordinates: [44.8371, 41.7051] as [number, number],
      device: 'Google Pixel 8',
      status: 'verified',
      ipAddress: '185.xx.xx.78',
    },
  ],
};

export default function NFCTagDetailPage() {
  const { tagId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);

  useEffect(() => {
    // Check if we have a Mapbox token
    const token = localStorage.getItem('mapbox_token');
    if (token) {
      setMapboxToken(token);
    } else {
      setShowTokenInput(true);
    }
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    try {
      mapboxgl.accessToken = mapboxToken;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [44.8271, 41.7151],
        zoom: 8,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add markers for each scan location
      mockTagDetail.scanHistory.forEach((scan, index) => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png)';
        el.style.width = '30px';
        el.style.height = '40px';
        el.style.backgroundSize = '100%';
        el.style.cursor = 'pointer';

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div style="padding: 8px;">
            <strong>${scan.location}</strong><br/>
            <span style="font-size: 12px;">${scan.timestamp}</span><br/>
            <span style="font-size: 12px;">${scan.device}</span>
          </div>`
        );

        new mapboxgl.Marker(el)
          .setLngLat(scan.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });

      // Fit map to show all markers
      const bounds = new mapboxgl.LngLatBounds();
      mockTagDetail.scanHistory.forEach((scan) => {
        bounds.extend(scan.coordinates);
      });
      map.current.fitBounds(bounds, { padding: 50 });

    } catch (error) {
      console.error('Error initializing map:', error);
      toast({
        title: 'Map Error',
        description: 'Failed to load map. Please check your Mapbox token.',
        variant: 'destructive',
      });
    }

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, toast]);

  const handleTokenSave = () => {
    if (mapboxToken) {
      localStorage.setItem('mapbox_token', mapboxToken);
      setShowTokenInput(false);
      toast({
        title: 'Token Saved',
        description: 'Mapbox token saved successfully',
      });
    }
  };

  const handleDeactivate = () => {
    toast({
      title: 'Tag Deactivated',
      description: `NFC tag ${mockTagDetail.tagId} has been deactivated`,
    });
    navigate('/dashboard/nfc');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Active
          </Badge>
        );
      case 'suspicious':
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Suspicious
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`NFC Tag ${tagId} - AuthIt`}
        description="Detailed view of NFC tag with scan history and analytics"
      />
      
      {/* Header */}
      <header className="border-b border-border/40 bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard/nfc')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to NFC Tags
              </Button>
            </div>
            <LanguageSelector />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Token Input Alert */}
        {showTokenInput && (
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-3">
                <p className="font-medium">Mapbox Token Required</p>
                <p className="text-sm text-muted-foreground">
                  To display the geographic map, please enter your Mapbox public token. 
                  Get yours at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="underline">mapbox.com</a>
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={mapboxToken}
                    onChange={(e) => setMapboxToken(e.target.value)}
                    placeholder="pk.eyJ1..."
                    className="flex-1 px-3 py-2 text-sm border rounded-md"
                  />
                  <Button onClick={handleTokenSave} size="sm">
                    Save Token
                  </Button>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Tag Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary">
                <Nfc className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{mockTagDetail.productName}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground font-mono">
                    {mockTagDetail.tagId}
                  </span>
                  {getStatusBadge(mockTagDetail.status)}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Ban className="mr-2 h-4 w-4" />
                    Deactivate Tag
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Deactivate NFC Tag?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently deactivate tag {mockTagDetail.tagId}. 
                      Future scans will show this product as invalid. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeactivate} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                      Deactivate
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Scans</CardDescription>
              <CardTitle className="text-3xl">{mockTagDetail.totalScans}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span>+3 this week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Unique Locations</CardDescription>
              <CardTitle className="text-3xl">{mockTagDetail.uniqueLocations}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Geographic spread</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Last Scan</CardDescription>
              <CardTitle className="text-lg">{mockTagDetail.lastScan}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>2 hours ago</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Assigned Date</CardDescription>
              <CardTitle className="text-lg">{mockTagDetail.assignedDate}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4" />
                <span>10 months active</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Geographic Map */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Scan Locations</CardTitle>
              <CardDescription>Geographic distribution of all scans</CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                ref={mapContainer} 
                className="w-full h-[400px] rounded-lg border"
                style={{ display: mapboxToken && !showTokenInput ? 'block' : 'none' }}
              />
              {(!mapboxToken || showTokenInput) && (
                <div className="w-full h-[400px] rounded-lg border bg-muted flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Enter Mapbox token to view map</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Scan History Timeline */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Scan History</CardTitle>
              <CardDescription>Complete timeline of all verification scans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockTagDetail.scanHistory.map((scan, index) => (
                  <div key={scan.id} className="flex gap-4">
                    <div className="relative">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      {index < mockTagDetail.scanHistory.length - 1 && (
                        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-px h-12 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{scan.location}</p>
                          <p className="text-sm text-muted-foreground">{scan.timestamp}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          Verified
                        </Badge>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-3 w-3" />
                          <span>{scan.device}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          <span>IP: {scan.ipAddress}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
