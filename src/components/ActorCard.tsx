import Link from 'next/link';
import { Actor } from '@/lib/types';

interface ActorCardProps {
  actor: Actor;
  showTopics?: boolean;
}

const categoryColors: Record<string, string> = {
  offentlig_aktor: 'bg-blue-100 text-blue-800',
  privat_aktor: 'bg-green-100 text-green-800',
  forskningsmiljo: 'bg-purple-100 text-purple-800',
  politikk_lovverk: 'bg-red-100 text-red-800',
  nettverk_organisasjon: 'bg-yellow-100 text-yellow-800',
  finansiering_kilde: 'bg-emerald-100 text-emerald-800',
  teknologi_digitalt_verktoy: 'bg-cyan-100 text-cyan-800',
  arrangement_konferanse: 'bg-orange-100 text-orange-800',
  annet: 'bg-gray-100 text-gray-800',
};

const categoryNames: Record<string, string> = {
  offentlig_aktor: 'Offentlig aktør',
  privat_aktor: 'Privat aktør',
  forskningsmiljo: 'Forskningsmiljø',
  politikk_lovverk: 'Politikk og lovverk',
  nettverk_organisasjon: 'Nettverk og organisasjon',
  finansiering_kilde: 'Finansieringskilde',
  teknologi_digitalt_verktoy: 'Teknologi og digitalt verktøy',
  arrangement_konferanse: 'Arrangement og konferanse',
  annet: 'Annet',
};

const statusColors: Record<string, string> = {
  Aktiv: 'bg-green-50 text-green-700 border-green-200',
  'Under utvikling': 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Gjennomført: 'bg-blue-50 text-blue-700 border-blue-200',
  Publisert: 'bg-purple-50 text-purple-700 border-purple-200',
  Skrinlagt: 'bg-red-50 text-red-700 border-red-200',
};

export default function ActorCard({ actor, showTopics = true }: ActorCardProps) {
  const categoryColor = categoryColors[actor.kategori] || categoryColors.annet;
  const categoryName = categoryNames[actor.kategori] || actor.kategori;
  const statusColor = statusColors[actor.status] || 'bg-gray-50 text-gray-700 border-gray-200';

  const topics = actor.temaer.split(',').map((t) => t.trim()).filter(Boolean);
  const reportCount = actor.rapporter_som_omtaler?.length || 0;

  return (
    <Link href={`/actors/${actor.id_master}`}>
      <article className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all duration-200 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-gray-900 text-base leading-tight line-clamp-2">
            {actor.navn}
          </h3>
          <span className={`px-2 py-1 text-xs font-medium rounded border ${statusColor} whitespace-nowrap`}>
            {actor.status}
          </span>
        </div>

        {/* Kategori og geografi */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2 py-1 text-xs font-medium rounded ${categoryColor}`}>
            {categoryName}
          </span>
          <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">
            📍 {actor.geografi}
          </span>
        </div>

        {/* Rolle */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
          {actor.rolle_kort}
        </p>

        {/* Temaer */}
        {showTopics && topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {topics.slice(0, 4).map((topic, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs bg-blue-50 text-blue-600 rounded"
              >
                {topic}
              </span>
            ))}
            {topics.length > 4 && (
              <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">
                +{topics.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span className={`px-1.5 py-0.5 rounded ${actor.kildetype === 'Primær' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'}`}>
              {actor.kildetype}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{reportCount} {reportCount === 1 ? 'rapport' : 'rapporter'}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
