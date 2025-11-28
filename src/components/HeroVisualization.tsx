import { Lock, Shield, Key, Link2, QrCode, Fingerprint } from 'lucide-react';
import earthGlobe from '@/assets/earth-globe.png';

const HeroVisualization = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">

      {/* Ambient background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />
      
      {/* Central Earth Globe */}
      <div className="relative z-10">
        {/* Globe container with float animation */}
        <div className="relative w-96 h-96 animate-float">
          {/* Main globe sphere with glassmorphism */}
          <div className="absolute inset-0 rounded-full overflow-hidden backdrop-blur-sm border border-primary/20" 
               style={{
                 backgroundImage: `url(${earthGlobe})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 boxShadow: '0 25px 50px -12px hsl(var(--primary) / 0.25), inset 0 -10px 30px rgba(0,0,0,0.3)',
               }}>
            
            {/* Glass shine effect from top-left */}
            <div className="absolute inset-0 rounded-full"
                 style={{
                   background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 25%, transparent 50%)',
                 }} />

            {/* Subtle inner shadow for depth */}
            <div className="absolute inset-0 rounded-full"
                 style={{
                   background: 'radial-gradient(circle at 70% 70%, transparent 50%, rgba(0,0,0,0.2) 100%)',
                 }} />

            {/* Premium atmosphere glow */}
            <div className="absolute -inset-4 rounded-full bg-primary/15 blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" />
          </div>
        </div>

        {/* Modern orbiting security icons */}
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '40s' }}>
          {/* Shield - Top */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2">
            <div className="group relative p-5 rounded-2xl bg-background/40 backdrop-blur-md border border-primary/20 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-float-delay-1">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Shield className="w-8 h-8 text-primary relative z-10" strokeWidth={1.5} />
            </div>
          </div>

          {/* Lock - Right */}
          <div className="absolute top-1/2 -right-16 -translate-y-1/2">
            <div className="group relative p-5 rounded-2xl bg-background/40 backdrop-blur-md border border-primary/20 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-float-delay-2">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Lock className="w-8 h-8 text-primary relative z-10" strokeWidth={1.5} />
            </div>
          </div>

          {/* Key - Bottom */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <div className="group relative p-5 rounded-2xl bg-background/40 backdrop-blur-md border border-primary/20 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-float-delay-3">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Key className="w-8 h-8 text-primary relative z-10" strokeWidth={1.5} />
            </div>
          </div>

          {/* QR Code - Left */}
          <div className="absolute top-1/2 -left-16 -translate-y-1/2">
            <div className="group relative p-5 rounded-2xl bg-background/40 backdrop-blur-md border border-primary/20 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 animate-float-delay-4">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <QrCode className="w-8 h-8 text-primary relative z-10" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Secondary orbit with elegant icons */}
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '50s', animationDirection: 'reverse' }}>
          {/* Link - Top Right */}
          <div className="absolute top-12 right-12">
            <div className="group relative p-4 rounded-xl bg-background/30 backdrop-blur-md border border-accent/15 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Link2 className="w-6 h-6 text-accent relative z-10" strokeWidth={1.5} />
            </div>
          </div>

          {/* Fingerprint - Bottom Left */}
          <div className="absolute bottom-12 left-12">
            <div className="group relative p-4 rounded-xl bg-background/30 backdrop-blur-md border border-accent/15 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Fingerprint className="w-6 h-6 text-accent relative z-10" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* Elegant connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ width: '600px', height: '600px', left: '-150px', top: '-150px' }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.3 }} />
              <stop offset="50%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.3 }} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Main network lines */}
          <g className="animate-pulse" style={{ animationDuration: '4s' }} filter="url(#glow)">
            <line x1="300" y1="34" x2="300" y2="150" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="8,4" />
            <line x1="566" y1="300" x2="450" y2="300" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="8,4" />
            <line x1="300" y1="566" x2="300" y2="450" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="8,4" />
            <line x1="34" y1="300" x2="150" y2="300" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="8,4" />
          </g>
        </svg>

        {/* Floating particles with varied sizes */}
        <div className="absolute inset-0 -z-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float-particle"
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                background: i % 2 === 0 ? 'hsl(var(--primary) / 0.3)' : 'hsl(var(--accent) / 0.3)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 8}s`,
                boxShadow: '0 0 10px currentColor',
              }}
            />
          ))}
        </div>
      </div>

      {/* Modern status badge */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <div className="group px-8 py-3 rounded-full bg-background/60 backdrop-blur-md border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <p className="text-sm font-semibold text-foreground flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Protected by Advanced Encryption
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroVisualization;
