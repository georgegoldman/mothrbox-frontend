"use client";

import { useSettings } from "@/context/settings-context";
import { SettingsCard } from "../ui/settings-card";
import type { SettingsSectionProps } from "@/components/settings/types";
import { UsageProgressBar } from "../ui/usage-progress-bar";
import { ToggleSwitch } from "../ui/toggle-switch";
import { formatBytes } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

export function StorageSettings({ className, id }: SettingsSectionProps) {
  const { storage } = useSettings();

  return (
    <section id={id} className={className}>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Storage & Quota</h2>
        <p className="text-gray-400 text-sm">Monitor usage and configure auto-deletion policies.</p>
      </div>

      <div className="space-y-6">
        <SettingsCard>
            <UsageProgressBar 
                value={storage.usedBytes} 
                max={storage.totalBytes} 
                label="Storage Usage"
                subLabel={`${formatBytes(storage.usedBytes)} of ${formatBytes(storage.totalBytes)} used • ${storage.fileCount} files`}
            />
            {storage.usedBytes / storage.totalBytes > 0.7 && (
                <div className="mt-4 flex items-center gap-3 text-sm text-yellow-300">
                   <AlertCircle className="h-4 w-4" />
                   <span>You are approaching your storage limit.</span>
                   <Button variant="link" className="text-purple-400 p-0 h-auto">Upgrade Plan</Button>
                </div>
            )}
        </SettingsCard>

        <SettingsCard title="Auto-Delete Settings" description="Automatically remove old files when storage is full">
             <div className="flex items-center justify-between py-2">
                 <div className="space-y-0.5">
                     <label className="text-white font-medium">Enable Auto-Delete</label>
                     <p className="text-xs text-gray-400">Only affects files when storage &gt; 95% full</p>
                 </div>
                 <ToggleSwitch />
             </div>
             
             <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                 <span className="text-gray-300 text-sm">Delete files older than</span>
                 <Select defaultValue="30">
                    <SelectTrigger className="w-[180px] bg-black border-white/10 text-white">
                        <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/10 text-gray-300">
                        <SelectItem value="7">7 Days</SelectItem>
                        <SelectItem value="30">30 Days</SelectItem>
                        <SelectItem value="90">90 Days</SelectItem>
                        <SelectItem value="365">1 Year</SelectItem>
                    </SelectContent>
                 </Select>
             </div>
        </SettingsCard>
        
        <SettingsCard title="Walrus Configuration">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                     <label className="text-sm text-gray-400 block mb-2">Default Storage Duration</label>
                     <Select defaultValue="1year">
                        <SelectTrigger className="w-full bg-black border-white/10 text-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10 text-gray-300">
                            <SelectItem value="1month">1 Month</SelectItem>
                            <SelectItem value="6months">6 Months</SelectItem>
                            <SelectItem value="1year">1 Year (Recommended)</SelectItem>
                            <SelectItem value="permanent">Permanent</SelectItem>
                        </SelectContent>
                     </Select>
                 </div>
                 <div>
                     <label className="text-sm text-gray-400 block mb-2">Redundancy Level</label>
                     <Select defaultValue="standard">
                        <SelectTrigger className="w-full bg-black border-white/10 text-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10 text-gray-300">
                            <SelectItem value="minimal">Minimal (Low Cost)</SelectItem>
                            <SelectItem value="standard">Standard (Recommended)</SelectItem>
                            <SelectItem value="high">High (Max Safety)</SelectItem>
                        </SelectContent>
                     </Select>
                 </div>
             </div>
             <div className="mt-4 p-3 rounded bg-white/5 text-xs text-gray-400 text-center">
                 Estimated cost for current settings: <span className="text-white font-mono">~0.05 SUI / GB / Month</span>
             </div>
        </SettingsCard>
      </div>
    </section>
  );
}
