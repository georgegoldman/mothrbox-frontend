"use client";

import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto"; // ✅ auto-registers all chart types, elements, scales

export default function CardLineChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "Monthly Revenue",
            data: [10, 20, 15, 30, 25],
            borderColor: "#00f",
            backgroundColor: "rgba(0, 0, 255, 0.2)",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { type: "category" },
          y: { beginAtZero: true },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return <canvas ref={chartRef}></canvas>;
}
