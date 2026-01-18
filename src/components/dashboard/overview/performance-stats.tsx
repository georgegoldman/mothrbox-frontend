"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, CheckCircle, Server, Activity } from "lucide-react";

export function PerformanceStats() {
  return (
    <Card className="border-purple-500/20 bg-black/40 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white">System Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Encryption Speed */}
            <div className="rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span className="text-xs text-gray-400">Avg. Encryption Speed</span>
                </div>
                <div className="text-2xl font-bold text-white">124ms</div>
                <div className="text-xs text-green-400">⚡ Fast</div>
            </div>

            {/* Success Rate */}
            <div className="rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-xs text-gray-400">Success Rate</span>
                </div>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-xs text-gray-500">Last 30 days</div>
            </div>

            {/* Network Status */}
            <div className="rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-blue-400" />
                    <span className="text-xs text-gray-400">Sui Network</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="font-medium text-white">Mainnet</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Block: 45,231,123</div>
            </div>

             {/* Walrus Status */}
             <div className="rounded-xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10">
                <div className="flex items-center gap-2 mb-2">
                    <Server className="h-4 w-4 text-purple-400" />
                    <span className="text-xs text-gray-400">Walrus Storage</span>
                </div>
                <div className="flex items-center gap-2">
                     <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span className="font-medium text-white">Operational</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Latency: 45ms</div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
