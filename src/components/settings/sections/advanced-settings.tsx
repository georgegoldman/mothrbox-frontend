"use client";

import { useSettings } from "@/context/settings-context";
import { SettingsCard } from "../ui/settings-card";
import type { SettingsSectionProps } from "@/components/settings/types";
import { ToggleSwitch } from "../ui/toggle-switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function AdvancedSettings({ className, id }: SettingsSectionProps) {
  const { isDevMode, rpcEndpoint, updateSetting } = useSettings();

  const handleClearCache = () => {
      toast.success("Cache cleared successfully");
  };

  const handleReset = () => {
      // Logic would go here
      toast.error("Settings reset feature coming soon");
  };

  return (
    <section id={id} className={className}>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Advanced Settings</h2>
        <p className="text-gray-400 text-sm">Experimental features and developer tools.</p>
      </div>

      <div className="space-y-6">
          <SettingsCard>
               <div className="flex items-center justify-between">
                   <div className="space-y-1">
                       <label className="text-white font-medium">Developer Mode</label>
                       <p className="text-xs text-gray-400">Shows transaction IDs and debug info.</p>
                   </div>
                   <ToggleSwitch 
                       checked={isDevMode}
                       onCheckedChange={(checked) => updateSetting('isDevMode', checked)}
                   />
               </div>
          </SettingsCard>

          <SettingsCard title="Custom RPC Endpoint">
               <div className="flex gap-3 mt-2">
                   <Input 
                        placeholder="https://fullnode.mainnet.sui.io" 
                        value={rpcEndpoint || ''}
                        onChange={(e) => updateSetting('rpcEndpoint', e.target.value)}
                        className="bg-black border-white/10 text-white"
                   />
                   <Button variant="outline" className="border-white/10 hover:bg-white/5 text-gray-300">Test</Button>
               </div>
          </SettingsCard>

          <SettingsCard title="Danger Zone" className="border-red-500/20 bg-red-500/5">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-white font-medium">Clear Application Cache</p>
                            <p className="text-xs text-gray-500">~42 MB of cached data</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleClearCache} className="border-white/10 hover:bg-white/5">Clear Cache</Button>
                    </div>
                    <div className="border-t border-red-500/10 pt-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-red-400 font-medium">Reset All Settings</p>
                            <p className="text-xs text-gray-500">Restore default configuration</p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={handleReset}>Reset Defaults</Button>
                    </div>
                </div>
          </SettingsCard>
      </div>
    </section>
  );
}
