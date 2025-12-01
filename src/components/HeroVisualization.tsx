import { Lock, Shield, Key, Link2, QrCode, Fingerprint } from 'lucide-react';

const HeroVisualization = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">

      {/* Central Earth Globe */}
      <div className="relative z-10">
        {/* Globe container with float animation */}
        <div className="relative w-64 h-64 animate-float">
          {/* Modern abstract globe sphere */}
          <div className="absolute inset-0 rounded-full overflow-hidden backdrop-blur-sm border border-primary/30"
               style={{
                 background: 'radial-gradient(circle at 35% 35%, hsl(var(--primary) / 0.4) 0%, hsl(var(--primary) / 0.6) 30%, hsl(var(--primary) / 0.8) 60%, hsl(var(--primary)) 100%)',
                 boxShadow: '0 25px 50px -12px hsl(var(--primary) / 0.4), inset 0 -15px 40px hsl(var(--primary) / 0.3)',
               }}>
            
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 rounded-full opacity-60"
                 style={{
                   background: 'conic-gradient(from 180deg at 50% 50%, hsl(var(--accent) / 0.3) 0deg, transparent 60deg, hsl(var(--primary) / 0.4) 180deg, transparent 240deg, hsl(var(--accent) / 0.3) 360deg)',
                   animation: 'spin 20s linear infinite',
                 }} />
            
            {/* Abstract landmass patterns */}
            <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 400">
              <defs>
                <radialGradient id="globeGradient" cx="50%" cy="50%">
                  <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.6 }} />
                  <stop offset="70%" style={{ stopColor: 'white', stopOpacity: 0.3 }} />
                  <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0 }} />
                </radialGradient>
              </defs>
              
              {/* Abstract continent shapes */}
              <g className="animate-spin-slow" style={{ animationDuration: '120s', transformOrigin: 'center' }}>
                <path d="M150,80 Q160,70 180,75 L190,85 Q200,90 195,100 L185,110 Q175,115 160,110 Z" fill="url(#globeGradient)" />
                <path d="M220,120 Q235,115 250,125 L260,140 Q265,155 255,165 L240,170 Q225,172 215,160 Z" fill="url(#globeGradient)" />
                <path d="M100,200 Q120,190 140,195 L155,210 Q160,225 150,240 L130,250 Q110,255 95,240 Z" fill="url(#globeGradient)" />
                <path d="M250,220 Q270,215 285,225 L295,245 Q298,260 285,270 L265,275 Q245,278 235,265 Z" fill="url(#globeGradient)" />
                <path d="M180,280 Q200,270 220,275 L235,290 Q240,310 225,320 L205,325 Q185,328 175,315 Z" fill="url(#globeGradient)" />
              </g>
              
              {/* Latitude/longitude grid */}
              <g className="opacity-20" stroke="white" strokeWidth="1" fill="none">
                <circle cx="200" cy="200" r="180" />
                <ellipse cx="200" cy="200" rx="180" ry="90" />
                <ellipse cx="200" cy="200" rx="180" ry="60" />
                <ellipse cx="200" cy="200" rx="90" ry="180" />
                <ellipse cx="200" cy="200" rx="60" ry="180" />
                <line x1="20" y1="200" x2="380" y2="200" />
              </g>
            </svg>
            
            {/* Glass shine effect from top-left */}
            <div className="absolute inset-0 rounded-full"
                 style={{
                   background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.15) 25%, transparent 50%)',
                 }} />

            {/* Subtle inner shadow for depth */}
            <div className="absolute inset-0 rounded-full"
                 style={{
                   background: 'radial-gradient(circle at 70% 70%, transparent 50%, rgba(0,0,0,0.25) 100%)',
                 }} />

            {/* Premium atmosphere glow with animation */}
            <div className="absolute -inset-4 rounded-full bg-primary/20 blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute -inset-8 rounded-full opacity-60" 
                 style={{
                   background: 'radial-gradient(circle, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.1))',
                   filter: 'blur(40px)',
                 }} />
          </div>
        </div>

        {/* Modern orbiting security icons */}
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '100s' }}>
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
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '150s', animationDirection: 'reverse' }}>
          {/* Link - Top Right */}
          <div className="absolute top-12 right-12">
            <div className="group relative p-4 rounded-xl bg-background/30 backdrop-blur-md border border-accent/15 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-700">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Link2 className="w-6 h-6 text-accent relative z-10" strokeWidth={1.5} />
            </div>
          </div>

          {/* Fingerprint - Bottom Left */}
          <div className="absolute bottom-12 left-12">
            <div className="group relative p-4 rounded-xl bg-background/30 backdrop-blur-md border border-accent/15 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-700">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
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
