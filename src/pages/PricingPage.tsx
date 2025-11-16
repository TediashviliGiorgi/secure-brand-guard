import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import { SEO } from "@/components/ui/seo";


const PricingPage = () => {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [production, setProduction] = useState([25000]);
  const [pricePerUnit, setPricePerUnit] = useState([50]);

  const navLinks = [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  // Calculate ROI
  const annualProduction = production[0];
  const avgPrice = pricePerUnit[0];
  const authItCostPerUnit = annualProduction < 15000 ? 10 : annualProduction < 50000 ? 8 : 6;
  const authItCost = (annualProduction * authItCostPerUnit) / 100; // convert tetri to lari
  const revenue = annualProduction * avgPrice;
  const potentialFraudLoss = revenue * 0.05;
  const netBenefit = potentialFraudLoss - authItCost;
  const roi = ((netBenefit / authItCost) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Pricing - AuthIt Brand Authentication"
        description="Affordable brand authentication starting at 6 tetri per unit. Transparent pricing with no hidden fees. Free 3-month trial available."
        keywords="authentication pricing, QR code cost, brand protection pricing, anti-counterfeiting cost"
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
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" size="sm">Sign In</Button>
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
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the plan that fits your business needs
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-6 py-2 rounded-md transition-colors ${
                billing === "monthly" ? "bg-background shadow-sm" : "text-muted-foreground"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              className={`px-6 py-2 rounded-md transition-colors ${
                billing === "annual" ? "bg-background shadow-sm" : "text-muted-foreground"
              }`}
            >
              Annual
              <Badge variant="secondary" className="ml-2">Save 20%</Badge>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter */}
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>For small producers</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">10</span>
                  <span className="text-muted-foreground"> tetri/unit</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Setup: 500₾
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-6">
                  5,000-15,000 units/year
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Dual QR system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">3 languages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Basic analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Email support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">5GB storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">API access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">White-label</span>
                  </li>
                </ul>
                <Link to="/register">
                  <Button className="w-full" variant="outline">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Professional */}
            <Card className="border-primary shadow-lg relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
              <CardHeader>
                <CardTitle>Professional</CardTitle>
                <CardDescription>For growing brands</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">8</span>
                  <span className="text-muted-foreground"> tetri/unit</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Setup: 1,000₾
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-6">
                  15,000-50,000 units/year
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Everything in Starter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">5 languages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Advanced analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">API access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">20GB storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">White-label</span>
                  </li>
                </ul>
                <Link to="/register">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise */}
            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For large operations</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">6</span>
                  <span className="text-muted-foreground"> tetri/unit</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Setup: 2,500₾
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-6">
                  50,000+ units/year
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Everything in Professional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Unlimited languages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Multi-brand management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Dedicated manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">24/7 support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">100GB storage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">SLA guarantee</span>
                  </li>
                </ul>
                <Link to="/contact">
                  <Button className="w-full" variant="outline">Contact Sales</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Free Trial */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">3-Month Free Trial</CardTitle>
              <CardDescription>Test AuthIt with 1,000 units included</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="space-y-2 mb-6 text-sm">
                <li>✓ Full platform access</li>
                <li>✓ All Professional features</li>
                <li>✓ No credit card required</li>
              </ul>
              <Link to="/register">
                <Button size="lg">Request Free Trial</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">ROI Calculator</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-8">
                {/* Slider 1 */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Annual Production</label>
                    <span className="text-sm font-semibold">{production[0].toLocaleString()} units</span>
                  </div>
                  <Slider
                    value={production}
                    onValueChange={setProduction}
                    min={1000}
                    max={100000}
                    step={1000}
                  />
                </div>

                {/* Slider 2 */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Average Price per Unit</label>
                    <span className="text-sm font-semibold">{pricePerUnit[0]}₾</span>
                  </div>
                  <Slider
                    value={pricePerUnit}
                    onValueChange={setPricePerUnit}
                    min={10}
                    max={200}
                    step={5}
                  />
                </div>

                {/* Results */}
                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">AuthIt Cost</div>
                    <div className="text-2xl font-bold">{authItCost.toLocaleString()}₾</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Potential Fraud Loss (5%)</div>
                    <div className="text-2xl font-bold text-destructive">{potentialFraudLoss.toLocaleString()}₾</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Net Benefit</div>
                    <div className="text-2xl font-bold text-primary">{netBenefit.toLocaleString()}₾</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">ROI</div>
                    <div className="text-2xl font-bold text-primary">{roi}%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What's included in the setup fee?</AccordionTrigger>
              <AccordionContent>
                The setup fee covers initial account configuration, QR code generation system setup, 
                brand customization, and onboarding training for your team.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Can I change plans?</AccordionTrigger>
              <AccordionContent>
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect 
                immediately, and we'll prorate any billing adjustments.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is there a contract?</AccordionTrigger>
              <AccordionContent>
                No long-term contracts required. You can cancel anytime with 30 days notice. 
                Annual plans offer better rates but are also flexible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What if I exceed my plan limits?</AccordionTrigger>
              <AccordionContent>
                We'll notify you when you approach your limits. You can either upgrade your plan 
                or purchase additional units at your current tier pricing.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
              <AccordionContent>
                We offer a 30-day money-back guarantee on setup fees. Monthly subscriptions can be 
                canceled anytime. Contact us if you have specific concerns.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help Choosing?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our team is here to help you find the perfect plan
          </p>
          <Link to="/contact">
            <Button size="lg">Contact Us</Button>
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

export default PricingPage;
