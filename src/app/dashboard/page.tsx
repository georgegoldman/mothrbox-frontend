/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import { Header } from "@/components/header";
import { Lock, Unlock, FolderOpen, Copy } from "lucide-react";
import Link from "next/link";
import { UsageStatsCard } from "@/components/usage-stats-card";
import { StatCard } from "@/components/stat-card";
import { AnalyticsChart } from "@/components/analytics-chart";
import { StatsDonutChart } from "@/components/stats-donut-chart";
import { HistoryLog } from "@/components/history-log";
import { useAnalyticsData } from "@/hooks/use-analytics-data";
import { useHistoryData } from "@/hooks/use-history-data";

export default function OverviewPage() {
  const {
    period,
    setPeriod,
    currentData,
    statsData,
    loading: analyticsLoading,
  } = useAnalyticsData();
  const { historyItems, loading: historyLoading } = useHistoryData();

  // Stats data for the donut chart
  const donutData = [
    { label: "Calls Today", value: statsData.callsToday, color: "#ec4899" }, // pink-500
    { label: "Quota Left", value: statsData.quotaLeft, color: "#3b82f6" }, // blue-500
    { label: "Rate Limit", value: statsData.rateLimit, color: "#8b5cf6" }, // purple-500
  ];

  return (
    <div>
      <Header title="Usage Statistics" subtitle="Welcome back Michael" />

      <div className="p-3 sm:p-4 md:p-6">
        {/* Cards with responsive layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {/* Encrypted Files Card */}
          <UsageStatsCard
            title="Encrypted File"
            value="12,000"
            subtitle="+12% Since last month"
            icon={<Lock className="h-5 w-5 text-purple-600" />}
            bgColor="bg-purple-600/20"
          />

          {/* Decrypted Files Card */}
          <UsageStatsCard
            title="Decrypted File"
            value="10,000"
            subtitle="+8% Since last month"
            icon={<Unlock className="h-5 w-5 text-gray-800" />}
          />

          {/* API Key Card - Full width on tablet */}
          <div className="rounded-xl bg-gray-800 p-4 md:col-span-2 md:p-6 lg:col-span-1">
            <h3 className="mb-4 font-medium">Your API Key:</h3>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex-1 overflow-hidden rounded bg-gray-700 px-3 py-2 text-sm">
                <div className="flex items-center gap-x-3">
                  <FolderOpen className="h-4 w-4 flex-shrink-0" />
                  <code className="truncate">env_local</code>
                </div>
              </div>
              <button className="flex-shrink-0 rounded bg-gray-700 p-2 hover:bg-gray-600">
                <Copy className="h-4 w-4" />
              </button>
            </div>
            <p className="mb-4 text-xs text-gray-400">
              Regenerate your key if suspect any compromise
            </p>
            <button className="w-full rounded-md bg-purple-600 py-2 text-sm font-medium transition hover:bg-purple-700">
              Generate new key
            </button>
          </div>
        </div>

        {/* Usage Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-6">
          <StatCard
            title="Calls Today"
            value={statsData.callsToday}
            icon={
              <div className="rounded-full bg-pink-500 p-2">
                <Lock className="h-4 w-4 text-white" />
              </div>
            }
          />

          <StatCard
            title="Quota Left"
            value={statsData.quotaLeft}
            icon={
              <div className="rounded-full bg-blue-500 p-2">
                <Lock className="h-4 w-4 text-white" />
              </div>
            }
          />

          <StatCard
            title="Rate Limit"
            value={`${statsData.rateLimit}/day`}
            icon={
              <div className="rounded-full bg-purple-500 p-2">
                <Lock className="h-4 w-4 text-white" />
              </div>
            }
          />
        </div>

        {/* Analytics and Stats */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {analyticsLoading ? (
              <div className="flex h-64 items-center justify-center rounded-xl bg-gray-800/50">
                <div className="text-center">
                  <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-4 border-gray-600 border-t-purple-600"></div>
                  <p className="text-gray-400">Loading analytics data...</p>
                </div>
              </div>
            ) : (
              <AnalyticsChart
                data={currentData.data}
                labels={currentData.labels}
                period={period}
                onPeriodChange={(newPeriod) => setPeriod(newPeriod as any)}
              />
            )}
          </div>

          <div>
            <StatsDonutChart
              data={donutData}
              period={period}
              onPeriodChange={(newPeriod) => setPeriod(newPeriod as any)}
            />
          </div>
        </div>

        {/* History Section */}
        <div className="mt-8">
          {historyLoading ? (
            <div className="flex h-64 items-center justify-center rounded-xl bg-gray-800">
              <div className="text-center">
                <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-4 border-gray-600 border-t-purple-600"></div>
                <p className="text-gray-400">Loading history data...</p>
              </div>
            </div>
          ) : (
            <HistoryLog items={historyItems.slice(0, 5)} />
          )}

          <div className="mt-4 flex justify-center sm:justify-end">
            <Link
              href="/dashboard/logs"
              className="inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
            >
              View All History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// /* eslint-disable @typescript-eslint/no-unsafe-argument */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { Header } from "@/components/header";
// import { Lock, Unlock, FolderOpen, Copy } from "lucide-react";
// import Link from "next/link";
// import { UsageStatsCard } from "@/components/usage-stats-card";
// import { StatCard } from "@/components/stat-card";
// import { AnalyticsChart } from "@/components/analytics-chart";
// import { StatsDonutChart } from "@/components/stats-donut-chart";
// import { HistoryLog } from "@/components/history-log";
// import { useAnalyticsData } from "@/hooks/use-analytics-data";
// import { useHistoryData } from "@/hooks/use-history-data";

// export default function OverviewPage() {
//   const {
//     period,
//     setPeriod,
//     currentData,
//     statsData,
//     loading: analyticsLoading,
//   } = useAnalyticsData();
//   const { historyItems, loading: historyLoading } = useHistoryData();

//   // Stats data for the donut chart
//   const donutData = [
//     { label: "Calls Today", value: statsData.callsToday, color: "#ec4899" }, // pink-500
//     { label: "Quota Left", value: statsData.quotaLeft, color: "#3b82f6" }, // blue-500
//     { label: "Rate Limit", value: statsData.rateLimit, color: "#8b5cf6" }, // purple-500
//   ];

//   return (
//     <div>
//       <Header title="Usage Statistics" subtitle="Welcome back Michael" />

//       <div className="p-4 md:p-6">
//         {/* Cards with responsive layout */}
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
//           {/* Encrypted Files Card */}
//           <UsageStatsCard
//             title="Encrypted File"
//             value="12,000"
//             subtitle="+12% Since last month"
//             icon={<Lock className="h-5 w-5 text-purple-600" />}
//             bgColor="bg-purple-600/20"
//           />

//           {/* Decrypted Files Card */}
//           <UsageStatsCard
//             title="Decrypted File"
//             value="10,000"
//             subtitle="+8% Since last month"
//             icon={<Unlock className="h-5 w-5 text-gray-800" />}
//           />

//           {/* API Key Card - Full width on tablet */}
//           <div className="rounded-xl bg-gray-800 p-4 md:col-span-2 md:p-6 lg:col-span-1">
//             <h3 className="mb-4 font-medium">Your API Key:</h3>
//             <div className="mb-4 flex items-center gap-2">
//               <div className="flex-1 rounded bg-gray-700 px-3 py-2 text-sm">
//                 <div className="flex items-center gap-x-3">
//                   <FolderOpen className="h-4 w-4 flex-shrink-0" />
//                   <code className="truncate">env_local</code>
//                 </div>
//               </div>
//               <button className="rounded bg-gray-700 p-2 hover:bg-gray-600">
//                 <Copy className="h-4 w-4" />
//               </button>
//             </div>
//             <p className="mb-4 text-xs text-gray-400">
//               Regenerate your key if suspect any compromise
//             </p>
//             <button className="w-full rounded-md bg-purple-600 py-2 text-sm font-medium transition hover:bg-purple-700">
//               Generate new key
//             </button>
//           </div>
//         </div>

//         {/* Usage Stats */}
//         <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-6">
//           <StatCard
//             title="Calls Today"
//             value={statsData.callsToday}
//             icon={
//               <div className="rounded-full bg-pink-500 p-2">
//                 <Lock className="h-4 w-4 text-white" />
//               </div>
//             }
//           />

//           <StatCard
//             title="Quota Left"
//             value={statsData.quotaLeft}
//             icon={
//               <div className="rounded-full bg-blue-500 p-2">
//                 <Lock className="h-4 w-4 text-white" />
//               </div>
//             }
//           />

//           <StatCard
//             title="Rate Limit"
//             value={`${statsData.rateLimit}/day`}
//             icon={
//               <div className="rounded-full bg-purple-500 p-2">
//                 <Lock className="h-4 w-4 text-white" />
//               </div>
//             }
//           />
//         </div>

//         {/* Analytics and Stats */}
//         <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
//           <div className="lg:col-span-2">
//             {analyticsLoading ? (
//               <div className="flex h-64 items-center justify-center rounded-xl bg-gray-800/50">
//                 <div className="text-center">
//                   <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-4 border-gray-600 border-t-purple-600"></div>
//                   <p className="text-gray-400">Loading analytics data...</p>
//                 </div>
//               </div>
//             ) : (
//               <AnalyticsChart
//                 data={currentData.data}
//                 labels={currentData.labels}
//                 period={period}
//                 onPeriodChange={(newPeriod) => setPeriod(newPeriod as any)}
//               />
//             )}
//           </div>

//           <div>
//             <StatsDonutChart
//               data={donutData}
//               period={period}
//               onPeriodChange={(newPeriod) => setPeriod(newPeriod as any)}
//             />
//           </div>
//         </div>

//         {/* History Section */}
//         <div className="mt-8">
//           {historyLoading ? (
//             <div className="flex h-64 items-center justify-center rounded-xl bg-gray-800">
//               <div className="text-center">
//                 <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-4 border-gray-600 border-t-purple-600"></div>
//                 <p className="text-gray-400">Loading history data...</p>
//               </div>
//             </div>
//           ) : (
//             <HistoryLog items={historyItems.slice(0, 5)} />
//           )}

//           <div className="mt-4 flex justify-end">
//             <Link
//               href="/dashboard/logs"
//               className="inline-flex items-center rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
//             >
//               View All History
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
