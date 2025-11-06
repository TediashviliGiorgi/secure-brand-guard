import { Link } from 'react-router-dom';
import { Shield, QrCode, Lock, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
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
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Protect Your Brand with{' '}
            <span className="text-primary">Dual QR Authentication</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AuthIt helps producers combat counterfeiting while sharing their brand story. 
            One QR for marketing, one for security — trust built into every product.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link to="/register">
              <Button size="lg" className="text-base">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-base">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <QrCode className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Dual QR System</CardTitle>
              <CardDescription>
                Marketing QR on the label, security QR under the seal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Share your brand story publicly while keeping authentication secure. 
                The hidden QR can only be scanned once for verification.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Anti-Counterfeiting</CardTitle>
              <CardDescription>
                One-time verification prevents fraud
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Each security QR code can only be verified once. If it's been scanned 
                before, you know it's a counterfeit product.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <CardTitle>Marketing Tools</CardTitle>
              <CardDescription>
                Tell your story, engage customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Beautiful landing pages for each product with your brand story, 
                history, and product details to connect with consumers.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="border-border/50 bg-gradient-to-r from-primary/5 to-accent/5 max-w-4xl mx-auto">
          <CardHeader className="text-center space-y-4 pb-8">
            <CardTitle className="text-3xl">
              Ready to Protect Your Brand?
            </CardTitle>
            <CardDescription className="text-base">
              Join producers across Georgia who trust AuthIt to authenticate their products
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Link to="/register">
              <Button size="lg" className="text-base">
                Create Your Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              No credit card required • Free trial available
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} AuthIt. All rights reserved.</p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <span className="text-border">•</span>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <span className="text-border">•</span>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
