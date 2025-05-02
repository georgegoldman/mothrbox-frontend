/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";

import { useState, useEffect } from "react";

// Types for our analytics data
export interface AnalyticsData {
  daily: {
    labels: string[];
    data: number[];
    total: number;
  };
  weekly: {
    labels: string[];
    data: number[];
    total: number;
  };
  monthly: {
    labels: string[];
    data: number[];
    total: number;
  };
  yearly: {
    labels: string[];
    data: number[];
    total: number;
  };
}

// Types for our stats data
export interface StatsData {
  callsToday: number;
  quotaLeft: number;
  rateLimit: number;
  total: number;
}

// Mock data generator
const generateMockData = (): AnalyticsData => {
  // Generate daily data (24 hours)
  const dailyLabels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const dailyData = Array.from(
    { length: 24 },
    () => Math.floor(Math.random() * 40) + 10,
  );
  const dailyTotal = dailyData.reduce((sum, val) => sum + val, 0);

  // Generate weekly data (7 days)
  const weeklyLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyData = Array.from(
    { length: 7 },
    () => Math.floor(Math.random() * 100) + 50,
  );
  const weeklyTotal = weeklyData.reduce((sum, val) => sum + val, 0);

  // Generate monthly data (30 days)
  const monthlyLabels = Array.from({ length: 30 }, (_, i) => `${i + 1}`);
  const monthlyData = Array.from(
    { length: 30 },
    () => Math.floor(Math.random() * 80) + 20,
  );
  const monthlyTotal = monthlyData.reduce((sum, val) => sum + val, 0);

  // Generate yearly data (12 months)
  const yearlyLabels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const yearlyData = Array.from(
    { length: 12 },
    () => Math.floor(Math.random() * 1000) + 200,
  );
  const yearlyTotal = yearlyData.reduce((sum, val) => sum + val, 0);

  return {
    daily: { labels: dailyLabels, data: dailyData, total: dailyTotal },
    weekly: { labels: weeklyLabels, data: weeklyData, total: weeklyTotal },
    monthly: { labels: monthlyLabels, data: monthlyData, total: monthlyTotal },
    yearly: { labels: yearlyLabels, data: yearlyData, total: yearlyTotal },
  };
};

export function useAnalyticsData() {
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">(
    "week",
  );
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Stats data
  const [statsData, setStatsData] = useState<StatsData>({
    callsToday: 150,
    quotaLeft: 850,
    rateLimit: 1000,
    total: 356,
  });

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchData = async () => {
      try {
        setLoading(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Generate mock data
        const data = generateMockData();
        setAnalyticsData(data);

        // Update stats based on the data
        setStatsData({
          callsToday: 150,
          quotaLeft: 850,
          rateLimit: 1000,
          total:
            period === "day"
              ? data.daily.total
              : period === "week"
                ? data.weekly.total
                : period === "month"
                  ? data.monthly.total
                  : data.yearly.total,
        });

        setError(null);
      } catch (err) {
        setError("Failed to load analytics data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

  // Get current data based on selected period
  const getCurrentData = () => {
    if (!analyticsData) return { labels: [], data: [], total: 0 };

    switch (period) {
      case "day":
        return analyticsData.daily;
      case "week":
        return analyticsData.weekly;
      case "month":
        return analyticsData.monthly;
      case "year":
        return analyticsData.yearly;
      default:
        return analyticsData.weekly;
    }
  };

  return {
    period,
    setPeriod,
    currentData: getCurrentData(),
    statsData,
    loading,
    error,
  };
}
