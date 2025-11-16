# AuthIt - Comprehensive Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Technology Stack](#technology-stack)
5. [Design System](#design-system)
6. [Components](#components)
7. [Pages & Routes](#pages--routes)
8. [Accessibility](#accessibility)
9. [Performance](#performance)
10. [SEO](#seo)
11. [Development Guide](#development-guide)

---

## Overview

AuthIt is a comprehensive brand authentication and marketing platform that uses a dual QR code system to combat counterfeiting while enabling brands to tell their story and engage with customers.

### Key Concepts

**Dual QR System:**
- **QR #1 (Marketing)**: Printed on product label, leads to engaging product story page
- **QR #2 (Security)**: Hidden under seal/cap, one-time verification code

**Target Users:**
- Wine producers and consortiums (primary)
- Extendable to any brand product

---

## Architecture

### Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (shadcn)
│   ├── layout/          # Layout components
│   ├── auth/            # Authentication components
│   ├── batches/         # Batch creation components
│   ├── NavLink.tsx      # Active link component
│   ├── ProtectedRoute.tsx
│   └── ErrorBoundary.tsx
├── pages/
│   ├── auth/            # Login, Register, Forgot Password
│   ├── batches/         # Create Batch, Batch Detail
│   ├── product/         # Product Story, Verify
│   ├── security/        # Security Monitoring
│   ├── settings/        # User Settings
│   ├── Index.tsx        # Home/Landing Page
│   ├── FeaturesPage.tsx
│   ├── PricingPage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
│   ├── DashboardPage.tsx
│   ├── DashboardAnalyticsPage.tsx
│   └── NotFound.tsx
├── hooks/
│   ├── useAuth.ts       # Authentication hook
│   ├── useMediaQuery.ts # Responsive design hook
│   ├── useDebounce.ts   # Input debouncing
│   └── use-toast.ts     # Toast notifications
├── lib/
│   ├── utils.ts         # Utility functions
│   ├── validators.ts    # Form validation schemas
│   ├── formatters.ts    # Number/date formatting
│   └── batchValidators.ts
├── services/
│   ├── api.ts           # Axios instance
│   └── authService.ts   # Auth API calls
├── types/
│   └── auth.ts          # TypeScript types
├── App.tsx              # Root component with routing
├── main.tsx             # Entry point
└── index.css            # Global styles & design system
```

---

## Features

### 1. Authentication System
- Email/password login
- Registration with role selection (Producer/Consortium)
- Password strength indicator
- Forgot password flow
- Protected routes
- JWT token management

### 2. Batch Management (QR Generation)
- 7-step batch creation wizard:
  1. Batch info (product, quantity, production date)
  2. QR #1 content (story, photos, videos)
  3. QR #2 security configuration
  4. Labels & packaging options
  5. Quality control
  6. Review & confirmation
  7. Payment & generation

### 3. Product Story Pages
- Public-facing product pages
- Rich media galleries (photos, videos)
- Product information & history
- Producer information
- Social sharing
- Multi-language support

### 4. Verification System
- QR #2 one-time verification
- Three scenarios:
  - ✅ Authentic (first scan)
  - ⚠️ Suspicious (re-scanned)
  - ❌ Invalid (fake code)
- Location & timestamp tracking
- Fraud reporting

### 5. Security Monitoring
- Real-time alert dashboard
- Active alerts management
- Security statistics
- Verification timeline
- Activity log
- Alert settings

### 6. Analytics Dashboard
- Key metrics (scans, verifications, conversion rate)
- Interactive charts (Recharts)
- Geographic distribution
- Device & browser breakdown
- Peak hours heatmap
- Consumer engagement metrics
- CSV/PDF export

### 7. Settings Management
- Profile settings
- Company information
- Notification preferences (email, SMS, dashboard)
- Password change
- Two-factor authentication
- Account management (export, delete)

---

## Technology Stack

### Core
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **React Router DOM v6** - Client-side routing

### UI & Styling
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **Radix UI** - Accessible primitives
- **Lucide React** - Icon library
- **tailwindcss-animate** - Animation utilities

### State & Data
- **TanStack Query** (React Query) - Server state management
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Axios** - HTTP client

### Charts & Visualization
- **Recharts** - Chart library

### Notifications
- **Sonner** - Toast notifications
- **Radix Toast** - Accessible toasts

### Development
- **ESLint** - Linting
- **TypeScript** - Type checking

---

## Design System

### Colors (HSL Format)

```css
/* Light Mode */
--background: 0 0% 100%;
--foreground: 215 25% 27%;
--primary: 215 28% 17%;        /* Professional slate-blue */
--primary-foreground: 0 0% 100%;
--secondary: 210 20% 98%;      /* Light neutral gray */
--muted: 214 20% 96%;          /* Soft gray backgrounds */
--accent: 189 75% 75%;         /* Light cyan for CTAs */
--success: 142 71% 45%;        /* Green for success states */
--warning: 38 92% 50%;         /* Orange for warnings */
--destructive: 0 84% 60%;      /* Red for errors */
```

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700

### Spacing
- Based on Tailwind's default spacing scale (0.25rem base)

### Border Radius
- `--radius: 0.5rem` (default)
- `lg`: var(--radius)
- `md`: calc(var(--radius) - 2px)
- `sm`: calc(var(--radius) - 4px)

### Animations

```css
/* Keyframes */
@keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; } }
@keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
@keyframes scale-in { 0% { transform: scale(0.95); } 100% { transform: scale(1); } }

/* Animation Classes */
.animate-fade-in      /* 0.3s ease-out */
.animate-shimmer      /* 2s infinite */
.animate-scale-in     /* 0.2s ease-out */

/* Utility Classes */
.hover-lift          /* Subtle lift on hover */
.hover-scale         /* Scale 1.02 on hover */
.skeleton           /* Shimmer loading effect */
```

---

## Components

### UI Components (shadcn/ui)
All located in `src/components/ui/`:

- **Forms**: Button, Input, Textarea, Select, Checkbox, Radio, Switch, Slider
- **Layout**: Card, Separator, Sheet, Dialog, Drawer, Tabs, Accordion
- **Navigation**: Navigation Menu, Breadcrumb, Pagination
- **Feedback**: Toast, Alert, Alert Dialog, Progress, Skeleton
- **Data Display**: Table, Badge, Avatar, Tooltip, Hover Card
- **Charts**: Chart wrapper (Recharts)

### Custom Components

#### EmptyState
```tsx
<EmptyState 
  icon={PackageIcon}
  title="No batches yet"
  description="Create your first batch to get started"
  action={{ label: "Create Batch", onClick: () => navigate('/create') }}
/>
```

#### LoadingSpinner & FullPageLoader
```tsx
<LoadingSpinner size="lg" />
<FullPageLoader />
```

#### SEO
```tsx
<SEO 
  title="Page Title"
  description="Page description"
  keywords="keyword1, keyword2"
/>
```

#### MobileNav
```tsx
<MobileNav links={[
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' }
]} />
```

#### DataTableSkeleton
```tsx
<DataTableSkeleton rows={5} columns={4} />
```

#### MetricCardSkeleton
```tsx
<MetricCardsGrid count={4} />
```

---

## Pages & Routes

### Public Routes
- `/` - Landing page (marketing)
- `/features` - Feature details
- `/pricing` - Pricing plans & ROI calculator
- `/about` - About AuthIt
- `/contact` - Contact form
- `/login` - Login page
- `/register` - Registration page
- `/forgot-password` - Password recovery
- `/product/:batchId` - Product story (QR #1)
- `/verify?token=...` - Verification result (QR #2)

### Protected Routes (require authentication)
- `/dashboard` - Dashboard home
- `/dashboard/batches/create` - Create new batch (7-step wizard)
- `/dashboard/batches/:id` - Batch details
- `/dashboard/analytics` - Analytics dashboard
- `/dashboard/security` - Security monitoring
- `/dashboard/settings` - User settings

### Error Routes
- `*` - 404 Not Found page

---

## Accessibility

### Implementation
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Focus indicators (blue ring)
- ✅ ARIA labels on icons and interactive elements
- ✅ Semantic HTML (`<header>`, `<main>`, `<section>`, `<nav>`)
- ✅ Alt text on images
- ✅ Color contrast WCAG AA compliant
- ✅ Form labels properly associated
- ✅ Error messages announced
- ✅ Modal focus trap
- ✅ Screen reader support

### Testing
Test with keyboard only:
1. Tab through all interactive elements
2. Enter/Space to activate
3. Escape to close modals/dropdowns
4. Arrow keys in menus

---

## Performance

### Optimizations Implemented
- ✅ Code splitting (React.lazy for routes)
- ✅ Debounced search inputs (300ms)
- ✅ Memoization (useMemo for expensive calculations)
- ✅ Image lazy loading
- ✅ Skeleton loading states
- ✅ Efficient re-renders (proper React patterns)

### Bundle Size
- Main bundle: ~150-200KB gzipped
- Route-based code splitting reduces initial load

### Performance Targets
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s

---

## SEO

### Meta Tags
Each public page includes:
- `<title>` - Unique, descriptive title
- `<meta name="description">` - 155 character description
- `<meta name="keywords">` - Relevant keywords
- Open Graph tags (og:title, og:description, og:image)
- Twitter Card tags

### Structured Data
Add JSON-LD for:
- Organization schema (homepage)
- Product schema (story pages)
- Breadcrumb schema

### Sitemap
Generate sitemap.xml for:
- Public pages
- Product story pages (dynamic)

---

## Development Guide

### Setup
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint
npm run lint
```

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link (if needed)
4. Add SEO component
5. Test responsiveness (mobile, tablet, desktop)

### Adding New Components
1. Create in `src/components/ui/` (if reusable)
2. Use design system tokens (no hardcoded colors)
3. Add TypeScript types
4. Add accessibility attributes
5. Test keyboard navigation

### Form Validation
Use Zod + React Hook Form:
```tsx
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(schema)
});
```

### API Calls
```tsx
import { api } from '@/services/api';

// GET request
const { data } = await api.get('/batches');

// POST request
const { data } = await api.post('/batches', payload);
```

### Toast Notifications
```tsx
import { toast } from '@/hooks/use-toast';

toast({
  title: "Success",
  description: "Changes saved",
});

toast({
  title: "Error",
  description: "Something went wrong",
  variant: "destructive"
});
```

### Responsive Design
Use hooks:
```tsx
import { useIsMobile, useIsTablet, useIsDesktop } from '@/hooks/useMediaQuery';

const isMobile = useIsMobile();
return isMobile ? <MobileView /> : <DesktopView />;
```

Or Tailwind classes:
```tsx
<div className="flex flex-col md:flex-row lg:grid-cols-3">
```

---

## Best Practices

### Code Style
- Use functional components with hooks
- Prefer composition over inheritance
- Keep components small and focused
- Use TypeScript strictly (no `any`)
- Use semantic HTML elements
- Follow SOLID principles

### Git Workflow
- Feature branches: `feature/batch-creation`
- Bug fixes: `fix/authentication-bug`
- Commit messages: Conventional Commits format

### Testing Checklist
Before committing:
- [ ] Component renders correctly
- [ ] Works on mobile, tablet, desktop
- [ ] Keyboard accessible
- [ ] No console errors/warnings
- [ ] TypeScript strict mode passing
- [ ] Forms validate correctly
- [ ] Loading states work
- [ ] Error states handled

---

## Future Enhancements

### Backend Integration
- Connect to real API (replace mock data)
- Implement actual authentication
- Database integration
- File upload functionality
- Payment processing

### Advanced Features
- Multi-language content management
- Advanced analytics (predictive)
- Batch QR code download (ZIP)
- White-label customization
- API for third-party integrations
- Mobile apps (iOS, Android)

### DevOps
- CI/CD pipeline
- Automated testing
- Performance monitoring
- Error tracking (Sentry)
- Analytics (Google Analytics)

---

## Support & Contact

For questions or issues:
- Email: info@authit.ge
- Phone: +995 555 000111
- Location: Tbilisi, Georgia

---

**Version**: 1.0.0  
**Last Updated**: 2025  
**License**: Proprietary
