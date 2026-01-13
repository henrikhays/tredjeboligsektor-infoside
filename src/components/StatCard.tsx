import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon?: ReactNode;
  color?: 'blue' | 'purple' | 'emerald' | 'amber' | 'red';
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100',
    iconText: 'text-blue-600',
    valueText: 'text-blue-600',
    border: 'border-blue-100',
  },
  purple: {
    bg: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    iconText: 'text-purple-600',
    valueText: 'text-purple-600',
    border: 'border-purple-100',
  },
  emerald: {
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    iconText: 'text-emerald-600',
    valueText: 'text-emerald-600',
    border: 'border-emerald-100',
  },
  amber: {
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconText: 'text-amber-600',
    valueText: 'text-amber-600',
    border: 'border-amber-100',
  },
  red: {
    bg: 'bg-red-50',
    iconBg: 'bg-red-100',
    iconText: 'text-red-600',
    valueText: 'text-red-600',
    border: 'border-red-100',
  },
};

export default function StatCard({ title, value, description, icon, color = 'blue' }: StatCardProps) {
  const colors = colorClasses[color];

  return (
    <div className={`${colors.bg} rounded-xl border ${colors.border} p-5 transition-all hover:shadow-md`}>
      <div className="flex items-start justify-between mb-3">
        {icon && (
          <div className={`w-10 h-10 ${colors.iconBg} rounded-lg flex items-center justify-center ${colors.iconText}`}>
            {icon}
          </div>
        )}
      </div>
      <div className={`text-3xl font-bold ${colors.valueText} mb-1`}>
        {typeof value === 'number' ? value.toLocaleString('no-NO') : value}
      </div>
      <div className="text-sm font-medium text-gray-900">{title}</div>
      {description && (
        <div className="text-xs text-gray-500 mt-0.5">{description}</div>
      )}
    </div>
  );
}
