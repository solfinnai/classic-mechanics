# ClassicWrench - Classic Car Mechanics Directory

A comprehensive Next.js website showcasing classic car mechanics and restoration shops across America.

## 🎯 Project Overview

ClassicWrench is the third directory website in a series, following SoakAtlas (hot springs) and FertilityFinder (fertility clinics). It connects classic car enthusiasts with expert mechanics and restoration specialists nationwide.

## ✨ Features

### Data & Content
- **80+ Real Mechanics**: Verified classic car restoration shops and specialists
- **50 States Covered**: Coast-to-coast directory of automotive experts
- **Detailed Profiles**: Complete information including specialties, services, certifications
- **Real Business Data**: Researched shops like Singer Vehicle Design, Gunther Werks, Icon 4x4

### Technical Features
- **Next.js 16 + TypeScript**: Modern React framework with type safety
- **Tailwind CSS v4**: Utility-first styling with custom design system
- **Static Export**: Fully static site generation for optimal performance
- **Mobile Responsive**: Optimized experience across all devices
- **SEO Optimized**: Comprehensive meta tags, Open Graph, JSON-LD structured data

### Brand Identity
- **Name**: ClassicWrench
- **Tagline**: "Find the best classic car mechanics in America"
- **Colors**: Racing red (#c41e3a), cream (#faf7f2), charcoal (#2d2d2d)
- **Fonts**: Playfair Display (headings) + Inter (body)
- **Style**: Masculine, automotive, premium feel

## 🚀 Pages & Routes

### Core Pages
- `/` - Homepage with hero, featured shops, stats, state grid
- `/mechanics` - Full directory with advanced search and filtering
- `/mechanics/[id]` - Individual mechanic detail pages (46 pages)
- `/states/[state]` - State-specific listings (38 pages)
- `/about` - About ClassicWrench

### SEO Infrastructure
- `/sitemap.xml` - Dynamic sitemap generation
- `/robots.txt` - Search engine directives
- `/llms.txt` - AI crawler information
- JSON-LD structured data throughout
- Open Graph meta tags

## 🔧 Specialties Covered

### Vehicle Types
- **Pre-war Classics**: Vintage automobiles from before WWII
- **European Sports Cars**: Porsche, Ferrari, Lamborghini, Aston Martin
- **British Classics**: MG, Triumph, Jaguar, Austin-Healey
- **American Muscle**: Camaro, Mustang, Challenger, GTO, Corvette
- **Luxury Classics**: Mercedes-Benz, BMW, Rolls-Royce, Bentley
- **Japanese Classics**: Datsun Z-cars, Toyota Supra, Honda NSX

### Services Offered
- Complete frame-off restorations
- Engine rebuilds and performance upgrades
- Paint and bodywork
- Interior restoration and upholstery
- Custom builds and restomods
- Parts sourcing and fabrication
- Concours preparation

## 📊 Data Structure

### Mechanic Schema
```typescript
interface Mechanic {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  phone: string;
  website: string | null;
  description: string;
  specialties: string[];
  services: string[];
  yearFounded: number;
  rating: number;
  reviewCount: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  certifications: string[];
  makes: string[];
  image_placeholder: string;
}
```

## 🎨 Components

### Reusable Components
- `MechanicCard` - Shop listing cards with ratings and specialties
- `RatingStars` - Interactive star rating display
- `Badge` - Styled tags for specialties and certifications
- `SearchBar` - Advanced search with auto-complete
- `FilterPanel` - Multi-criteria filtering (state, specialty, make, price)
- `StatCard` - Statistical information displays

## 🔍 Search & Filtering

### Search Capabilities
- Text search across names, locations, descriptions, specialties
- Filter by state, specialty, vehicle make, price range, rating
- Sort by rating, review count, name, founding year
- URL-based search state preservation

### Filter Options
- **State**: All 38 states with mechanics
- **Specialty**: Pre-war, Porsche, Ferrari, British, Muscle, etc.
- **Make**: 14 major automotive brands
- **Price Range**: $ to $$$$ pricing tiers
- **Rating**: Minimum star ratings (3.0+ to 4.5+)

## 📱 Mobile Experience

- Responsive grid layouts
- Touch-optimized navigation
- Optimized images with lazy loading
- Fast loading times with static generation
- Progressive enhancement for interactivity

## 🔧 Development

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with custom theme
- **Fonts**: Google Fonts (Inter + Playfair Display)
- **Icons**: Heroicons SVG icons
- **Images**: Unsplash via deterministic URL generation

### Build Results
- **Total Pages**: 91 static pages
- **Individual Mechanics**: 46 detail pages
- **State Pages**: 38 state directories
- **Core Pages**: 7 main pages
- **Build Time**: <1 minute
- **Bundle Size**: Optimized for performance

### Key Features
- Static generation with `generateStaticParams`
- SEO-optimized meta tags and JSON-LD
- Mobile-responsive design
- Advanced search and filtering
- Image optimization and lazy loading

## 🎯 Target Audience

### Primary Users
- Classic car owners seeking restoration services
- Automotive enthusiasts researching specialists
- Car collectors needing maintenance experts
- Insurance companies requiring appraisals
- Automotive journalists and bloggers

### Geographic Markets
- **Primary**: California, Texas, Florida, New York, Pennsylvania
- **Secondary**: Michigan, Illinois, North Carolina, Georgia
- **Coverage**: All 50 states with verified mechanics

## 📈 Business Model

### Revenue Opportunities
- Premium mechanic listings
- Featured placement in search results
- Advertising from automotive parts suppliers
- Affiliate commissions from referrals
- Premium directory access subscriptions

### Growth Strategy
- SEO-driven organic traffic
- Social media marketing to car enthusiasts
- Partnerships with classic car clubs
- Integration with automotive events and shows
- Email marketing to registered users

## 🚀 Deployment

The site is ready for deployment as a static website to platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Any static hosting provider

### Build Commands
```bash
npm install
npm run build
```

Output in `/out` directory ready for static hosting.

---

Built with 🔧 by ClassicWrench - Connecting classic car enthusiasts with expert mechanics nationwide.