import { ReactNode } from 'react';

interface StatCardProps {
  icon?: ReactNode;
  value: string | number;
  label: string;
  description?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export default function StatCard({ icon, value, label, description, trend }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200/60 bg-white p-6 shadow-sm">
      {icon && (
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#c41e3a]/10 text-[#c41e3a]">
          {icon}
        </div>
      )}
      
      <div className="space-y-1">
        <p className="text-2xl font-bold font-display text-slate-900">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        <p className="text-sm font-medium text-slate-600">
          {label}
        </p>
        {description && (
          <p className="text-xs text-slate-500">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center gap-1 pt-2">
            <span className={`text-xs font-medium ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend.isPositive ? '↗' : '↘'} {trend.value}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}