"use client";

import type { HistoryRecord, SortConfig } from "./types";
import { ActionBadge, AlgorithmBadge } from "./badges";
import { formatBytes } from "@/lib/utils";
import { formatDistanceToNow, format } from "date-fns";
import { ChevronDown, ChevronUp, MoreHorizontal, Eye, Copy, Trash2, Download } from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface HistoryTableProps {
  data: HistoryRecord[];
  sort: SortConfig;
  onSort: (column: keyof HistoryRecord) => void;
}

export function HistoryTable({ data, sort, onSort }: HistoryTableProps) {
  
  const SortIcon = ({ column }: { column: keyof HistoryRecord }) => {
     if (sort.column !== column) return <ChevronDown className="ml-2 h-3 w-3 text-gray-600 opacity-0 group-hover:opacity-100" />;
     return sort.direction === 'asc' 
        ? <ChevronUp className="ml-2 h-3 w-3 text-purple-400" /> 
        : <ChevronDown className="ml-2 h-3 w-3 text-purple-400" />;
  };

  const TableHeaderCell = ({ column, label, align = 'left' }: { column: keyof HistoryRecord, label: string, align?: 'left'|'right' }) => (
    <TableHead 
        className={cn(
            "cursor-pointer group hover:bg-white/5 hover:text-white transition-colors h-12 uppercase text-[10px] font-bold tracking-wider text-gray-400",
            align === 'right' && "text-right"
        )}
        onClick={() => onSort(column)}
    >
        <div className={cn("flex items-center", align === 'right' && "justify-end")}>
           {label}
           <SortIcon column={column} />
        </div>
    </TableHead>
  );

  if (data.length === 0) {
      return (
         <div className="flex flex-col items-center justify-center h-64 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
             <div className="text-4xl mb-4 opacity-50">🔍</div>
             <p className="text-gray-400 font-medium">No activities found</p>
             <p className="text-gray-600 text-sm mt-1">Try adjusting your filters</p>
         </div>
      );
  }

  return (
    <div className="rounded-xl border border-[#7E4BAB]/20 bg-black/40 overflow-hidden backdrop-blur-sm">
      <Table>
         <TableHeader className="bg-[#7E4BAB]/10 border-b border-white/5">
            <TableRow className="hover:bg-transparent border-white/5">
               <TableHeaderCell column="action" label="Action" />
               <TableHeaderCell column="fileName" label="File Name" />
               <TableHeaderCell column="algorithm" label="Algorithm" />
               <TableHeaderCell column="size" label="Size" align="right" />
               <TableHeaderCell column="cost" label="Cost" align="right" />
               <TableHeaderCell column="timestamp" label="Time" />
               <TableHead className="w-[60px]"></TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {data.map((record) => (
               <TableRow key={record.id} className="border-white/5 hover:bg-[#7E4BAB]/5 transition-colors group">
                  <TableCell>
                      <ActionBadge action={record.action} />
                  </TableCell>
                  <TableCell>
                      <div className="flex flex-col">
                          <span className="font-medium text-white max-w-[200px] truncate" title={record.fileName}>
                             {record.fileName}
                          </span>
                          <span className="text-[10px] text-gray-500 uppercase">{record.fileType}</span>
                      </div>
                  </TableCell>
                  <TableCell>
                      <AlgorithmBadge algorithm={record.algorithm} />
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs text-gray-300">
                      {formatBytes(record.size)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs">
                      <span className={cn(record.cost > 0.1 ? "text-purple-300" : "text-gray-400")}>
                         {record.cost.toFixed(4)} SUI
                      </span>
                  </TableCell>
                  <TableCell>
                      <div className="flex flex-col text-xs">
                          <span className="text-gray-300">{formatDistanceToNow(new Date(record.timestamp), { addSuffix: true })}</span>
                          <span className="text-[10px] text-gray-600 group-hover:block hidden transition-all">
                              {format(new Date(record.timestamp), 'MMM d, HH:mm')}
                          </span>
                      </div>
                  </TableCell>
                  <TableCell className="text-right">
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-white hover:bg-white/10">
                                  <MoreHorizontal className="h-4 w-4" />
                              </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-black border-white/10 text-gray-300">
                              <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                  <Eye className="mr-2 h-4 w-4 text-blue-400" /> View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                  <Copy className="mr-2 h-4 w-4 text-purple-400" /> Copy ID
                              </DropdownMenuItem>
                              {record.action === 'upload' && (
                                  <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                     <Download className="mr-2 h-4 w-4 text-green-400" /> Download
                                  </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="focus:bg-white/10 cursor-pointer text-red-400 hover:text-red-300">
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete Record
                              </DropdownMenuItem>
                          </DropdownMenuContent>
                      </DropdownMenu>
                  </TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
    </div>
  );
}
