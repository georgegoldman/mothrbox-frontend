"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Database, Unlock, Key, Activity } from "lucide-react";

// --- Sub Components for internal use in this file ---

// --- Sub Components for internal use in this file ---

// Need to update imports to include Unlock
// Note: Assuming Unlock is available from lucide-react (it is used in other files)

function StorageOverviewCard() {
  return (
    <Card className="relative overflow-hidden border-purple-500/20 bg-black/40 backdrop-blur-sm transition-all hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(126,75,171,0.1)] min-w-0">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent" />
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between">
            <div className="rounded-lg bg-purple-500/20 p-2 text-purple-400">
               <Database className="h-5 w-5" />
            </div>

        </div>
        
        <div className="mt-4">
            <h3 className="text-3xl font-bold text-white">124</h3>
            <p className="text-sm font-medium text-gray-400">Encrypted Files</p>
        </div>

        <div className="mt-6 space-y-2">
            <div className="flex justify-between text-xs text-gray-300">
                <span>2.4 GB used</span>
                <span>10 GB total</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                <div className="h-full w-[24%] rounded-full bg-gradient-to-r from-purple-600 to-purple-400" />
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DecryptedOverviewCard() {
    return (
      <Card className="relative overflow-hidden border-blue-500/20 bg-black/40 backdrop-blur-sm transition-all hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]">
        <CardContent className="relative p-6">
          <div className="flex items-start justify-between">
              <div className="rounded-lg bg-blue-500/20 p-2 text-blue-400">
                 <Unlock className="h-5 w-5" />
              </div>

          </div>
          
          <div className="mt-4">
              <h3 className="text-3xl font-bold text-white">10,482</h3>
              <p className="text-sm font-medium text-gray-400">Decrypted Files</p>
          </div>
  
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-xs text-gray-300">
                <span>1.8 GB Decrypted</span>
                <span>Total Volume</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
                <div className="h-full w-[18%] rounded-full bg-gradient-to-r from-blue-600 to-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

function NFTKeysCard() {
    return (
      <Card className="relative overflow-hidden border-purple-500/20 bg-black/40 backdrop-blur-sm transition-all hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(126,75,171,0.1)] min-w-0">
         <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-purple-500/10 blur-xl" />
        <CardContent className="relative p-6">
          <div className="flex items-start justify-between">
              <div className="rounded-lg bg-pink-500/20 p-2 text-pink-400">
                 <Key className="h-5 w-5" />
              </div>

          </div>
          
          <div className="mt-4">
              <h3 className="text-3xl font-bold text-white">84</h3>
              <p className="text-sm font-medium text-gray-400">NFT Access Keys</p>
          </div>
  
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
               <div>
                  <p className="text-xs text-gray-500">Active</p>
                  <p className="font-mono text-sm text-white">72</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500">Transferred</p>
                  <p className="font-mono text-sm text-white">12</p>
               </div>
          </div>
        </CardContent>
      </Card>
    );
}

function ActivityCard() {
    return (
      <Card className="relative overflow-hidden border-purple-500/20 bg-black/40 backdrop-blur-sm transition-all hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(126,75,171,0.1)] min-w-0">
        <CardContent className="relative p-6">
          <div className="flex items-start justify-between">
              <div className="rounded-lg bg-orange-500/20 p-2 text-orange-400">
                 <Activity className="h-5 w-5" />
              </div>

          </div>
          
          <div className="mt-4">
              <h3 className="text-2xl font-bold text-white">2h ago</h3>
              <p className="text-sm font-medium text-gray-400">Last Activity</p>
          </div>
  
          <div className="mt-6 space-y-1">
             <div className="flex items-center gap-2 text-xs text-gray-300">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                Uploaded "Project_Specs.pdf"
             </div>
             <p className="text-[10px] text-gray-500 pl-3.5">All systems operational</p>
          </div>
        </CardContent>
      </Card>
    );
}

export function HeroStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-full overflow-hidden">
      <StorageOverviewCard />
      <DecryptedOverviewCard />
      <NFTKeysCard />
      <ActivityCard />
    </div>
  );
}
