import { getAllTopics, getStatistics, getAllCategories } from '@/lib/loadActors';
import TopicCard from '@/components/TopicCard';
import StatCard from '@/components/StatCard';
import Link from 'next/link';

export default function HomePage() {
  const stats = getStatistics();
  const allTopics = getAllTopics();
  const categories = getAllCategories();

  return (
    <div className="space-y-8">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Tredje Boligsektor Aktørkartlegging
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            En omfattende kartlegging av aktører, organisasjoner og initiativer
            innen tredje boligsektor i Norge. Dataene er konsolidert fra 5
            AI-rapporter (Gemini, GPT, Claude, Manus, Perplexity) og gir en
            helhetlig oversikt over landskapet.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/actors"
              className="px-5 py-2.5 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Se alle aktører
            </Link>
            <Link
              href="/topics"
              className="px-5 py-2.5 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-900 transition-colors border border-blue-500"
            >
              Utforsk temaer
            </Link>
          </div>
        </div>
      </section>

      {/* Statistikk */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Oversikt
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Aktører"
            value={stats.totalActors}
            description="Kartlagte aktører"
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Kategorier
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/actors?category=${category.slug}`}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                  {category.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Topp temaer */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Topp 20 temaer
          </h2>
          <Link
            href="/topics"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Se alle temaer →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {allTopics.slice(0, 20).map((topic, index) => (
            <TopicCard key={topic.slug} topic={topic} rank={index + 1} />
          ))}
        </div>
      </section>

      {/* Om kartleggingen */}
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Om kartleggingen
        </h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-4">
            Denne kartleggingen er en del av arbeidet med å etablere en tredje
            boligsektor i Norge. Dataene er samlet inn og konsolidert gjennom en
            systematisk prosess:
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  A
                </span>
                <h3 className="font-semibold text-gray-900">Innsamling</h3>
              </div>
              <p className="text-sm text-gray-600">
                5 AI-rapporter (Gemini, GPT, Claude, Manus, Perplexity) har
                kartlagt aktører innen tredje boligsektor.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  B
                </span>
                <h3 className="font-semibold text-gray-900">Konsolidering</h3>
              </div>
              <p className="text-sm text-gray-600">
                Aktørene er matchet og konsolidert basert på navn og
                tema-overlapp for å fjerne duplikater.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  C
                </span>
                <h3 className="font-semibold text-gray-900">Presentasjon</h3>
              </div>
              <p className="text-sm text-gray-600">
                Dette nettstedet presenterer de konsoliderte dataene med
                filtrering og søk.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
