import { notFound } from 'next/navigation';
import Link from 'next/link';
import { mechanics, getMechanicImageUrl, type Mechanic } from '@/data/mechanics';
import RatingStars from '@/components/RatingStars';
import Badge from '@/components/Badge';
import MechanicCard from '@/components/MechanicCard';

interface PageProps {
  params: { id: string };
}

// Generate static paths for all mechanics
export function generateStaticParams() {
  return mechanics.map((mechanic) => ({
    id: mechanic.id,
  }));
}

// Generate metadata for SEO
export function generateMetadata({ params }: PageProps) {
  const mechanic = mechanics.find(m => m.id === params.id);
  
  if (!mechanic) {
    return {
      title: 'Mechanic Not Found | ClassicWrench',
    };
  }

  return {
    title: `${mechanic.name} - Classic Car Mechanic in ${mechanic.city}, ${mechanic.state} | ClassicWrench`,
    description: `${mechanic.description} Located in ${mechanic.city}, ${mechanic.state}. Specializes in ${mechanic.specialties.slice(0, 3).join(', ')}.`,
    keywords: [
      mechanic.name,
      `classic car mechanic ${mechanic.city}`,
      `classic car restoration ${mechanic.state}`,
      ...mechanic.specialties,
      ...mechanic.makes,
    ],
    openGraph: {
      title: `${mechanic.name} - Classic Car Restoration`,
      description: mechanic.description,
      images: [
        {
          url: getMechanicImageUrl(mechanic, { w: 1200, h: 630 }),
          width: 1200,
          height: 630,
          alt: `${mechanic.name} - Classic Car Restoration`,
        },
      ],
    },
  };
}

export default function MechanicDetailPage({ params }: PageProps) {
  const mechanic = mechanics.find(m => m.id === params.id);

  if (!mechanic) {
    notFound();
  }

  // Find nearby mechanics in the same state
  const nearbyMechanics = mechanics
    .filter(m => m.id !== mechanic.id && m.state === mechanic.state)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // JSON-LD structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: mechanic.name,
    image: getMechanicImageUrl(mechanic, { w: 800, h: 600 }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: mechanic.address,
      addressLocality: mechanic.city,
      addressRegion: mechanic.state,
      addressCountry: 'US',
    },
    telephone: mechanic.phone,
    url: mechanic.website,
    description: mechanic.description,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: mechanic.rating,
      reviewCount: mechanic.reviewCount,
    },
    priceRange: mechanic.priceRange,
    foundingDate: mechanic.yearFounded,
    specialty: mechanic.specialties,
    areaServed: {
      '@type': 'State',
      name: mechanic.state,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-[#faf7f2]">
        {/* Hero Image */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={getMechanicImageUrl(mechanic, { w: 1200, h: 400 })}
            alt={`${mechanic.name} - Classic Car Restoration`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Breadcrumb */}
          <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
            <nav className="flex items-center space-x-2 text-sm text-white">
              <Link href="/" className="hover:text-[#c41e3a]">
                Home
              </Link>
              <span>/</span>
              <Link href="/mechanics" className="hover:text-[#c41e3a]">
                Mechanics
              </Link>
              <span>/</span>
              <span className="text-white/80">{mechanic.name}</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Header */}
              <div className="rounded-xl border border-slate-200/60 bg-white p-6 sm:p-8">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold font-display text-slate-900 sm:text-4xl">
                    {mechanic.name}
                  </h1>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {mechanic.city}, {mechanic.state}
                    </span>
                    <span>•</span>
                    <span>Founded {mechanic.yearFounded}</span>
                    <span>•</span>
                    <span className="font-medium">{mechanic.priceRange}</span>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-4">
                    <RatingStars rating={mechanic.rating} size="lg" showNumber />
                    <span className="text-sm text-slate-600">
                      ({mechanic.reviewCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="prose prose-slate max-w-none">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    {mechanic.description}
                  </p>
                </div>
              </div>

              {/* Specialties */}
              <div className="mt-8 rounded-xl border border-slate-200/60 bg-white p-6 sm:p-8">
                <h2 className="text-xl font-bold font-display text-slate-900 mb-4">
                  Specialties
                </h2>
                <div className="flex flex-wrap gap-2">
                  {mechanic.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" size="md">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Services */}
              <div className="mt-8 rounded-xl border border-slate-200/60 bg-white p-6 sm:p-8">
                <h2 className="text-xl font-bold font-display text-slate-900 mb-4">
                  Services Offered
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {mechanic.services.map((service, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#c41e3a]" />
                      <span className="text-slate-700">{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Makes */}
              <div className="mt-8 rounded-xl border border-slate-200/60 bg-white p-6 sm:p-8">
                <h2 className="text-xl font-bold font-display text-slate-900 mb-4">
                  Vehicle Makes Serviced
                </h2>
                <div className="flex flex-wrap gap-2">
                  {mechanic.makes.map((make, index) => (
                    <Badge key={index} variant="outline" size="md">
                      {make}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {mechanic.certifications.length > 0 && (
                <div className="mt-8 rounded-xl border border-slate-200/60 bg-white p-6 sm:p-8">
                  <h2 className="text-xl font-bold font-display text-slate-900 mb-4">
                    Certifications & Credentials
                  </h2>
                  <div className="grid gap-3">
                    {mechanic.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#c41e3a]/10">
                          <svg className="h-4 w-4 text-[#c41e3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-slate-700 font-medium">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="mt-8 lg:col-span-4 lg:mt-0">
              <div className="sticky top-24 space-y-6">
                {/* Contact Info */}
                <div className="rounded-xl border border-slate-200/60 bg-white p-6">
                  <h3 className="text-lg font-semibold font-display text-slate-900 mb-4">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="text-slate-700">{mechanic.address}</p>
                        <p className="text-slate-700">{mechanic.city}, {mechanic.state}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a 
                        href={`tel:${mechanic.phone}`}
                        className="text-slate-700 hover:text-[#c41e3a]"
                      >
                        {mechanic.phone}
                      </a>
                    </div>
                    
                    {mechanic.website && (
                      <div className="flex items-center gap-3">
                        <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019 9" />
                        </svg>
                        <a 
                          href={mechanic.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-700 hover:text-[#c41e3a] break-all"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 space-y-3">
                    <a
                      href={`tel:${mechanic.phone}`}
                      className="block rounded-lg bg-[#c41e3a] px-4 py-3 text-center font-semibold text-white transition hover:bg-[#a01729]"
                    >
                      Call Now
                    </a>
                    {mechanic.website && (
                      <a
                        href={mechanic.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-lg border border-slate-300 px-4 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        Visit Website
                      </a>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="rounded-xl border border-slate-200/60 bg-white p-6">
                  <h3 className="text-lg font-semibold font-display text-slate-900 mb-4">
                    Quick Stats
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Rating</span>
                      <div className="flex items-center gap-2">
                        <RatingStars rating={mechanic.rating} size="sm" />
                        <span className="text-sm text-slate-700">{mechanic.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Reviews</span>
                      <span className="font-medium text-slate-700">{mechanic.reviewCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Founded</span>
                      <span className="font-medium text-slate-700">{mechanic.yearFounded}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Price Range</span>
                      <span className="font-medium text-slate-700">{mechanic.priceRange}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Nearby Mechanics */}
          {nearbyMechanics.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold font-display text-slate-900 mb-8">
                Other Mechanics in {mechanic.state}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {nearbyMechanics.map((nearbyMechanic) => (
                  <MechanicCard key={nearbyMechanic.id} mechanic={nearbyMechanic} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}