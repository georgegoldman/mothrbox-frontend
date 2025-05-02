import { Header } from "@/components/header";
import { StatusBadge } from "@/components/status-badge";
import type { StatusType } from "@/lib/types";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  File,
  Lock,
  Unlock,
  ChevronDown,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";

export default function OverviewPage() {
  return (
    <div>
      <Header title="Usage Statistics" subtitle="Welcome back Michael" />

      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {/* Encrypted Files Card */}
          <div className="rounded-xl bg-purple-600/20 p-4 md:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-white p-2">
                <Lock className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-300">Encrypted File</span>
            </div>
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">12,000</h2>
            <div className="flex items-center text-xs text-gray-400">
              <span className="mr-1">+12%</span>
              <span>Since last month</span>
            </div>
          </div>

          {/* Decrypted Files Card */}
          <div className="rounded-xl bg-gray-800 p-4 md:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-full bg-white p-2">
                <Unlock className="h-5 w-5 text-gray-800" />
              </div>
              <span className="text-sm text-gray-300">Decrypted File</span>
            </div>
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">10,000</h2>
            <div className="flex items-center text-xs text-gray-400">
              <span className="mr-1">+8%</span>
              <span>Since last month</span>
            </div>
          </div>

          {/* API Key Card */}
          <div className="rounded-xl bg-gray-800 p-4 md:p-6">
            <h3 className="mb-4 font-medium">Your API Key:</h3>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex-1 rounded bg-gray-700 px-3 py-2 text-sm">
                <div className="flex items-center gap-x-3">
                  <FolderOpen className="h-4 w-4 flex-shrink-0" />
                  <code className="truncate">env_local</code>
                </div>
              </div>
              <button className="rounded bg-gray-700 p-2 hover:bg-gray-600">
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
          <div className="rounded-xl bg-gray-800 p-4">
            <div className="mb-2 flex items-center gap-3">
              <div className="rounded-full bg-pink-500 p-2">
                <Lock className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs text-gray-300">Calls Today</span>
            </div>
            <h2 className="text-2xl font-bold md:text-3xl">150</h2>
          </div>

          <div className="rounded-xl bg-gray-800 p-4">
            <div className="mb-2 flex items-center gap-3">
              <div className="rounded-full bg-blue-500 p-2">
                <Lock className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs text-gray-300">Quota Left</span>
            </div>
            <h2 className="text-2xl font-bold md:text-3xl">850</h2>
          </div>

          <div className="rounded-xl bg-gray-800 p-4">
            <div className="mb-2 flex items-center gap-3">
              <div className="rounded-full bg-purple-500 p-2">
                <Lock className="h-4 w-4 text-white" />
              </div>
              <span className="text-xs text-gray-300">Rate Limit</span>
            </div>
            <h2 className="text-2xl font-bold md:text-3xl">
              1000<span className="text-sm text-gray-400">/day</span>
            </h2>
          </div>
        </div>

        {/* Analytics */}
        <div className="mt-8">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold">Analytics</h2>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-400">Calls Today:</span>
              <span className="font-bold">356</span>
              <div className="mt-2 ml-0 flex w-full items-center sm:mt-0 sm:ml-4 sm:w-auto">
                <button className="rounded p-1 hover:bg-gray-800">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="mx-2 rounded bg-gray-800 px-3 py-1">
                  <span className="text-sm">This month</span>
                  <ChevronDown className="ml-2 inline-block h-4 w-4" />
                </div>
                <button className="rounded p-1 hover:bg-gray-800">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="relative h-48 rounded-xl bg-gray-800/50 md:h-64">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-500">Analytics Chart Visualization</p>
            </div>
          </div>
        </div>

        {/* Stats and History */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-xl font-bold">History</h2>
            <div className="rounded-xl bg-gray-800 p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700 text-left text-xs text-gray-400">
                      <th className="pb-2">File/Text</th>
                      <th className="pb-2 text-center">Type</th>
                      <th className="pb-2 text-center">Date</th>
                      <th className="pb-2 text-center">Status</th>
                      <th className="pb-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        file: "File-Hfgvehbejfdy7567.pdf",
                        type: "XOR",
                        date: "29-02-2025",
                        status: "successful" as StatusType,
                      },
                      {
                        file: "File-Hfgvehbejfdy7567.pdf",
                        type: "AES",
                        date: "29-02-2025",
                        status: "pending" as StatusType,
                      },
                      {
                        file: "File-Hfgvehbejfdy7567.pdf",
                        type: "XOR",
                        date: "29-02-2025",
                        status: "successful" as StatusType,
                      },
                      {
                        file: "File-Hfgvehbejfdy7567.pdf",
                        type: "XOR",
                        date: "29-02-2025",
                        status: "successful" as StatusType,
                      },
                      {
                        file: "File-Hfgvehbejfdy7567.pdf",
                        type: "AES",
                        date: "29-02-2025",
                        status: "cancelled" as StatusType,
                      },
                    ].map((item, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-700/50 text-sm"
                      >
                        <td className="flex items-center gap-2 py-3">
                          <File className="h-4 w-4 flex-shrink-0 text-gray-400" />
                          <span className="max-w-[120px] truncate md:max-w-none">
                            {item.file}
                          </span>
                        </td>
                        <td className="text-center">{item.type}</td>
                        <td className="text-center">{item.date}</td>
                        <td className="text-center">
                          <StatusBadge status={item.status} />
                        </td>
                        <td className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="rounded p-1 hover:bg-gray-700">
                              <Copy className="h-4 w-4" />
                            </button>
                            <button className="rounded p-1 hover:bg-gray-700">
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Stats</h2>
              <div className="rounded bg-gray-800 px-3 py-1">
                <span className="text-sm">This month</span>
                <ChevronDown className="ml-2 inline-block h-4 w-4" />
              </div>
            </div>

            <div className="rounded-xl bg-gray-800 p-6">
              {/* Donut Chart Placeholder */}
              <div className="relative mb-6 flex h-36 items-center justify-center sm:h-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-700 sm:h-32 sm:w-32">
                    <div className="text-center">
                      <p className="text-xs text-gray-400">Total:</p>
                      <p className="text-xl font-bold sm:text-2xl">356</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-pink-500"></span>
                    <span>Calls Today</span>
                  </div>
                  <span>356</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                    <span>Quota Left</span>
                  </div>
                  <span>850</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-purple-500"></span>
                    <span>Rate Limit</span>
                  </div>
                  <span>1000</span>
                </div>
              </div>

              <Link
                href="/dashboard/api-docs"
                className="mt-6 block w-full rounded-md bg-purple-600 py-2 text-center text-sm font-medium transition hover:bg-purple-700"
              >
                View API Docs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
