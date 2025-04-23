// app/analytics/AnalyticsChart.tsx
'use client';

import { BarChart, Title } from '@tremor/react';

export default function AnalyticsChart({ data, total }: { 
  data: { day: string; calls: number }[], 
  total: number 
}) {
  return (
    <>
      <div className="h-64">
        <BarChart
          data={data}
          index="day"
          categories={['calls']}
          colors={['blue']}
          valueFormatter={(value) => value.toString()}
          showYAxis={false}
          showLegend={false}
          layout="vertical"
        />
      </div>
      <div className="flex justify-between mt-4 text-sm text-gray-500">
        {data.map((item) => (
          <span key={item.day}>{item.day}</span>
        ))}
      </div>
      <div className="mt-2 text-sm text-gray-700">
        Total: {total}
      </div>
    </>
  );
}