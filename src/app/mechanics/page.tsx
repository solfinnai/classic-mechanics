'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { mechanics } from '@/data/mechanics';
import MechanicCard from '@/components/MechanicCard';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';

interface FilterState {
  state: string;
  specialty: string;
  priceRange: string;
  make: string;
  rating: number;
}

function MechanicsPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialState = searchParams.get('state') || '';
  const initialSpecialty = searchParams.get('specialty') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<FilterState>({
    state: initialState,
    specialty: initialSpecialty,
    priceRange: '',
    make: '',
    rating: 0,
  });
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name' | 'founded'>('rating');

  const filteredMechanics = useMemo(() => {
    let filtered = [...mechanics];

    // Text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(mechanic => 
        mechanic.name.toLowerCase().includes(query) ||
        mechanic.city.toLowerCase().includes(query) ||
        mechanic.state.toLowerCase().includes(query) ||
        mechanic.description.toLowerCase().includes(query) ||
        mechanic.specialties.some(s => s.toLowerCase().includes(query)) ||
        mechanic.makes.some(m => m.toLowerCase().includes(query)) ||
        mechanic.services.some(s => s.toLowerCase().includes(query))
      );
    }

    // Apply filters
    if (filters.state) {
      filtered = filtered.filter(m => m.state === filters.state);
    }
    if (filters.specialty) {
      filtered = filtered.filter(m => 
        m.specialties.some(s => s.toLowerCase().includes(filters.specialty.toLowerCase()))
      );
    }
    if (filters.make) {
      filtered = filtered.filter(m => 
        m.makes.some(make => make.toLowerCase().includes(filters.make.toLowerCase()))
      );
    }
    if (filters.priceRange) {
      filtered = filtered.filter(m => m.priceRange === filters.priceRange);
    }
    if (filters.rating > 0) {
      filtered = filtered.filter(m => m.rating >= filters.rating);
    }

    // Sort results
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'founded':
        filtered.sort((a, b) => a.yearFounded - b.yearFounded);
        break;
    }

    return filtered;
  }, [searchQuery, filters, sortBy]);

  // Update search query when URL params change
  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* Header */}
      <div className="bg-white border-b border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold font-display text-slate-900 sm:text-4xl">
              Classic Car Mechanics Directory
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Find expert classic car mechanics and restoration shops across America
            </p>
            <SearchBar 
              className="mx-auto mt-8 max-w-2xl" 
              placeholder="Search by name, location, specialty, or make..."
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <FilterPanel 
                onFilterChange={handleFilterChange}
                className="rounded-xl border border-slate-200/60 bg-white p-6"
              />
            </div>
          </div>

          {/* Results */}
          <div className="mt-8 lg:col-span-9 lg:mt-0">
            {/* Results Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {filteredMechanics.length} {filteredMechanics.length === 1 ? 'mechanic' : 'mechanics'} found
                </h2>
                {searchQuery && (
                  <p className="text-sm text-slate-600">
                    Search results for "{searchQuery}"
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm font-medium text-slate-700">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#c41e3a] focus:outline-none focus:ring-1 focus:ring-[#c41e3a]"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="name">Name A-Z</option>
                  <option value="founded">Oldest First</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {filteredMechanics.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredMechanics.map((mechanic) => (
                  <MechanicCard key={mechanic.id} mechanic={mechanic} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200/60 bg-white p-12 text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                  <svg className="h-6 w-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No mechanics found</h3>
                <p className="text-slate-600 mb-4">
                  Try adjusting your search criteria or filters to find more results.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      state: '',
                      specialty: '',
                      priceRange: '',
                      make: '',
                      rating: 0,
                    });
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#c41e3a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a01729]"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MechanicsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c41e3a] mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading mechanics...</p>
        </div>
      </div>
    }>
      <MechanicsPageContent />
    </Suspense>
  );
}