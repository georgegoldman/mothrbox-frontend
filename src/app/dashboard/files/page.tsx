"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, MoreVertical, Trash, File } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const MOCK_FILES = [
  { id: 1, name: "Project_Specs_v2.pdf", size: "2.4 MB", date: "2024-03-15", algo: "AES-256", status: "Encrypted" },
  { id: 2, name: "Financials_Q1.xlsx", size: "1.1 MB", date: "2024-03-14", algo: "ChaCha20", status: "Encrypted" },
  { id: 3, name: "Team_Photo_HighRes.png", size: "15.8 MB", date: "2024-03-10", algo: "ECC", status: "Encrypted" },
  { id: 4, name: "Backup_Keys.txt", size: "4 KB", date: "2024-03-01", algo: "AES-256", status: "Encrypted" },
];

export default function FilesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header title="My Files" subtitle="Manage your encrypted storage" />

      <div className="flex-1 space-y-8 p-4 md:p-8">
        <Card className="bg-black border-border">
           <CardContent className="p-0">
              <Table>
                 <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                       <TableHead className="text-muted-foreground">File Name</TableHead>
                       <TableHead className="text-muted-foreground">Size</TableHead>
                       <TableHead className="text-muted-foreground">Date Uploaded</TableHead>
                       <TableHead className="text-muted-foreground">Algorithm</TableHead>
                       <TableHead className="text-muted-foreground">Status</TableHead>
                       <TableHead className="text-right text-muted-foreground">Actions</TableHead>
                    </TableRow>
                 </TableHeader>
                 <TableBody>
                    {MOCK_FILES.map((file) => (
                       <TableRow key={file.id} className="border-border hover:bg-white/5">
                          <TableCell className="font-medium text-white">
                             <div className="flex items-center gap-3">
                                <div className="rounded bg-primary/10 p-2 text-primary">
                                   <File className="h-4 w-4" />
                                </div>
                                {file.name}
                             </div>
                          </TableCell>
                          <TableCell className="text-gray-400">{file.size}</TableCell>
                          <TableCell className="text-gray-400">{file.date}</TableCell>
                          <TableCell>
                             <span className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground font-mono">
                                {file.algo}
                             </span>
                          </TableCell>
                          <TableCell>
                             <span className="rounded-full bg-green-900/30 px-2 py-1 text-xs text-green-400 border border-green-900/50">
                                {file.status}
                             </span>
                          </TableCell>
                          <TableCell className="text-right">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                   <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                                      <MoreVertical className="h-4 w-4 text-gray-400" />
                                   </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-black border-border text-white">
                                   <DropdownMenuItem className="focus:bg-white/10 cursor-pointer">
                                      <Download className="mr-2 h-4 w-4" /> Download
                                   </DropdownMenuItem>
                                   <DropdownMenuItem className="text-red-500 focus:bg-red-500/10 focus:text-red-500 cursor-pointer">
                                      <Trash className="mr-2 h-4 w-4" /> Delete
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
      </div>
    </div>
  );
}
