"use client";

import { useSettings } from "@/context/settings-context";
import { SettingsCard } from "../ui/settings-card";
import type { SettingsSectionProps } from "@/components/settings/types";
import { ToggleSwitch } from "../ui/toggle-switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Laptop } from "lucide-react";

export function SecuritySettings({ className, id }: SettingsSectionProps) {
  const { defaultAlgorithm, updateSetting } = useSettings();

  return (
    <section id={id} className={className}>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Security & Privacy</h2>
        <p className="text-gray-400 text-sm">Configure encryption defaults and session security.</p>
      </div>

      <div className="space-y-6">
         <SettingsCard title="Default Encryption" description="Choose the algorithm used for new file uploads by default.">
             <div className="flex items-center gap-4">
                 <div className="p-3 rounded-lg bg-green-500/10 text-green-400">
                     <ShieldCheck className="h-6 w-6" />
                 </div>
                 <div className="flex-1">
                     <Select 
                        value={defaultAlgorithm} 
                        onValueChange={(v: any) => updateSetting('defaultAlgorithm', v)}
                     >
                        <SelectTrigger className="w-full md:w-[300px] bg-black border-white/10 text-white">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10 text-gray-300">
                            <SelectItem value="AES-256-GCM">AES-256-GCM (Standard)</SelectItem>
                            <SelectItem value="ChaCha20-Poly1305">ChaCha20-Poly1305 (Mobile Optimized)</SelectItem>
                            <SelectItem value="ECC">ECC (High Security)</SelectItem>
                        </SelectContent>
                     </Select>
                     <p className="text-xs text-gray-500 mt-2">
                        {defaultAlgorithm === 'AES-256-GCM' && "Industry standard symmetric encryption. Best balance of speed and security."}
                        {defaultAlgorithm === 'ChaCha20-Poly1305' && "High performance on mobile devices. Very secure."}
                        {defaultAlgorithm === 'ECC' && "Asymmetric encryption using Elliptic Curves. Highest security, slower performance."}
                     </p>
                 </div>
             </div>
         </SettingsCard>

         <SettingsCard title="NFT Key Security">
             <div className="space-y-4">
                 <div className="flex items-center justify-between">
                     <label className="text-sm text-gray-300">Require confirmation before key transfers</label>
                     <ToggleSwitch defaultChecked />
                 </div>
                 <div className="flex items-center justify-between">
                     <label className="text-sm text-gray-300">Lock keys after 30 days of inactivity</label>
                     <ToggleSwitch />
                 </div>
             </div>
         </SettingsCard>

         <SettingsCard title="Session Management">
             <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-300 text-sm">Auto-logout after</span>
                  <Select defaultValue="30">
                        <SelectTrigger className="w-[140px] bg-black border-white/10 text-white h-8 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-white/10 text-gray-300">
                            <SelectItem value="15">15 Minutes</SelectItem>
                            <SelectItem value="30">30 Minutes</SelectItem>
                            <SelectItem value="60">1 Hour</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                  </Select>
             </div>

             <div className="space-y-3">
                 <h4 className="text-xs font-semibold text-gray-500 uppercase">Active Sessions</h4>
                 <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center gap-3">
                          <Laptop className="h-5 w-5 text-gray-400" />
                          <div>
                              <p className="text-sm text-white font-medium">Windows PC - Chrome</p>
                              <p className="text-xs text-green-400">Current Session</p>
                          </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-500" disabled>Active</Button>
                 </div>
                 <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 opacity-75">
                      <div className="flex items-center gap-3">
                          <Laptop className="h-5 w-5 text-gray-400" />
                          <div>
                              <p className="text-sm text-white font-medium">MacBook Pro - Safari</p>
                              <p className="text-xs text-gray-500">Last seen 2 days ago</p>
                          </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">Revoke</Button>
                 </div>
             </div>
         </SettingsCard>
      </div>
    </section>
  );
}
