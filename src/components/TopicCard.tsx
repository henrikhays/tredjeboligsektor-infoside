import Link from 'next/link';
import { Topic } from '@/lib/types';

interface TopicCardProps {
  topic: Topic;
  rank?: number;
}

export default function TopicCard({ topic, rank }: TopicCardProps) {
  return (
    <Link href={`/topics/${topic.slug}`}>
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-blue-300 transition-all duration-200 group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {rank && (
              <span className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
                {rank}
              </span>
            )}
            <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              {topic.name}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
              {topic.count} {topic.count === 1 ? 'aktør' : 'aktører'}
            </span>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors"
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
          </div>
        </div>
      </div>
    </Link>
  );
}
