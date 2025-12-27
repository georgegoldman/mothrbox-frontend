"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { HermesClient } from "@pythnetwork/hermes-client";

interface PricingTier {
  name: string;
  description: string;
  priceUSD: number; // Changed from string to number for calculation
  priceDisplay: string; // Original string for fallback/display
  period?: string;
  features: string[];
  buttonText: string;
  recommended: boolean;
  highlightColor?: string;
}

const tiers: PricingTier[] = [
  {
    name: "FREE TIER",
    description: "Lead Generation",
    priceUSD: 0,
    priceDisplay: "Free",
    features: [
      "100 MB storage",
      "10 uploads/month",
      "30-day retention",
      "Community support",
    ],
    buttonText: "Current Plan",
    recommended: true,
  },
  {
    name: "STARTER",
    description: "For personal use",
    priceUSD: 9,
    priceDisplay: "$9",
    period: "/month",
    features: [
      "5 GB storage",
      "Unlimited uploads",
      "90-day retention",
      "Email support",
    ],
    buttonText: "Upgrade",
    recommended: false,
  },
  {
    name: "PRO",
    description: "For professionals",
    priceUSD: 29,
    priceDisplay: "$29",
    period: "/month",
    features: [
      "50 GB storage",
      "Unlimited uploads",
      "1-year retention",
      "Priority support",
      "API access (1000 calls/month)",
    ],
    buttonText: "Upgrade",
    recommended: false,
    highlightColor: "text-purple-400",
  },
  {
    name: "BUSINESS",
    description: "For teams & scale",
    priceUSD: 99,
    priceDisplay: "$99",
    period: "/month",
    features: [
      "500 GB storage",
      "Unlimited uploads",
      "Permanent storage",
      "Phone/chat support",
      "Full API access (unlimited)",
      "White-label option",
    ],
    buttonText: "Contact Sales",
    recommended: false,
  },
];

const SUI_PRICE_FEED_ID =
  "0x23d7315113f5b1d3ba7a83604c44b94d79f4fd69af77f804fc7f920a6dc65744";

export function PricingSection() {
  const [suiPrice, setSuiPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuiPrice = async () => {
      try {
        const connection = new HermesClient("https://hermes.pyth.network", {});
        const priceUpdates = await connection.getLatestPriceUpdates([
          SUI_PRICE_FEED_ID,
        ]);

        if (priceUpdates.parsed && priceUpdates.parsed.length > 0) {
          const feed = priceUpdates.parsed[0];
          if (feed) {
            const price = feed.price;
            // Pyth price is price * 10^expo
            const realPrice = Number(price.price) * Math.pow(10, price.expo);
            setSuiPrice(realPrice);
          }
        }
      } catch (error) {
        console.error("Failed to fetch SUI price:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuiPrice();
  }, []);

  return (
    <div className="w-full py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400 md:text-lg">
            Choose the perfect plan for your needs. Always know what you'll pay.
            {suiPrice && (
              <span className="block mt-2 text-sm text-purple-400">
                Live SUI Price: ${suiPrice.toFixed(4)}
              </span>
            )}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-4">
          {tiers.map((tier) => {
            const isFree = tier.priceUSD === 0;
            const isDeactivated = !isFree; // Deactivate all paid plans for testnet
            let displayPrice = tier.priceDisplay;
            
            if (!isFree && suiPrice) {
               // Calculate SUI amount: USD Price / SUI Price
               const suiAmount = (tier.priceUSD / suiPrice).toFixed(2);
               displayPrice = `${suiAmount} SUI`;
            }

            return (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-2xl border bg-black p-6 transition-transform duration-300 ${
                  isDeactivated 
                    ? "border-gray-800 opacity-50 grayscale cursor-not-allowed" 
                    : "hover:-translate-y-1"
                } ${
                  tier.recommended && !isDeactivated
                    ? "border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
                    : "border-gray-800"
                }`}
              >
                {tier.recommended && !isDeactivated && tier.name !== "FREE TIER" && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-4 py-1 text-xs font-bold tracking-wider text-white uppercase sm:px-6">
                    Recommended
                  </span>
                )}

                <div className="mb-5 text-center">
                  <h3
                    className={`text-sm font-bold tracking-widest uppercase ${tier.recommended && !isDeactivated ? "text-purple-400" : "text-gray-300"}`}
                  >
                    {tier.name}
                  </h3>
                </div>

                <div className="mb-6 flex items-baseline justify-center gap-1">
                  {loading && !isFree ? (
                     <div className="h-10 w-24 animate-pulse rounded bg-gray-800" />
                  ) : (
                    <>
                      <span className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                        {isFree ? "Free" : (suiPrice ? (tier.priceUSD / suiPrice).toFixed(2) : tier.priceDisplay)}
                      </span>
                      {!isFree && suiPrice && (
                        <span className="text-xl font-bold text-gray-400">
                          SUI
                        </span>
                      )}
                    </>
                  )}
                  {tier.period && (
                    <span className="ml-1 text-sm font-medium text-gray-400">
                      {tier.period}
                    </span>
                  )}
                </div>
                 
                 {/* Show USD equivalent if paying in SUI */}
                 {!isFree && suiPrice && (
                    <p className="mb-4 text-center text-sm text-gray-500">
                        ≈ ${tier.priceUSD} USD
                    </p>
                 )}

                {/* Google-like feature list styling */}
                <ul className="mb-8 flex-1 space-y-4 pr-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`mt-0.5 h-5 w-5 flex-shrink-0 ${tier.recommended && !isDeactivated ? "text-purple-500" : "text-gray-500"}`}
                      />
                      <span className="text-sm leading-tight text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  disabled={isDeactivated}
                  className={`mt-auto w-full rounded-full py-3 text-sm font-bold transition-all ${
                    isDeactivated
                      ? "cursor-not-allowed border border-gray-800 bg-transparent text-gray-500"
                      : tier.recommended
                      ? "bg-purple-600 text-white shadow-lg hover:bg-purple-700"
                      : "border border-gray-700 bg-transparent text-white hover:border-gray-500 hover:bg-white/5"
                  }`}
                >
                  {isDeactivated ? "Coming Soon" : tier.buttonText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
