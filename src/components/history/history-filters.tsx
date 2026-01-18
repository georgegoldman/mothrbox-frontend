"use client";

import type { FilterState } from "./types";
import { Search, Filter, Calendar as CalendarIcon, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface HistoryFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function HistoryFilters({ filters, onFilterChange }: HistoryFiltersProps) {
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const clearFilters = () => {
    onFilterChange({
      search: "",
      actions: [],
      algorithms: [],
      sizeRange: "all",
      costRange: "all",
      dateRange: "all",
      status: []
    });
  };

  const hasActiveFilters = 
    filters.search || 
    filters.actions.length > 0 || 
    filters.algorithms.length > 0 || 
    filters.dateRange !== 'all' || 
    filters.status.length > 0;

  return (
    <div className="space-y-4">
       <div className="flex flex-col md:flex-row gap-4">
         {/* Search Bar */}
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search by file name or action..." 
              className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:bg-black transition-all"
              value={filters.search}
              onChange={handleSearchChange}
            />
            {filters.search && (
               <button 
                 onClick={() => onFilterChange({ ...filters, search: "" })}
                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
               >
                 <X className="h-4 w-4" />
               </button>
            )}
         </div>

         {/* Filter Dropdown */}
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="outline" className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white min-w-[120px] justify-between">
                  <span className="flex items-center gap-2">
                     <Filter className="h-4 w-4" /> Filter
                  </span>
                  {(filters.actions.length > 0 || filters.status.length > 0) && (
                     <span className="bg-purple-500 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-2">
                        {filters.actions.length + filters.status.length}
                     </span>
                  )}
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-black border-white/10 text-gray-300">
               <DropdownMenuLabel>Action Type</DropdownMenuLabel>
               {['upload', 'download', 'decrypt', 'delete', 'transfer', 'keygen'].map(action => (
                  <DropdownMenuCheckboxItem
                    key={action}
                    checked={filters.actions.includes(action)}
                    onCheckedChange={(checked) => {
                       const newActions = checked 
                          ? [...filters.actions, action]
                          : filters.actions.filter(a => a !== action);
                       onFilterChange({ ...filters, actions: newActions });
                    }}
                    className="capitalize"
                  >
                     {action}
                  </DropdownMenuCheckboxItem>
               ))}
               <DropdownMenuSeparator className="bg-white/10" />
               <DropdownMenuLabel>Status</DropdownMenuLabel>
               {['success', 'failed', 'pending'].map(status => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={filters.status.includes(status)}
                    onCheckedChange={(checked) => {
                       const newStatus = checked 
                          ? [...filters.status, status]
                          : filters.status.filter(s => s !== status);
                       onFilterChange({ ...filters, status: newStatus });
                    }}
                    className="capitalize"
                  >
                     {status}
                  </DropdownMenuCheckboxItem>
               ))}
            </DropdownMenuContent>
         </DropdownMenu>

          {/* Date Range Picker (Simplified) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="outline" className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white min-w-[140px] justify-start">
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  {filters.dateRange === 'all' ? 'All Time' : 
                   filters.dateRange === 'today' ? 'Today' :
                   filters.dateRange === 'week' ? 'Last 7 Days' :
                   filters.dateRange === 'month' ? 'Last 30 Days' : 'Custom'}
               </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black border-white/10 text-gray-300">
               <DropdownMenuCheckboxItem checked={filters.dateRange === 'all'} onCheckedChange={() => onFilterChange({...filters, dateRange: 'all'})}>All Time</DropdownMenuCheckboxItem>
               <DropdownMenuCheckboxItem checked={filters.dateRange === 'today'} onCheckedChange={() => onFilterChange({...filters, dateRange: 'today'})}>Today</DropdownMenuCheckboxItem>
               <DropdownMenuCheckboxItem checked={filters.dateRange === 'week'} onCheckedChange={() => onFilterChange({...filters, dateRange: 'week'})}>Last 7 Days</DropdownMenuCheckboxItem>
               <DropdownMenuCheckboxItem checked={filters.dateRange === 'month'} onCheckedChange={() => onFilterChange({...filters, dateRange: 'month'})}>Last 30 Days</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
         </DropdownMenu>

         {/* Clear Button */}
         {hasActiveFilters && (
             <Button variant="ghost" onClick={clearFilters} className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">
                 Clear All
             </Button>
         )}
       </div>
    </div>
  );
}
