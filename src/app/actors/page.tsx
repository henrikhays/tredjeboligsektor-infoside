import { getAllActors, getFilterOptions } from '@/lib/loadActors';
import ActorList from '@/components/ActorList';

export const metadata = {
  title: 'Alle aktører - Tredje Boligsektor',
  description: 'Oversikt over alle aktører i Tredje Boligsektor-kartleggingen.',
};

export default function ActorsPage() {
  const actors = getAllActors();
  const filterOptions = getFilterOptions(actors);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Alle aktører</h1>
        <p className="mt-1 text-gray-600">
          {actors.length} aktører kartlagt fra 5 AI-rapporter
        </p>
      </div>

      {/* Aktør-liste med filtrering */}
      <ActorList
        actors={actors}
        categories={filterOptions.categories}
        geographies={filterOptions.geographies}
      />
    </div>
  );
}
