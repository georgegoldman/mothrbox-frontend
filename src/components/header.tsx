"use client";

import { Bell, LoaderCircle, PanelLeft } from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";
import { useUser } from "@/app/contexts/user-context";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { formatAddress } from "@mysten/sui/utils";
import { WalletConnectButton } from "@/components/wallet-connect-button";
import { NetworkIndicator } from "@/components/dashboard/network-indicator";


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

        <NetworkIndicator />
        <WalletConnectButton />
      </div>
    </header>
  );
}
