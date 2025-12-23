"use client";

import { useCurrentAccount } from "@mysten/dapp-kit";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function WalletAuthListener() {
  const account = useCurrentAccount();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (account) {
      // Set a cookie to indicate wallet is connected
      // determining domain/path to ensure it works for middleware
      document.cookie = "wallet-connected=true; path=/; max-age=86400; samesite=lax";

      // Redirect logic
      if (pathname === "/" || pathname.startsWith("/auth")) {
        router.push("/dashboard");
      }
    } else {
        // Optional: clear cookie if disconnected?
        // document.cookie = "wallet-connected=; path=/; max-age=0";
    }
  }, [account, pathname, router]);

  return null;
}
