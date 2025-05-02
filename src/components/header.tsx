"use client";

import { Bell, PanelLeft, Search } from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";
import { useState } from "react";
import UserProfile from "./user-profile";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { toggleSidebar } = useSidebar();
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="flex flex-col border-b border-gray-800 p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="rounded-md p-2"
            aria-label="Toggle sidebar"
          >
            <PanelLeft size={30} className="h-5 w-5 cursor-pointer" />
          </button>
          <div>
            <h1 className="truncate text-lg font-bold md:text-xl">{title}</h1>
            {subtitle && (
              <p className="truncate text-xs text-gray-400 md:text-sm">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="rounded-full p-2 hover:bg-gray-800"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button className="relative rounded-full p-2 hover:bg-gray-800">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-purple-500"></span>
          </button>
        </div>
      </div>

      {showMobileSearch && (
        <div className="mt-4 md:hidden">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-full bg-gray-800 py-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>
      )}

      <div className="hidden items-center gap-4 md:flex">
        {/* <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="w-64 rounded-full bg-gray-800 py-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div> */}

        <button className="relative rounded-full p-2 hover:bg-gray-800">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-purple-500"></span>
        </button>

        <UserProfile />
      </div>
    </header>
  );
}
