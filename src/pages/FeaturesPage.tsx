import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Shield, 
  BarChart3, 
  Building2,
  Check,
  X
} from "lucide-react";
import { SEO } from "@/components/ui/seo";
import { MobileNav } from "@/components/ui/mobile-nav";

const FeaturesPage = () => {
  const navLinks = [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Features - AuthIt Brand Authentication Platform"
        description="Discover AuthIt's powerful features: brand storytelling, security authentication, real-time analytics, and multi-brand management."
        keywords="QR authentication features, brand protection, product verification, anti-counterfeiting technology"
      />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary">AuthIt</Link>
          <div className="hidden md:flex gap-6">
            {navLinks.map(link => (
              <Link key={link.href} to={link.href} className="text-sm font-medium hover:text-primary">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <MobileNav links={navLinks} />
            <Link to="/login" className="hidden sm:block">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to Protect & Promote Your Brand
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive digital authentication and marketing platform with dual QR technology
          </p>
        </div>
      </section>

      {/* Feature 1: Marketing */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <BookOpen className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold mb-4">Marketing & Storytelling</h2>
              <p className="text-muted-foreground mb-6">
                Transform simple QR codes into engaging brand experiences
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Interactive product pages with rich media</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Photo and video galleries</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Product details, history, and storytelling</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Multi-language support (Georgian, English, Russian)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Social sharing and engagement tools</span>
                </li>
              </ul>
            </div>
            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
              <span className="text-muted-foreground">Feature Screenshot</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Security */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center order-2 md:order-1">
              <span className="text-muted-foreground">Security Screenshot</span>
            </div>
            <div className="order-1 md:order-2">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold mb-4">Security & Authentication</h2>
              <p className="text-muted-foreground mb-6">
                Advanced protection against counterfeiting and fraud
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>One-time verification system prevents counterfeiting</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Encrypted unique security codes</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Real-time fraud alerts and notifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Geographic monitoring and anomaly detection</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Automatic counterfeiting prevention</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: Analytics */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <BarChart3 className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold mb-4">Analytics & Insights</h2>
              <p className="text-muted-foreground mb-6">
                Understand customer behavior and product performance
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Real-time statistics and dashboards</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Verification and scan tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Interactive geographic maps</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Peak hours and engagement analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>CSV and PDF export capabilities</span>
                </li>
              </ul>
            </div>
            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
              <span className="text-muted-foreground">Analytics Screenshot</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 4: Multi-Brand */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center order-2 md:order-1">
              <span className="text-muted-foreground">Multi-Brand Screenshot</span>
            </div>
            <div className="order-1 md:order-2">
              <Building2 className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold mb-4">Multi-Brand Management</h2>
              <p className="text-muted-foreground mb-6">
                Perfect for consortiums and holding companies
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Manage multiple brands from one dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Aggregated analytics across all brands</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Granular permission controls</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Centralized billing and reporting</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            AuthIt vs Traditional Methods
          </h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="text-center p-4 font-semibold text-primary">AuthIt</th>
                    <th className="text-center p-4 font-semibold">NFC Tags</th>
                    <th className="text-center p-4 font-semibold">Blockchain</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-4">Cost per unit</td>
                    <td className="text-center p-4">
                      <span className="text-primary font-semibold">6-10 tetri</span>
                    </td>
                    <td className="text-center p-4 text-muted-foreground">50-100 tetri</td>
                    <td className="text-center p-4 text-muted-foreground">20-50 tetri</td>
                  </tr>
                  <tr className="border-t bg-muted/30">
                    <td className="p-4">Setup time</td>
                    <td className="text-center p-4">
                      <Check className="w-5 h-5 text-primary inline" />
                      <span className="ml-2 text-primary font-semibold">1 day</span>
                    </td>
                    <td className="text-center p-4 text-muted-foreground">2-3 weeks</td>
                    <td className="text-center p-4 text-muted-foreground">1-2 months</td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4">Device compatibility</td>
                    <td className="text-center p-4">
                      <Check className="w-5 h-5 text-primary inline" />
                      <span className="ml-2 text-primary font-semibold">100%</span>
                    </td>
                    <td className="text-center p-4 text-muted-foreground">60% (NFC capable)</td>
                    <td className="text-center p-4 text-muted-foreground">Requires app</td>
                  </tr>
                  <tr className="border-t bg-muted/30">
                    <td className="p-4">Marketing features</td>
                    <td className="text-center p-4">
                      <Check className="w-5 h-5 text-primary inline" />
                    </td>
                    <td className="text-center p-4">
                      <X className="w-5 h-5 text-muted-foreground inline" />
                    </td>
                    <td className="text-center p-4">
                      <X className="w-5 h-5 text-muted-foreground inline" />
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="p-4">Real-time analytics</td>
                    <td className="text-center p-4">
                      <Check className="w-5 h-5 text-primary inline" />
                    </td>
                    <td className="text-center p-4">
                      <Check className="w-5 h-5 text-muted-foreground inline" />
                    </td>
                    <td className="text-center p-4">
                      <Check className="w-5 h-5 text-muted-foreground inline" />
                    </td>
                  </tr>
                  <tr className="border-t bg-muted/30">
                    <td className="p-4">User-friendly</td>
                    <td className="text-center p-4">
                      <Check className="w-5 h-5 text-primary inline" />
                    </td>
                    <td className="text-center p-4">
                      <Check className="w-5 h-5 text-muted-foreground inline" />
                    </td>
                    <td className="text-center p-4">
                      <X className="w-5 h-5 text-muted-foreground inline" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join brands protecting their authenticity with AuthIt
          </p>
          <Link to="/register">
            <Button size="lg">Start Free Trial</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © 2025 AuthIt. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default FeaturesPage;
