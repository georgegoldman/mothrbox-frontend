"use client";

import { cn } from "@/lib/utils";
import { Link } from "lucide-react";
import { 
  Wallet, 
  HardDrive, 
  Shield, 
  Key, 
  Monitor, 
  Bell, 
  Settings2, // Advanced 
  Info
} from "lucide-react";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: 'wallet', label: 'Wallet & Network', icon: Wallet },
  { id: 'storage', label: 'Storage & Quota', icon: HardDrive },
  { id: 'security', label: 'Security & Privacy', icon: Shield },
  { id: 'api', label: 'API Management', icon: Key },
  { id: 'display', label: 'Display & Appearance', icon: Monitor },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'advanced', label: 'Advanced Settings', icon: Settings2 },
  { id: 'about', label: 'About & Support', icon: Info },
];

export function SettingsSidebar({ className }: { className?: string }) {
  const [activeSection, setActiveSection] = useState('wallet');

  // Handle scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition && (section.offsetTop + section.offsetHeight) > scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <nav className={cn("hidden lg:block w-64 shrink-0 sticky top-24 h-[calc(100vh-8rem)]", className)}>
       <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                        isActive 
                            ? "bg-[#7E4BAB]/10 text-[#7E4BAB]" 
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                      <Icon className={cn("h-5 w-5", isActive ? "text-[#7E4BAB]" : "text-gray-500")} />
                      {item.label}
                      {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#7E4BAB]" />
                      )}
                  </button>
              )
          })}
       </div>
    </nav>
  );
}

// Mobile Tabs Implementation
export function SettingsTabs({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState('wallet');

  const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // height of sticky tabs + header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        setActiveTab(id);
      }
    };

  return (
    <div className={cn("lg:hidden sticky top-0 z-10 bg-black/80 backdrop-blur-md border-b border-white/10 -mx-4 px-4 overflow-x-auto no-scrollbar", className)}>
        <div className="flex space-x-6 py-4 min-w-max">
            {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                            "flex items-center gap-2 text-sm font-medium transition-colors relative pb-1",
                            isActive ? "text-[#7E4BAB]" : "text-gray-400"
                        )}
                    >
                        <Icon className="h-4 w-4" />
                        {item.label}
                        {isActive && (
                            <span className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-[#7E4BAB]" />
                        )}
                    </button>
                )
            })}
        </div>
    </div>
  );
}
