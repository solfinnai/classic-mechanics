'use client';

import { useState } from 'react';
import { getStatesWithCounts } from '@/data/states';

interface FilterPanelProps {
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

interface FilterState {
  state: string;
  specialty: string;
  priceRange: string;
  make: string;
  rating: number;
}

export default function FilterPanel({ onFilterChange, className = '' }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterState>({
    state: '',
    specialty: '',
    priceRange: '',
    make: '',
    rating: 0,
  });

  const states = getStatesWithCounts();

  const specialties = [
    'Pre-war restoration',
    'Porsche restoration', 
    'Ferrari restoration',
    'British sports cars',
    'Muscle cars',
    'European classics',
    'Air-cooled Porsches',
    'Custom builds',
    'Japanese classics',
    'American muscle',
    'Exotic restoration',
    'Race car restoration'
  ];

  const makes = [
    'Porsche',
    'Ferrari', 
    'Chevrolet',
    'Ford',
    'BMW',
    'Mercedes-Benz',
    'Jaguar',
    'Lamborghini',
    'Dodge',
    'Plymouth',
    'MG',
    'Triumph',
    'Aston Martin',
    'Rolls-Royce'
  ];

  const priceRanges = [
    { value: '$', label: '$ - Budget Friendly' },
    { value: '$$', label: '$$ - Moderate' },
    { value: '$$$', label: '$$$ - Premium' },
    { value: '$$$$', label: '$$$$ - Luxury' }
  ];

  const updateFilter = (key: keyof FilterState, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      state: '',
      specialty: '',
      priceRange: '',
      make: '',
      rating: 0,
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== 0);

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold font-display text-slate-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-[#c41e3a] hover:text-[#a01729] font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* State Filter */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          State
        </label>
        <select
          value={filters.state}
          onChange={(e) => updateFilter('state', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#c41e3a] focus:outline-none focus:ring-1 focus:ring-[#c41e3a]"
        >
          <option value="">All States</option>
          {states.map(state => (
            <option key={state.code} value={state.code}>
              {state.name} ({state.count})
            </option>
          ))}
        </select>
      </div>

      {/* Specialty Filter */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Specialty
        </label>
        <select
          value={filters.specialty}
          onChange={(e) => updateFilter('specialty', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#c41e3a] focus:outline-none focus:ring-1 focus:ring-[#c41e3a]"
        >
          <option value="">All Specialties</option>
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>

      {/* Make Filter */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Make
        </label>
        <select
          value={filters.make}
          onChange={(e) => updateFilter('make', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#c41e3a] focus:outline-none focus:ring-1 focus:ring-[#c41e3a]"
        >
          <option value="">All Makes</option>
          {makes.map(make => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Price Range
        </label>
        <select
          value={filters.priceRange}
          onChange={(e) => updateFilter('priceRange', e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#c41e3a] focus:outline-none focus:ring-1 focus:ring-[#c41e3a]"
        >
          <option value="">Any Price</option>
          {priceRanges.map(range => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Minimum Rating
        </label>
        <select
          value={filters.rating}
          onChange={(e) => updateFilter('rating', parseFloat(e.target.value))}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-[#c41e3a] focus:outline-none focus:ring-1 focus:ring-[#c41e3a]"
        >
          <option value={0}>Any Rating</option>
          <option value={4.5}>4.5+ stars</option>
          <option value={4.0}>4.0+ stars</option>
          <option value={3.5}>3.5+ stars</option>
          <option value={3.0}>3.0+ stars</option>
        </select>
      </div>
    </div>
  );
}