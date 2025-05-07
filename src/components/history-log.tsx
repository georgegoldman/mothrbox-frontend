"use client";

import { useState } from "react";
import {
  File,
  Copy,
  Download,
  MoreHorizontal,
  Search,
  Filter,
  ChevronDown,
} from "lucide-react";
import { StatusBadge } from "@/components/status-badge";
import type { StatusType } from "@/lib/types";

export interface HistoryItem {
  id: string;
  fileName: string;
  type: string;
  date: string;
  time: string;
  status: StatusType;
  size: string;
  user?: string;
}

interface HistoryLogProps {
  items: HistoryItem[];
  showFilters?: boolean;
}

export function HistoryLog({ items, showFilters = false }: HistoryLogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.fileName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    const matchesType = typeFilter === "all" || item.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold">History</h2>

        {showFilters && (
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md bg-gray-700 py-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="relative min-w-[140px] flex-1">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full appearance-none rounded-md bg-gray-700 px-8 py-2 pr-8 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="successful">Successful</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <Filter className="pointer-events-none absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              </div>

              <div className="relative min-w-[140px] flex-1">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full appearance-none rounded-md bg-gray-700 px-8 py-2 pr-8 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="XOR">XOR</option>
                  <option value="AES">AES</option>
                </select>
                <Filter className="pointer-events-none absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="-mx-4 overflow-x-auto sm:mx-0">
        <div className="inline-block min-w-full px-4 align-middle sm:px-0">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-700 text-left text-xs text-gray-400">
                <th className="pb-2 font-medium">File/Text</th>
                <th className="hidden pb-2 text-center font-medium sm:table-cell">
                  Type
                </th>
                <th className="hidden pb-2 text-center font-medium md:table-cell">
                  Date
                </th>
                <th className="pb-2 text-center font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700/50">
                    <td className="py-3 pr-2">
                      <div className="flex items-center gap-2">
                        <File className="h-4 w-4 flex-shrink-0 text-gray-400" />
                        <div className="min-w-0">
                          <span className="block max-w-[120px] truncate sm:max-w-[150px] md:max-w-none">
                            {item.fileName}
                          </span>
                          <p className="text-xs text-gray-500">{item.size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="hidden text-center sm:table-cell">
                      {item.type}
                    </td>
                    <td className="hidden text-center md:table-cell">
                      <div>
                        <div>{item.date}</div>
                        <div className="text-xs text-gray-500">{item.time}</div>
                      </div>
                    </td>
                    <td className="text-center">
                      <StatusBadge status={item.status} className="text-xs" />
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          className="rounded p-1 transition-colors hover:bg-gray-700"
                          aria-label="Copy"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          className="rounded p-1 transition-colors hover:bg-gray-700"
                          aria-label="Download"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          className="rounded p-1 transition-colors hover:bg-gray-700"
                          aria-label="More options"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-400">
                    No history items found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
