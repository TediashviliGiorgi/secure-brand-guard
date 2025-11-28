import { Lock, Shield, Key, Link2, QrCode, Fingerprint } from 'lucide-react';

const HeroVisualization = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">

      {/* Central Earth Globe */}
      <div className="relative z-10">
        {/* Globe container with rotation - BIGGER */}
        <div className="relative w-80 h-80 animate-float">
          {/* Main globe sphere - Realistic Earth */}
          <div className="absolute inset-0 rounded-full shadow-2xl border border-blue-400/40" 
               style={{
                 background: 'radial-gradient(circle at 30% 30%, #4a90e2 0%, #2171c7 30%, #1557a0 60%, #0d3d73 100%)',
               }}>
            
            {/* Realistic shine/light reflection from top-left */}
            <div className="absolute inset-0 rounded-full"
                 style={{
                   background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 20%, transparent 40%)',
                 }} />
            
            {/* Subtle cloud layer effect */}
            <div className="absolute inset-0 rounded-full overflow-hidden opacity-20">
              <div className="absolute top-8 left-12 w-32 h-16 bg-white/60 rounded-full blur-xl" />
              <div className="absolute top-32 right-16 w-28 h-20 bg-white/50 rounded-full blur-xl" />
              <div className="absolute bottom-20 left-24 w-24 h-14 bg-white/50 rounded-full blur-xl" />
            </div>
            
            {/* Latitude/Longitude grid lines - subtle and realistic */}
            <svg className="absolute inset-0 w-full h-full opacity-30 animate-spin-slow" style={{ animationDuration: '80s' }}>
              <defs>
                <pattern id="globe-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <circle cx="160" cy="160" r="155" fill="url(#globe-grid)" />
              
              {/* Equator line */}
              <line x1="5" y1="160" x2="315" y2="160" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
              
              {/* Tropics */}
              <ellipse cx="160" cy="160" rx="155" ry="130" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
              <ellipse cx="160" cy="160" rx="155" ry="90" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
              
              {/* Prime meridian and other meridians */}
              <ellipse cx="160" cy="160" rx="8" ry="155" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <ellipse cx="160" cy="160" rx="50" ry="155" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
              <ellipse cx="160" cy="160" rx="100" ry="155" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            </svg>

            {/* Deep shadow on bottom right for 3D effect */}
            <div className="absolute inset-0 rounded-full"
                 style={{
                   background: 'radial-gradient(circle at 75% 75%, transparent 40%, rgba(0,0,0,0.4) 100%)',
                 }} />

            {/* Atmosphere glow */}
            <div className="absolute -inset-2 rounded-full bg-blue-400/20 blur-xl -z-10" />
            <div className="absolute -inset-4 rounded-full bg-blue-500/10 blur-2xl -z-20" />
          </div>
        </div>

        {/* Orbiting encryption symbols - adjusted for bigger globe */}
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '30s' }}>
          {/* Shield - Top */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <div className="p-4 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 shadow-lg animate-float-delay-1">
              <Shield className="w-7 h-7 text-primary" />
            </div>
          </div>

          {/* Lock - Right */}
          <div className="absolute top-1/2 -right-12 -translate-y-1/2">
            <div className="p-4 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 shadow-lg animate-float-delay-2">
              <Lock className="w-7 h-7 text-primary" />
            </div>
          </div>

          {/* Key - Bottom */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
            <div className="p-4 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 shadow-lg animate-float-delay-3">
              <Key className="w-7 h-7 text-primary" />
            </div>
          </div>

          {/* QR Code - Left */}
          <div className="absolute top-1/2 -left-12 -translate-y-1/2">
            <div className="p-4 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 shadow-lg animate-float-delay-4">
              <QrCode className="w-7 h-7 text-primary" />
            </div>
          </div>
        </div>

        {/* Secondary orbit with different speed - adjusted for bigger globe */}
        <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '45s', animationDirection: 'reverse' }}>
          {/* Link/Chain - Top Right */}
          <div className="absolute top-8 right-8">
            <div className="p-3 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 shadow-lg animate-pulse" style={{ animationDuration: '3s' }}>
              <Link2 className="w-6 h-6 text-accent" />
            </div>
          </div>

          {/* Fingerprint - Bottom Left */}
          <div className="absolute bottom-8 left-8">
            <div className="p-3 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 shadow-lg animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}>
              <Fingerprint className="w-6 h-6 text-accent" />
            </div>
          </div>
        </div>

        {/* Connecting lines/network effect - adjusted for bigger globe */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ width: '500px', height: '500px', left: '-100px', top: '-100px' }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.6 }} />
              <stop offset="50%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.6 }} />
            </linearGradient>
          </defs>
          {/* Network lines connecting to security icons */}
          <g className="animate-pulse" style={{ animationDuration: '3s' }}>
            <line x1="250" y1="52" x2="250" y2="140" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="6,4" />
            <line x1="448" y1="250" x2="360" y2="250" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="6,4" />
            <line x1="250" y1="448" x2="250" y2="360" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="6,4" />
            <line x1="52" y1="250" x2="140" y2="250" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="6,4" />
          </g>
          {/* Diagonal connections */}
          <g className="animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
            <line x1="330" y1="170" x2="280" y2="220" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.7" />
            <line x1="170" y1="330" x2="220" y2="280" stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.7" />
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
