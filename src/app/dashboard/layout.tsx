import type React from "react";
import { Sidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { UserProvider } from "../contexts/user-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <SidebarProvider>
        <Sidebar>
          <div className="flex min-h-screen flex-col text-white">
            <main className="flex-1 bg-black">{children}</main>
          </div>
        </Sidebar>
      </SidebarProvider>
    </UserProvider>
  );
}
