import { Lock, Shield, Key, Link2, QrCode, Fingerprint } from 'lucide-react';

const HeroVisualization = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">

      {/* Central Earth Globe */}
      <div className="relative z-10">
        {/* Globe container with rotation */}
        <div className="relative w-64 h-64 animate-float">
          {/* Main globe sphere - more defined Earth look */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 shadow-2xl border-2 border-primary/30">
            {/* Globe shine effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent" />
            
            {/* Latitude/Longitude grid lines */}
            <svg className="absolute inset-0 w-full h-full animate-spin-slow" style={{ animationDuration: '50s' }}>
              <defs>
                <pattern id="globe-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <circle cx="128" cy="128" r="120" fill="url(#globe-grid)" />
              {/* Equator line */}
              <line x1="8" y1="128" x2="248" y2="128" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.4" />
              {/* Prime meridian */}
              <ellipse cx="128" cy="128" rx="6" ry="120" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.4" />
            </svg>

            {/* Continents/landmass - more visible */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {/* North America */}
              <div className="absolute top-12 left-16 w-20 h-16 bg-green-600/60 rounded-tl-3xl rounded-br-2xl border border-green-700/40" />
              {/* Europe/Africa */}
              <div className="absolute top-16 right-12 w-16 h-24 bg-green-600/60 rounded-tr-2xl rounded-bl-3xl border border-green-700/40" />
              {/* South America */}
              <div className="absolute top-32 left-20 w-12 h-20 bg-green-600/60 rounded-bl-3xl border border-green-700/40" />
              {/* Asia */}
              <div className="absolute top-20 right-16 w-24 h-20 bg-green-600/60 rounded-tr-3xl border border-green-700/40" />
              {/* Australia */}
              <div className="absolute bottom-20 right-20 w-14 h-12 bg-green-600/60 rounded-full border border-green-700/40" />
            </div>

            {/* Atmosphere glow */}
            <div className="absolute -inset-1 rounded-full bg-primary/10 blur-lg -z-10" />
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

        {/* Connecting lines/network effect - more visible */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ width: '400px', height: '400px', left: '-68px', top: '-68px' }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.6 }} />
              <stop offset="50%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.6 }} />
            </linearGradient>
          </defs>
          {/* Network lines connecting to security icons */}
          <g className="animate-pulse" style={{ animationDuration: '3s' }}>
            <line x1="200" y1="68" x2="200" y2="140" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="6,4" />
            <line x1="332" y1="200" x2="260" y2="200" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="6,4" />
            <line x1="200" y1="332" x2="200" y2="260" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="6,4" />
            <line x1="68" y1="200" x2="140" y2="200" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="6,4" />
          </g>
          {/* Diagonal connections */}
          <g className="animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
            <line x1="250" y1="150" x2="220" y2="180" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.7" />
            <line x1="150" y1="250" x2="180" y2="220" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.7" />
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
            Protected by Advanced Encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroVisualization;
