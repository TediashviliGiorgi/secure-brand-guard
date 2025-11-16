import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Target, Lightbulb, Handshake, Award } from "lucide-react";
import { SEO } from "@/components/ui/seo";


const AboutPage = () => {
  const navLinks = [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="About AuthIt - Brand Authentication Platform"
        description="Learn about AuthIt's mission to protect brands from counterfeiting while celebrating authenticity through innovative digital solutions."
        keywords="about AuthIt, brand authentication company, anti-counterfeiting mission, Georgia technology"
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
            About AuthIt
          </h1>
          <p className="text-xl text-muted-foreground">
            Protecting authentic products and celebrating genuine craftsmanship
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Target className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              To protect brands from counterfeiting while celebrating authenticity and enabling 
              meaningful connections between producers and consumers through innovative digital solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="mb-4">
              AuthIt was born from a simple observation: in an increasingly digital world, authentic 
              products and their stories were being lost. Counterfeiting wasn't just hurting brands 
              financially—it was destroying trust, damaging reputations, and disconnecting consumers 
              from the genuine craftsmanship they valued.
            </p>
            <p className="mb-4">
              Traditional anti-counterfeiting solutions were either too expensive, too complex, or 
              simply didn't work well enough. NFC tags required special hardware. Blockchain solutions 
              were overly complicated. And none of them helped brands tell their stories or engage 
              with customers.
            </p>
            <p className="mb-4">
              We knew there had to be a better way. A solution that was affordable, easy to implement, 
              and actually effective. But more than that—a solution that turned security into an opportunity 
              for engagement, transforming every scan into a chance to share your brand's story.
            </p>
            <p className="mb-4">
              That's how AuthIt was created. Our dual QR system combines marketing and security in one 
              elegant solution. QR #1 engages customers with beautiful product pages, while QR #2 provides 
              one-time verification that prevents counterfeiting. It's simple, it works on every smartphone, 
              and it's affordable for brands of all sizes.
            </p>
            <p>
              Today, we're proud to protect authentic products across multiple industries, helping brands 
              maintain their integrity while building deeper connections with their customers. And we're 
              just getting started.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <Lightbulb className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously push boundaries to create simple solutions for complex problems.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Authenticity</h3>
                <p className="text-muted-foreground">
                  We believe genuine products and honest stories deserve protection and celebration.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Handshake className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Partnership</h3>
                <p className="text-muted-foreground">
                  We succeed when our clients succeed. Your growth is our priority.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Quality</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards in everything we do, from code to customer service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-6">Want to Learn More?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get in touch to see how AuthIt can protect your brand
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

export default AboutPage;
