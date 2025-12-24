"use client";

import { Header } from "@/components/header";
import { PricingSection } from "@/components/pricing-section";

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        title="Subscription"
        subtitle="Choose the plan that fits your needs"
      />
      
      {/* Remove padding from wrapper if PricingSection handles it, or adjust */}
      <div className="-mt-8">
        <PricingSection />
      </div>
    </div>
  );
}
