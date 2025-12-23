"use client";

import { Bell, LoaderCircle, PanelLeft } from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";
import { useUser } from "@/app/contexts/user-context";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { formatAddress } from "@mysten/sui/utils";


interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { toggleSidebar } = useSidebar();

  const { user, initials, loading } = useUser();
  const currentAccount = useCurrentAccount();


  return (
    <header className="flex h-[72.67px] border-b border-gray-800 p-2 md:flex-row md:items-center md:justify-between md:p-4">
      <div className="mx-auto flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
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
          <button className="relative rounded-full p-2 hover:bg-gray-800">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-purple-500"></span>
          </button>
        </div>
      </div>

      <div className="hidden items-center gap-4 md:flex">
        <button className="relative rounded-full p-2 hover:bg-gray-800">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-purple-500"></span>
        </button>

        {loading ? (
          // Show a loading indicator or placeholder
          <div className="flex items-center gap-2">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border bg-gray-300 font-bold text-white">
              {/* Optional: show a spinner or placeholder */}
              <LoaderCircle className="animate-spin" />{" "}
              {/* You can style this as a spinner */}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Loading User data</p>
            </div>
          </div>
        ) : user ? (
          // Show user info when user data is available
          <div className="flex items-center gap-2">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border bg-teal-700 font-bold text-white">
              {initials}
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user.username}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>
        ) : (
          // Optional: handle case when user is null and not loading
          // If no user but wallet is connected, show wallet info
          currentAccount ? (
            <div className="flex min-w-[200px] items-center gap-3 rounded-full border border-gray-200 px-2 py-1">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border bg-purple-700 font-bold text-white">
                W
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">
                  {formatAddress(currentAccount.address)}
                </p>
                <p className="text-xs text-gray-400">Connected Wallet</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border bg-gray-200 font-bold text-white">
                {/* Placeholder for no user */}?
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">No user data</p>
              </div>
            </div>
          )
        )}
      </div>
    </header>
  );
}
