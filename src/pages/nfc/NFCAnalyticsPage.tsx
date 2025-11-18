import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  TrendingUp,
  MapPin,
  Clock,
  Smartphone,
  Download,
} from 'lucide-react';
import { SEO } from '@/components/ui/seo';
import { LanguageSelector } from '@/components/LanguageSelector';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for analytics
const scanTrendData = [
  { date: '11/10', scans: 15 },
  { date: '11/11', scans: 22 },
  { date: '11/12', scans: 18 },
  { date: '11/13', scans: 28 },
  { date: '11/14', scans: 25 },
  { date: '11/15', scans: 32 },
  { date: '11/16', scans: 38 },
];

const hourlyData = [
  { hour: '00:00', scans: 2 },
  { hour: '03:00', scans: 1 },
  { hour: '06:00', scans: 3 },
  { hour: '09:00', scans: 12 },
  { hour: '12:00', scans: 18 },
  { hour: '15:00', scans: 15 },
  { hour: '18:00', scans: 22 },
  { hour: '21:00', scans: 8 },
];

const deviceData = [
  { name: 'iPhone', value: 45, color: '#3b82f6' },
  { name: 'Android', value: 35, color: '#10b981' },
  { name: 'Other', value: 20, color: '#f59e0b' },
];

const locationData = [
  { city: 'Tbilisi', scans: 45, coordinates: [44.8271, 41.7151] as [number, number] },
  { city: 'Batumi', scans: 28, coordinates: [41.6168, 41.6404] as [number, number] },
  { city: 'Kakheti', scans: 18, coordinates: [45.7048, 41.6488] as [number, number] },
  { city: 'Kutaisi', scans: 15, coordinates: [42.6954, 42.2679] as [number, number] },
];

export default function NFCAnalyticsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [timeRange, setTimeRange] = useState('7d');
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);

  useEffect(() => {
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
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [44.8271, 41.7151],
        zoom: 6,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add heatmap-like circles for each location
      locationData.forEach((location) => {
        const size = Math.max(location.scans / 2, 10);
        
        const el = document.createElement('div');
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.borderRadius = '50%';
        el.style.backgroundColor = `rgba(59, 130, 246, ${Math.min(location.scans / 50, 0.8)})`;
        el.style.border = '2px solid rgba(59, 130, 246, 1)';
        el.style.cursor = 'pointer';

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div style="padding: 8px;">
            <strong>${location.city}</strong><br/>
            <span style="font-size: 12px;">${location.scans} scans</span>
          </div>`
        );

        new mapboxgl.Marker(el)
          .setLngLat(location.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });

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

  return (
    <div className="min-h-screen bg-muted/30">
      <SEO 
        title="NFC Analytics - AuthIt"
        description="Comprehensive analytics for NFC tag scans and performance"
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
                Back to NFC Management
              </Button>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl font-semibold">NFC Analytics</h1>
                <p className="text-xs text-muted-foreground">Scan trends and insights</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 Hours</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
              <LanguageSelector />
            </div>
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
                  To display geographic analytics, enter your Mapbox public token. 
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

        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList>
            <TabsTrigger value="trends">
              <TrendingUp className="mr-2 h-4 w-4" />
              Scan Trends
            </TabsTrigger>
            <TabsTrigger value="geography">
              <MapPin className="mr-2 h-4 w-4" />
              Geography
            </TabsTrigger>
            <TabsTrigger value="timing">
              <Clock className="mr-2 h-4 w-4" />
              Peak Times
            </TabsTrigger>
            <TabsTrigger value="devices">
              <Smartphone className="mr-2 h-4 w-4" />
              Devices
            </TabsTrigger>
          </TabsList>

          {/* Scan Trends Tab */}
          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Scan Volume Over Time</CardTitle>
                    <CardDescription>Daily scan activity for the selected period</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={scanTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="scans" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Scans</CardDescription>
                  <CardTitle className="text-3xl">178</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    <span>+24% vs last period</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Daily Average</CardDescription>
                  <CardTitle className="text-3xl">25.4</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    Scans per day
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Peak Day</CardDescription>
                  <CardTitle className="text-3xl">38</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    November 16, 2024
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Geography Tab */}
          <TabsContent value="geography" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Heat Map</CardTitle>
                <CardDescription>Scan distribution across locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  ref={mapContainer} 
                  className="w-full h-[450px] rounded-lg border"
                  style={{ display: mapboxToken && !showTokenInput ? 'block' : 'none' }}
                />
                {(!mapboxToken || showTokenInput) && (
                  <div className="w-full h-[450px] rounded-lg border bg-muted flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Enter Mapbox token to view heat map</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
                <CardDescription>Cities with most scan activity</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={locationData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="city" type="category" stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="scans" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Peak Times Tab */}
          <TabsContent value="timing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hourly Scan Pattern</CardTitle>
                <CardDescription>Average scans by time of day</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="scans" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Peak Hours</CardTitle>
                  <CardDescription>Busiest scanning times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">18:00 - 19:00</span>
                      <span className="text-2xl font-bold">22</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">12:00 - 13:00</span>
                      <span className="text-2xl font-bold">18</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">15:00 - 16:00</span>
                      <span className="text-2xl font-bold">15</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Slowest Hours</CardTitle>
                  <CardDescription>Lowest activity periods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">03:00 - 04:00</span>
                      <span className="text-2xl font-bold text-muted-foreground">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">00:00 - 01:00</span>
                      <span className="text-2xl font-bold text-muted-foreground">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">06:00 - 07:00</span>
                      <span className="text-2xl font-bold text-muted-foreground">3</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Devices Tab */}
          <TabsContent value="devices" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Device Distribution</CardTitle>
                  <CardDescription>Breakdown by device type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Device Statistics</CardTitle>
                  <CardDescription>Detailed breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deviceData.map((device) => (
                      <div key={device.name}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: device.color }}
                            />
                            {device.name}
                          </span>
                          <span className="text-sm font-bold">{device.value}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all" 
                            style={{ 
                              width: `${device.value}%`,
                              backgroundColor: device.color
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
