import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllActors, getActorById, slugify } from '@/lib/loadActors';

interface ActorPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generer statiske paths for alle aktører
export async function generateStaticParams() {
  const actors = getAllActors();
  return actors.map((actor) => ({
    id: actor.id_master.toString(),
  }));
}

// Generer metadata for hver aktørside
export async function generateMetadata({ params }: ActorPageProps) {
  const { id } = await params;
  const actor = getActorById(parseInt(id, 10));

  if (!actor) {
    return {
      title: 'Aktør ikke funnet - Tredje Boligsektor',
    };
  }

  return {
    title: `${actor.navn} - Tredje Boligsektor`,
    description: actor.rolle_kort,
  };
}

const categoryConfig: Record<string, { bg: string; text: string; icon: string; gradient: string }> = {
  offentlig_aktor: { bg: 'bg-blue-100', text: 'text-blue-800', icon: '🏛️', gradient: 'from-blue-500 to-blue-600' },
  privat_aktor: { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: '🏢', gradient: 'from-emerald-500 to-emerald-600' },
  forskningsmiljo: { bg: 'bg-purple-100', text: 'text-purple-800', icon: '🔬', gradient: 'from-purple-500 to-purple-600' },
  politikk_lovverk: { bg: 'bg-red-100', text: 'text-red-800', icon: '⚖️', gradient: 'from-red-500 to-red-600' },
  nettverk_organisasjon: { bg: 'bg-amber-100', text: 'text-amber-800', icon: '🤝', gradient: 'from-amber-500 to-amber-600' },
  finansiering_kilde: { bg: 'bg-teal-100', text: 'text-teal-800', icon: '💰', gradient: 'from-teal-500 to-teal-600' },
  teknologi_digitalt_verktoy: { bg: 'bg-cyan-100', text: 'text-cyan-800', icon: '💻', gradient: 'from-cyan-500 to-cyan-600' },
  arrangement_konferanse: { bg: 'bg-orange-100', text: 'text-orange-800', icon: '📅', gradient: 'from-orange-500 to-orange-600' },
  annet: { bg: 'bg-gray-100', text: 'text-gray-800', icon: '📋', gradient: 'from-gray-500 to-gray-600' },
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

const reportIcons: Record<string, string> = {
  Gemini: '🔷',
  GPT: '🟢',
  Claude: '🟠',
  Manus: '🔵',
  Perplexity: '🟣',
};

const reportFiles: Record<string, string> = {
  Gemini: '/reports/gemini-rapport.pdf',
  GPT: '/reports/gpt-rapport.pdf',
  Claude: '/reports/claude-rapport.pdf',
  Manus: '/reports/manus-rapport.pdf',
  Perplexity: '/reports/perplexity-rapport.pdf',
};

export default async function ActorPage({ params }: ActorPageProps) {
  const { id } = await params;
  const actor = getActorById(parseInt(id, 10));

  if (!actor) {
    notFound();
  }

  const category = categoryConfig[actor.kategori] || categoryConfig.annet;
  const categoryName = categoryNames[actor.kategori] || actor.kategori;
  const status = statusConfig[actor.status] || { bg: 'bg-gray-100', text: 'text-gray-800', dot: 'bg-gray-500' };
  const topics = actor.temaer.split(',').map((t) => t.trim()).filter(Boolean);
  const reportCount = actor.rapporter_som_omtaler?.length || 0;

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${category.gradient} rounded-2xl p-6 md:p-8 text-white`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative">
          {/* Category and status badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              <span className="text-lg">{category.icon}</span>
              {categoryName}
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${status.bg} ${status.text}`}>
              <span className={`w-2 h-2 rounded-full ${status.dot}`}></span>
              {actor.status}
            </span>
            <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              actor.kildetype === 'Primær' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-white/20 text-white'
            }`}>
              {actor.kildetype} kilde
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-bold mb-3">
            {actor.navn}
          </h1>

          {/* Geography */}
          <div className="flex items-center gap-2 text-white/90">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-lg">{actor.geografi}</span>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl font-bold">{reportCount}</div>
              <div className="text-sm text-white/80">Rapporter</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{topics.length}</div>
              <div className="text-sm text-white/80">Temaer</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold font-mono">#{actor.id_master}</div>
              <div className="text-sm text-white/80">ID</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Rolle */}
          <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Rolle og beskrivelse
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed text-lg">{actor.rolle_kort}</p>
            </div>
          </section>

          {/* Relevans for TBS */}
          <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Relevans for Tredje Boligsektor
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-700 leading-relaxed">{actor.relevans_for_TBS}</p>
            </div>
          </section>

          {/* Kildehenvisninger */}
          {actor.kildehenvisninger_i_rapporter && (
            <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Kildehenvisninger i rapporter
                </h2>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700 overflow-x-auto">
                  {actor.kildehenvisninger_i_rapporter}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Temaer */}
          <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Temaer
                <span className="ml-auto text-sm font-normal text-gray-500">{topics.length}</span>
              </h2>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap gap-2">
                {topics.map((topic, index) => (
                  <Link
                    key={index}
                    href={`/topics/${slugify(topic)}`}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Rapporter som omtaler */}
          <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Rapporter
                <span className="ml-auto text-sm font-normal text-gray-500">{reportCount} av 5</span>
              </h2>
            </div>
            <div className="p-4 space-y-2">
              {actor.rapporter_som_omtaler?.map((rapport, index) => (
                <a
                  key={index}
                  href={reportFiles[rapport] || '#'}
                  download
                  className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-transparent transition-colors group"
                >
                  <span className="text-xl">{reportIcons[rapport] || '📄'}</span>
                  <span className="text-gray-900 font-medium group-hover:text-blue-700">{rapport}</span>
                  <div className="ml-auto flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </a>
              ))}
              {reportCount === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Ingen rapporter har omtalt denne aktøren.
                </p>
              )}
            </div>
            {reportCount > 0 && (
              <div className="px-4 pb-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    style={{ width: `${(reportCount / 5) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Omtalt i {reportCount} av 5 AI-rapporter
                </p>
              </div>
            )}
          </section>

          {/* Metadata */}
          <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
                Metadata
              </h2>
            </div>
            <div className="p-4">
              <dl className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500">Kategori</dt>
                  <dd className="text-sm text-gray-900 font-medium flex items-center gap-2">
                    <span>{category.icon}</span>
                    {categoryName}
                  </dd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500">Status</dt>
                  <dd className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                    {actor.status}
                  </dd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500">Kildetype</dt>
                  <dd className={`text-sm font-medium ${actor.kildetype === 'Primær' ? 'text-green-700' : 'text-gray-700'}`}>
                    {actor.kildetype}
                  </dd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <dt className="text-sm text-gray-500">Geografi</dt>
                  <dd className="text-sm text-gray-900 font-medium">{actor.geografi}</dd>
                </div>
                <div className="flex justify-between items-center py-2">
                  <dt className="text-sm text-gray-500">ID</dt>
                  <dd className="text-sm text-gray-900 font-mono bg-gray-100 px-2 py-0.5 rounded">{actor.id_master}</dd>
                </div>
              </dl>
            </div>
          </section>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <Link
          href="/actors"
          className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Tilbake til alle aktører
        </Link>
      </div>
    </div>
  );
}
