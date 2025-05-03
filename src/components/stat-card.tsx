import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  bgColor?: string;
}

export function StatCard({
  title,
  value,
  icon,
  bgColor = "bg-gray-800",
}: StatCardProps) {
  return (
    <div className={`rounded-xl ${bgColor} p-4`}>
      <div className="mb-2 flex items-center gap-3">
        {icon}
        <span className="text-xs text-gray-300">{title}</span>
      </div>
      <h2 className="text-2xl font-bold md:text-3xl">{value}</h2>
    </div>
  );
}
