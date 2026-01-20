/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Header } from "@/components/header";
import { HeroStats } from "@/components/dashboard/overview/hero-stats";
import { QuickActions } from "@/components/dashboard/overview/quick-actions";
import { AnalyticsSection } from "@/components/dashboard/overview/analytics-section";
import { ActivityTable } from "@/components/dashboard/overview/activity-table";
import { useUser } from "../contexts/user-context";

export default function OverviewPage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        title="Dashboard"
        subtitle={`Welcome back, ${user?.username || 'User'}`}
      />

      <div className="flex-1 space-y-8 p-4 md:p-8">
        {/* 1. Hero Stats Section */}
        <section>
             <HeroStats />
        </section>

        {/* 2. Quick Actions */}
        <section>
            <QuickActions />
        </section>

        {/* 3. Analytics & Performance */}
        <section>
            <AnalyticsSection />
        </section>

        {/* 4. Activity History */}
        <section>
            <ActivityTable />
        </section>
      </div>
    </div>
  );
}
