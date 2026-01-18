"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { SettingsState, NetworkType, ThemeType, NotificationPreferences, WalletState } from "@/components/settings/types";
import { toast } from "sonner";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { formatAddress } from "@mysten/sui/utils";

interface SettingsContextType extends SettingsState {
  wallet: WalletState;
  updateTheme: (theme: ThemeType) => void;
  switchNetwork: (network: NetworkType) => Promise<void>;
  updateNotifications: (prefs: Partial<NotificationPreferences>) => void;
  updateSetting: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void;
}

const defaultSettings: SettingsState = {
  theme: 'dark',
  accentColor: 'purple',
  defaultAlgorithm: 'AES-256-GCM',
  autoLogoutMinutes: 30,
  storage: { usedBytes: 7.2 * 1024 * 1024 * 1024, totalBytes: 10 * 1024 * 1024 * 1024, fileCount: 143 }, // Mock data
  notifications: {
    encryption: true,
    decryption: true,
    lowStorage: true,
    lowBalance: true,
    networkStatus: true,
    failedTransactions: true,
    updates: false,
  },
  isDevMode: false,
  rpcEndpoint: null,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const currentAccount = useCurrentAccount();
  
  // Wallet state separate from persisted settings
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    balance: 0,
    network: 'testnet',
  });

  // Sync with real wallet
  useEffect(() => {
    if (currentAccount) {
      setWallet(prev => ({
        ...prev,
        address: currentAccount.address,
        isConnected: true,
        // Keep existing mock balance for now or fetch real one later
        balance: prev.balance === 0 ? 45.2341 : prev.balance 
      }));
    } else {
      setWallet(prev => ({
        ...prev,
        address: null,
        isConnected: false
      }));
    }
  }, [currentAccount]);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('mothrbox-settings');
    if (saved) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) });
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('mothrbox-settings', JSON.stringify(settings));
  }, [settings]);

  const updateTheme = (theme: ThemeType) => {
    setSettings(prev => ({ ...prev, theme }));
    // Ideally update document class here
  };

  const switchNetwork = async (targetNetwork: NetworkType) => {
    if (wallet.network === targetNetwork) return;

    // Simulate network switch
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setWallet(prev => ({
          ...prev,
          network: targetNetwork,
          balance: targetNetwork === 'mainnet' ? 124.50 : 45.2341 // Mock balance change
        }));
        resolve();
      }, 1500);
    });
  };

  const updateNotifications = (prefs: Partial<NotificationPreferences>) => {
    setSettings(prev => ({
      ...prev, 
      notifications: { ...prev.notifications, ...prefs }
    }));
  };

  const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{
      ...settings,
      wallet,
      updateTheme,
      switchNetwork,
      updateNotifications,
      updateSetting
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
