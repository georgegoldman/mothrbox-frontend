/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { HistoryLog } from "@/components/history-log";
import { useHistoryData } from "@/hooks/use-history-data";
import { Calendar, Download, Share2 } from "lucide-react";

export default function LogsPage() {
  const { historyItems, loading } = useHistoryData();
  const [dateRange, setDateRange] = useState<
    "today" | "week" | "month" | "custom"
  >("week");

  return (
    <div>
      <Header
        title="Logs & Usage"
        subtitle="View your encryption and decryption history"
      />

      <div className="p-4 md:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold sm:text-2xl">Activity History</h1>
            <p className="text-sm text-gray-400">
              Track all your encryption and decryption activities
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="relative w-full sm:w-auto">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="w-full appearance-none rounded-md bg-gray-800 py-2 pr-4 pl-9 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none sm:w-auto"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="custom">Custom Range</option>
              </select>
              <Calendar className="pointer-events-none absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            </div>

            <div className="flex w-full gap-2 sm:w-auto">
              <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-sm font-medium hover:bg-gray-700 sm:flex-none">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>

              <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-sm font-medium hover:bg-gray-700 sm:flex-none">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center rounded-xl bg-gray-800">
            <div className="text-center">
              <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-4 border-gray-600 border-t-purple-600"></div>
              <p className="text-gray-400">Loading history data...</p>
            </div>
          </div>
        ) : (
          <HistoryLog items={historyItems} showFilters={true} />
        )}
      </div>
    </div>
  );
}
