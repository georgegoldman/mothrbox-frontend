"use client";

import { LoaderCircle, PanelLeft } from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";
import { useUser } from "@/app/contexts/user-context";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { formatAddress } from "@mysten/sui/utils";
import { WalletConnectButton } from "@/components/wallet-connect-button";
import { NetworkIndicator } from "@/components/dashboard/network-indicator";


interface HeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function Header({ title, subtitle, children }: HeaderProps) {
  const { toggleSidebar } = useSidebar();

  const { user, initials, loading } = useUser();
  const currentAccount = useCurrentAccount();


  return (
    <header className="flex h-[72.67px] border-b border-gray-800 p-2 md:flex-row md:items-center md:justify-between md:p-4 w-full max-w-[100vw] overflow-hidden">
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


      </div>




      <div className="hidden items-center gap-4 md:flex">
        {children}
        <NetworkIndicator />
        <WalletConnectButton />
      </div>
    </header>
  );
}
