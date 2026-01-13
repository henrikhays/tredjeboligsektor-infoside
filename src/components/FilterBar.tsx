'use client';

import { Category, Geography } from '@/lib/types';

interface FilterBarProps {
  categories: Category[];
  geographies: Geography[];
  minReportOptions: number[];
  selectedCategory: string;
  selectedGeography: string;
  selectedMinReports: number;
  onCategoryChange: (category: string) => void;
  onGeographyChange: (geography: string) => void;
  onMinReportsChange: (minReports: number) => void;
  totalResults: number;
}

const categoryIcons: Record<string, string> = {
  offentlig_aktor: '🏛️',
  privat_aktor: '🏢',
  forskningsmiljo: '🔬',
  politikk_lovverk: '⚖️',
  nettverk_organisasjon: '🤝',
  finansiering_kilde: '💰',
  teknologi_digitalt_verktoy: '💻',
  arrangement_konferanse: '📅',
  annet: '📋',
};

export default function FilterBar({
  categories,
  geographies,
  minReportOptions,
  selectedCategory,
  selectedGeography,
  selectedMinReports,
  onCategoryChange,
  onGeographyChange,
  onMinReportsChange,
  totalResults,
}: FilterBarProps) {
  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedGeography !== 'all',
    selectedMinReports > 0,
  ].filter(Boolean).length;

  const clearFilters = () => {
    onCategoryChange('all');
    onGeographyChange('all');
    onMinReportsChange(0);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Filter header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FilterIcon className="w-5 h-5 text-gray-500" />
          <span className="font-medium text-gray-700">Filtre</span>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
              {activeFiltersCount} aktive
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm">
            <span className="font-semibold text-gray-900">{totalResults}</span>
            <span className="text-gray-500 ml-1">{totalResults === 1 ? 'aktør' : 'aktører'}</span>
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
            >
              <XIcon className="w-4 h-4" />
              Nullstill
            </button>
          )}
        </div>
      </div>

      {/* Filter controls */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Kategori-filter */}
          <div>
            <label
              htmlFor="category-filter"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
            >
              <BuildingIcon className="w-4 h-4 text-gray-400" />
              Kategori
            </label>
            <div className="relative">
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm appearance-none cursor-pointer transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  selectedCategory !== 'all'
                    ? 'border-blue-300 bg-blue-50 text-blue-900'
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              >
                <option value="all">Alle kategorier</option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {categoryIcons[category.slug] || '📋'} {category.name} ({category.count})
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Geografi-filter */}
          <div>
            <label
              htmlFor="geography-filter"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
            >
              <MapPinIcon className="w-4 h-4 text-gray-400" />
              Geografi
            </label>
            <div className="relative">
              <select
                id="geography-filter"
                value={selectedGeography}
                onChange={(e) => onGeographyChange(e.target.value)}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm appearance-none cursor-pointer transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  selectedGeography !== 'all'
                    ? 'border-blue-300 bg-blue-50 text-blue-900'
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              >
                <option value="all">Alle geografier</option>
                {geographies.map((geography) => (
                  <option key={geography.name} value={geography.name}>
                    {geography.name} ({geography.count})
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Minimum rapporter-filter */}
          <div>
            <label
              htmlFor="reports-filter"
              className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
            >
              <DocumentIcon className="w-4 h-4 text-gray-400" />
              Minimum rapporter
            </label>
            <div className="relative">
              <select
                id="reports-filter"
                value={selectedMinReports}
                onChange={(e) => onMinReportsChange(Number(e.target.value))}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm appearance-none cursor-pointer transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  selectedMinReports > 0
                    ? 'border-blue-300 bg-blue-50 text-blue-900'
                    : 'border-gray-300 bg-white text-gray-900'
                }`}
              >
                <option value={0}>Alle (ingen minimum)</option>
                {minReportOptions
                  .filter((n) => n > 0)
                  .map((num) => (
                    <option key={num} value={num}>
                      Minst {num} {num === 1 ? 'rapport' : 'rapporter'}
                    </option>
                  ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active filter pills */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            {selectedCategory !== 'all' && (
              <FilterPill
                label={`Kategori: ${categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}`}
                onRemove={() => onCategoryChange('all')}
              />
            )}
            {selectedGeography !== 'all' && (
              <FilterPill
                label={`Geografi: ${selectedGeography}`}
                onRemove={() => onGeographyChange('all')}
              />
            )}
            {selectedMinReports > 0 && (
              <FilterPill
                label={`Min. ${selectedMinReports} rapporter`}
                onRemove={() => onMinReportsChange(0)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="ml-1 p-0.5 hover:bg-blue-200 rounded-full transition-colors"
      >
        <XIcon className="w-3 h-3" />
      </button>
    </span>
  );
}

// Icons
function FilterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
