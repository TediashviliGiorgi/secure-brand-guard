import { Lock, Shield, Key, Link2, QrCode, Fingerprint } from 'lucide-react';

const HeroVisualization = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        </div>
      </div>

      {/* Central Earth Globe */}
      <div className="relative z-10">
        {/* Globe container with rotation */}
        <div className="relative w-64 h-64 animate-float">
          {/* Main globe sphere */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-primary/50 to-primary/70 shadow-2xl">
            {/* Globe shine effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-50" />
            
            {/* Grid lines on globe */}
            <svg className="absolute inset-0 w-full h-full animate-spin-slow" style={{ animationDuration: '40s' }}>
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <circle cx="50%" cy="50%" r="45%" fill="url(#grid)" />
            </svg>

            {/* Continents/landmass simulation */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-40">
              <div className="absolute top-8 left-12 w-16 h-12 bg-white/30 rounded-full blur-sm" />
              <div className="absolute top-20 right-16 w-20 h-14 bg-white/30 rounded-full blur-sm" />
              <div className="absolute bottom-16 left-20 w-14 h-10 bg-white/30 rounded-full blur-sm" />
            </div>

            {/* Inner glow */}
            <div className="absolute inset-2 rounded-full bg-primary/20 blur-md" />
          </div>
        </div>

        {/* Orbiting encryption symbols */}
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '30s' }}>
          {/* Shield - Top */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <div className="p-3 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 shadow-lg animate-float-delay-1">
              <Shield className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Lock - Right */}
          <div className="absolute top-1/2 -right-8 -translate-y-1/2">
            <div className="p-3 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 shadow-lg animate-float-delay-2">
              <Lock className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* Key - Bottom */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
            <div className="p-3 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 shadow-lg animate-float-delay-3">
              <Key className="w-6 h-6 text-primary" />
            </div>
          </div>

          {/* QR Code - Left */}
          <div className="absolute top-1/2 -left-8 -translate-y-1/2">
            <div className="p-3 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 shadow-lg animate-float-delay-4">
              <QrCode className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        {/* Secondary orbit with different speed */}
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '45s', animationDirection: 'reverse' }}>
          {/* Link/Chain - Top Right */}
          <div className="absolute top-4 right-4">
            <div className="p-2.5 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 shadow-lg animate-pulse" style={{ animationDuration: '3s' }}>
              <Link2 className="w-5 h-5 text-accent" />
            </div>
          </div>

          {/* Fingerprint - Bottom Left */}
          <div className="absolute bottom-4 left-4">
            <div className="p-2.5 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 shadow-lg animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}>
              <Fingerprint className="w-5 h-5 text-accent" />
            </div>
          </div>
        </div>

        {/* Connecting lines/network effect */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10" style={{ width: '400px', height: '400px', left: '-68px', top: '-68px' }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.2 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <g className="animate-pulse" style={{ animationDuration: '5s' }}>
            <line x1="200" y1="68" x2="200" y2="200" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="332" y1="200" x2="200" y2="200" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="200" y1="332" x2="200" y2="200" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="4,4" />
            <line x1="68" y1="200" x2="200" y2="200" stroke="url(#lineGradient)" strokeWidth="1" strokeDasharray="4,4" />
          </g>
        </svg>

        {/* Data particles floating around */}
        <div className="absolute inset-0 -z-20">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-primary/40 rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom text label */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="px-6 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20">
          <p className="text-sm font-medium text-primary flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Secured by Blockchain Technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroVisualization;
