"use client";

import { SettingsCard } from "../ui/settings-card";
import type { SettingsSectionProps } from "@/components/settings/types";
import { Button } from "@/components/ui/button";
import { UsageProgressBar } from "../ui/usage-progress-bar";
import { Copy, Eye, EyeOff, RefreshCw, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function APISettings({ className, id }: SettingsSectionProps) {
  const [showKey, setShowKey] = useState(false);
  const apiKey = "moth_live_9f8a7d6e5c4b3a210987654321fedcba";

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success("API Key copied");
  };

  const handleRegenerate = () => {
      // Mock regeneration logic
      toast.promise(new Promise(r => setTimeout(r, 1000)), {
          loading: "Generating new key...",
          success: "New API Key generated",
          error: "Failed to generate key"
      });
  };

  return (
    <section id={id} className={className}>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">API Management</h2>
        <p className="text-gray-400 text-sm">Manage API keys and monitor usage limits.</p>
      </div>

      <div className="space-y-6">
          <SettingsCard title="API Key">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="flex-1 w-full bg-black border border-white/10 rounded-md px-4 py-3 flex items-center justify-between font-mono text-sm">
                      <span className="text-gray-300">
                          {showKey ? apiKey : "moth_live_••••••••••••••••••••••••••••"}
                      </span>
                      <div className="flex items-center gap-2">
                          <button onClick={() => setShowKey(!showKey)} className="text-gray-500 hover:text-white">
                              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                          <button onClick={handleCopy} className="text-gray-500 hover:text-white">
                              <Copy className="h-4 w-4" />
                          </button>
                      </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                      <Button variant="outline" className="flex-1 md:flex-none border-white/10 hover:bg-white/5 text-gray-300" onClick={handleRegenerate}>
                          <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
                      </Button>
                      <Button variant="ghost" className="flex-1 md:flex-none text-red-400 hover:text-red-300 hover:bg-red-500/10">
                          <Trash2 className="h-4 w-4" />
                      </Button>
                  </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Created: Jan 10, 2026 • Last used: 2 hours ago</p>
          </SettingsCard>

          <SettingsCard title="Usage & Quotas">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                       <UsageProgressBar 
                          value={8234} 
                          max={50000} 
                          label="Monthly Requests" 
                          subLabel="8,234 / 50,000 requests used" 
                       />
                   </div>
                   <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-white font-medium">Rate Limit</span>
                            <span className="text-gray-400">Normal</span>
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">Requests per minute</span>
                                <span className="text-white font-mono">100</span>
                            </div>
                        </div>
                   </div>
               </div>
          </SettingsCard>
      </div>
    </section>
  );
}
