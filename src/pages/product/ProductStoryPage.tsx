import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  ArrowLeft, Share2, MapPin, Award, ChevronDown,
  Phone, Mail, Globe, ExternalLink, Star, CheckCircle2, Shield,
  X, ChevronLeft, ChevronRight, ZoomIn
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
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { t } = useTranslation();

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    if (product.galleryPhotos) {
      setSelectedImage((prev) => (prev + 1) % product.galleryPhotos.length);
    }
  };

  const prevImage = () => {
    if (product.galleryPhotos) {
      setSelectedImage((prev) =>
        prev === 0 ? product.galleryPhotos.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen vintage-premium">
      {/* Premium Header with Vintage Styling */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b-2 border-[hsl(var(--vintage-gold))]/20 shadow-vintage">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="hover:bg-[hsl(var(--vintage-gold))]/10 transition-all duration-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="font-vintage">{t('common.back')}</span>
          </Button>

          <div className="flex gap-2">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-[hsl(var(--vintage-gold))]/10 transition-all duration-300"
            >
              <Share2 className="h-4 w-4 text-[hsl(var(--vintage-gold))]" />
            </Button>
          </div>
        </div>
        <div className="vintage-ornament text-center pb-2">✦</div>
      </header>

      {/* Premium Hero Section with Elegant Overlay */}
      <div className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden shadow-vintage-lg">
        <img
          src={product.mainPhoto}
          alt={product.productName}
          className="w-full h-full object-cover scale-105 transition-transform duration-700 hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--vintage-charcoal))]/80 via-[hsl(var(--vintage-charcoal))]/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

        {/* Elegant Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <div className="vintage-ornament mb-4 animate-fadeInUp">◈</div>
            <h1 className="vintage-heading text-5xl md:text-7xl text-white mb-4 animate-fadeInUp" style={{animationDelay: '0.1s'}}>
              {product.productName}
            </h1>
            <div className="flex items-center gap-4 mb-6 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              <span className="vintage-gold-accent text-2xl md:text-3xl font-serif">{product.vintageYear}</span>
              <Separator orientation="vertical" className="h-8 bg-[hsl(var(--vintage-gold))]/50" />
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 transition-all duration-300 ${
                      i < Math.floor(product.rating)
                        ? 'fill-[hsl(var(--vintage-gold))] text-[hsl(var(--vintage-gold))]'
                        : 'text-white/30'
                    }`}
                  />
                ))}
                <span className="ml-2 text-white font-serif text-lg">{product.rating}</span>
              </div>
            </div>
            <div className="vintage-ornament animate-fadeInUp" style={{animationDelay: '0.3s'}}>✦ ✦ ✦</div>
          </div>
        </div>
      </div>

      {/* Premium Info Bar with Gold Accents */}
      <div className="border-b-2 border-[hsl(var(--vintage-gold))]/20 bg-white/50 backdrop-blur-sm shadow-vintage">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-6 justify-center items-center">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[hsl(var(--vintage-gold))]" />
              <span className="vintage-text text-base font-medium">{product.region}, Georgia</span>
            </div>
            {product.traditionalMethod && (
              <Badge variant="outline" className="border-[hsl(var(--vintage-gold))]/40 text-[hsl(var(--vintage-bronze))] bg-[hsl(var(--vintage-cream))]">
                🏺 Traditional Method
              </Badge>
            )}
            {product.organicCertification && (
              <Badge variant="outline" className="border-[hsl(var(--vintage-gold))]/40 text-[hsl(var(--vintage-bronze))] bg-[hsl(var(--vintage-cream))]">
                🌱 Organic
              </Badge>
            )}
            {product.docStatus && (
              <Badge variant="outline" className="border-[hsl(var(--vintage-gold))]/40 text-[hsl(var(--vintage-bronze))] bg-[hsl(var(--vintage-cream))]">
                {product.docStatus}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl space-y-16">
        {/* Premium Verify Authenticity Section */}
        <section className="relative overflow-hidden animate-fadeInUp">
          <div className="vintage-card vintage-card-hover p-10 space-y-8">
            <div className="text-center">
              <div className="vintage-ornament mb-6">◈ ✦ ◈</div>
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-[hsl(var(--vintage-gold))]/20 rounded-full blur-2xl animate-pulse"></div>
                  <div className="relative p-5 rounded-full bg-gradient-to-br from-[hsl(var(--vintage-gold))]/10 to-[hsl(var(--vintage-bronze))]/10 border-2 border-[hsl(var(--vintage-gold))]/30">
                    <Shield className="h-12 w-12 text-[hsl(var(--vintage-gold))]" />
                  </div>
                </div>
              </div>
              <h2 className="vintage-heading text-4xl md:text-5xl mb-4">{t('verification.verifyAuthenticity')}</h2>
              <p className="vintage-text text-xl text-[hsl(var(--vintage-charcoal))]/70 max-w-2xl mx-auto">
                {t('verification.confirmAuthentic')}
              </p>
            </div>

            <Button
              size="lg"
              className="w-full text-lg py-8 bg-gradient-to-r from-[hsl(var(--vintage-gold))] to-[hsl(var(--vintage-bronze))] hover:from-[hsl(var(--vintage-bronze))] hover:to-[hsl(var(--vintage-gold))] text-white shadow-vintage-lg hover:shadow-[0_30px_60px_-15px_rgba(251,191,36,0.4)] transition-all duration-500 font-serif"
              onClick={() => window.open(`/verify?token=${batchId}`, '_blank')}
            >
              <Shield className="mr-3 h-6 w-6" />
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
          </div>
        </section>

        {/* Story Section - Vintage Styling */}
        <section className="space-y-6 animate-fadeInUp">
          <div className="vintage-divider"></div>
          <div className="text-center mb-6">
            <div className="vintage-ornament mb-4">◈</div>
            <h2 className="vintage-heading text-4xl mb-2">The Story</h2>
            <div className="vintage-ornament">✦</div>
          </div>
          <p className="vintage-text text-xl leading-relaxed text-center max-w-3xl mx-auto">
            {product.productStory}
          </p>
          <div className="vintage-divider"></div>
        </section>

        {/* Product Details - Vintage Expandable Cards */}
        <section className="space-y-4 animate-fadeInUp">
          <div className="vintage-card overflow-hidden vintage-card-hover">
            <button
              onClick={() => toggleSection('details')}
              className="w-full p-6 flex items-center justify-between hover:bg-[hsl(var(--vintage-gold))]/5 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">🍇</span>
                <h3 className="vintage-heading text-xl">Product Details</h3>
              </div>
              <ChevronDown className={`h-6 w-6 text-[hsl(var(--vintage-gold))] transition-transform duration-300 ${expandedSection === 'details' ? 'rotate-180' : ''}`} />
            </button>
            {expandedSection === 'details' && (
              <div className="p-6 pt-0 space-y-4 border-t-2 border-[hsl(var(--vintage-gold))]/20">
                <p className="vintage-text text-lg leading-relaxed">{product.characteristics}</p>
                {product.servingRecommendation && (
                  <div className="mt-4 p-5 bg-[hsl(var(--vintage-cream))] rounded-xl border border-[hsl(var(--vintage-gold))]/20">
                    <p className="vintage-text"><strong className="vintage-heading">Serving:</strong> {product.servingRecommendation}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {product.awards && product.awards.length > 0 && (
            <div className="vintage-card overflow-hidden vintage-card-hover">
              <button
                onClick={() => toggleSection('awards')}
                className="w-full p-6 flex items-center justify-between hover:bg-[hsl(var(--vintage-gold))]/5 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <Award className="h-6 w-6 text-[hsl(var(--vintage-gold))]" />
                  <h3 className="vintage-heading text-xl">Awards & Recognition</h3>
                </div>
                <ChevronDown className={`h-6 w-6 text-[hsl(var(--vintage-gold))] transition-transform duration-300 ${expandedSection === 'awards' ? 'rotate-180' : ''}`} />
              </button>
              {expandedSection === 'awards' && (
                <div className="p-6 pt-0 space-y-3 border-t-2 border-[hsl(var(--vintage-gold))]/20">
                  {product.awards.map((award, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-[hsl(var(--vintage-cream))] border border-[hsl(var(--vintage-gold))]/20 transition-all duration-300 hover:shadow-vintage">
                      <span className="text-3xl">
                        {award.medalType === 'gold' ? '🥇' : award.medalType === 'silver' ? '🥈' : '🥉'}
                      </span>
                      <div>
                        <p className="vintage-heading font-medium">{award.name}</p>
                        <p className="vintage-text text-sm">{award.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {product.foodPairings && product.foodPairings.length > 0 && (
            <div className="vintage-card overflow-hidden vintage-card-hover">
              <button
                onClick={() => toggleSection('pairing')}
                className="w-full p-6 flex items-center justify-between hover:bg-[hsl(var(--vintage-gold))]/5 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🍽️</span>
                  <h3 className="vintage-heading text-xl">Food Pairing</h3>
                </div>
                <ChevronDown className={`h-6 w-6 text-[hsl(var(--vintage-gold))] transition-transform duration-300 ${expandedSection === 'pairing' ? 'rotate-180' : ''}`} />
              </button>
              {expandedSection === 'pairing' && (
                <div className="p-6 pt-0 border-t-2 border-[hsl(var(--vintage-gold))]/20">
                  <div className="flex flex-wrap gap-3">
                    {product.foodPairings.map((food, index) => (
                      <Badge key={index} className="bg-[hsl(var(--vintage-cream))] text-[hsl(var(--vintage-bronze))] border border-[hsl(var(--vintage-gold))]/30 px-4 py-2 text-base font-vintage hover:bg-[hsl(var(--vintage-gold))]/20 transition-all duration-300">{food}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Premium Futuristic Gallery */}
        {product.galleryPhotos && product.galleryPhotos.length > 0 && (
          <section className="space-y-10 animate-fadeInUp">
            <div className="vintage-divider"></div>
            <div className="text-center">
              <div className="vintage-ornament mb-4">◈</div>
              <h2 className="vintage-heading text-4xl">Gallery</h2>
              <div className="vintage-ornament mt-4">✦</div>
            </div>

            {/* Main Featured Image */}
            <div className="relative group">
              <div className="vintage-card overflow-hidden p-0 shadow-vintage-lg hover:shadow-[0_40px_80px_-20px_rgba(251,191,36,0.3)] transition-all duration-700">
                <div className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-gradient-to-br from-[hsl(var(--vintage-charcoal))]/5 to-[hsl(var(--vintage-gold))]/5">
                  <img
                    src={product.galleryPhotos[selectedImage]}
                    alt={`Gallery ${selectedImage + 1}`}
                    className="w-full h-full object-contain transform transition-all duration-700"
                  />

                  {/* Futuristic Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--vintage-charcoal))]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Zoom Button */}
                  <button
                    onClick={() => openLightbox(selectedImage)}
                    className="absolute top-6 right-6 p-4 rounded-full bg-[hsl(var(--vintage-gold))]/90 backdrop-blur-md text-white hover:bg-[hsl(var(--vintage-gold))] transition-all duration-300 hover:scale-110 shadow-vintage-lg opacity-0 group-hover:opacity-100"
                  >
                    <ZoomIn className="w-6 h-6" />
                  </button>

                  {/* Navigation Arrows */}
                  {product.galleryPhotos.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/90 backdrop-blur-md hover:bg-white transition-all duration-300 shadow-vintage hover:scale-110"
                      >
                        <ChevronLeft className="w-6 h-6 text-[hsl(var(--vintage-gold))]" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/90 backdrop-blur-md hover:bg-white transition-all duration-300 shadow-vintage hover:scale-110"
                      >
                        <ChevronRight className="w-6 h-6 text-[hsl(var(--vintage-gold))]" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-white/90 backdrop-blur-md shadow-vintage">
                    <p className="vintage-heading text-sm">
                      {selectedImage + 1} / {product.galleryPhotos.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {product.galleryPhotos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative group/thumb overflow-hidden rounded-xl transition-all duration-500 ${
                    selectedImage === index
                      ? 'ring-4 ring-[hsl(var(--vintage-gold))] shadow-vintage-lg scale-105'
                      : 'hover:scale-105 hover:shadow-vintage'
                  }`}
                >
                  <div className="aspect-square overflow-hidden bg-[hsl(var(--vintage-cream))]">
                    <img
                      src={photo}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-110"
                    />
                  </div>
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-[hsl(var(--vintage-gold))]/20 border-2 border-[hsl(var(--vintage-gold))]"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--vintage-charcoal))]/60 to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300"></div>
                </button>
              ))}
            </div>

            <div className="vintage-divider"></div>
          </section>
        )}

        {/* Lightbox Modal */}
        {lightboxOpen && product.galleryPhotos && (
          <div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Arrows */}
            {product.galleryPhotos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-6 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 z-10"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-6 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110 z-10"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Main Image */}
            <div className="relative max-w-7xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              <img
                src={product.galleryPhotos[selectedImage]}
                alt={`Gallery ${selectedImage + 1}`}
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
              />

              {/* Image Info */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl text-white shadow-2xl">
                <p className="font-serif text-lg">
                  {selectedImage + 1} / {product.galleryPhotos.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {product.traditionalMethods && (
          <section className="space-y-6 animate-fadeInUp">
            <div className="text-center">
              <div className="vintage-ornament mb-4">◈</div>
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-4xl">🏺</span>
                <h2 className="vintage-heading text-4xl">Traditional Methods</h2>
              </div>
              <div className="vintage-ornament">✦</div>
            </div>
            <div className="vintage-card p-8">
              <p className="vintage-text text-lg leading-relaxed text-center">{product.traditionalMethods}</p>
            </div>
            <div className="vintage-divider"></div>
          </section>
        )}

        {/* Visit Us - Vintage Styling */}
        <section className="space-y-6 animate-fadeInUp">
          <div className="text-center">
            <div className="vintage-ornament mb-4">◈</div>
            <h2 className="vintage-heading text-4xl">Visit Us</h2>
            <div className="vintage-ornament mt-4">✦</div>
          </div>
          <div className="vintage-card vintage-card-hover p-8 space-y-6">
            <div className="text-center">
              <h3 className="vintage-heading text-2xl mb-3">{product.companyName}</h3>
              <p className="vintage-text text-lg">{product.address}</p>
            </div>

            <div className="vintage-divider"></div>

            <div className="space-y-4">
              <a href={`tel:${product.phone}`} className="flex items-center justify-center gap-3 vintage-text text-lg hover:text-[hsl(var(--vintage-gold))] transition-all duration-300 group">
                <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                {product.phone}
              </a>
              <a href={`mailto:${product.email}`} className="flex items-center justify-center gap-3 vintage-text text-lg hover:text-[hsl(var(--vintage-gold))] transition-all duration-300 group">
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                {product.email}
              </a>
              <a href={product.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 vintage-text text-lg hover:text-[hsl(var(--vintage-gold))] transition-all duration-300 group">
                <Globe className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Visit Website
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          <div className="vintage-divider"></div>
        </section>

        {/* Verification CTA - Vintage Styling */}
        <section className="animate-fadeInUp">
          <div className="vintage-card p-8 bg-gradient-to-br from-[hsl(var(--vintage-cream))] to-white border-2 border-[hsl(var(--vintage-gold))]/30">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="p-4 rounded-full bg-gradient-to-br from-[hsl(var(--vintage-gold))]/20 to-[hsl(var(--vintage-bronze))]/10 border-2 border-[hsl(var(--vintage-gold))]/30">
                <CheckCircle2 className="h-8 w-8 text-[hsl(var(--vintage-gold))]" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="vintage-heading text-2xl mb-3">Verify Authenticity</h3>
                <p className="vintage-text text-lg mb-5">
                  Want to confirm this product is authentic? Open the bottle and scan the QR code hidden under the seal.
                </p>
                <Button
                  variant="outline"
                  className="border-2 border-[hsl(var(--vintage-gold))]/40 text-[hsl(var(--vintage-bronze))] hover:bg-[hsl(var(--vintage-gold))]/10 font-serif text-base px-6 py-3"
                >
                  How to find it? →
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews - Vintage Styling */}
        <section className="space-y-8 animate-fadeInUp">
          <div className="vintage-divider"></div>
          <div className="text-center">
            <div className="vintage-ornament mb-4">◈</div>
            <h2 className="vintage-heading text-4xl">Customer Reviews</h2>
            <div className="vintage-ornament mt-4">✦</div>
          </div>
          <div className="space-y-4">
            {mockReviews.map((review) => (
              <div key={review.id} className="vintage-card p-6 vintage-card-hover">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="vintage-heading text-lg">{review.author}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'fill-[hsl(var(--vintage-gold))] text-[hsl(var(--vintage-gold))]' : 'text-muted-foreground'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="vintage-text text-sm">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="vintage-text text-base leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
          <div className="vintage-divider"></div>
        </section>

        {/* Similar Products - Vintage Styling */}
        {mockSimilarProducts.length > 0 && (
          <section className="space-y-8 animate-fadeInUp">
            <div className="text-center">
              <div className="vintage-ornament mb-4">◈</div>
              <h2 className="vintage-heading text-4xl">More from {product.companyName}</h2>
              <div className="vintage-ornament mt-4">✦</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {mockSimilarProducts.map((similar) => (
                <div key={similar.id} className="vintage-card overflow-hidden cursor-pointer vintage-card-hover group">
                  <div className="relative overflow-hidden">
                    <img
                      src={similar.thumbnail}
                      alt={similar.name}
                      className="w-full h-48 object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--vintage-charcoal))]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-5 bg-[hsl(var(--vintage-cream))]">
                    <p className="vintage-heading text-base mb-1">{similar.name}</p>
                    <p className="vintage-text text-sm">{similar.vintageYear}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer - Vintage Styling */}
      <footer className="border-t-2 border-[hsl(var(--vintage-gold))]/20 mt-16 bg-[hsl(var(--vintage-cream))]">
        <div className="container mx-auto px-4 py-10 text-center">
          <div className="vintage-ornament mb-4">◈ ✦ ◈</div>
          <p className="vintage-text text-base">
            Protected by <span className="vintage-heading font-bold text-lg">AuthIt</span>
          </p>
          <div className="vintage-ornament mt-4">✦</div>
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
