import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductionOrderForm } from '@/components/traceability/ProductionOrderForm';
import { LiveProductionView } from '@/components/traceability/LiveProductionView';
import { ScannerApp } from '@/components/traceability/ScannerApp';
import { ExceptionHandler } from '@/components/traceability/ExceptionHandler';
import { TraceabilityStatsOverview } from '@/components/traceability/TraceabilityStats';
import { 
  QrCode, 
  Activity, 
  ScanLine, 
  AlertTriangle, 
  BarChart3,
  Package,
  Wine,
  Boxes,
  Settings,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/ui/seo';

export default function TraceabilityDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <>
      <SEO 
        title="Aggregation & Traceability | Dashboard"
        description="Track and manage product aggregation across bottles, cases, and pallets"
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold">Aggregation & Traceability</h1>
                    <p className="text-sm text-muted-foreground">3-Level Hierarchy: Bottle → Case → Pallet</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="outline" className="hidden md:flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  System Online
                </Badge>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-5 lg:w-[600px]">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                <span className="hidden sm:inline">Orders</span>
              </TabsTrigger>
              <TabsTrigger value="live" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Live View</span>
              </TabsTrigger>
              <TabsTrigger value="scanner" className="flex items-center gap-2">
                <ScanLine className="h-4 w-4" />
                <span className="hidden sm:inline">Scanner</span>
              </TabsTrigger>
              <TabsTrigger value="exceptions" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="hidden sm:inline">Exceptions</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <TraceabilityStatsOverview />
            </TabsContent>

            {/* Production Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <ProductionOrderForm />
                
                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Production Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { id: 'PO-2024-001', product: 'Saperavi 2024', qty: 10000, status: 'IN_PROGRESS' },
                        { id: 'PO-2024-002', product: 'Rkatsiteli 2024', qty: 5000, status: 'COMPLETED' },
                        { id: 'PO-2024-003', product: 'Kindzmarauli 2023', qty: 3000, status: 'PENDING' },
                      ].map((order) => (
                        <div 
                          key={order.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Wine className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-mono text-sm">{order.id}</p>
                              <p className="text-sm text-muted-foreground">{order.product}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{order.qty.toLocaleString()}</p>
                            <Badge 
                              variant={
                                order.status === 'COMPLETED' ? 'default' : 
                                order.status === 'IN_PROGRESS' ? 'secondary' : 'outline'
                              }
                              className="text-xs"
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Live Production View Tab */}
            <TabsContent value="live" className="space-y-6">
              <LiveProductionView />
            </TabsContent>

            {/* Scanner App Tab */}
            <TabsContent value="scanner" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <ScanLine className="h-5 w-5 text-primary" />
                      Worker Scanner Interface
                    </CardTitle>
                    <Badge variant="outline">Demo Mode</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="max-w-md mx-auto">
                    <ScannerApp />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Exception Handler Tab */}
            <TabsContent value="exceptions" className="space-y-6">
              <ExceptionHandler />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}
