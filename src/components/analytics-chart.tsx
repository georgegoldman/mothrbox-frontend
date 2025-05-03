/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AnalyticsChartProps {
  data: number[];
  labels: string[];
  period: string;
  onPeriodChange: (period: string) => void;
}

export function AnalyticsChart({
  data,
  labels,
  period,
  onPeriodChange,
}: AnalyticsChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Create gradient for chart area
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(124, 58, 237, 0.5)");
    gradient.addColorStop(1, "rgba(124, 58, 237, 0)");

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "API Calls",
            data,
            borderColor: "#8b5cf6",
            backgroundColor: gradient,
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: "#8b5cf6",
            pointBorderColor: "#8b5cf6",
            pointRadius: 0,
            pointHoverRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
            displayColors: false,
            callbacks: {
              label: (context) => `${context.parsed.y} calls`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#9ca3af",
              font: {
                size: 10,
              },
            },
          },
          y: {
            grid: {
              color: "rgba(75, 85, 99, 0.2)",
            },
            ticks: {
              color: "#9ca3af",
              font: {
                size: 10,
              },
              stepSize: 40,
            },
            min: 0,
          },
        },
        interaction: {
          mode: "nearest",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: false,
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, labels]);

  return (
    <div className="rounded-xl bg-gray-800/50 p-4 md:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">Analytics</h2>
          <p className="text-sm text-gray-400">
            Calls Today:{" "}
            <span className="font-medium text-white">
              {data[data.length - 1]}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            className="rounded p-1 transition-colors hover:bg-gray-700"
            aria-label="Previous period"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
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
            <ChevronRight className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          </div>
          <button
            className="rounded p-1 transition-colors hover:bg-gray-700"
            aria-label="Next period"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="relative h-48 sm:h-64 md:h-80">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}
