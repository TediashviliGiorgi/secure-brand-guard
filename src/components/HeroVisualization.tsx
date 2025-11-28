import { Lock, Shield, Key, Link2, QrCode, Fingerprint } from 'lucide-react';
import earthGlobe from '@/assets/earth-globe.png';

const HeroVisualization = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">

      {/* Central Earth Globe */}
      <div className="relative z-10">
        {/* Globe container with rotation - BIGGER */}
        <div className="relative w-80 h-80 animate-float">
          {/* Main globe sphere - Using reference image */}
          <div className="absolute inset-0 rounded-full shadow-2xl overflow-hidden border-4 border-primary/30" 
               style={{
                 backgroundImage: `url(${earthGlobe})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
               }}>
            
            {/* Realistic shine/light reflection from top-left */}
            <div className="absolute inset-0 rounded-full"
                 style={{
                   background: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.08) 20%, transparent 40%)',
                 }} />

            {/* Deep shadow on bottom right for 3D effect */}
            <div className="absolute inset-0 rounded-full"
                 style={{
                   background: 'radial-gradient(circle at 75% 75%, transparent 40%, rgba(0,0,0,0.3) 100%)',
                 }} />

            {/* Atmosphere glow */}
            <div className="absolute -inset-2 rounded-full bg-primary/20 blur-xl -z-10" />
            <div className="absolute -inset-4 rounded-full bg-primary/10 blur-2xl -z-20" />
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
