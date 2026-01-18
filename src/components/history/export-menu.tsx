"use client";

import { Button } from "@/components/ui/button";
import { Download, FileDown, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { HistoryRecord } from "./types";
import { toast } from "sonner";

interface ExportMenuProps {
  data: HistoryRecord[];
}

export function ExportMenu({ data }: ExportMenuProps) {
  
  const handleExportCSV = () => {
    // Generate CSV content
    const headers = ['Action', 'File Name', 'Algorithm', 'Size (Bytes)', 'Cost (SUI)', 'Status', 'Timestamp'];
    const rows = data.map(record => [
        record.action,
        record.fileName,
        record.algorithm || 'N/A',
        record.size,
        record.cost,
        record.status,
        record.timestamp
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `mothrbox_history_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success(`Exported ${data.length} records to CSV`);
  };

  const handleExportPDF = () => {
      // Logic for PDF generation would go here (using jsPDF usually)
      // For now we mock it
      toast.info("PDF Export is coming in the next update. Please use CSV for now.");
  };

  return (
    <DropdownMenu>
       <DropdownMenuTrigger asChild>
          <Button className="bg-[#7E4BAB] hover:bg-[#6B3F9B] text-white gap-2">
             <Download className="h-4 w-4" />
             <span className="hidden sm:inline">Export</span>
          </Button>
       </DropdownMenuTrigger>
       <DropdownMenuContent align="end" className="bg-black border-white/10 text-gray-300">
          <DropdownMenuLabel>Choose Format</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleExportCSV} className="cursor-pointer hover:bg-white/5 focus:bg-white/5">
             <FileDown className="mr-2 h-4 w-4 text-green-400" />
             <span>Export as CSV</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer hover:bg-white/5 focus:bg-white/5">
             <FileText className="mr-2 h-4 w-4 text-red-400" />
             <span>Export as PDF</span>
          </DropdownMenuItem>
       </DropdownMenuContent>
    </DropdownMenu>
  );
}
