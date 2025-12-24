"use client";

import { Check } from "lucide-react";

interface PricingTier {
  name: string;
  description: string;
  price: string;
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
    price: "Free",
    features: [
      "100 MB storage",
      "10 uploads/month",
      "30-day retention",
      "Community support",
    ],
    buttonText: "Current Plan",
    recommended: false,
  },
  {
    name: "STARTER",
    description: "For personal use",
    price: "$9",
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
    price: "$29",
    period: "/month",
    features: [
      "50 GB storage",
      "Unlimited uploads",
      "1-year retention",
      "Priority support",
      "API access (1000 calls/month)",
    ],
    buttonText: "Upgrade",
    recommended: true,
    highlightColor: "text-purple-400",
  },
  {
    name: "BUSINESS",
    description: "For teams & scale",
    price: "$99",
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

export function PricingSection() {
  return (
    <div className="w-full py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400 md:text-lg">
            Choose the perfect plan for your needs. Always know what you'll pay.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border bg-black p-6 transition-transform duration-300 hover:-translate-y-1 ${
                tier.recommended
                  ? "border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.15)]"
                  : "border-gray-800"
              }`}
            >
              {tier.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-purple-600 px-4 py-1 text-xs font-bold tracking-wider text-white uppercase sm:px-6">
                  Recommended
                </span>
              )}

              <div className="mb-5 text-center">
                <h3 className={`text-sm font-bold tracking-widest uppercase ${tier.recommended ? "text-purple-400" : "text-gray-300"}`}>
                  {tier.name}
                </h3>
              </div>

              <div className="mb-6 flex items-baseline justify-center">
                <span className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="ml-1 text-sm font-medium text-gray-400">
                    {tier.period}
                  </span>
                )}
              </div>

              {/* Google-like feature list styling */}
              <ul className="mb-8 flex-1 space-y-4 pr-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`mt-0.5 h-5 w-5 flex-shrink-0 ${tier.recommended ? "text-purple-500" : "text-gray-500"}`} />
                    <span className="text-sm leading-tight text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-auto w-full rounded-full py-3 text-sm font-bold transition-all ${
                  tier.recommended
                    ? "bg-purple-600 text-white shadow-lg hover:bg-purple-700"
                    : "border border-gray-700 bg-transparent text-white hover:border-gray-500 hover:bg-white/5"
                }`}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
