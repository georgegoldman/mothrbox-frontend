"use client";

import { useSettings } from "@/context/settings-context";
import { SettingsCard } from "../ui/settings-card";
import type { SettingsSectionProps } from "@/components/settings/types";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToggleSwitch } from "../ui/toggle-switch";

export function DisplaySettings({ className, id }: SettingsSectionProps) {
  const { theme, updateTheme } = useSettings();

  const ThemeOption = ({ value, label, icon: Icon }: { value: 'light'|'dark'|'auto', label: string, icon: any }) => (
    <button 
        onClick={() => updateTheme(value)}
        className={cn(
            "flex-1 p-4 rounded-lg border flex flex-col items-center gap-3 transition-all",
            theme === value 
                ? "bg-[#7E4BAB]/20 border-[#7E4BAB] text-white" 
                : "bg-black border-white/10 text-gray-400 hover:bg-white/5"
        )}
    >
        <Icon className="h-6 w-6" />
        <span className="text-sm font-medium">{label}</span>
    </button>
  );

  return (
    <section id={id} className={className}>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Display & Appearance</h2>
        <p className="text-gray-400 text-sm">Customize your visual experience.</p>
      </div>

      <div className="space-y-6">
          <SettingsCard title="Theme">
              <div className="flex gap-4">
                  <ThemeOption value="light" label="Light" icon={Sun} />
                  <ThemeOption value="dark" label="Dark" icon={Moon} />
                  <ThemeOption value="auto" label="Auto" icon={Monitor} />
              </div>
          </SettingsCard>

          <SettingsCard title="File Display">
               <div className="space-y-4">
                   <div className="flex items-center justify-between">
                       <label className="text-sm text-gray-300">Show file previews</label>
                       <ToggleSwitch />
                   </div>
                   <div className="flex items-center justify-between">
                       <label className="text-sm text-gray-300">Compact list view</label>
                       <ToggleSwitch />
                   </div>
               </div>
          </SettingsCard>
      </div>
    </section>
  );
}
