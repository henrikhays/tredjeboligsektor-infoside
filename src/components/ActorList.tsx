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
}

export default function ActorList({
  actors,
  categories,
  geographies,
  showTopics = true,
}: ActorListProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGeography, setSelectedGeography] = useState('all');
  const [selectedMinReports, setSelectedMinReports] = useState(0);

  // Beregn minimum rapport-alternativer
  const minReportOptions = useMemo(() => {
    const counts = new Set<number>();
    actors.forEach((actor) => {
      counts.add(actor.rapporter_som_omtaler?.length || 0);
    });
    return Array.from(counts).sort((a, b) => a - b);
  }, [actors]);

  // Filtrer aktører
  const filteredActors = useMemo(() => {
    return actors.filter((actor) => {
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
  }, [actors, selectedCategory, selectedGeography, selectedMinReports]);

  return (
    <div>
      <FilterBar
        categories={categories}
        geographies={geographies}
        minReportOptions={minReportOptions}
        selectedCategory={selectedCategory}
        selectedGeography={selectedGeography}
        selectedMinReports={selectedMinReports}
        onCategoryChange={setSelectedCategory}
        onGeographyChange={setSelectedGeography}
        onMinReportsChange={setSelectedMinReports}
        totalResults={filteredActors.length}
      />

      {filteredActors.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Ingen aktører funnet
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Prøv å justere filtrene for å se flere resultater.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredActors.map((actor) => (
            <ActorCard
              key={actor.id_master}
              actor={actor}
              showTopics={showTopics}
            />
          ))}
        </div>
      )}
    </div>
  );
}
