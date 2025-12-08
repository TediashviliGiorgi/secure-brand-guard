import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  ArrowLeft, Share2, MapPin, Award, ChevronDown,
  Phone, Mail, Globe, ExternalLink, Star, CheckCircle2, Shield,
  X, ChevronLeft, ChevronRight, ZoomIn, Wine, Grape, Thermometer, Clock
} from 'lucide-react';
import { mockBatch, mockReviews, mockSimilarProducts } from '@/lib/mockBatchData';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { AISommelierChat } from '@/components/product/AISommelierChat';

export default function ProductStoryPage() {
  const { batchId } = useParams();
  const product = mockBatch;
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
    <div className="min-h-screen bg-background luxury-particles">
      {/* Ambient Glow Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary opacity-[0.03] blur-[150px] animate-luxury-pulse dark:bg-[hsl(var(--luxury-gold))]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-primary opacity-[0.02] blur-[120px] animate-luxury-pulse dark:bg-[hsl(var(--luxury-gold))]" style={{ animationDelay: '2s' }} />
      </div>

      {/* Premium Header */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl border-b border-border/50 bg-background/80 dark:border-[hsl(var(--luxury-gold))]/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="text-muted-foreground hover:text-primary transition-all duration-500 dark:text-[hsl(var(--luxury-champagne))] dark:hover:text-[hsl(var(--luxury-gold))]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="font-serif tracking-wide">{t('common.back')}</span>
          </Button>

          <div className="flex gap-3">
            <LanguageSelector />
            <ThemeSwitcher />
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:bg-primary/10 transition-all duration-500 rounded-full dark:text-[hsl(var(--luxury-gold))] dark:hover:bg-[hsl(var(--luxury-gold))]/10"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Parallax Effect */}
      <div className="relative w-full h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={product.mainPhoto}
            alt={product.productName}
            className={`w-full h-full object-cover transition-all duration-[2000ms] ${isLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
          />
          {/* Cinematic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--luxury-dark))] via-[hsl(var(--luxury-dark))]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--luxury-dark))]/40 via-transparent to-[hsl(var(--luxury-dark))]/40" />
          {/* Vignette Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,hsl(var(--luxury-dark))_100%)] opacity-60" />
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto max-w-5xl">
            {/* Animated Gold Line */}
            <div className={`w-24 h-[2px] bg-gradient-to-r from-[hsl(var(--luxury-gold))] to-transparent mb-8 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 w-24' : 'opacity-0 w-0'}`} />
            
            {/* Product Name with Shimmer */}
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-serif tracking-wide mb-6 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="animate-shimmer-gold">{product.productName}</span>
            </h1>
            
            {/* Vintage & Rating */}
            <div className={`flex flex-wrap items-center gap-6 mb-8 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="text-4xl md:text-5xl font-serif text-[hsl(var(--luxury-gold))]">{product.vintageYear}</span>
              <div className="w-[1px] h-10 bg-[hsl(var(--luxury-gold))]/30" />
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 transition-all duration-500 ${
                      i < Math.floor(product.rating)
                        ? 'fill-[hsl(var(--luxury-gold))] text-[hsl(var(--luxury-gold))] animate-luxury-pulse'
                        : 'text-[hsl(var(--luxury-champagne))]/20'
                    }`}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
                <span className="ml-3 text-2xl text-[hsl(var(--luxury-champagne))] font-serif">{product.rating}</span>
              </div>
            </div>

            {/* Quick Info Pills */}
            <div className={`flex flex-wrap gap-3 transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Badge className="bg-[hsl(var(--luxury-gold))]/10 border border-[hsl(var(--luxury-gold))]/30 text-[hsl(var(--luxury-champagne))] px-4 py-2 backdrop-blur-sm">
                <MapPin className="h-3 w-3 mr-2" />
                {product.region}
              </Badge>
              {product.traditionalMethod && (
                <Badge className="bg-[hsl(var(--luxury-gold))]/10 border border-[hsl(var(--luxury-gold))]/30 text-[hsl(var(--luxury-champagne))] px-4 py-2 backdrop-blur-sm animate-border-glow">
                  🏺 Traditional
                </Badge>
              )}
              {product.organicCertification && (
                <Badge className="bg-[hsl(var(--luxury-gold))]/10 border border-[hsl(var(--luxury-gold))]/30 text-[hsl(var(--luxury-champagne))] px-4 py-2 backdrop-blur-sm">
                  🌱 Organic
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Stats Bar */}
      <div className="relative -mt-16 z-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="luxury-card p-6 grid grid-cols-2 md:grid-cols-4 gap-6 animate-luxury-glow">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--luxury-gold))]/10 mb-3 group-hover:bg-[hsl(var(--luxury-gold))]/20 transition-all duration-500">
                <Wine className="h-5 w-5 text-[hsl(var(--luxury-gold))] animate-float" />
              </div>
              <p className="text-sm text-[hsl(var(--luxury-champagne))]/60 font-serif">Type</p>
              <p className="text-lg text-[hsl(var(--luxury-pearl))] font-serif">Red Wine</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--luxury-gold))]/10 mb-3 group-hover:bg-[hsl(var(--luxury-gold))]/20 transition-all duration-500">
                <Grape className="h-5 w-5 text-[hsl(var(--luxury-gold))] animate-float" style={{ animationDelay: '1s' }} />
              </div>
              <p className="text-sm text-[hsl(var(--luxury-champagne))]/60 font-serif">Grape</p>
              <p className="text-lg text-[hsl(var(--luxury-pearl))] font-serif">Saperavi</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--luxury-gold))]/10 mb-3 group-hover:bg-[hsl(var(--luxury-gold))]/20 transition-all duration-500">
                <Thermometer className="h-5 w-5 text-[hsl(var(--luxury-gold))] animate-float" style={{ animationDelay: '2s' }} />
              </div>
              <p className="text-sm text-[hsl(var(--luxury-champagne))]/60 font-serif">Serve</p>
              <p className="text-lg text-[hsl(var(--luxury-pearl))] font-serif">16-18°C</p>
            </div>
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[hsl(var(--luxury-gold))]/10 mb-3 group-hover:bg-[hsl(var(--luxury-gold))]/20 transition-all duration-500">
                <Clock className="h-5 w-5 text-[hsl(var(--luxury-gold))] animate-float" style={{ animationDelay: '3s' }} />
              </div>
              <p className="text-sm text-[hsl(var(--luxury-champagne))]/60 font-serif">Aging</p>
              <p className="text-lg text-[hsl(var(--luxury-pearl))] font-serif">18 Months</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 max-w-5xl space-y-20">
        {/* Verify Authenticity Section */}
        <section className="relative">
          <div className="luxury-card luxury-card-hover p-10 relative overflow-hidden">
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--luxury-gold))]/5 via-transparent to-[hsl(var(--luxury-gold))]/5 animate-luxury-pulse" />
            
            <div className="relative z-10 text-center space-y-8">
              {/* Pulsing Shield Icon */}
              <div className="inline-flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[hsl(var(--luxury-gold))] blur-2xl opacity-30 animate-luxury-pulse" />
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[hsl(var(--luxury-gold))]/20 to-transparent border border-[hsl(var(--luxury-gold))]/30 flex items-center justify-center animate-border-glow">
                    <Shield className="h-12 w-12 text-[hsl(var(--luxury-gold))] animate-float" />
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="luxury-heading text-4xl md:text-5xl mb-4">{t('verification.verifyAuthenticity')}</h2>
                <p className="luxury-text text-xl max-w-2xl mx-auto">{t('verification.confirmAuthentic')}</p>
              </div>

              <Button
                size="lg"
                className="text-lg px-12 py-7 bg-gradient-to-r from-[hsl(var(--luxury-gold-dim))] via-[hsl(var(--luxury-gold))] to-[hsl(var(--luxury-gold-dim))] hover:from-[hsl(var(--luxury-gold))] hover:via-[hsl(var(--luxury-champagne))] hover:to-[hsl(var(--luxury-gold))] text-[hsl(var(--luxury-dark))] font-serif tracking-wider transition-all duration-700 shadow-[0_0_40px_-10px_hsl(var(--luxury-gold)/0.5)] hover:shadow-[0_0_60px_-10px_hsl(var(--luxury-gold)/0.7)]"
                onClick={() => window.open(`/verify?token=${batchId}`, '_blank')}
              >
                <Shield className="mr-3 h-5 w-5" />
                {t('verification.scan')}
              </Button>

              <Collapsible open={showInstructions} onOpenChange={setShowInstructions}>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full max-w-md mx-auto justify-between text-[hsl(var(--luxury-champagne))] hover:text-[hsl(var(--luxury-gold))] hover:bg-[hsl(var(--luxury-gold))]/10 border border-[hsl(var(--luxury-gold))]/20"
                  >
                    {t('verification.howToFindIt')}
                    <ChevronDown className={`h-4 w-4 transition-transform duration-500 ${showInstructions ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-6 space-y-6 pt-6 border-t border-[hsl(var(--luxury-gold))]/20">
                  <div className="max-w-2xl mx-auto">
                    <h3 className="luxury-heading text-lg mb-6 text-center">{t('verification.qrInstructions')}</h3>
                    
                    <div className="space-y-4">
                      <div className="flex gap-5 p-5 rounded-xl bg-[hsl(var(--luxury-slate))]/50 border border-[hsl(var(--luxury-gold))]/10 group hover:border-[hsl(var(--luxury-gold))]/30 transition-all duration-500">
                        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(var(--luxury-gold))] to-[hsl(var(--luxury-gold-dim))] flex items-center justify-center font-serif text-2xl text-[hsl(var(--luxury-dark))] animate-luxury-glow">
                          1
                        </div>
                        <div className="flex-1">
                          <h4 className="luxury-heading text-lg mb-1">{t('verification.step1')}</h4>
                          <p className="luxury-text text-sm opacity-70">{t('verification.qr1Location')}</p>
                          <p className="luxury-text text-sm opacity-50 italic mt-1">{t('verification.qr1Purpose')}</p>
                        </div>
                      </div>

                      <div className="flex gap-5 p-5 rounded-xl bg-[hsl(var(--luxury-slate))]/50 border border-[hsl(var(--luxury-gold))]/10 group hover:border-[hsl(var(--luxury-gold))]/30 transition-all duration-500">
                        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(var(--luxury-gold))] to-[hsl(var(--luxury-gold-dim))] flex items-center justify-center font-serif text-2xl text-[hsl(var(--luxury-dark))] animate-luxury-glow" style={{ animationDelay: '1s' }}>
                          2
                        </div>
                        <div className="flex-1">
                          <h4 className="luxury-heading text-lg mb-1">{t('verification.step2')}</h4>
                          <p className="luxury-text text-sm opacity-70">{t('verification.qr2Location')}</p>
                          <p className="luxury-text text-sm opacity-50 italic mt-1">{t('verification.qr2Purpose')}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-6 rounded-xl bg-[hsl(var(--luxury-gold))]/5 border border-[hsl(var(--luxury-gold))]/20">
                      <h4 className="luxury-heading text-lg mb-4 flex items-center gap-3">
                        <span className="text-2xl">💡</span>
                        {t('verification.whyTwoQR')}
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex gap-3 items-start">
                          <CheckCircle2 className="h-5 w-5 text-[hsl(var(--luxury-gold))] flex-shrink-0 mt-0.5" />
                          <span className="luxury-text text-sm">{t('verification.qr1Description')}</span>
                        </li>
                        <li className="flex gap-3 items-start">
                          <CheckCircle2 className="h-5 w-5 text-[hsl(var(--luxury-gold))] flex-shrink-0 mt-0.5" />
                          <span className="luxury-text text-sm">{t('verification.qr2Description')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="space-y-8">
          <div className="luxury-divider" />
          <div className="text-center">
            <h2 className="luxury-heading text-4xl md:text-5xl mb-4">The Story</h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--luxury-gold))] to-transparent mx-auto" />
          </div>
          <p className="luxury-text text-xl md:text-2xl leading-relaxed text-center max-w-3xl mx-auto">
            {product.productStory}
          </p>
          <div className="luxury-divider" />
        </section>

        {/* Product Details Accordion */}
        <section className="space-y-4">
          {/* Details */}
          <div className="luxury-card overflow-hidden luxury-card-hover">
            <button
              onClick={() => toggleSection('details')}
              className="w-full p-6 flex items-center justify-between text-left hover:bg-[hsl(var(--luxury-gold))]/5 transition-all duration-500"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">🍇</span>
                <h3 className="luxury-heading text-xl">Product Details</h3>
              </div>
              <ChevronDown className={`h-6 w-6 text-[hsl(var(--luxury-gold))] transition-transform duration-500 ${expandedSection === 'details' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-700 ${expandedSection === 'details' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0 space-y-4 border-t border-[hsl(var(--luxury-gold))]/20">
                <p className="luxury-text text-lg leading-relaxed">{product.characteristics}</p>
                {product.servingRecommendation && (
                  <div className="p-5 bg-[hsl(var(--luxury-slate))]/50 rounded-xl border border-[hsl(var(--luxury-gold))]/10">
                    <p className="luxury-text"><strong className="luxury-heading text-base">Serving:</strong> {product.servingRecommendation}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Awards */}
          {product.awards && product.awards.length > 0 && (
            <div className="luxury-card overflow-hidden luxury-card-hover">
              <button
                onClick={() => toggleSection('awards')}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-[hsl(var(--luxury-gold))]/5 transition-all duration-500"
              >
                <div className="flex items-center gap-4">
                  <Award className="h-7 w-7 text-[hsl(var(--luxury-gold))]" />
                  <h3 className="luxury-heading text-xl">Awards & Recognition</h3>
                </div>
                <ChevronDown className={`h-6 w-6 text-[hsl(var(--luxury-gold))] transition-transform duration-500 ${expandedSection === 'awards' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-700 ${expandedSection === 'awards' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0 space-y-3 border-t border-[hsl(var(--luxury-gold))]/20">
                  {product.awards.map((award, index) => (
                    <div 
                      key={index} 
                      className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--luxury-slate))]/50 border border-[hsl(var(--luxury-gold))]/10 hover:border-[hsl(var(--luxury-gold))]/30 transition-all duration-500 group"
                    >
                      <span className="text-3xl group-hover:animate-float">
                        {award.medalType === 'gold' ? '🥇' : award.medalType === 'silver' ? '🥈' : '🥉'}
                      </span>
                      <div>
                        <p className="luxury-heading text-base">{award.name}</p>
                        <p className="luxury-text text-sm opacity-60">{award.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Food Pairings */}
          {product.foodPairings && product.foodPairings.length > 0 && (
            <div className="luxury-card overflow-hidden luxury-card-hover">
              <button
                onClick={() => toggleSection('pairing')}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-[hsl(var(--luxury-gold))]/5 transition-all duration-500"
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl">🍽️</span>
                  <h3 className="luxury-heading text-xl">Food Pairing</h3>
                </div>
                <ChevronDown className={`h-6 w-6 text-[hsl(var(--luxury-gold))] transition-transform duration-500 ${expandedSection === 'pairing' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-700 ${expandedSection === 'pairing' ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0 border-t border-[hsl(var(--luxury-gold))]/20">
                  <div className="flex flex-wrap gap-3">
                    {product.foodPairings.map((food, index) => (
                      <Badge 
                        key={index} 
                        className="bg-[hsl(var(--luxury-gold))]/10 border border-[hsl(var(--luxury-gold))]/30 text-[hsl(var(--luxury-champagne))] px-5 py-2.5 text-base font-serif hover:bg-[hsl(var(--luxury-gold))]/20 transition-all duration-500 cursor-default"
                      >
                        {food}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Gallery Section */}
        {product.galleryPhotos && product.galleryPhotos.length > 0 && (
          <section className="space-y-10">
            <div className="luxury-divider" />
            <div className="text-center">
              <h2 className="luxury-heading text-4xl md:text-5xl mb-4">Gallery</h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--luxury-gold))] to-transparent mx-auto" />
            </div>

            {/* Main Image */}
            <div className="relative group">
              <div className="luxury-card overflow-hidden p-0 shadow-[0_40px_100px_-25px_rgba(0,0,0,0.5)] hover:shadow-[0_50px_120px_-25px_rgba(0,0,0,0.6)] transition-all duration-700">
                <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
                  <img
                    src={product.galleryPhotos[selectedImage]}
                    alt={`Gallery ${selectedImage + 1}`}
                    className="w-full h-full object-contain transform transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--luxury-dark))] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Zoom Button */}
                  <button
                    onClick={() => openLightbox(selectedImage)}
                    className="absolute top-6 right-6 p-4 rounded-full bg-[hsl(var(--luxury-gold))]/90 text-[hsl(var(--luxury-dark))] hover:bg-[hsl(var(--luxury-gold))] transition-all duration-500 hover:scale-110 opacity-0 group-hover:opacity-100 shadow-lg"
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>

                  {/* Navigation */}
                  {product.galleryPhotos.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-[hsl(var(--luxury-dark))]/80 backdrop-blur-md hover:bg-[hsl(var(--luxury-dark))] border border-[hsl(var(--luxury-gold))]/30 transition-all duration-500 hover:scale-110"
                      >
                        <ChevronLeft className="w-6 h-6 text-[hsl(var(--luxury-gold))]" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-[hsl(var(--luxury-dark))]/80 backdrop-blur-md hover:bg-[hsl(var(--luxury-dark))] border border-[hsl(var(--luxury-gold))]/30 transition-all duration-500 hover:scale-110"
                      >
                        <ChevronRight className="w-6 h-6 text-[hsl(var(--luxury-gold))]" />
                      </button>
                    </>
                  )}

                  {/* Counter */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-[hsl(var(--luxury-dark))]/80 backdrop-blur-md border border-[hsl(var(--luxury-gold))]/30">
                    <p className="luxury-heading text-sm">{selectedImage + 1} / {product.galleryPhotos.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {product.galleryPhotos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative group/thumb overflow-hidden rounded-xl transition-all duration-500 ${
                    selectedImage === index
                      ? 'ring-2 ring-[hsl(var(--luxury-gold))] shadow-[0_0_30px_-5px_hsl(var(--luxury-gold)/0.3)] scale-105'
                      : 'hover:scale-105 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="aspect-square overflow-hidden bg-[hsl(var(--luxury-slate))]">
                    <img
                      src={photo}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-110"
                    />
                  </div>
                </button>
              ))}
            </div>

            <div className="luxury-divider" />
          </section>
        )}

        {/* Lightbox */}
        {lightboxOpen && product.galleryPhotos && (
          <div
            className="fixed inset-0 z-[100] bg-[hsl(var(--luxury-dark))]/98 backdrop-blur-2xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-4 rounded-full bg-[hsl(var(--luxury-gold))]/10 hover:bg-[hsl(var(--luxury-gold))]/20 border border-[hsl(var(--luxury-gold))]/30 text-[hsl(var(--luxury-gold))] transition-all duration-500 hover:scale-110 z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {product.galleryPhotos.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-6 p-4 rounded-full bg-[hsl(var(--luxury-gold))]/10 hover:bg-[hsl(var(--luxury-gold))]/20 border border-[hsl(var(--luxury-gold))]/30 text-[hsl(var(--luxury-gold))] transition-all duration-500 hover:scale-110 z-10"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-6 p-4 rounded-full bg-[hsl(var(--luxury-gold))]/10 hover:bg-[hsl(var(--luxury-gold))]/20 border border-[hsl(var(--luxury-gold))]/30 text-[hsl(var(--luxury-gold))] transition-all duration-500 hover:scale-110 z-10"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div className="relative max-w-7xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              <img
                src={product.galleryPhotos[selectedImage]}
                alt={`Gallery ${selectedImage + 1}`}
                className="w-full h-full object-contain rounded-2xl"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-8 py-4 rounded-full bg-[hsl(var(--luxury-dark))]/80 backdrop-blur-xl border border-[hsl(var(--luxury-gold))]/30">
                <p className="luxury-heading text-lg">{selectedImage + 1} / {product.galleryPhotos.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Traditional Methods */}
        {product.traditionalMethods && (
          <section className="space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">🏺</span>
                <h2 className="luxury-heading text-4xl md:text-5xl">Traditional Methods</h2>
              </div>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--luxury-gold))] to-transparent mx-auto" />
            </div>
            <div className="luxury-card p-10">
              <p className="luxury-text text-xl leading-relaxed text-center">{product.traditionalMethods}</p>
            </div>
            <div className="luxury-divider" />
          </section>
        )}

        {/* Contact Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="luxury-heading text-4xl md:text-5xl mb-4">Visit Us</h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--luxury-gold))] to-transparent mx-auto" />
          </div>
          <div className="luxury-card luxury-card-hover p-10 space-y-8 text-center">
            <div>
              <h3 className="luxury-heading text-3xl mb-3">{product.companyName}</h3>
              <p className="luxury-text text-lg">{product.address}</p>
            </div>

            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--luxury-gold))]/30 to-transparent" />

            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <a href={`tel:${product.phone}`} className="flex items-center justify-center gap-3 luxury-text text-lg hover:text-[hsl(var(--luxury-gold))] transition-all duration-500 group">
                <Phone className="h-5 w-5 text-[hsl(var(--luxury-gold))] group-hover:animate-float" />
                {product.phone}
              </a>
              <a href={`mailto:${product.email}`} className="flex items-center justify-center gap-3 luxury-text text-lg hover:text-[hsl(var(--luxury-gold))] transition-all duration-500 group">
                <Mail className="h-5 w-5 text-[hsl(var(--luxury-gold))] group-hover:animate-float" />
                {product.email}
              </a>
              <a href={product.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 luxury-text text-lg hover:text-[hsl(var(--luxury-gold))] transition-all duration-500 group">
                <Globe className="h-5 w-5 text-[hsl(var(--luxury-gold))] group-hover:animate-float" />
                Website
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          <div className="luxury-divider" />
        </section>

        {/* Reviews Section */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="luxury-heading text-4xl md:text-5xl mb-4">Customer Reviews</h2>
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--luxury-gold))] to-transparent mx-auto" />
          </div>
          <div className="space-y-4">
            {mockReviews.map((review, index) => (
              <div 
                key={review.id} 
                className="luxury-card luxury-card-hover p-6"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="luxury-heading text-lg">{review.author}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'fill-[hsl(var(--luxury-gold))] text-[hsl(var(--luxury-gold))]' : 'text-[hsl(var(--luxury-champagne))]/20'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="luxury-text text-sm opacity-60">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <p className="luxury-text text-base leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
          <div className="luxury-divider" />
        </section>

        {/* Similar Products */}
        {mockSimilarProducts.length > 0 && (
          <section className="space-y-8">
            <div className="text-center">
              <h2 className="luxury-heading text-4xl md:text-5xl mb-4">More from {product.companyName}</h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--luxury-gold))] to-transparent mx-auto" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {mockSimilarProducts.map((similar, index) => (
                <div 
                  key={similar.id} 
                  className="luxury-card overflow-hidden cursor-pointer luxury-card-hover group"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={similar.thumbnail}
                      alt={similar.name}
                      className="w-full h-48 object-cover transform transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--luxury-dark))] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <div className="p-5 bg-[hsl(var(--luxury-charcoal))]">
                    <p className="luxury-heading text-base mb-1">{similar.name}</p>
                    <p className="luxury-text text-sm opacity-60">{similar.vintageYear}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[hsl(var(--luxury-gold))]/10 mt-20 bg-[hsl(var(--luxury-dark))]">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--luxury-gold))] to-transparent mx-auto mb-6" />
          <p className="luxury-text text-base">
            Protected by <span className="luxury-heading text-lg animate-shimmer-gold">AuthIt</span>
          </p>
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--luxury-gold))] to-transparent mx-auto mt-6" />
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
