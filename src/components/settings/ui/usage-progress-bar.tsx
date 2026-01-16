"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface UsageProgressBarProps {
  value: number;
  max: number;
  label?: string;
  subLabel?: string;
  className?: string;
}

export function UsageProgressBar({ value, max, label, subLabel, className }: UsageProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Animate on mount
    const timer = setTimeout(() => setWidth(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const getColor = () => {
    if (percentage > 90) return "bg-red-500";
    if (percentage > 70) return "bg-yellow-500";
    return "bg-[#7E4BAB]"; // Default purple
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm">
        <span className="text-white font-medium">{label}</span>
        <span className="text-gray-400">{percentage.toFixed(0)}%</span>
      </div>
      <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-1000 ease-out rounded-full", getColor())}
          style={{ width: `${width}%` }}
        />
      </div>
      {subLabel && <p className="text-xs text-gray-500">{subLabel}</p>}
    </div>
  );
}
