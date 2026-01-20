"use client";

import { Button } from "@/components/ui/button";
import { Lock, Unlock, Key, FolderOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-purple-900/20 to-black p-6 md:p-8 min-w-0 max-w-full">
      {/* Background decoration */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
         <div>
            <h2 className="text-xl font-bold text-white">Quick Actions</h2>
            <p className="text-sm text-gray-400">Manage your secure assets and encryption keys</p>
         </div>

         <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap lg:justify-end">
            <Link href="/dashboard/encrypt">
                <Button className="h-12 w-full gap-2 bg-purple-600 text-white shadow-lg shadow-purple-900/20 hover:bg-purple-700 sm:w-auto">
                    <Lock className="h-4 w-4" />
                    <span>Encrypt New File</span>
                </Button>
            </Link>

             <Link href="/dashboard/decrypt">
                <Button variant="outline" className="h-12 w-full gap-2 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto">
                    <Unlock className="h-4 w-4" />
                    <span>Decrypt</span>
                </Button>
            </Link>

             <Link href="/dashboard/keys">
                <Button variant="outline" className="h-12 w-full gap-2 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:w-auto">
                    <Key className="h-4 w-4" />
                    <span>Manage Keys</span>
                </Button>
            </Link>

             <Link href="/dashboard/files">
                <Button variant="ghost" className="h-12 w-full gap-2 text-gray-400 hover:text-white sm:w-auto">
                    <FolderOpen className="h-4 w-4" />
                    <span>Storage</span>
                    <ArrowRight className="h-4 w-4 opacity-50" />
                </Button>
            </Link>
         </div>
      </div>
    </div>
  );
}
