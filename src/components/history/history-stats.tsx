"use client";

import type { HistoryRecord } from "./types";
import { formatBytes } from "@/lib/utils";

interface HistoryStatsProps {
  records: HistoryRecord[];
}

export function HistoryStats({ records }: HistoryStatsProps) {
  const totalCost = records.reduce((sum, record) => sum + record.cost, 0);
  const totalSize = records.reduce((sum, record) => sum + record.size, 0);

  return (
    <div className="flex items-center gap-4 text-xs text-gray-400 bg-gray-900/40 px-4 py-2 rounded-lg border border-white/5 w-fit mb-6">
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
        <span>Showing <span className="text-white font-medium">{records.length}</span> results</span>
      </div>
      <div className="w-px h-3 bg-gray-700" />
      <div className="flex items-center gap-1.5">
        <span>Total Cost: <span className="text-white font-medium">{totalCost.toFixed(4)} SUI</span></span>
      </div>
      <div className="w-px h-3 bg-gray-700" />
      <div className="flex items-center gap-1.5">
        <span>Total Size: <span className="text-white font-medium">{formatBytes(totalSize)}</span></span>
      </div>
    </div>
  );
}
