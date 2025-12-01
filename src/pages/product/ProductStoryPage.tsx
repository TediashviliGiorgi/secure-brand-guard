import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ArrowLeft, Share2, MapPin, Award, ChevronDown, 
  Phone, Mail, Globe, ExternalLink, Star, CheckCircle2, Shield 
} from 'lucide-react';
import { mockBatch, mockReviews, mockSimilarProducts } from '@/lib/mockBatchData';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '@/components/LanguageSelector';
import { AISommelierChat } from '@/components/product/AISommelierChat';

export default function ProductStoryPage() {
  const { batchId } = useParams();
  const product = mockBatch;
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const { t } = useTranslation();

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('common.back')}
          </Button>
          
          <div className="flex gap-2">
            <LanguageSelector />
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Luxury Design */}
      <div className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden">
        <img
          src={product.mainPhoto}
          alt={product.productName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 text-white tracking-wide leading-tight">
              {product.productName}
            </h1>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-white/90 text-lg font-light tracking-wider">{product.vintageYear}</span>
              <Separator orientation="vertical" className="h-5 bg-white/30" />
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-white/40'}`}
                  />
                ))}
                <span className="ml-2 text-white/90 text-sm font-light">{product.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{product.region}, Georgia</span>
            </div>
            {product.traditionalMethod && (
              <Badge variant="outline">🏺 Traditional Method</Badge>
            )}
            {product.organicCertification && (
              <Badge variant="outline">🌱 Organic</Badge>
            )}
            {product.docStatus && (
              <Badge variant="outline">{product.docStatus}</Badge>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10 max-w-4xl space-y-10">
        {/* Verify Authenticity Section - Luxury Institutional */}
        <section className="relative overflow-hidden">
          <Card className="border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 shadow-xl">
            <CardContent className="p-8 space-y-5">
              <div className="flex items-start gap-5">
                <div className="p-4 rounded-lg bg-primary/10 ring-1 ring-primary/20">
                  <Shield className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="font-serif text-3xl font-semibold text-foreground mb-2 tracking-tight">
                    {t('verification.verifyAuthenticity')}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t('verification.confirmAuthentic')}
                  </p>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full h-11 text-base font-medium shadow-lg hover:shadow-xl transition-all tracking-wide"
                onClick={() => window.open(`/verify?token=${batchId}`, '_blank')}
              >
                <Shield className="mr-2 h-4 w-4" />
                {t('verification.scan')}
              </Button>

              {/* Collapsible Instructions */}
              <Collapsible open={showInstructions} onOpenChange={setShowInstructions}>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {t('verification.howToFindIt')}
                    <ChevronDown className={`h-4 w-4 transition-transform ${showInstructions ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 space-y-6 pt-4 border-t">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">{t('verification.qrInstructions')}</h3>
                    
                    {/* QR Code #1 */}
                    <div className="flex gap-4 p-4 rounded-lg bg-muted/50 mb-3">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl">
                        1
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{t('verification.step1')}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{t('verification.qr1Location')}</p>
                        <p className="text-sm text-muted-foreground italic">{t('verification.qr1Purpose')}</p>
                      </div>
                    </div>

                    {/* QR Code #2 */}
                    <div className="flex gap-4 p-4 rounded-lg bg-muted/50">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-xl">
                        2
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{t('verification.step2')}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{t('verification.qr2Location')}</p>
                        <p className="text-sm text-muted-foreground italic">{t('verification.qr2Purpose')}</p>
                      </div>
                    </div>

                    {/* Why Two QR Codes */}
                    <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <span className="text-2xl">💡</span>
                        {t('verification.whyTwoQR')}
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>{t('verification.qr1Description')}</span>
                        </li>
                        <li className="flex gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>{t('verification.qr2Description')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </section>

        {/* Story Section - Luxury Typography */}
        <section className="space-y-5 py-4">
          <h2 className="font-serif text-3xl font-semibold text-foreground tracking-tight">The Story</h2>
          <p className="text-base leading-loose text-muted-foreground font-light">
            {product.productStory}
          </p>
        </section>

        <Separator />

        {/* Product Details - Expandable */}
        <section className="space-y-3">
          <Card className="overflow-hidden">
            <button
              onClick={() => toggleSection('details')}
              className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">🍇</span>
                <h3 className="font-semibold">Product Details</h3>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${expandedSection === 'details' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'details' && (
              <div className="p-4 pt-0 space-y-3 border-t">
                <p className="text-muted-foreground">{product.characteristics}</p>
                {product.servingRecommendation && (
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <p className="text-sm"><strong>Serving:</strong> {product.servingRecommendation}</p>
                  </div>
                )}
              </div>
            )}
          </Card>

          {product.awards && product.awards.length > 0 && (
            <Card className="overflow-hidden">
              <button
                onClick={() => toggleSection('awards')}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition"
              >
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5" />
                  <h3 className="font-semibold">Awards & Recognition</h3>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${expandedSection === 'awards' ? 'rotate-180' : ''}`} />
              </button>
              {expandedSection === 'awards' && (
                <div className="p-4 pt-0 space-y-2 border-t">
                  {product.awards.map((award, index) => (
                    <div key={index} className="flex items-center gap-3 p-2">
                      <span className="text-xl">
                        {award.medalType === 'gold' ? '🥇' : award.medalType === 'silver' ? '🥈' : '🥉'}
                      </span>
                      <div>
                        <p className="font-medium text-sm">{award.name}</p>
                        <p className="text-xs text-muted-foreground">{award.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {product.foodPairings && product.foodPairings.length > 0 && (
            <Card className="overflow-hidden">
              <button
                onClick={() => toggleSection('pairing')}
                className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🍽️</span>
                  <h3 className="font-semibold">Food Pairing</h3>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${expandedSection === 'pairing' ? 'rotate-180' : ''}`} />
              </button>
              {expandedSection === 'pairing' && (
                <div className="p-4 pt-0 border-t">
                  <div className="flex flex-wrap gap-2">
                    {product.foodPairings.map((food, index) => (
                      <Badge key={index} variant="secondary">{food}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}
        </section>

        <Separator />

        {/* Photo Gallery */}
        {product.galleryPhotos && product.galleryPhotos.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {product.galleryPhotos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>
          </section>
        )}

        {product.traditionalMethods && (
          <>
            <Separator />
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏺</span>
                <h2 className="text-2xl font-bold">Traditional Methods</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{product.traditionalMethods}</p>
            </section>
          </>
        )}

        <Separator />

        {/* Visit Us - Institutional Design */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-semibold text-foreground tracking-tight">Visit Us</h2>
          <Card className="p-5 space-y-4 border-border/50">
            <div>
              <h3 className="font-semibold text-base mb-1.5">{product.companyName}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.address}</p>
            </div>
            
            <div className="space-y-2">
              <a href={`tel:${product.phone}`} className="flex items-center gap-2.5 text-xs hover:text-primary transition">
                <Phone className="h-3.5 w-3.5" />
                {product.phone}
              </a>
              <a href={`mailto:${product.email}`} className="flex items-center gap-2.5 text-xs hover:text-primary transition">
                <Mail className="h-3.5 w-3.5" />
                {product.email}
              </a>
              <a href={product.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-xs hover:text-primary transition">
                <Globe className="h-3.5 w-3.5" />
                Visit Website
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </Card>
        </section>

        <Separator />

        {/* Verification CTA */}
        <section>
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-primary/10">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">Verify Authenticity</h3>
                <p className="text-muted-foreground mb-4">
                  Want to confirm this product is authentic? Open the bottle and scan the QR code hidden under the seal.
                </p>
                <Button variant="outline">How to find it? →</Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Reviews - Compact Institutional */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-semibold text-foreground tracking-tight">Customer Reviews</h2>
          <div className="space-y-3">
            {mockReviews.map((review) => (
              <Card key={review.id} className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{review.author}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{review.comment}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Similar Products */}
        {mockSimilarProducts.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">More from {product.companyName}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mockSimilarProducts.map((similar) => (
                <Card key={similar.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition">
                  <img
                    src={similar.thumbnail}
                    alt={similar.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3">
                    <p className="font-medium text-sm">{similar.name}</p>
                    <p className="text-xs text-muted-foreground">{similar.vintageYear}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Protected by <span className="font-semibold">AuthIt</span>
          </p>
        </div>
      </footer>

      {/* AI Sommelier Chat */}
      <AISommelierChat 
        productName={mockBatch.productName}
        productInfo={{
          description: mockBatch.description,
          region: mockBatch.region,
          vintageYear: mockBatch.vintageYear,
          awards: mockBatch.awards,
          pairings: mockBatch.foodPairings
        }}
      />
    </div>
  );
}
