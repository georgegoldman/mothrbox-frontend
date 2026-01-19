"use client";

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export function UsageChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [period, setPeriod] = useState("Last 7 Days");

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(126, 75, 171, 0.5)"); // Purple
    gradient.addColorStop(1, "rgba(126, 75, 171, 0)");

    // Mock data based on period
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const data = [12, 19, 15, 25, 22, 30, 28];

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Files Uploaded",
            data,
            borderColor: "#9E5ED6",
            backgroundColor: gradient,
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: "#9E5ED6",
            pointBorderColor: "#fff",
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#111",
            titleColor: "#fff",
            bodyColor: "#ccc",
            borderColor: "#333",
            borderWidth: 1,
            padding: 10,
            displayColors: false,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#6b7280", font: { size: 10 } },
          },
          y: {
            grid: { color: "rgba(255, 255, 255, 0.05)" },
            ticks: { color: "#6b7280", font: { size: 10 }, stepSize: 10 },
            beginAtZero: true,
          },
        },
        interaction: {
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
  }, [period]);

  return (
    <Card className="h-full border-purple-500/20 bg-black/40 backdrop-blur-sm overflow-hidden min-w-0">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-white">Data Usage Trends</CardTitle>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-white/10 bg-white/5 text-xs text-gray-400 hover:text-white">
                    {period} <ChevronDown className="ml-2 h-3 w-3" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#111] border-white/10 text-gray-300">
                <DropdownMenuItem onClick={() => setPeriod("Last 7 Days")}>Last 7 Days</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPeriod("Last 30 Days")}>Last 30 Days</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPeriod("This Year")}>This Year</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="relative h-[250px] w-full">
          <canvas ref={chartRef} />
        </div>
        
        {/* Metrics Below Chart */}
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
             <div className="text-center">
                <p className="text-xs text-gray-500">Avg. File Size</p>
                <p className="text-sm font-bold text-white">4.2 MB</p>
             </div>
             <div className="text-center">
                <p className="text-xs text-gray-500">Top Algo</p>
                <span className="inline-flex items-center rounded-full bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-400">
                    AES-256
                </span>
             </div>
             <div className="text-center">
                <p className="text-xs text-gray-500">Peak Day</p>
                <p className="text-sm font-bold text-white">Friday</p>
             </div>
        </div>
      </CardContent>
    </Card>
  );
}
