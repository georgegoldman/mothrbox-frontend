"use client";

import { UsageChart } from "./usage-chart";
import { PerformanceStats } from "./performance-stats";

export function AnalyticsSection() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Left Column: Usage Analytics (Takes up 2/3 on desktop) */}
      <div className="lg:col-span-2">
        <UsageChart />
      </div>

      {/* Right Column: Performance Stats */}
      <div className="lg:col-span-1">
        <PerformanceStats />
      </div>
    </div>
  );
}
