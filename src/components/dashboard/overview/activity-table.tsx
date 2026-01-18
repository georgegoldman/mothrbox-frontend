"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Download, Eye, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const mockActivities = [
    {
        id: "1",
        status: "success",
        action: "Upload",
        fileName: "confidential_contract_v2.pdf",
        algorithm: "AES-256-GCM",
        size: "2.4 MB",
        cost: "0.002 SUI",
        timestamp: "5 mins ago",
    },
    {
        id: "2",
        status: "success",
        action: "Decrypt",
        fileName: "family_photos_archive.zip",
        algorithm: "ChaCha20",
        size: "156 MB",
        cost: "0.012 SUI",
        timestamp: "2 hours ago",
    },
     {
        id: "3",
        status: "failed",
        action: "Transfer",
        fileName: "Key #8821 Access",
        algorithm: "ECC-Secp256k1",
        size: "-",
        cost: "0.001 SUI",
        timestamp: "5 hours ago",
    },
     {
        id: "4",
        status: "success",
        action: "Delete",
        fileName: "old_backup_2023.tar.gz",
        algorithm: "-",
        size: "512 MB",
        cost: "0 SUI",
        timestamp: "1 day ago",
    },
];

export function ActivityTable() {
  return (
    <Card className="border-purple-500/20 bg-black/40 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-white">Recent Activity</CardTitle>
        <Link href="/dashboard/files">
            <Button variant="ghost" size="sm" className="text-xs text-purple-400 hover:text-purple-300">
                View All <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="text-xs text-gray-500">Action</TableHead>
              <TableHead className="text-xs text-gray-500">File Name</TableHead>
              <TableHead className="hidden md:table-cell text-xs text-gray-500">Algorithm</TableHead>
              <TableHead className="hidden md:table-cell text-xs text-gray-500">Size</TableHead>
              <TableHead className="hidden lg:table-cell text-xs text-gray-500">Cost</TableHead>
              <TableHead className="text-right text-xs text-gray-500">Time</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockActivities.map((activity) => (
              <TableRow key={activity.id} className="border-white/5 hover:bg-white/5">
                <TableCell>
                    <div className={`h-2 w-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                </TableCell>
                <TableCell>
                    <Badge variant="outline" className="border-white/10 bg-white/5 text-xs font-normal text-gray-300">
                        {activity.action}
                    </Badge>
                </TableCell>
                <TableCell className="font-medium text-white max-w-[150px] truncate" title={activity.fileName}>
                    {activity.fileName}
                </TableCell>
                <TableCell className="hidden md:table-cell text-xs text-gray-400">
                    {activity.algorithm}
                </TableCell>
                <TableCell className="hidden md:table-cell text-xs text-gray-400">
                    {activity.size}
                </TableCell>
                 <TableCell className="hidden lg:table-cell text-xs text-gray-400">
                    {activity.cost}
                </TableCell>
                <TableCell className="text-right text-xs text-gray-500">
                    {activity.timestamp}
                </TableCell>
                <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#111] border-white/10 text-gray-300">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2">
                             <Eye className="h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                            <Download className="h-4 w-4" /> Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2 text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" /> Delete Record
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
