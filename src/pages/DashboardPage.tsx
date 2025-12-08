import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, LogOut, QrCode, Package, BarChart3, Settings, Radio, Plus, FileText, Menu, X } from 'lucide-react';
import { SEO } from '@/components/ui/seo';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Separator } from '@/components/ui/separator';
import { BatchStatistics } from '@/components/dashboard/BatchStatistics';
import { AnalyticsOverview } from '@/components/dashboard/AnalyticsOverview';
import { SecurityOverview } from '@/components/dashboard/SecurityOverview';
import { useState } from 'react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Dashboard - AuthIt"
        description="Manage your brand authentication and product verification"
      />
      
      {/* Header with Glassmorphism */}
      <header className="glass-header sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover shadow-lg">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  AuthIt
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Brand Authentication Platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <ThemeSwitcher />
              {!isMobile && (
                <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard/settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              )}
              {isMobile ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="glass-button"
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="default"
                  onClick={logout}
                  className="glass-button"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="glass border-t border-primary/10">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start glass-button"
                onClick={() => {
                  navigate('/dashboard');
                  setMobileMenuOpen(false);
                }}
              >
                <Shield className="w-4 h-4 mr-3 icon-primary" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start glass-button"
                onClick={() => {
                  navigate('/dashboard/batches');
                  setMobileMenuOpen(false);
                }}
              >
                <Package className="w-4 h-4 mr-3 icon-primary" />
                Batches
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start glass-button"
                onClick={() => {
                  navigate('/dashboard/analytics');
                  setMobileMenuOpen(false);
                }}
              >
                <BarChart3 className="w-4 h-4 mr-3 icon-primary" />
                Analytics
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start glass-button"
                onClick={() => {
                  navigate('/dashboard/security');
                  setMobileMenuOpen(false);
                }}
              >
                <Shield className="w-4 h-4 mr-3 icon-primary" />
                Security
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start glass-button"
                onClick={() => {
                  navigate('/dashboard/settings');
                  setMobileMenuOpen(false);
                }}
              >
                <Settings className="w-4 h-4 mr-3 icon-primary" />
                Settings
              </Button>
              <Separator className="my-2" />
              <Button
                variant="outline"
                className="w-full justify-start glass-button text-destructive"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 page-transition">
        
        {/* Welcome Section */}
        <div className="mb-8 slide-up">
          <h2 className="text-3xl font-bold mb-2">
            Welcome, {user?.companyName || 'Company'}!
          </h2>
          <p className="text-muted-foreground">
            Manage your product authentication and brand protection
          </p>
        </div>

        {/* Batch Statistics */}
        <BatchStatistics />

        {/* Main Action Cards - 2 columns grid with primary actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Card 1: Create Batch - PRIMARY ACTION with Glassmorphism */}
          <Card className="glass-card border-2 border-primary/30 shadow-xl stagger-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-primary icon-primary" />
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
                Create a new product batch with our Dual QR system: visible QR for marketing + hidden QR under cork for security.
              </p>
              <Button
                className="w-full shadow-lg"
                onClick={() => navigate('/dashboard/batches/create')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Batch
              </Button>
            </CardContent>
          </Card>

          {/* Card 2: Manage Batches with Glassmorphism */}
          <Card className="glass-card stagger-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary icon-primary" />
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
                View and manage all your product batches with Dual QR authentication. Track production, download QR codes, and monitor performance.
              </p>

              <Button
                variant="outline"
                className="w-full glass-button"
                onClick={() => navigate('/dashboard/batches')}
              >
                View All Batches
              </Button>
            </CardContent>
          </Card>

        </div>

        {/* Analytics and Security Overview - Full width comprehensive sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="stagger-fade-in">
            <AnalyticsOverview />
          </div>
          <div className="stagger-fade-in">
            <SecurityOverview />
          </div>
        </div>

        {/* Advanced Tools Section */}
        <Separator className="my-8" />
        
        <section className="mb-8 section-fade-in">
          <h3 className="text-xl font-bold mb-4 text-muted-foreground">Advanced Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Browse QR Codes */}
            <Card className="glass-card cursor-pointer stagger-fade-in" onClick={() => navigate('/dashboard/batches')}>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <QrCode className="h-5 w-5 icon-primary" />
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
                  className="w-full glass-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/dashboard/batches');
                  }}
                >
                  Browse Codes
                </Button>
              </CardContent>
            </Card>

            {/* Verification History */}
            <Card className="glass-card cursor-pointer stagger-fade-in" onClick={() => navigate('/dashboard/security')}>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-5 w-5 icon-primary" />
                  Verification History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  View all security QR verifications across batches
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full glass-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/dashboard/security');
                  }}
                >
                  View History
                </Button>
              </CardContent>
            </Card>

            {/* Reports */}
            <Card className="glass-card cursor-pointer stagger-fade-in" onClick={() => navigate('/dashboard/analytics')}>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-5 w-5 icon-primary" />
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
                  className="w-full glass-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/dashboard/analytics');
                  }}
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
                  Click "Create Batch" and follow the wizard. Each batch includes our Dual QR system for complete brand protection.
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
                  Download your dual QR label sheets. Place visible QR on main label and hidden QR under the cork according to placement guide.
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
