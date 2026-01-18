"use client";

import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/header";
import { HistoryStats } from "@/components/history/history-stats";
import { HistoryFilters } from "@/components/history/history-filters";
import { ExportMenu } from "@/components/history/export-menu";
import { HistoryTable } from "@/components/history/history-table";
import { generateMockData } from "@/components/history/mock-data";
import type { HistoryRecord, FilterState, SortConfig } from "@/components/history/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function LogsPage() {
  const [data, setData] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State for Filters, Sort, Pagination
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    actions: [],
    algorithms: [],
    sizeRange: "all",
    costRange: "all",
    dateRange: "all",
    status: []
  });

  const [sort, setSort] = useState<SortConfig>({ column: 'timestamp', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25; // Fixed for now, could be dynamic

  // Load Mock Data
  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
       setData(generateMockData(150));
       setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter Logic
  const filteredData = useMemo(() => {
     return data.filter(record => {
        // Search
        if (filters.search && !record.fileName.toLowerCase().includes(filters.search.toLowerCase()) && 
            !record.action.includes(filters.search.toLowerCase())) return false;

        // Multi-select filters
        if (filters.actions.length > 0 && !filters.actions.includes(record.action)) return false;
        if (filters.status.length > 0 && !filters.status.includes(record.status)) return false;

        // Date Range (Simple Implementation)
        const recordDate = new Date(record.timestamp);
        const today = new Date();
        if (filters.dateRange === 'today' && recordDate.toDateString() !== today.toDateString()) return false;
        if (filters.dateRange === 'week' && (today.getTime() - recordDate.getTime()) > 7 * 24 * 60 * 60 * 1000) return false;
        if (filters.dateRange === 'month' && (today.getTime() - recordDate.getTime()) > 30 * 24 * 60 * 60 * 1000) return false;

        return true;
     });
  }, [data, filters]);

  // Sort Logic
  const sortedData = useMemo(() => {
     return [...filteredData].sort((a, b) => {
        const aValue = a[sort.column];
        const bValue = b[sort.column];

        if (aValue === bValue) return 0;
        if (aValue === undefined || aValue === null) return 1;
        if (bValue === undefined || bValue === null) return -1;

        if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
        return 0;
     });
  }, [filteredData, sort]);

  // Pagination Logic
  const paginatedData = useMemo(() => {
     const startIndex = (currentPage - 1) * rowsPerPage;
     return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const handleSort = (column: keyof HistoryRecord) => {
     setSort(prev => ({
        column,
        direction: prev.column === column && prev.direction === 'desc' ? 'asc' : 'desc'
     }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header title="Usage History" subtitle="Track all your encryption and decryption activities" />

      <main className="flex-1 p-4 md:p-8 space-y-6">
         
         {/* Top Toolbar */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <div className="flex-1">
                 <HistoryFilters filters={filters} onFilterChange={(f) => { setFilters(f); setCurrentPage(1); }} />
             </div>
             <div className="flex items-center gap-2 self-end md:self-auto">
                 <ExportMenu data={filteredData} />
             </div>
         </div>

         {/* Stats Bar */}
         <HistoryStats records={filteredData} />

         {/* Main Table */}
         {loading ? (
             <div className="space-y-4">
                 {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 w-full bg-white/5 animate-pulse rounded-lg" />
                 ))}
             </div>
         ) : (
            <div className="space-y-4">
                <HistoryTable 
                    data={paginatedData} 
                    sort={sort} 
                    onSort={handleSort} 
                />

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="hidden sm:block">
                            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, sortedData.length)} to {Math.min(currentPage * rowsPerPage, sortedData.length)} of {sortedData.length} records
                        </div>
                        <div className="flex items-center gap-2 ml-auto">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                                className="border-white/10 hover:bg-white/10"
                            >
                                <ChevronLeft className="h-4 w-4" /> Previous
                            </Button>
                            <span className="min-w-[40px] text-center text-white">{currentPage} / {totalPages}</span>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                                className="border-white/10 hover:bg-white/10"
                            >
                                Next <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
         )}
      </main>
    </div>
  );
}
