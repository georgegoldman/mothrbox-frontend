"use client";

import { Header } from "@/components/header";
import { Check } from "lucide-react";

const tiers = [
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

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        title="Subscription"
        subtitle="Choose the plan that fits your needs"
      />

      <div className="p-4 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all hover:border-purple-500 ${
                tier.recommended
                  ? "border-purple-500 bg-gray-900/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                  : "border-gray-800 bg-gray-900/20"
              }`}
            >
              {tier.recommended && (
                <div className="absolute top-0 right-0 -mt-3 mr-3 rounded-full bg-purple-600 px-3 py-1 text-xs font-bold text-white">
                  Recommended
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-bold text-purple-400">
                  {tier.name}
                </h3>
                <p className="text-sm text-gray-400">{tier.description}</p>
              </div>

              <div className="mb-6 flex items-baseline">
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.period && (
                  <span className="ml-1 text-sm text-gray-400">
                    {tier.period}
                  </span>
                )}
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-500" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full rounded-xl py-3 text-sm font-bold transition-all ${
                  tier.recommended
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "border border-gray-700 bg-transparent text-white hover:bg-white/5 hover:text-purple-400"
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
