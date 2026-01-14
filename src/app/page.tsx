import { getAllTopics, getStatistics, getAllCategories } from '@/lib/loadActors';
import TopicCard from '@/components/TopicCard';
import StatCard from '@/components/StatCard';
import Link from 'next/link';

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

const categoryColors: Record<string, string> = {
  offentlig_aktor: 'from-blue-500 to-blue-600',
  privat_aktor: 'from-emerald-500 to-emerald-600',
  forskningsmiljo: 'from-purple-500 to-purple-600',
  politikk_lovverk: 'from-red-500 to-red-600',
  nettverk_organisasjon: 'from-amber-500 to-amber-600',
  finansiering_kilde: 'from-teal-500 to-teal-600',
  teknologi_digitalt_verktoy: 'from-cyan-500 to-cyan-600',
  arrangement_konferanse: 'from-orange-500 to-orange-600',
  annet: 'from-gray-500 to-gray-600',
};

export default function HomePage() {
  const stats = getStatistics();
  const allTopics = getAllTopics();
  const categories = getAllCategories();

  return (
    <div className="space-y-10">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-2xl p-8 md:p-12 text-white">
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
        
        <div className="relative max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Oppdatert januar 2026
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Tredje Boligsektor
            <span className="block text-blue-200">Aktørkartlegging</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
            En omfattende kartlegging av aktører, organisasjoner og initiativer
            innen tredje boligsektor i Norge. Dataene er konsolidert fra 5
            AI-rapporter og gir en helhetlig oversikt over landskapet.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/actors"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
            >
              <UsersIcon className="w-5 h-5" />
              Se alle aktører
            </Link>
            <Link
              href="/topics"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/30 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-blue-500/40 transition-all border border-white/20"
            >
              <TagIcon className="w-5 h-5" />
              Utforsk temaer
            </Link>
          </div>
        </div>
      </section>

      {/* Statistikk */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <ChartIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Oversikt</h2>
            <p className="text-sm text-gray-500">Nøkkeltall fra kartleggingen</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Aktører"
            value={stats.totalActors}
            description="Kartlagte aktører"
            color="blue"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
          />
          <StatCard
            title="Temaer"
            value={stats.totalTopics}
            description="Unike temaer"
            color="purple"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            }
          />
          <StatCard
            title="Kategorier"
            value={stats.totalCategories}
            description="Aktørkategorier"
            color="emerald"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          />
          <StatCard
            title="Geografier"
            value={stats.totalGeographies}
            description="Geografiske områder"
            color="amber"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>
      </section>

      {/* Kategorier */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <BuildingIcon className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Kategorier</h2>
              <p className="text-sm text-gray-500">Utforsk aktører etter type</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/actors?category=${category.slug}`}
              className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-transparent transition-all duration-300 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[category.slug] || 'from-gray-500 to-gray-600'} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
              
              <div className="relative flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[category.slug] || 'from-gray-500 to-gray-600'} flex items-center justify-center text-2xl shadow-sm`}>
                  {categoryIcons[category.slug] || '📋'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.count} {category.count === 1 ? 'aktør' : 'aktører'}
                  </p>
                </div>
                <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Topp temaer */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <TagIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Populære temaer</h2>
              <p className="text-sm text-gray-500">Topp 20 temaer etter antall aktører</p>
            </div>
          </div>
          <Link
            href="/topics"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Se alle {stats.totalTopics} temaer
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {allTopics.slice(0, 20).map((topic, index) => (
            <TopicCard key={topic.slug} topic={topic} rank={index + 1} />
          ))}
        </div>
      </section>

      {/* Om kartleggingen */}
      <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <InfoIcon className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Om kartleggingen</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            Denne kartleggingen er en del av arbeidet med å etablere en tredje
            boligsektor i Norge. Dataene er samlet inn og konsolidert gjennom en
            systematisk prosess med flere AI-rapporter.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="p-6 md:p-8 group hover:bg-blue-50/50 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-sm">
                A
              </span>
              <h3 className="font-semibold text-gray-900">Innsamling</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              5 AI-rapporter har kartlagt aktører innen tredje boligsektor basert på ulike kilder og perspektiver.
            </p>
            <div className="flex flex-wrap gap-1">
              <a href="/reports/gemini-rapport.pdf" download className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors">
                🔷 Gemini
              </a>
              <a href="/reports/gpt-rapport.pdf" download className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors">
                🟢 GPT
              </a>
              <a href="/reports/claude-rapport.pdf" download className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors">
                🟠 Claude
              </a>
              <a href="/reports/manus-rapport.pdf" download className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors">
                🔵 Manus
              </a>
              <a href="/reports/perplexity-rapport.pdf" download className="inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors">
                🟣 Perplexity
              </a>
            </div>
          </div>
          <div className="p-6 md:p-8 group hover:bg-blue-50/50 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-sm">
                B
              </span>
              <h3 className="font-semibold text-gray-900">Konsolidering</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Aktørene er matchet og konsolidert basert på navn og
              tema-overlapp for å fjerne duplikater og skape en enhetlig database.
            </p>
          </div>
          <div className="p-6 md:p-8 group hover:bg-blue-50/50 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center text-lg font-bold shadow-sm">
                C
              </span>
              <h3 className="font-semibold text-gray-900">Presentasjon</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Dette nettstedet presenterer de konsoliderte dataene med
              avansert filtrering, søk og navigasjon for enkel utforskning.
            </p>
          </div>
        </div>
      </section>

      {/* Last ned rapporter */}
      <section className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 md:px-8 md:py-5 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <DownloadIcon className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Last ned rapporter</h2>
              <p className="text-sm text-gray-500">De 5 AI-rapportene som ligger til grunn for kartleggingen</p>
            </div>
          </div>
        </div>
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <ReportDownloadCard
              name="Gemini"
              icon="🔷"
              filename="gemini-rapport.pdf"
              description="Deep Research"
            />
            <ReportDownloadCard
              name="GPT"
              icon="🟢"
              filename="gpt-rapport.pdf"
              description="GPT-5.2 Report"
            />
            <ReportDownloadCard
              name="Claude"
              icon="🟠"
              filename="claude-rapport.pdf"
              description="Komplett kartlegging"
            />
            <ReportDownloadCard
              name="Manus"
              icon="🔵"
              filename="manus-rapport.pdf"
              description="Tredje Boligsektor"
            />
            <ReportDownloadCard
              name="Perplexity"
              icon="🟣"
              filename="perplexity-rapport.pdf"
              description="Aktørkartlegging"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ReportDownloadCard({ name, icon, filename, description }: { name: string; icon: string; filename: string; description: string }) {
  return (
    <a
      href={`/reports/${filename}`}
      download
      className="group flex flex-col items-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
    >
      <span className="text-3xl mb-2">{icon}</span>
      <span className="font-semibold text-gray-900 group-hover:text-indigo-700">{name}</span>
      <span className="text-xs text-gray-500 text-center mt-1">{description}</span>
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-indigo-600 group-hover:text-indigo-800">
        <DownloadIcon className="w-3 h-3" />
        Last ned PDF
      </span>
    </a>
  );
}

// Icons
function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}
function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
