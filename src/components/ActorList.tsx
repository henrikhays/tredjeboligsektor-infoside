'use client';

import { useState, useMemo } from 'react';
import { Actor, Category, Geography } from '@/lib/types';
import ActorCard from './ActorCard';
import FilterBar from './FilterBar';
import { slugify } from '@/lib/loadActors';

interface ActorListProps {
  actors: Actor[];
  categories: Category[];
  geographies: Geography[];
  showTopics?: boolean;
  initialView?: 'grid' | 'list';
}

const ITEMS_PER_PAGE = 12;

export default function ActorList({
  actors,
  categories,
  geographies,
  showTopics = true,
  initialView = 'grid',
}: ActorListProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGeography, setSelectedGeography] = useState('all');
  const [selectedMinReports, setSelectedMinReports] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialView);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'name' | 'reports' | 'status'>('name');

  // Beregn minimum rapport-alternativer
  const minReportOptions = useMemo(() => {
    const counts = new Set<number>();
    actors.forEach((actor) => {
      counts.add(actor.rapporter_som_omtaler?.length || 0);
    });
    return Array.from(counts).sort((a, b) => a - b);
  }, [actors]);

  // Filtrer og sorter aktører
  const filteredActors = useMemo(() => {
    let result = actors.filter((actor) => {
      // Søk
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = actor.navn.toLowerCase().includes(query);
        const matchesRolle = actor.rolle_kort?.toLowerCase().includes(query);
        const matchesTemaer = actor.temaer.toLowerCase().includes(query);
        if (!matchesName && !matchesRolle && !matchesTemaer) {
          return false;
        }
      }

      // Kategori-filter
      if (selectedCategory !== 'all') {
        if (slugify(actor.kategori) !== selectedCategory) {
          return false;
        }
      }

      // Geografi-filter
      if (selectedGeography !== 'all') {
        if (actor.geografi !== selectedGeography) {
          return false;
        }
      }

      // Minimum rapporter-filter
      if (selectedMinReports > 0) {
        const numReports = actor.rapporter_som_omtaler?.length || 0;
        if (numReports < selectedMinReports) {
          return false;
        }
      }

      return true;
    });

    // Sortering
    result.sort((a, b) => {
      switch (sortBy) {
        case 'reports':
          return (b.rapporter_som_omtaler?.length || 0) - (a.rapporter_som_omtaler?.length || 0);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'name':
        default:
          return a.navn.localeCompare(b.navn, 'no');
      }
    });

    return result;
  }, [actors, selectedCategory, selectedGeography, selectedMinReports, searchQuery, sortBy]);

  // Paginering
  const totalPages = Math.ceil(filteredActors.length / ITEMS_PER_PAGE);
  const paginatedActors = filteredActors.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  const handleFilterChange = (setter: (value: any) => void) => (value: any) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Search and view controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Søk etter aktør, tema eller beskrivelse..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <XIcon className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500 whitespace-nowrap">Sorter:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'reports' | 'status')}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">Navn (A-Å)</option>
              <option value="reports">Flest rapporter</option>
              <option value="status">Status</option>
            </select>
          </div>

          {/* View toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Rutenett-visning"
            >
              <GridIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Liste-visning"
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <FilterBar
        categories={categories}
        geographies={geographies}
        minReportOptions={minReportOptions}
        selectedCategory={selectedCategory}
        selectedGeography={selectedGeography}
        selectedMinReports={selectedMinReports}
        onCategoryChange={handleFilterChange(setSelectedCategory)}
        onGeographyChange={handleFilterChange(setSelectedGeography)}
        onMinReportsChange={handleFilterChange(setSelectedMinReports)}
        totalResults={filteredActors.length}
      />

      {/* Results */}
      {filteredActors.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <SearchIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Ingen aktører funnet
          </h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Prøv å justere søket eller filtrene for å se flere resultater.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedGeography('all');
              setSelectedMinReports(0);
            }}
            className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
          >
            Nullstill alle filtre
          </button>
        </div>
      ) : (
        <>
          {/* Actor grid/list */}
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'
              : 'space-y-3'
          }>
            {paginatedActors.map((actor) => (
              <ActorCard
                key={actor.id_master}
                actor={actor}
                showTopics={showTopics}
                compact={viewMode === 'list'}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 px-4 py-3">
              <div className="text-sm text-gray-500">
                Viser {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredActors.length)} av {filteredActors.length} aktører
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Første side"
                >
                  <ChevronsLeftIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Forrige side"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-1 px-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Neste side"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Siste side"
                >
                  <ChevronsRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Icons
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

function GridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function ChevronsLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
    </svg>
  );
}

function ChevronsRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
  );
}
