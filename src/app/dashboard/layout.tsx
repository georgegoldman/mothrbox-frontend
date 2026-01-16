import type React from "react";
import { Sidebar } from "@/components/sidebar";
import { SettingsProvider } from "@/context/settings-context";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { UserProvider } from "../contexts/user-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <SettingsProvider>
       <SidebarProvider>
        <Sidebar>
          <div className="flex min-h-screen flex-col overflow-x-hidden text-white">
            <main className="relative flex-1 bg-black">{children}</main>
          </div>
        </Sidebar>
       </SidebarProvider>
      </SettingsProvider>
    </UserProvider>
  );
}
