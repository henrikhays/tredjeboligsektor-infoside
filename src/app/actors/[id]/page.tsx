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

export default async function ActorPage({ params }: ActorPageProps) {
  const { id } = await params;
  const actor = getActorById(parseInt(id, 10));

  if (!actor) {
    notFound();
  }

  const categoryColor = categoryColors[actor.kategori] || categoryColors.annet;
  const categoryName = categoryNames[actor.kategori] || actor.kategori;
  const statusColor =
    statusColors[actor.status] || 'bg-gray-50 text-gray-700 border-gray-200';
  const topics = actor.temaer.split(',').map((t) => t.trim()).filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-700">
          Forside
        </Link>
        <svg
          className="w-4 h-4 mx-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <Link href="/actors" className="hover:text-gray-700">
          Aktører
        </Link>
        <svg
          className="w-4 h-4 mx-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="text-gray-900 font-medium truncate max-w-xs">
          {actor.navn}
        </span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColor}`}>
                {categoryName}
              </span>
              <span className={`px-3 py-1 rounded border text-sm font-medium ${statusColor}`}>
                {actor.status}
              </span>
              <span className={`px-3 py-1 rounded text-sm font-medium ${actor.kildetype === 'Primær' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'}`}>
                {actor.kildetype} kilde
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {actor.navn}
            </h1>
            <div className="flex items-center gap-2 text-gray-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{actor.geografi}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
            <span className="font-medium">ID:</span>
            <span className="font-mono">{actor.id_master}</span>
          </div>
        </div>
      </div>

      {/* Innhold */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hovedinnhold */}
        <div className="lg:col-span-2 space-y-6">
          {/* Rolle */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Rolle og beskrivelse
            </h2>
            <p className="text-gray-700 leading-relaxed">{actor.rolle_kort}</p>
          </section>

          {/* Relevans for TBS */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Relevans for Tredje Boligsektor
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {actor.relevans_for_TBS}
            </p>
          </section>

          {/* Kildehenvisninger */}
          {actor.kildehenvisninger_i_rapporter && (
            <section className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Kildehenvisninger i rapporter
              </h2>
              <p className="text-gray-700 leading-relaxed font-mono text-sm bg-gray-50 p-4 rounded">
                {actor.kildehenvisninger_i_rapporter}
              </p>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Temaer */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Temaer</h2>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic, index) => (
                <Link
                  key={index}
                  href={`/topics/${slugify(topic)}`}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors"
                >
                  {topic}
                </Link>
              ))}
            </div>
          </section>

          {/* Rapporter som omtaler */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Rapporter som omtaler
            </h2>
            <div className="space-y-2">
              {actor.rapporter_som_omtaler?.map((rapport, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg"
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-gray-700">{rapport}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Omtalt i {actor.rapporter_som_omtaler?.length || 0} av 5 rapporter
            </p>
          </section>

          {/* Metadata */}
          <section className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Metadata
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Kategori</dt>
                <dd className="text-gray-900 font-medium">{categoryName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Status</dt>
                <dd className="text-gray-900 font-medium">{actor.status}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Kildetype</dt>
                <dd className="text-gray-900 font-medium">{actor.kildetype}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Geografi</dt>
                <dd className="text-gray-900 font-medium">{actor.geografi}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">ID</dt>
                <dd className="text-gray-900 font-mono">{actor.id_master}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>

      {/* Tilbake-knapp */}
      <div className="pt-4">
        <Link
          href="/actors"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Tilbake til alle aktører
        </Link>
      </div>
    </div>
  );
}
