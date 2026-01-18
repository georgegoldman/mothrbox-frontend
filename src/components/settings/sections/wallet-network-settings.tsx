"use client";

import { useSettings } from "@/context/settings-context";
import { SettingsCard } from "../ui/settings-card";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, RefreshCw, Zap, Lock } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { SettingsSectionProps } from "@/components/settings/types";
import { formatAddress } from "@mysten/sui/utils";

export function WalletNetworkSettings({ className, id }: SettingsSectionProps) {
  const { wallet, switchNetwork } = useSettings();

  const handleNetworkSwitch = async (target: 'testnet' | 'mainnet') => {
    if (wallet.network === target) return;
    
    const toastId = toast.loading(`Switching to ${target}...`);
    try {
      await switchNetwork(target);
      toast.success(`Switched to ${target}`, { id: toastId });
    } catch (e) {
      toast.error("Failed to switch network", { id: toastId });
    }
  };

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
      toast.success("Address copied to clipboard");
    }
  };

  const handleViewExplorer = () => {
    if (!wallet.address) return;
    
    // Use Suiscan for explorer
    const baseUrl = "https://suiscan.xyz";
    const networkPath = wallet.network === 'mainnet' ? 'mainnet' : 'testnet';
    const url = `${baseUrl}/${networkPath}/account/${wallet.address}`;
    
    window.open(url, '_blank');
  };

  return (
    <section id={id} className={cn("space-y-6", className)}>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Wallet & Network</h2>
        <p className="text-gray-400 text-sm">Manage your connected wallet and blockchain network.</p>
      </div>

      <SettingsCard title="Connected Wallet">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-xl font-bold">
                    S
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-white font-mono text-lg">
                            {wallet.address ? formatAddress(wallet.address) : 'Not Connected'}
                        </span>
                        <button onClick={copyAddress} className="text-gray-500 hover:text-white transition-colors">
                            <Copy className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm text-green-400">Connected</span>
                        <span className="text-gray-600 text-xs ml-2">Sui Wallet</span>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col items-end">
                <span className="text-gray-400 text-sm uppercase tracking-wider">Balance</span>
                <span className="text-2xl font-bold text-white">{wallet.balance.toFixed(4)} SUI</span>
                <span className="text-xs text-gray-500 capitalize">{wallet.network}</span>
            </div>
        </div>
        <div className="pt-4 mt-4 border-t border-white/5 flex gap-3">
             <Button 
                variant="outline" 
                className="border-white/10 hover:bg-white/5 text-gray-300"
                onClick={handleViewExplorer}
             >
                <ExternalLink className="mr-2 h-4 w-4" /> View on Explorer
             </Button>

        </div>
      </SettingsCard>

      <SettingsCard title="Network Selection">
         <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
                <div className="bg-white/5 rounded-lg p-1 flex relative">
                    <button 
                        onClick={() => handleNetworkSwitch('testnet')}
                        className={cn(
                            "flex-1 py-10 rounded-md flex flex-col items-center gap-3 transition-all duration-300 border border-transparent",
                            wallet.network === 'testnet' ? "bg-[#7E4BAB]/20 border-[#7E4BAB]/50 shadow-[0_0_15px_rgba(126,75,171,0.2)]" : "hover:bg-white/5"
                        )}
                    >
                        <Zap className={cn("h-8 w-8", wallet.network === 'testnet' ? "text-yellow-400" : "text-gray-500")} />
                        <div className="text-center">
                            <span className={cn("block font-bold", wallet.network === 'testnet' ? "text-white" : "text-gray-400")}>Testnet</span>
                            <span className="text-xs text-gray-500">For testing & development</span>
                        </div>
                        {wallet.network === 'testnet' && (
                            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/20 text-[10px] text-green-400 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Active
                            </div>
                        )}
                    </button>

                    <div className="w-px bg-white/10 mx-1 my-4" />

                    <button 
                        onClick={() => handleNetworkSwitch('mainnet')}
                        className={cn(
                            "flex-1 py-10 rounded-md flex flex-col items-center gap-3 transition-all duration-300 border border-transparent",
                            wallet.network === 'mainnet' ? "bg-[#7E4BAB]/20 border-[#7E4BAB]/50 shadow-[0_0_15px_rgba(126,75,171,0.2)]" : "hover:bg-white/5"
                        )}
                    >
                        <Lock className={cn("h-8 w-8", wallet.network === 'mainnet' ? "text-green-400" : "text-gray-500")} />
                        <div className="text-center">
                            <span className={cn("block font-bold", wallet.network === 'mainnet' ? "text-white" : "text-gray-400")}>Mainnet</span>
                            <span className="text-xs text-gray-500">Production environment</span>
                        </div>
                        {wallet.network === 'mainnet' && (
                            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/20 text-[10px] text-green-400 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Active
                            </div>
                        )}
                    </button>
                </div>
                
                <div className="flex items-start gap-3 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-200/80 text-sm">
                    <RefreshCw className="h-5 w-5 shrink-0 mt-0.5" />
                    <p>Switching networks will refresh your session and reload current data. Your files are safe and accessible on both networks.</p>
                </div>
            </div>


         </div>
      </SettingsCard>
    </section>
  );
}
