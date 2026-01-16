"use client";

import { useSettings } from "@/context/settings-context";
import { SettingsCard } from "../ui/settings-card";
import type { SettingsSectionProps } from "@/components/settings/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export function NotificationSettings({ className, id }: SettingsSectionProps) {
  const { notifications, updateNotifications } = useSettings();

  const handleToggle = (key: keyof typeof notifications) => {
    updateNotifications({ [key]: !notifications[key] });
  };

  return (
    <section id={id} className={className}>
       <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Notifications</h2>
        <p className="text-gray-400 text-sm">Manage your alert preferences.</p>
      </div>

      <div className="space-y-6">
          <SettingsCard title="In-App Notifications">
              <div className="space-y-3">
                  {[
                      { key: 'encryption', label: 'Encryption completed' },
                      { key: 'decryption', label: 'Decryption completed' },
                      { key: 'lowStorage', label: 'Low storage warning (>90%)' },
                      { key: 'lowBalance', label: 'Low SUI balance (<0.1 SUI)' },
                      { key: 'networkStatus', label: 'Network status changes' },
                      { key: 'failedTransactions', label: 'Failed transactions' },
                  ].map(item => (
                      <div key={item.key} className="flex items-center space-x-3">
                          <Checkbox 
                              id={item.key} 
                              checked={notifications[item.key as keyof typeof notifications]}
                              onCheckedChange={() => handleToggle(item.key as keyof typeof notifications)}
                              className="border-white/30 data-[state=checked]:bg-[#7E4BAB] data-[state=checked]:border-[#7E4BAB]"
                          />
                          <label htmlFor={item.key} className="text-sm text-gray-300 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              {item.label}
                          </label>
                      </div>
                  ))}
              </div>
          </SettingsCard>
          
          <SettingsCard title="Browser Notifications">
               <div className="flex items-center justify-between">
                   <div className="space-y-1">
                       <p className="text-sm text-white font-medium">Enable Desktop Alerts</p>
                       <p className="text-xs text-gray-400">Get notified even when the app is in the background.</p>
                   </div>
                   <Button variant="outline" className="border-white/10 hover:bg-white/5 text-gray-300">
                       <Bell className="mr-2 h-4 w-4" /> Enable
                   </Button>
               </div>
          </SettingsCard>
      </div>
    </section>
  );
}
