import Link from 'next/link';
import { Actor } from '@/lib/types';

interface ActorCardProps {
  actor: Actor;
  showTopics?: boolean;
  compact?: boolean;
}

const categoryConfig: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  offentlig_aktor: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', icon: '🏛️' },
  privat_aktor: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: '🏢' },
  forskningsmiljo: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', icon: '🔬' },
  politikk_lovverk: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: '⚖️' },
  nettverk_organisasjon: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: '🤝' },
  finansiering_kilde: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', icon: '💰' },
  teknologi_digitalt_verktoy: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200', icon: '💻' },
  arrangement_konferanse: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', icon: '📅' },
  annet: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', icon: '📋' },
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

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  Aktiv: { bg: 'bg-green-100', text: 'text-green-800', dot: 'bg-green-500' },
  'Under utvikling': { bg: 'bg-yellow-100', text: 'text-yellow-800', dot: 'bg-yellow-500' },
  Gjennomført: { bg: 'bg-blue-100', text: 'text-blue-800', dot: 'bg-blue-500' },
  Publisert: { bg: 'bg-purple-100', text: 'text-purple-800', dot: 'bg-purple-500' },
  Skrinlagt: { bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500' },
  Foreslått: { bg: 'bg-indigo-100', text: 'text-indigo-800', dot: 'bg-indigo-500' },
  'Under behandling': { bg: 'bg-orange-100', text: 'text-orange-800', dot: 'bg-orange-500' },
  'Vedtatt (i kraft)': { bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500' },
};

export default function ActorCard({ actor, showTopics = true, compact = false }: ActorCardProps) {
  const category = categoryConfig[actor.kategori] || categoryConfig.annet;
  const categoryName = categoryNames[actor.kategori] || actor.kategori;
  const status = statusConfig[actor.status] || { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-500' };

  const topics = actor.temaer.split(',').map((t) => t.trim()).filter(Boolean);
  const reportCount = actor.rapporter_som_omtaler?.length || 0;

  if (compact) {
    return (
      <Link href={`/actors/${actor.id_master}`}>
        <article className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200 group">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-lg ${category.bg} ${category.border} border flex items-center justify-center flex-shrink-0`}>
              <span className="text-lg">{category.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                {actor.navn}
              </h3>
              <p className="text-sm text-gray-500 truncate">{actor.geografi}</p>
            </div>
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
              {actor.status}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/actors/${actor.id_master}`}>
      <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 h-full flex flex-col group">
        {/* Category header bar */}
        <div className={`px-4 py-2 ${category.bg} border-b ${category.border} flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <span className="text-base">{category.icon}</span>
            <span className={`text-xs font-medium ${category.text}`}>{categoryName}</span>
          </div>
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot} animate-pulse`}></span>
            {actor.status}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {actor.navn}
          </h3>

          {/* Geography */}
          <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{actor.geografi}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow leading-relaxed">
            {actor.rolle_kort}
          </p>

          {/* Topics */}
          {showTopics && topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {topics.slice(0, 3).map((topic, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 text-xs bg-blue-50 text-blue-700 rounded-full font-medium"
                >
                  {topic}
                </span>
              ))}
              {topics.length > 3 && (
                <span className="px-2.5 py-1 text-xs bg-gray-100 text-gray-600 rounded-full font-medium">
                  +{topics.length - 3} til
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                actor.kildetype === 'Primær' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {actor.kildetype}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium">{reportCount}</span>
              <span className="text-gray-400">{reportCount === 1 ? 'rapport' : 'rapporter'}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
