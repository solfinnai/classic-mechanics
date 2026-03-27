import Link from 'next/link';
import { mechanics } from '@/data/mechanics';
import { getStatesWithCounts } from '@/data/states';

export const metadata = {
  title: 'About ClassicWrench - Your Guide to Classic Car Mechanics',
  description: 'Learn about ClassicWrench, the premier directory of classic car mechanics and restoration shops across America. Discover our mission and how we help classic car enthusiasts.',
};

export default function AboutPage() {
  const states = getStatesWithCounts();
  const totalReviews = mechanics.reduce((s, m) => s + m.reviewCount, 0);
  const avgRating = mechanics.reduce((s, m) => s + m.rating, 0) / mechanics.length;

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold font-display text-slate-900 sm:text-5xl lg:text-6xl">
              About ClassicWrench
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-600">
              We're passionate about connecting classic car enthusiasts with the best mechanics 
              and restoration specialists across America.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <h2 className="text-3xl font-bold font-display text-slate-900 sm:text-4xl">
                Our Mission
              </h2>
              <div className="mt-6 space-y-6 text-lg text-slate-600">
                <p>
                  Classic cars deserve classic care. At ClassicWrench, we understand the passion, 
                  dedication, and expertise required to properly maintain and restore vintage automobiles. 
                  That's why we've built the most comprehensive directory of classic car mechanics 
                  in America.
                </p>
                <p>
                  Whether you're searching for a Porsche specialist, a muscle car expert, or a 
                  full-service restoration shop, we connect you with verified professionals who 
                  share your passion for automotive excellence.
                </p>
                <p>
                  Every mechanic in our directory has been researched and verified. We provide 
                  detailed information about their specialties, services, certifications, and 
                  customer reviews to help you make informed decisions about your classic car's care.
                </p>
              </div>
            </div>
            <div className="mt-12 lg:col-span-6 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1581833971176-5c41ebc7fe00?w=600&h=400&fit=crop&auto=format&q=80"
                alt="Classic car restoration workshop"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-display text-slate-900 sm:text-4xl mb-12">
              ClassicWrench by the Numbers
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold font-display text-[#c41e3a] mb-2">
                  {mechanics.length}+
                </div>
                <div className="text-lg font-semibold text-slate-900 mb-1">
                  Verified Mechanics
                </div>
                <div className="text-sm text-slate-600">
                  Thoroughly researched specialists
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold font-display text-[#c41e3a] mb-2">
                  {states.length}
                </div>
                <div className="text-lg font-semibold text-slate-900 mb-1">
                  States Covered
                </div>
                <div className="text-sm text-slate-600">
                  Coast-to-coast coverage
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold font-display text-[#c41e3a] mb-2">
                  {totalReviews.toLocaleString()}+
                </div>
                <div className="text-lg font-semibold text-slate-900 mb-1">
                  Customer Reviews
                </div>
                <div className="text-sm text-slate-600">
                  Real experiences shared
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold font-display text-[#c41e3a] mb-2">
                  {avgRating.toFixed(1)}
                </div>
                <div className="text-lg font-semibold text-slate-900 mb-1">
                  Average Rating
                </div>
                <div className="text-sm text-slate-600">
                  Quality you can trust
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-display text-slate-900 sm:text-4xl">
              What Makes Us Different
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We go beyond basic listings to provide comprehensive information about each mechanic
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-200/60 bg-white p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#c41e3a]/10">
                <svg className="h-6 w-6 text-[#c41e3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 mb-3">
                Verified Specialists
              </h3>
              <p className="text-slate-600">
                Every mechanic is researched and verified. We check their credentials, specialties, 
                and reputation to ensure quality recommendations.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/60 bg-white p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#c41e3a]/10">
                <svg className="h-6 w-6 text-[#c41e3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 mb-3">
                Specialized Expertise
              </h3>
              <p className="text-slate-600">
                From Porsche air-cooled engines to Ferrari V12s, we help you find mechanics 
                with specific expertise in your vehicle's make and era.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/60 bg-white p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#c41e3a]/10">
                <svg className="h-6 w-6 text-[#c41e3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 mb-3">
                Nationwide Coverage
              </h3>
              <p className="text-slate-600">
                From California restoration shops to Florida specialists, we cover all 50 states 
                to help you find expert care wherever you are.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/60 bg-white p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#c41e3a]/10">
                <svg className="h-6 w-6 text-[#c41e3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 mb-3">
                Real Reviews
              </h3>
              <p className="text-slate-600">
                Read authentic customer reviews and ratings to understand each shop's strengths 
                and find the perfect match for your needs.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/60 bg-white p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#c41e3a]/10">
                <svg className="h-6 w-6 text-[#c41e3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 mb-3">
                Advanced Search
              </h3>
              <p className="text-slate-600">
                Filter by location, specialty, vehicle make, price range, and ratings to quickly 
                find exactly what you're looking for.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/60 bg-white p-8">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#c41e3a]/10">
                <svg className="h-6 w-6 text-[#c41e3a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold font-display text-slate-900 mb-3">
                Passion-Driven
              </h3>
              <p className="text-slate-600">
                Built by classic car enthusiasts for classic car enthusiasts. We understand 
                the importance of finding the right care for your automotive passion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#2d2d2d] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold font-display sm:text-4xl">
            Ready to Find Your Perfect Mechanic?
          </h2>
          <p className="mt-4 text-xl text-white/80">
            Join thousands of classic car enthusiasts who trust ClassicWrench
          </p>
          <div className="mt-8">
            <Link
              href="/mechanics"
              className="inline-flex items-center gap-2 rounded-xl bg-[#c41e3a] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#a01729]"
            >
              Explore Mechanics
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}