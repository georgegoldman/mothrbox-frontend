"use client";

import { useSettings } from "@/context/settings-context";
import { Zap, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NetworkIndicator() {
  const { wallet, switchNetwork } = useSettings();
  const isTestnet = wallet.network === 'testnet';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all",
            isTestnet 
                ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20" 
                : "bg-green-500/10 border-green-500/20 text-green-400 hover:bg-green-500/20"
        )}>
            {isTestnet ? <Zap className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
            <span className="uppercase">{wallet.network}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-black border-white/10 text-gray-200">
        <DropdownMenuItem 
            className="cursor-pointer focus:bg-white/5 focus:text-white gap-2"
            onClick={() => switchNetwork('testnet')}
        >
            <Zap className={cn("h-4 w-4", isTestnet ? "text-yellow-400" : "text-gray-500")} />
            Testnet
            {isTestnet && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-yellow-400" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
            className="cursor-pointer focus:bg-white/5 focus:text-white gap-2"
            onClick={() => switchNetwork('mainnet')}
        >
            <Lock className={cn("h-4 w-4", !isTestnet ? "text-green-400" : "text-gray-500")} />
            Mainnet
            {!isTestnet && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
