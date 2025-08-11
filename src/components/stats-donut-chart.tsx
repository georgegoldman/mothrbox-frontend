"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ChevronDown } from "lucide-react";

interface StatsDonutChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
  period: string;
  onPeriodChange: (period: string) => void;
}

export function StatsDonutChart({
  data,
  period,
  onPeriodChange,
}: StatsDonutChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: data.map((item) => item.label),
        datasets: [
          {
            data: data.map((item) => item.value),
            backgroundColor: data.map((item) => item.color),
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "75%",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#1f2937",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#374151",
            borderWidth: 1,
            padding: 10,
            displayColors: true,
            callbacks: {
              label: (context) => `${context.label}: ${context.parsed}`,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="rounded-xl bg-gray-800 p-4 md:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-bold">Stats</h2>
        <div className="relative">
          <select
            value={period}
            onChange={(e) => onPeriodChange(e.target.value)}
            className="appearance-none rounded bg-gray-700 px-3 py-1 pr-8 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            <option value="day">Today</option>
            <option value="week">This week</option>
            <option value="month">This month</option>
            <option value="year">This year</option>
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        </div>
      </div>

      <div className="relative mb-6 flex h-40 items-center justify-center sm:h-48">
        <canvas ref={chartRef} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs text-gray-400">Total:</p>
            <p className="text-xl font-bold sm:text-2xl">{total}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span>{item.label}</span>
            </div>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
