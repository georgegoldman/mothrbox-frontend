"use client";

import { Header } from "@/components/header";
import { SettingsSidebar, SettingsTabs } from "@/components/settings/settings-sidebar";
import { WalletNetworkSettings } from "@/components/settings/sections/wallet-network-settings";
import { StorageSettings } from "@/components/settings/sections/storage-settings";
import { SecuritySettings } from "@/components/settings/sections/security-settings";
import { APISettings } from "@/components/settings/sections/api-settings";
import { DisplaySettings } from "@/components/settings/sections/display-settings";
import { NotificationSettings } from "@/components/settings/sections/notification-settings";
import { AdvancedSettings } from "@/components/settings/sections/advanced-settings";
import { SettingsCard } from "@/components/settings/ui/settings-card";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Mail } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        title="Settings" 
        subtitle="Manage your account, preferences, and security settings" 
      />

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Desktop Sidebar (Sticky) */}
          <SettingsSidebar />
          
          {/* Mobile Tabs (Sticky) */}
          <SettingsTabs />

          {/* Main Content Area */}
          <div className="flex-1 space-y-12 pb-20">
            
            <WalletNetworkSettings id="wallet" />
            
            <div className="border-t border-white/5" />
            
            <StorageSettings id="storage" />
            
            <div className="border-t border-white/5" />
            
            <SecuritySettings id="security" />
            
            <div className="border-t border-white/5" />
            
            <APISettings id="api" />
            
            <div className="border-t border-white/5" />
            
            <DisplaySettings id="display" />
            
            <div className="border-t border-white/5" />
            
            <NotificationSettings id="notifications" />
            
            <div className="border-t border-white/5" />
            
            <AdvancedSettings id="advanced" />

            <div className="border-t border-white/5" />

            <section id="about" className="space-y-6">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-white">About & Support</h2>
                </div>
                <SettingsCard>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-lg font-medium text-white">Mothrbox v2.0.1</h3>
                            <p className="text-sm text-gray-500">Build: 2026.01.16.001</p>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5 text-gray-300">
                                <Github className="mr-2 h-4 w-4" /> GitHub
                            </Button>
                            <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5 text-gray-300">
                                <Twitter className="mr-2 h-4 w-4" /> Twitter
                            </Button>
                            <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5 text-gray-300">
                                <Mail className="mr-2 h-4 w-4" /> Support
                            </Button>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-4 text-xs text-gray-500 justify-center md:justify-start">
                        <a href="#" className="hover:text-gray-300 underline">Terms of Service</a>
                        <span>•</span>
                        <a href="#" className="hover:text-gray-300 underline">Privacy Policy</a>
                        <span>•</span>
                        <a href="#" className="hover:text-gray-300 underline">Open Source License</a>
                    </div>
                </SettingsCard>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
