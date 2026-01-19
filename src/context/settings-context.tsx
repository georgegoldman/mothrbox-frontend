"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { SettingsState, NetworkType, ThemeType, NotificationPreferences, WalletState } from "@/components/settings/types";
import { toast } from "sonner";
import { useCurrentAccount, useSuiClientContext } from "@mysten/dapp-kit";
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
  const { network, selectNetwork: selectSuiNetwork } = useSuiClientContext();
  
  // Wallet state separate from persisted settings
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    balance: 0,
    network: 'mainnet',
  });

  // Sync with real wallet
  useEffect(() => {
    if (currentAccount) {
      setWallet(prev => ({
        ...prev,
        address: currentAccount.address,
        isConnected: true,
        // Sync network from dApp kit context
        network: (network as NetworkType) || 'mainnet',
      }));
    } else {
      setWallet(prev => ({
        ...prev,
        address: null,
        isConnected: false,
        balance: 0,
        network: (network as NetworkType) || 'mainnet', 
      }));
    }
  }, [currentAccount, network]);

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

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(settings.theme);
  }, [settings.theme]);

  const updateTheme = (theme: ThemeType) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const switchNetwork = async (targetNetwork: NetworkType) => {
    // If user requests a switch via our UI, we tell dApp kit to switch.
    if (network !== targetNetwork) {
        selectSuiNetwork(targetNetwork);
    }
    
    // We update local state to reflect immediately, though useEffect will also catch it.
    setWallet(prev => ({
      ...prev,
      network: targetNetwork
    }));
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
