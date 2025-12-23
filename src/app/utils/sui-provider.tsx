"use client";

import { createNetworkConfig, SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";

import type { ReactNode } from "react";

// Config options for the networks you want to connect to
const { networkConfig } = createNetworkConfig({
	localnet: { url: getFullnodeUrl("localnet") },
	mainnet: { url: getFullnodeUrl("mainnet") },
});



export function SuiProvider({ children }: { children: ReactNode }) {
	return (
		<SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
			<WalletProvider autoConnect>{children}</WalletProvider>
		</SuiClientProvider>
	);
}
