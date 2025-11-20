import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, LogOut, QrCode, Package, BarChart3, Settings, Radio, Plus, FileText } from 'lucide-react';
import { SEO } from '@/components/ui/seo';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Separator } from '@/components/ui/separator';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-muted">
      <SEO 
        title="Dashboard - AuthIt"
        description="Manage your brand authentication and product verification"
      />
      
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-foreground">
                  AuthIt
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Brand Authentication Platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              {!isMobile && (
                <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              )}
              <Button variant="outline" size={isMobile ? "sm" : "default"} onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                {!isMobile && "Logout"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome, {user?.companyName || 'Company'}!
          </h2>
          <p className="text-muted-foreground">
            Manage your product authentication and brand protection
          </p>
        </div>

        {/* Main Action Cards - 4 cards in one unified section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Card 1: Create Batch - PRIMARY ACTION */}
          <Card className="border-2 border-primary shadow-xl hover-lift">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Create Batch</CardTitle>
                  <CardDescription>
                    Generate authentication codes
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Create a new product batch with dual QR codes or NFC tags. Choose your protection method in the setup wizard.
              </p>
              <Button 
                className="w-full" 
                onClick={() => navigate('/dashboard/batches/create')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Batch
              </Button>
            </CardContent>
          </Card>

          {/* Card 2: Manage Batches */}
          <Card className="hover-lift">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <CardTitle>Manage Batches</CardTitle>
                  <CardDescription>
                    View all product batches
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View and manage all your product batches. Filter by QR or NFC, track production, and download codes.
              </p>
              
              {/* Quick Filter Chips */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/dashboard/batches')}
                  className="text-xs"
                >
                  All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/dashboard/batches?technology=qr')}
                  className="text-xs"
                >
                  <QrCode className="mr-1 h-3 w-3" />
                  QR
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/dashboard/batches?technology=nfc')}
                  className="text-xs"
                >
                  <Radio className="mr-1 h-3 w-3" />
                  NFC
                </Button>
              </div>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/dashboard/batches')}
              >
                View All Batches
              </Button>
            </CardContent>
          </Card>

          {/* Card 3: Analytics */}
          <Card className="hover-lift">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>
                    Track performance metrics
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                View scan trends, geographic distribution, peak times, and consumer engagement across all batches.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/dashboard/analytics')}
              >
                View Analytics
              </Button>
            </CardContent>
          </Card>

          {/* Card 4: Security */}
          <Card className="hover-lift">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Monitor authentication threats
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Track suspicious scan patterns, detect counterfeiting attempts, and manage security alerts.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/dashboard/security')}
              >
                View Security
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Tools Section */}
        <Separator className="my-8" />
        
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-muted-foreground">Advanced Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Browse QR Codes */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  Browse QR Codes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  Search and monitor all QR codes across batches
                </p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full"
                  disabled
                >
                  Browse Codes
                </Button>
              </CardContent>
            </Card>

            {/* Browse NFC Tags */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Radio className="h-4 w-4" />
                  Browse NFC Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  Search and monitor all NFC tags across batches
                </p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full"
                  onClick={() => navigate('/dashboard/nfc/tags')}
                >
                  Browse Tags
                </Button>
              </CardContent>
            </Card>

            {/* Reports */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  Generate detailed authentication reports
                </p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="w-full"
                  disabled
                >
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Getting Started Guide */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>Getting Started with AuthIt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                1
              </div>
              <div>
                <h4 className="font-medium mb-1">Create Your First Batch</h4>
                <p className="text-sm text-muted-foreground">
                  Click "Create Batch" and follow the wizard. You'll choose between QR codes, NFC tags, or both during the setup process.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                2
              </div>
              <div>
                <h4 className="font-medium mb-1">Download & Apply</h4>
                <p className="text-sm text-muted-foreground">
                  Download your QR labels or NFC programming file. Apply codes to your products according to the placement guide.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                3
              </div>
              <div>
                <h4 className="font-medium mb-1">Monitor & Protect</h4>
                <p className="text-sm text-muted-foreground">
                  Track scans, verify authenticity, and monitor security alerts in real-time from your dashboard.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
