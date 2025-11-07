import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Download, ExternalLink, MoreVertical, Package, BarChart3, Shield, Wine } from 'lucide-react';
import { mockBatch } from '@/lib/mockBatchData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function BatchDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const batch = mockBatch;

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/batches')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Batches
          </Button>

          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{batch.productName}</h1>
                <Badge variant="outline" className="text-base">
                  {batch.id}
                </Badge>
                <Badge className="bg-success text-success-foreground">
                  {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Dashboard / Batches / {batch.productName}
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" disabled>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download QR
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem disabled>A4 PDF</DropdownMenuItem>
                  <DropdownMenuItem disabled>Roll PDF</DropdownMenuItem>
                  <DropdownMenuItem disabled>ZIP</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" onClick={() => window.open(`/product/${batch.id}`, '_blank')}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Preview Page
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem disabled>Archive</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" disabled>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="overview">
              <Package className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="bottles">
              <Wine className="mr-2 h-4 w-4" />
              Bottles
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    QR #1 Scans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{batch.qr1Scans.toLocaleString()}</div>
                  <p className="text-sm text-success mt-1">↑ 23% vs last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    QR #2 Verifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{batch.qr2Verifications.toLocaleString()}</div>
                  <p className="text-sm text-success mt-1">↑ 18% vs last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Conversion Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{batch.conversionRate}%</div>
                  <p className="text-sm text-success mt-1">↑ 2.3% vs last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Product Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={batch.mainPhoto}
                    alt={batch.productName}
                    className="w-full rounded-lg object-cover"
                  />
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium">{batch.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Vintage Year</p>
                      <p className="font-medium">{batch.vintageYear}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Region</p>
                      <p className="font-medium">{batch.region}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Units</p>
                      <p className="font-medium">{batch.numberOfUnits.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">DOC Status</p>
                      <p className="font-medium">{batch.docStatus}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Grape Variety</p>
                      <p className="font-medium">{batch.grapeVariety?.join(', ')}</p>
                    </div>
                  </div>

                  {batch.traditionalMethod && (
                    <Badge variant="outline" className="mr-2">
                      🏺 Traditional Method
                    </Badge>
                  )}
                  {batch.organicCertification && (
                    <Badge variant="outline">🌱 Organic Certified</Badge>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Description & Characteristics */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{batch.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-2">Characteristics</h4>
                  <p className="text-muted-foreground">{batch.characteristics}</p>
                </div>

                {batch.servingRecommendation && (
                  <div>
                    <h4 className="font-semibold mb-2">Serving Recommendation</h4>
                    <p className="text-muted-foreground">{batch.servingRecommendation}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Gallery */}
            {batch.galleryPhotos && batch.galleryPhotos.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Photo Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {batch.galleryPhotos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Awards */}
            {batch.awards && batch.awards.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Awards & Recognition</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {batch.awards.map((award, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <span className="text-2xl">
                          {award.medalType === 'gold' ? '🥇' : award.medalType === 'silver' ? '🥈' : '🥉'}
                        </span>
                        <div>
                          <p className="font-medium">{award.name}</p>
                          <p className="text-sm text-muted-foreground">{award.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="py-12 text-center text-muted-foreground">
                Analytics dashboard coming soon...
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Monitoring</CardTitle>
              </CardHeader>
              <CardContent className="py-12 text-center text-muted-foreground">
                Security monitoring coming soon...
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bottles Tab */}
          <TabsContent value="bottles">
            <Card>
              <CardHeader>
                <CardTitle>Individual Bottle Tracking</CardTitle>
              </CardHeader>
              <CardContent className="py-12 text-center text-muted-foreground">
                Bottle tracking coming soon...
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
