'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function SearchBar({ 
  className = '', 
  placeholder = 'Search mechanics, locations, or specialties...',
  size = 'md' 
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/mechanics?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };

  const buttonSizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base', 
    lg: 'px-5 py-4 text-lg'
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="flex overflow-hidden rounded-xl border border-slate-300 bg-white shadow-sm transition focus-within:border-[#c41e3a] focus-within:ring-2 focus-within:ring-[#c41e3a]/20">
        <div className="flex items-center pl-4 text-slate-400">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`flex-1 border-0 bg-transparent outline-none placeholder:text-slate-400 ${sizeClasses[size]}`}
        />
        <button
          type="submit"
          className={`border-0 bg-[#c41e3a] font-semibold text-white transition hover:bg-[#a01729] focus:outline-none focus:ring-2 focus:ring-[#c41e3a]/20 ${buttonSizeClasses[size]}`}
        >
          Search
        </button>
      </div>
    </form>
  );
}