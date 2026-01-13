import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllTopics,
  getActorsByTopic,
  findTopicBySlug,
  getFilterOptions,
} from '@/lib/loadActors';
import ActorList from '@/components/ActorList';

interface TopicPageProps {
  params: Promise<{
    topic: string;
  }>;
}

// Generer statiske paths for alle temaer
export async function generateStaticParams() {
  const topics = getAllTopics();
  return topics.map((topic) => ({
    topic: topic.slug,
  }));
}

// Generer metadata for hver temaside
export async function generateMetadata({ params }: TopicPageProps) {
  const { topic: topicSlug } = await params;
  const topic = findTopicBySlug(topicSlug);

  if (!topic) {
    return {
      title: 'Tema ikke funnet - Tredje Boligsektor',
    };
  }

  return {
    title: `${topic.name} - Tredje Boligsektor`,
    description: `Aktører innen temaet "${topic.name}" i Tredje Boligsektor-kartleggingen.`,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { topic: topicSlug } = await params;
  const topic = findTopicBySlug(topicSlug);

  if (!topic) {
    notFound();
  }

  // Finn aktører med dette temaet
  const actors = getActorsByTopic(topic.name.toLowerCase());
  const filterOptions = getFilterOptions(actors);

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
        <Link href="/topics" className="hover:text-gray-700">
          Temaer
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
        <span className="text-gray-900 font-medium">{topic.name}</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Tema
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{topic.name}</h1>
            <p className="mt-2 text-gray-600">
              {actors.length} {actors.length === 1 ? 'aktør' : 'aktører'} er
              knyttet til dette temaet
            </p>
          </div>
        </div>
      </div>

      {/* Aktør-liste med filtrering */}
      <ActorList
        actors={actors}
        categories={filterOptions.categories}
        geographies={filterOptions.geographies}
        showTopics={false}
      />
    </div>
  );
}
