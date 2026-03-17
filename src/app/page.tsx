import Link from 'next/link';
import { mechanics, getFeaturedMechanics, getMechanicImageUrl } from '@/data/mechanics';
import { getStatesWithCounts } from '@/data/states';
import MechanicCard from '@/components/MechanicCard';
import SearchBar from '@/components/SearchBar';
import StatCard from '@/components/StatCard';

export default function Home() {
  const featured = getFeaturedMechanics();
  const states = getStatesWithCounts();
  const totalReviews = mechanics.reduce((s, m) => s + m.reviewCount, 0);
  const avgRating = mechanics.reduce((s, m) => s + m.rating, 0) / mechanics.length;

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ClassicWrench',
    url: 'https://classicwrench.com',
    description: 'Find the best classic car mechanics in America. Vetted specialists for every make and era.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://classicwrench.com/mechanics?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ClassicWrench',
    url: 'https://classicwrench.com',
    description: 'The most comprehensive directory of classic car mechanics in the United States.',
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Classic Car Mechanics',
    numberOfItems: featured.length,
    itemListElement: featured.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://classicwrench.com/mechanics/${m.id}`,
      name: m.name,
    })),
  };

  // Top states for the grid
  const topStates = states.slice(0, 12);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1449824904069-72a3b9e96c93?w=1920&h=1080&fit=crop&auto=format&q=80"
          alt="Classic car restoration workshop"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            {mechanics.length}+ verified shops across {states.length} states
          </p>
          <h1 className="mt-6 text-5xl font-bold tracking-tight text-white font-display md:text-7xl lg:text-8xl">
            Find the Best
            <br />
            <span className="text-[#c41e3a]">Classic Car Mechanics</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
            Discover expert classic car mechanics and restoration shops across America. 
            Vetted specialists for every make, era, and restoration need.
          </p>
          <SearchBar className="mx-auto mt-10 max-w-xl" />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/mechanics"
              className="rounded-xl bg-[#c41e3a] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-[#a01729] hover:shadow-xl"
            >
              Browse All Mechanics
            </Link>
            <Link
              href="#featured"
              className="rounded-xl border border-white/30 bg-white/10 px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Featured Shops
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                </svg>
              }
              value={mechanics.length}
              label="Verified Mechanics"
              description="Expert classic car specialists"
            />
            <StatCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              value={states.length}
              label="States Covered"
              description="Coast to coast coverage"
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
          </div>
        </div>
      </section>

      {/* Featured Mechanics */}
      <section id="featured" className="bg-[#faf7f2] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold font-display text-slate-900 sm:text-4xl">
              Featured Mechanics
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Hand-picked classic car specialists with exceptional expertise and ratings
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((mechanic) => (
              <MechanicCard key={mechanic.id} mechanic={mechanic} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/mechanics"
              className="inline-flex items-center gap-2 rounded-xl bg-[#c41e3a] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#a01729]"
            >
              View All Mechanics
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* States Grid */}
      <section id="states" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold font-display text-slate-900 sm:text-4xl">
              Browse by State
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Find classic car mechanics in your area
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {topStates.map((state) => (
              <Link
                key={state.code}
                href={`/states/${state.code}`}
                className="group rounded-xl border border-slate-200/60 bg-white p-4 transition hover:border-[#c41e3a]/30 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-[#c41e3a]">
                      {state.name}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {state.count} {state.count === 1 ? 'mechanic' : 'mechanics'}
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
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/mechanics"
              className="text-[#c41e3a] font-medium hover:text-[#a01729]"
            >
              View all states →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2d2d2d] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-display sm:text-4xl">
              Ready to Find Your Perfect Mechanic?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Join thousands of classic car enthusiasts who trust ClassicWrench to find the best restoration experts.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/mechanics"
                className="rounded-xl bg-[#c41e3a] px-8 py-3 font-semibold text-white transition hover:bg-[#a01729]"
              >
                Start Searching
              </Link>
              <Link
                href="/about"
                className="rounded-xl border border-white/30 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}