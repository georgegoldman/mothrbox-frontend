"use client";

import React, { useState } from "react";
import { useCurrentAccount, ConnectButton } from "@mysten/dapp-kit";
import {
  ChevronDown,
  Copy,
  Eye,
  EyeOff,
  ExternalLink,
  Search,
  Edit3,
  Settings,
  Plus,
  Plug,
  Download,
  Key,
  Eye as EyeIcon,
  X,
  Wallet,
} from "lucide-react";
import { Header } from "@/components/header";
import { HistoryLog } from "@/components/history-log";
import Link from "next/link";
import { useHistoryData } from "@/hooks/use-history-data";

const WalletPage = () => {
  const currentAccount = useCurrentAccount();
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isCreatingNewAccount, setIsCreatingNewAccount] = useState(false);
  const { historyItems, loading: historyLoading } = useHistoryData();

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText("OVHz...FGHB6fg");
      // You can add a toast notification here
    } catch (error) {
      console.error("Failed to copy address:", error);
    }
  };

  const handleCreateNewAccount = () => {
    setIsSettingsModalOpen(false);
    setIsCreatingNewAccount(true);
  };

  const handleCloseNewAccount = () => {
    setIsCreatingNewAccount(false);
  };

  if (!currentAccount) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header title="Wallet" subtitle="Manage your wallet" />
        <div className="flex h-[80vh] flex-col items-center justify-center p-4">
          <div className="mb-8 text-center">
             <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-900/30">
                <Wallet className="h-10 w-10 text-purple-400" />
             </div>
             <h2 className="mb-2 text-2xl font-bold">Connect Your Wallet</h2>
             <p className="max-w-md text-gray-400">
               Connect your Sui wallet to view your balance, manage assets, and track your transaction history.
             </p>
          </div>
          <ConnectButton className="!bg-[#7D78FF] !text-white !rounded-xl !px-8 !py-4 !text-base !font-bold hover:!opacity-90 transition-all" />
        </div>
      </div>
    );
  }

  // New Account Creation Component
  const NewAccountCreation = () => (
    <div className="flex min-h-screen flex-col justify-between bg-background p-4 sm:p-6">
      <div className="mx-auto w-full max-w-md">
        {/* Header with close button */}
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <h4 className="text-xl font-semibold text-white sm:text-2xl">
            Create Account
          </h4>
          <button
            onClick={handleCloseNewAccount}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFFFFF54] hover:bg-[#FFFFFF70] sm:h-10 sm:w-10"
          >
            <X className="h-4 w-4 text-white sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* New Account Component */}
        <div className="flex w-full items-center justify-between rounded-lg bg-[#7D78FF] p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-white sm:text-xl">
            Account 3
          </h3>
          <button
            onClick={handleCloseNewAccount}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFFFFF54] hover:bg-[#FFFFFF70] sm:h-10 sm:w-10"
          >
            <X className="h-4 w-4 text-white sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      <div className="mx-auto w-full max-w-md">
        <button className="w-full cursor-pointer rounded-lg bg-[#7D78FF] p-3 text-sm font-medium text-white sm:p-4 sm:text-base">
          Create
        </button>
      </div>
    </div>
  );

  // Settings Modal Component
  const SettingsModal = () => {
    if (!isSettingsModalOpen) return null;

    const modalOptions = [
      {
        icon: Plus,
        title: "Create new account",
        subtitle: "Add a new multi-chain account",
      },
      {
        icon: Plug,
        title: "Connect hardware wallet",
        subtitle: "Use your ledger hardware wallet",
      },
      {
        icon: Download,
        title: "Import secret recovery phrase",
        subtitle: "Import accounts from another wallet",
      },
      {
        icon: Key,
        title: "Import Private-key",
        subtitle: "Import a single-chain account",
      },
      {
        icon: EyeIcon,
        title: "Watch address",
        subtitle: "Track any public wallet address",
      },
    ];

    return (
      <div className="fixed inset-0 z-50 flex items-start justify-end p-2 sm:p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsSettingsModalOpen(false)}
        />

        {/* Modal */}
        <div className="relative w-full max-w-sm rounded-lg bg-[#7D78FF] p-3 shadow-lg sm:w-[599px] sm:p-4">
          {/* Close Button */}
          <button
            onClick={() => setIsSettingsModalOpen(false)}
            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#FFFFFF54] sm:h-[50px] sm:w-[50px]"
          >
            <X className="h-4 w-4 text-[#fff]" />
          </button>

          {/* Modal Options */}
          <div className="space-y-1 pt-12 sm:pt-[5rem]">
            {modalOptions.map((option, index) => (
              <div key={index}>
                <button
                  className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-left sm:gap-3 sm:p-3"
                  onClick={
                    option.title === "Create new account"
                      ? handleCreateNewAccount
                      : undefined
                  }
                >
                  <div className="flex h-6 w-6 items-center justify-center sm:h-8 sm:w-8">
                    <option.icon className="h-4 w-4 text-[#fff] sm:h-5 sm:w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#fff] sm:text-base">
                      {option.title}
                    </div>
                    <div className="text-xs text-[#fff]/70 sm:text-sm">
                      {option.subtitle}
                    </div>
                  </div>
                </button>
                {index < modalOptions.length - 1 && (
                  <div className="mx-2 h-px bg-[#7D78FF]/20 sm:mx-3" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Dropdown component
  const AccountDropdown = () => (
    <div className="flex min-h-screen flex-col gap-4 bg-background p-4 sm:gap-6 sm:p-6">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold text-white sm:text-2xl">
          Your Account
        </h4>
        <button
          className="cursor-pointer"
          onClick={() => setIsSettingsModalOpen(true)}
        >
          <Settings className="h-5 w-5 sm:h-[20px] sm:w-[20px]" />
        </button>
      </div>
      <div className="max-w-full">
        {/* Header Section */}
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 sm:h-8 sm:w-8">
              <span className="text-xs font-semibold text-white">A</span>
            </div>
            <span className="text-sm text-white sm:text-base">@Gabriella</span>
          </div>
          <button className="text-white hover:text-gray-300">
            <span className="text-xs sm:text-sm">View profile</span>
          </button>
        </div>

        {/* Account Cards */}
        <div className="space-y-3 sm:space-y-4">
          {/* Purple Account Card */}
          <div className="flex items-center justify-between rounded-2xl bg-[#7D78FF] p-3 sm:p-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 sm:h-12 sm:w-12">
                <span className="text-base font-semibold text-white sm:text-lg">
                  A
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-white sm:text-base">
                  Account 1
                </div>
                <div className="text-xs text-white sm:text-sm">$0.00</div>
              </div>
            </div>
            <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-600 hover:bg-gray-500 sm:h-8 sm:w-8">
              <Edit3 className="h-3 w-3 text-white sm:h-4 sm:w-4" />
            </button>
          </div>

          {/* White Account Card */}
          <div className="flex items-center justify-between rounded-2xl bg-[#FFFFFF0F] p-3 text-white sm:p-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500 sm:h-12 sm:w-12">
                <span className="text-base font-semibold text-white sm:text-lg">
                  A
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-white sm:text-base">
                  Account 2
                </div>
                <div className="text-xs text-white sm:text-sm">$0.00</div>
              </div>
            </div>
            <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-600 hover:bg-gray-500 sm:h-8 sm:w-8">
              <Edit3 className="h-3 w-3 text-white sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Main wallet component
  const WalletContent = () => (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="flex max-w-full flex-col items-center justify-center">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-2 flex items-center gap-2 sm:gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 sm:h-10 sm:w-10">
              <span className="text-xs font-semibold text-white sm:text-sm">
                A
              </span>
            </div>
            <div className="m-auto flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white sm:text-base">
                  Account 1
                </span>
                <button
                  onClick={() =>
                    setIsAccountDropdownOpen(!isAccountDropdownOpen)
                  }
                  className="cursor-pointer text-white"
                >
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-white sm:text-sm">
                  OVHz...FGHB6fg
                </span>
                <button
                  onClick={copyAddress}
                  className="text-white hover:text-gray-300"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Section */}
        <div className="mb-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-2 sm:gap-3">
            <span className="text-2xl font-bold text-white sm:text-4xl">
              {isBalanceVisible ? "$0.00" : "••••••"}
            </span>
            <button
              onClick={toggleBalanceVisibility}
              className="text-white hover:text-gray-300"
            >
              {isBalanceVisible ? (
                <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-white sm:text-sm">
              $0.00 (+0.00%)
            </span>
            <button className="flex items-center gap-1 text-[#7D78FF] hover:text-blue-400">
              <span className="text-xs sm:text-sm">Portfolio</span>
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {/* Search Card */}
          <div className="flex h-[120px] items-center justify-center rounded-2xl bg-[#7D78FF] p-4 sm:h-[146px] sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 sm:h-12 sm:w-12">
                <Search className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-white sm:text-sm">
                  Search from Explore to find new tokens faster.
                </p>
              </div>
            </div>
          </div>

          {/* Placeholder Cards */}
          <div className="flex h-[120px] items-center justify-center rounded-2xl bg-[#FFFFFF14] p-4 sm:h-[146px] sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 sm:h-12 sm:w-12">
                <Search className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-white sm:text-sm">
                  Search from Explore to find new tokens faster.
                </p>
              </div>
            </div>
          </div>
          <div className="flex h-[120px] items-center justify-center rounded-2xl bg-[#FFFFFF14] p-4 sm:h-[146px] sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 sm:h-12 sm:w-12">
                <Search className="h-5 w-5 text-white sm:h-6 sm:w-6" />
              </div>
              <div>
                <p className="text-xs font-medium text-white sm:text-sm">
                  Search from Explore to find new tokens faster.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 sm:mt-8">
        {historyLoading ? (
          <div className="flex h-48 items-center justify-center rounded-xl bg-gray-800 sm:h-64">
            <div className="text-center">
              <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-4 border-gray-600 border-t-purple-600 sm:h-8 sm:w-8"></div>
              <p className="text-sm text-gray-400 sm:text-base">
                Loading history data...
              </p>
            </div>
          </div>
        ) : (
          <HistoryLog items={historyItems.slice(0, 5)} />
        )}

        <div className="mt-3 flex justify-center sm:mt-4 sm:justify-end">
          <Link
            href="/dashboard/logs"
            className="inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-purple-700 sm:px-4 sm:text-sm"
          >
            View All History
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header title="Wallet" subtitle="Manage your wallet" />
      {isCreatingNewAccount ? (
        <NewAccountCreation />
      ) : isAccountDropdownOpen ? (
        <AccountDropdown />
      ) : (
        <WalletContent />
      )}
      <SettingsModal />
    </>
  );
};

export default WalletPage;
