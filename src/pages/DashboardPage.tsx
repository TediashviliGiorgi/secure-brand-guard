import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, LogOut, QrCode, Package } from 'lucide-react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-muted">
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
                <p className="text-xs text-muted-foreground">
                  Brand Authentication Platform
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name || 'User'}!
          </h2>
          <p className="text-muted-foreground">
            {user?.companyName || user?.consortiumName} • {user?.region || 'All Regions'}
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>QR Code System</CardTitle>
                  <CardDescription>
                    Dual QR code authentication
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Create and manage your product authentication QR codes. Each product gets two codes: one for marketing and one for security verification.
              </p>
              <Button className="w-full" onClick={() => navigate('/dashboard/batches/create')}>
                Create New Batch
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Manage your product catalog
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Add and manage your products, create brand stories, and track authentication statistics across your inventory.
              </p>
              <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard/batches/AUTH-2024-001')}>
                View Batch Example
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-8 border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>Getting Started with AuthIt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                1
              </div>
              <div>
                <h4 className="font-medium mb-1">Add Your Products</h4>
                <p className="text-sm text-muted-foreground">
                  Start by adding your products to the system with details and brand stories.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                2
              </div>
              <div>
                <h4 className="font-medium mb-1">Generate QR Codes</h4>
                <p className="text-sm text-muted-foreground">
                  Create dual QR codes for each product - one for marketing, one for security.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                3
              </div>
              <div>
                <h4 className="font-medium mb-1">Track & Verify</h4>
                <p className="text-sm text-muted-foreground">
                  Monitor scans and verifications to protect your brand from counterfeiting.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
