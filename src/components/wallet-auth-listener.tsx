"use client";

import { useCurrentAccount } from "@mysten/dapp-kit";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function WalletAuthListener() {
  const currentAccount = useCurrentAccount();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (currentAccount) {
      // Set a cookie so middleware knows we're logged in
      document.cookie = "wallet-connected=true; path=/; max-age=86400"; // 1 day

      // Redirect if on login/signup pages
      if (
        pathname === "/auth" ||
        pathname.startsWith("/auth/login") ||
        pathname.startsWith("/auth/signup")
      ) {
        router.push("/dashboard");
      }
    } else {
      // Clear cookie if disconnected
      document.cookie = "wallet-connected=; path=/; max-age=0";
    }
  }, [currentAccount, router, pathname]);

  return null;
}
