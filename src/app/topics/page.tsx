import { getAllTopics } from '@/lib/loadActors';
import TopicCard from '@/components/TopicCard';

export const metadata = {
  title: 'Alle temaer - Tredje Boligsektor',
  description: 'Oversikt over alle temaer i Tredje Boligsektor-kartleggingen.',
};

export default function TopicsPage() {
  const topics = getAllTopics();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Alle temaer</h1>
          <p className="mt-1 text-gray-600">
            {topics.length} unike temaer sortert etter antall aktører
          </p>
        </div>
      </div>

      {/* Tema-liste */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {topics.map((topic, index) => (
          <TopicCard key={topic.slug} topic={topic} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}
