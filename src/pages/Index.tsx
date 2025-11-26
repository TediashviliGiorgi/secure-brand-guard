import { Link } from 'react-router-dom';
import { Shield, QrCode, Lock, BarChart3, Globe, DollarSign, ArrowRight, Play, CheckCircle2, Users, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SEO } from '@/components/ui/seo';

import { LanguageSelector } from '@/components/LanguageSelector';

const Index = () => {
  const navLinks = [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];
  const features = [
    {
      icon: QrCode,
      title: 'QR & NFC Protection',
      description: 'Dual authentication with QR codes and NFC tags for maximum security and flexibility'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track scans, verify authenticity, and understand customer engagement instantly'
    },
    {
      icon: Shield,
      title: 'Security Monitoring',
      description: 'Advanced fraud detection alerts you to potential counterfeiting attempts'
    },
    {
      icon: Globe,
      title: 'Multi-language',
      description: 'Support for Georgian, English, and Russian to reach global markets'
    },
    {
      icon: CheckCircle2,
      title: 'One-time Verification',
      description: 'Each security code works once - impossible to duplicate or counterfeit'
    },
    {
      icon: DollarSign,
      title: 'Cost-effective',
      description: 'Affordable pricing per unit with no setup fees or monthly minimums'
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
          <Button variant="outline" size="sm">Sign In</Button>
        </Link>
        <Link to="/register">
          <Button size="sm">Get Started</Button>
        </Link>
      </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Protect Your Brand from <span className="text-primary">Counterfeiting</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Digital authentication & marketing platform with QR codes and NFC tags. 
              Build trust, engage customers, and eliminate fake products.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/register">
                <Button size="lg" className="text-base w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-base w-full sm:w-auto">
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
            Global brands lose €2.3B annually to counterfeiting
          </p>
          <p className="text-muted-foreground">Don't let this happen to your business</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple three-step system to protect and promote your brand
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>QR #1: Marketing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Share your brand story with beautiful, engaging product pages that customers love to explore
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>QR #2: Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                One-time verification hidden under the seal prevents counterfeiting and builds consumer trust
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Real-time analytics show where products are scanned, verified, and potential fraud detected
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to protect and promote your brand in one platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-border/50">
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
      <section id="pricing" className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pay only for what you use. No setup fees, no monthly minimums.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>Perfect for small producers</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">10 ₾</span>
                <span className="text-muted-foreground">/unit</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Dual QR system</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Product story pages</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Basic analytics</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary shadow-lg relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>
            </div>
            <CardHeader>
              <CardTitle>Professional</CardTitle>
              <CardDescription>For growing brands</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">8 ₾</span>
                <span className="text-muted-foreground">/unit</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Everything in Starter</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Advanced analytics</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Security monitoring</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Priority support</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>For large operations</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">6 ₾</span>
                <span className="text-muted-foreground">/unit</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Everything in Professional</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Custom branding</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>API access</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>Dedicated account manager</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-8">
          <Link to="/pricing">
            <Button variant="link">View Full Pricing →</Button>
          </Link>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-muted-foreground mb-8">Trusted by brands worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
            <div className="text-2xl font-semibold">Brand Logo 1</div>
            <div className="text-2xl font-semibold">Brand Logo 2</div>
            <div className="text-2xl font-semibold">Brand Logo 3</div>
            <div className="text-2xl font-semibold">Brand Logo 4</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-20 bg-background">
        <div className="container mx-auto px-4 relative">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Protect Your Brand?</h2>
            <p className="text-xl text-muted-foreground">
              Start your free trial today. No credit card required.
            </p>
            <Link to="/register">
              <Button size="lg" className="text-base">
                Get Started Now
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
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/40 pt-8 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              &copy; {new Date().getFullYear()} AuthIt. All rights reserved.
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
