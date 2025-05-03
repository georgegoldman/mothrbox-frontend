import type { ReactNode } from "react";

interface UsageStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  bgColor?: string;
  iconBgColor?: string;
}

export function UsageStatsCard({
  title,
  value,
  subtitle,
  icon,
  bgColor = "bg-gray-800",
  iconBgColor = "bg-white",
}: UsageStatsCardProps) {
  return (
    <div className={`rounded-xl ${bgColor} p-4 md:p-6`}>
      <div className="mb-4 flex items-center gap-3">
        <div className={`rounded-full ${iconBgColor} p-2`}>{icon}</div>
        <span className="text-sm text-gray-300">{title}</span>
      </div>
      <h2 className="mb-2 text-3xl font-bold md:text-4xl">{value}</h2>
      {subtitle && (
        <div className="flex items-center text-xs text-gray-400">
          <span>{subtitle}</span>
        </div>
      )}
    </div>
  );
}
