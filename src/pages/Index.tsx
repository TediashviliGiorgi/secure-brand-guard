import { Link } from 'react-router-dom';
import { Shield, QrCode, Lock, BarChart3, Globe, DollarSign, ArrowRight, Play, CheckCircle2, Users, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/ui/seo';
import { useTranslation } from 'react-i18next';

import { LanguageSelector } from '@/components/LanguageSelector';
import HeroVisualization from '@/components/HeroVisualization';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Index = () => {
  const { t } = useTranslation();

  // Scroll animation hooks for different sections
  const problemSection = useScrollAnimation();
  const howItWorksSection = useScrollAnimation();
  const featuresSection = useScrollAnimation();
  const pricingSection = useScrollAnimation();
  const socialProofSection = useScrollAnimation();
  const finalCTASection = useScrollAnimation();

  const navLinks = [
    { label: t('nav.features'), href: '/features' },
    { label: t('nav.pricing'), href: '/pricing' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.contact'), href: '/contact' },
  ];
  const features = [
    {
      icon: QrCode,
      title: t('landing.features.qrNFC'),
      description: t('landing.features.qrNFCDesc')
    },
    {
      icon: BarChart3,
      title: t('landing.features.analytics'),
      description: t('landing.features.analyticsDesc')
    },
    {
      icon: Shield,
      title: t('landing.features.security'),
      description: t('landing.features.securityDesc')
    },
    {
      icon: Globe,
      title: t('landing.features.multilang'),
      description: t('landing.features.multilangDesc')
    },
    {
      icon: CheckCircle2,
      title: t('landing.features.oneTime'),
      description: t('landing.features.oneTimeDesc')
    },
    {
      icon: DollarSign,
      title: t('landing.features.costEffective'),
      description: t('landing.features.costEffectiveDesc')
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="AuthIt - Brand Authentication Platform"
        description="Protect your brand with dual QR authentication. Combat counterfeiting while sharing your brand story."
        keywords="brand authentication, anti-counterfeiting, QR codes, product verification, brand protection, Georgia"
      />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-card/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">AuthIt</span>
            </div>
            
      <div className="flex items-center gap-8">
        {navLinks.map(link => (
          <Link 
            key={link.href}
            to={link.href} 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <LanguageSelector />
        <Link to="/login">
          <Button variant="outline" size="sm">{t('nav.signIn')}</Button>
        </Link>
        <Link to="/register">
          <Button size="sm">{t('nav.getStarted')}</Button>
        </Link>
      </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background section-fade-in">
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="space-y-8 text-center lg:text-left stagger-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {t('landing.hero.title')} <span className="text-primary">{t('landing.hero.titleHighlight')}</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                {t('landing.hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 pt-4">
                <Link to="/register">
                  <Button size="lg" className="text-base w-full sm:w-auto">
                    {t('landing.hero.startTrial')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-base w-full sm:w-auto">
                  <Play className="w-4 h-4 mr-2" />
                  {t('landing.hero.watchDemo')}
                </Button>
              </div>
            </div>

            {/* Right side - Interactive visualization */}
            <div className="hidden lg:block">
              <HeroVisualization />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section
        ref={problemSection.elementRef}
        className={`bg-muted/30 py-12 transition-all duration-700 ${
          problemSection.isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
            {t('landing.problem.stat')}
          </p>
          <p className="text-muted-foreground">{t('landing.problem.cta')}</p>
        </div>
      </section>

      {/* How It Works */}
      <section
        ref={howItWorksSection.elementRef}
        className={`container mx-auto px-4 py-20 transition-all duration-700 ${
          howItWorksSection.isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.howItWorks.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('landing.howItWorks.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className={`text-center transition-all duration-700 ${
            howItWorksSection.isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0'
          }`} style={{animationDelay: '0.1s'}}>
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>{t('landing.howItWorks.qr1Title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t('landing.howItWorks.qr1Description')}
              </p>
            </CardContent>
          </Card>

          <Card className={`text-center transition-all duration-700 ${
            howItWorksSection.isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0'
          }`} style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>{t('landing.howItWorks.qr2Title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t('landing.howItWorks.qr2Description')}
              </p>
            </CardContent>
          </Card>

          <Card className={`text-center transition-all duration-700 ${
            howItWorksSection.isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0'
          }`} style={{animationDelay: '0.3s'}}>
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>{t('landing.howItWorks.dashboardTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t('landing.howItWorks.dashboardDescription')}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Features */}
      <section
        id="features"
        ref={featuresSection.elementRef}
        className={`bg-muted/30 py-20 transition-all duration-700 ${
          featuresSection.isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.features.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className={`border-border/50 transition-all duration-700 ${
                    featuresSection.isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0'
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section
        id="pricing"
        ref={pricingSection.elementRef}
        className={`container mx-auto px-4 py-20 transition-all duration-700 ${
          pricingSection.isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.pricing.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('landing.pricing.subtitle')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>{t('landing.pricing.starter')}</CardTitle>
              <CardDescription>{t('landing.pricing.starterDesc')}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-muted-foreground">{t('landing.pricing.perMonth')}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                + $0.01 {t('landing.pricing.perUnit')}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>{t('landing.pricing.dualQR')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>{t('landing.pricing.productPages')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>{t('landing.pricing.basicAnalytics')}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary shadow-lg relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                {t('landing.pricing.mostPopular')}
              </span>
            </div>
            <CardHeader>
              <CardTitle>{t('landing.pricing.professional')}</CardTitle>
              <CardDescription>{t('landing.pricing.professionalDesc')}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-muted-foreground">{t('landing.pricing.perMonth')}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                + $0.02 {t('landing.pricing.perUnit')}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>{t('landing.pricing.everythingStarter')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>{t('landing.pricing.advancedAnalytics')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>{t('landing.pricing.securityMonitoring')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>{t('landing.pricing.prioritySupport')}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>{t('landing.pricing.enterprise')}</CardTitle>
              <CardDescription>{t('landing.pricing.enterpriseDesc')}</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$299</span>
                <span className="text-muted-foreground">{t('landing.pricing.perMonth')}</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                + $0.025 {t('landing.pricing.perUnit')}
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>{t('landing.pricing.everythingPro')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>{t('landing.pricing.customBranding')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>{t('landing.pricing.apiAccess')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>{t('landing.pricing.accountManager')}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-8">
          <Link to="/pricing">
            <Button variant="link">{t('landing.pricing.viewFullPricing')}</Button>
          </Link>
        </div>
      </section>

      {/* Social Proof */}
      <section
        ref={socialProofSection.elementRef}
        className={`bg-muted/30 py-16 transition-all duration-700 ${
          socialProofSection.isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-muted-foreground mb-8">{t('landing.social.trusted')}</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            <div className="text-2xl font-semibold">Brand Logo 1</div>
            <div className="text-2xl font-semibold">Brand Logo 2</div>
            <div className="text-2xl font-semibold">Brand Logo 3</div>
            <div className="text-2xl font-semibold">Brand Logo 4</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        ref={finalCTASection.elementRef}
        className={`relative overflow-hidden py-20 bg-background transition-all duration-700 ${
          finalCTASection.isVisible ? 'animate-fadeInUp opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">{t('landing.cta.title')}</h2>
            <p className="text-xl text-muted-foreground">
              {t('landing.cta.subtitle')}
            </p>
            <Link to="/register">
              <Button size="lg" className="text-base">
                {t('landing.cta.getStarted')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">{t('landing.footer.company')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">{t('landing.footer.about')}</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">{t('landing.footer.contact')}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t('landing.footer.product')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/features" className="hover:text-foreground transition-colors">{t('landing.footer.features')}</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground transition-colors">{t('landing.footer.pricing')}</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t('landing.footer.resources')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">{t('landing.footer.blog')}</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">{t('landing.footer.faq')}</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t('landing.footer.legal')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">{t('landing.footer.privacy')}</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">{t('landing.footer.terms')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/40 pt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              &copy; {new Date().getFullYear()} AuthIt. {t('landing.footer.rights')}
            </p>
            <div className="flex items-center justify-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Users className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
