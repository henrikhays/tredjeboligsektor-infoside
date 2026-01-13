import Link from 'next/link';
import { Topic } from '@/lib/types';

interface TopicCardProps {
  topic: Topic;
  rank?: number;
  showRank?: boolean;
}

export default function TopicCard({ topic, rank, showRank = true }: TopicCardProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-amber-400 text-amber-900';
    if (rank === 2) return 'bg-gray-300 text-gray-700';
    if (rank === 3) return 'bg-amber-600 text-amber-100';
    if (rank <= 10) return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-600';
  };

  const getBarWidth = (count: number) => {
    // Assuming max is around 50 for visualization
    const percentage = Math.min((count / 50) * 100, 100);
    return `${percentage}%`;
  };

  return (
    <Link href={`/topics/${topic.slug}`}>
      <article className="group bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200">
        <div className="flex items-center gap-3">
          {/* Rank badge */}
          {showRank && rank && (
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${getRankColor(rank)}`}>
              {rank}
            </div>
          )}
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                {topic.name}
              </h3>
              <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                {topic.count} {topic.count === 1 ? 'aktør' : 'aktører'}
              </span>
            </div>
            
            {/* Progress bar */}
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 group-hover:from-blue-600 group-hover:to-blue-700"
                style={{ width: getBarWidth(topic.count) }}
              />
            </div>
          </div>
          
          {/* Arrow */}
          <svg 
            className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </article>
    </Link>
  );
}
