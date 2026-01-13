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
  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedGeography !== 'all' ||
    selectedMinReports > 0;

  const clearFilters = () => {
    onCategoryChange('all');
    onGeographyChange('all');
    onMinReportsChange(0);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Kategori-filter */}
        <div className="flex-1">
          <label
            htmlFor="category-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Kategori
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Alle kategorier</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
        </div>

        {/* Geografi-filter */}
        <div className="flex-1">
          <label
            htmlFor="geography-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Geografi
          </label>
          <select
            id="geography-filter"
            value={selectedGeography}
            onChange={(e) => onGeographyChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Alle geografier</option>
            {geographies.map((geography) => (
              <option key={geography.name} value={geography.name}>
                {geography.name} ({geography.count})
              </option>
            ))}
          </select>
        </div>

        {/* Minimum rapporter-filter */}
        <div className="flex-1">
          <label
            htmlFor="reports-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Minimum rapporter
          </label>
          <select
            id="reports-filter"
            value={selectedMinReports}
            onChange={(e) => onMinReportsChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={0}>Alle</option>
            {minReportOptions
              .filter((n) => n > 0)
              .map((num) => (
                <option key={num} value={num}>
                  Minst {num} {num === 1 ? 'rapport' : 'rapporter'}
                </option>
              ))}
          </select>
        </div>

        {/* Resultater og nullstill */}
        <div className="flex items-end gap-3">
          <div className="text-sm text-gray-600 py-2">
            <span className="font-semibold text-gray-900">{totalResults}</span>{' '}
            {totalResults === 1 ? 'aktør' : 'aktører'}
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
            >
              Nullstill filtre
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
