"use client";

import { Bell, ChevronDown, Search } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-gray-800 p-4">
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <input
            type="search"
            placeholder="Search..."
            className="w-64 rounded-full bg-gray-800 py-2 pr-4 pl-10 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <button className="relative rounded-full p-2 hover:bg-gray-800">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-purple-500"></span>
        </button>

        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image
              src="/images/profile.png"
              alt="Profile"
              width={32}
              height={32}
              className="rounded-full"
            />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">Michael John</p>
            <p className="text-xs text-gray-400">michael@example.com</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
