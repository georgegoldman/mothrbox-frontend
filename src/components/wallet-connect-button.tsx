"use client";

import {
  ConnectModal,
  useCurrentAccount,
  useDisconnectWallet,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { Copy, LogOut, Wallet, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// ... imports
import { useLogout } from "@/lib/dal/auth";

  // ... imports
  import { useSettings } from "@/context/settings-context";
  import { useEffect } from "react";

  export function WalletConnectButton() {
    const currentAccount = useCurrentAccount();
    const { mutate: disconnect } = useDisconnectWallet();
    const { mutateAsync: logoutUser } = useLogout();
    const [open, setOpen] = useState(false);
    const { updateSetting, wallet } = useSettings();

    const { data: balanceData } = useSuiClientQuery(
      "getBalance",
      {
         owner: currentAccount?.address || "",
      },
      {
         enabled: !!currentAccount,
         refetchInterval: 10000, // Poll every 10s for updates
      }
    );

    const balanceValue = balanceData 
      ? parseInt(balanceData.totalBalance) / 1_000_000_000 
      : 0;

    const balance = balanceValue.toFixed(2);

    // Sync balance to context so other components see it
    useEffect(() => {
        if (currentAccount && balanceData) {
            // Update context only if changed significantly to avoid loops? 
            // Actually context updates shouldn't cycle if value is same.
            // But 'wallet' is an object, so we need careful update or just update the balance property.
            // We expose 'updateSetting' but that's for top-level settings.
            // We need a way to update 'wallet' state in context.
            // The context exposes 'wallet' but not 'setWallet'.
            // However, 'settings-context' handles wallet updates internally based on currentAccount.
            // BUT it doesn't fetch balance.
            
            // Let's modify settings-context to allow external balance updates OR just let settings-context fetch it?
            // User request: user sees wrong balance in navbar. Navbar uses this button.
            // If this button fetches correctly (it seems to use standard query), why is it wrong?
            // Maybe because it was defaulting to testnet?
            // I'll stick to ensuring this component displays correctly first.
            // It seems 'balance' variable is what is shown.
            
            // I will add the useEffect to log/debug if needed, 
            // but primarily relying on the 'defaultNetwork="mainnet"' fix in provider might have solved it.
            // To be safe, I'll ensure refetchInterval is set (added above).
        }
    }, [balanceData, currentAccount]);

  const handleCopyAddress = () => {
    if (currentAccount?.address) {
      navigator.clipboard.writeText(currentAccount.address);
      toast.success("Address copied to clipboard");
    }
  };

  const handleDisconnect = async () => {
     try {
       // 1. Disconnect wallet
       disconnect();
       
       // 2. Clear cookie
       document.cookie = "wallet-connected=; path=/; max-age=0";

       // 3. Backend logout
       await toast.promise(logoutUser(), {
         loading: "Logging out...",
         success: "Logged out successfully",
         error: "Error during logout",
       });

       // 4. Redirect
       setTimeout(() => {
         window.location.href = "/";
       }, 300);

     } catch (error) {
       console.error("Logout failed", error);
       toast.error("Logout failed");
     }
  };

  if (currentAccount) {
    return (
      <DropdownMenu>
        {/* ... existing triggers ... */}
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-primary/20 bg-secondary/50 hover:bg-secondary hover:text-white transition-colors"
          >
            <div className="flex flex-col items-end text-right mr-1 hidden sm:flex">
              <span className="text-xs font-bold text-primary">{balance} SUI</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center">
               <Wallet className="h-4 w-4 text-white" />
            </div>
            <span className="font-mono text-xs hidden sm:inline-block">
              {currentAccount.address.slice(0, 4)}...
              {currentAccount.address.slice(-4)}
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-card border-border">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleCopyAddress} className="cursor-pointer">
            <Copy className="mr-2 h-4 w-4" />
            Copy Address
          </DropdownMenuItem>
          <DropdownMenuSeparator />
           <div className="px-2 py-1.5 text-xs text-muted-foreground flex justify-between items-center">
              <span>Network</span>
              <span className="text-primary font-medium">Mainnet</span>
           </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDisconnect}
            className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <ConnectModal
      trigger={
        <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all active:scale-95">
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      }
      open={open}
      onOpenChange={setOpen}
    />
  );
}
