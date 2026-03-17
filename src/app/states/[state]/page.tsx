import { notFound } from 'next/navigation';
import Link from 'next/link';
import { mechanics, getMechanicsByState } from '@/data/mechanics';
import { getStatesWithCounts, getStateInfo } from '@/data/states';
import MechanicCard from '@/components/MechanicCard';
import StatCard from '@/components/StatCard';

interface PageProps {
  params: { state: string };
}

// Generate static paths for all states
export function generateStaticParams() {
  const states = getStatesWithCounts();
  return states.map((state) => ({
    state: state.code,
  }));
}

// Generate metadata for SEO
export function generateMetadata({ params }: PageProps) {
  const stateInfo = getStateInfo(params.state);
  
  if (!stateInfo) {
    return {
      title: 'State Not Found | ClassicWrench',
    };
  }

  const mechanics = getMechanicsByState(params.state);

  return {
    title: `Classic Car Mechanics in ${stateInfo.name} | ClassicWrench`,
    description: `Find the best classic car mechanics and restoration shops in ${stateInfo.name}. ${mechanics.length} verified specialists ready to help with your classic car needs.`,
    keywords: [
      `classic car mechanics ${stateInfo.name}`,
      `classic car restoration ${stateInfo.name}`,
      `vintage car repair ${stateInfo.name}`,
      `auto restoration ${stateInfo.name}`,
      `classic car shops ${stateInfo.name}`,
    ],
    openGraph: {
      title: `Classic Car Mechanics in ${stateInfo.name}`,
      description: `${mechanics.length} verified classic car specialists in ${stateInfo.name}. Find expert restoration shops and mechanics near you.`,
    },
  };
}

export default function StatePage({ params }: PageProps) {
  const stateInfo = getStateInfo(params.state);

  if (!stateInfo) {
    notFound();
  }

  const stateMechanics = getMechanicsByState(params.state);
  
  if (stateMechanics.length === 0) {
    notFound();
  }

  // Calculate stats for this state
  const avgRating = stateMechanics.reduce((sum, m) => sum + m.rating, 0) / stateMechanics.length;
  const totalReviews = stateMechanics.reduce((sum, m) => sum + m.reviewCount, 0);
  const avgFounded = Math.round(stateMechanics.reduce((sum, m) => sum + m.yearFounded, 0) / stateMechanics.length);

  // Get unique cities
  const cities = [...new Set(stateMechanics.map(m => m.city))];
  const topCities = cities.slice(0, 5);

  // Sort mechanics by rating
  const sortedMechanics = [...stateMechanics].sort((a, b) => b.rating - a.rating);
  const featuredMechanics = sortedMechanics.slice(0, 3);

  // JSON-LD structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Classic Car Mechanics in ${stateInfo.name}`,
    description: `Directory of classic car mechanics and restoration shops in ${stateInfo.name}`,
    numberOfItems: stateMechanics.length,
    itemListElement: stateMechanics.map((mechanic, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'AutoRepair',
        name: mechanic.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: mechanic.city,
          addressRegion: mechanic.state,
          addressCountry: 'US',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: mechanic.rating,
          reviewCount: mechanic.reviewCount,
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="min-h-screen bg-[#faf7f2]">
        {/* Header */}
        <div className="bg-white border-b border-slate-200/60">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center space-x-2 text-sm text-slate-600">
              <Link href="/" className="hover:text-[#c41e3a]">
                Home
              </Link>
              <span>/</span>
              <Link href="/mechanics" className="hover:text-[#c41e3a]">
                Mechanics
              </Link>
              <span>/</span>
              <span className="text-slate-900 font-medium">{stateInfo.name}</span>
            </nav>

            <div className="text-center">
              <h1 className="text-4xl font-bold font-display text-slate-900 sm:text-5xl">
                Classic Car Mechanics in {stateInfo.name}
              </h1>
              <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
                {stateInfo.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                  </svg>
                  {stateMechanics.length} verified mechanics
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {cities.length} cities served
                </span>
                <span>•</span>
                <span>Avg rating {avgRating.toFixed(1)}/5.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                icon={
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                  </svg>
                }
                value={stateMechanics.length}
                label="Verified Mechanics"
                description={`Expert specialists in ${stateInfo.name}`}
              />
              <StatCard
                icon={
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                }
                value={avgRating.toFixed(1)}
                label="Average Rating"
                description="Quality you can trust"
              />
              <StatCard
                icon={
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                }
                value={totalReviews.toLocaleString()}
                label="Customer Reviews"
                description="Real experiences shared"
              />
              <StatCard
                icon={
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                value={new Date().getFullYear() - avgFounded}
                label="Avg Years Experience"
                description={`Since ${avgFounded} on average`}
              />
            </div>
          </div>
        </div>

        {/* Top Rated Mechanics */}
        <div className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold font-display text-slate-900 sm:text-4xl">
                Top Rated Mechanics in {stateInfo.name}
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                The highest rated classic car specialists in the state
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {featuredMechanics.map((mechanic) => (
                <MechanicCard key={mechanic.id} mechanic={mechanic} />
              ))}
            </div>
            <div className="text-center">
              <Link
                href={`/mechanics?state=${params.state}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#c41e3a] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#a01729]"
              >
                View All {stateMechanics.length} Mechanics in {stateInfo.name}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Cities */}
        {cities.length > 1 && (
          <div className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold font-display text-slate-900 sm:text-4xl">
                  Cities We Cover
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Find classic car mechanics across {stateInfo.name}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {cities.map((city) => {
                  const cityMechanics = stateMechanics.filter(m => m.city === city);
                  return (
                    <Link
                      key={city}
                      href={`/mechanics?state=${params.state}&city=${encodeURIComponent(city)}`}
                      className="group rounded-xl border border-slate-200/60 bg-white p-4 transition hover:border-[#c41e3a]/30 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900 group-hover:text-[#c41e3a]">
                            {city}
                          </h3>
                          <p className="text-sm text-slate-500">
                            {cityMechanics.length} {cityMechanics.length === 1 ? 'mechanic' : 'mechanics'}
                          </p>
                        </div>
                        <svg 
                          className="h-5 w-5 text-slate-400 transition group-hover:text-[#c41e3a]" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* All Mechanics in State */}
        <div className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold font-display text-slate-900 sm:text-4xl">
                All Mechanics in {stateInfo.name}
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Browse our complete directory of {stateMechanics.length} verified classic car specialists
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedMechanics.map((mechanic) => (
                <MechanicCard key={mechanic.id} mechanic={mechanic} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}