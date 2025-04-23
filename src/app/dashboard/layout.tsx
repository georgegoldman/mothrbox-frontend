"use client";

import Sidebar from "@/components/Sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
// import "bootstrap/dist/css/bootstrap.min.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="d-flex">
        {/* Sidebar / Vertical Nav */}
        <div
          className="bg-black col-md-2 text-white "
          style={{  height: "100vh" }}
        >
          <div className="p-4 d-flex justify-content-between align-items-center bg-black border border-light-emphasis" style={{height: "100px", 
            
          }}>
            <div className=""><img src="/images/logo.png" alt="mothrbox_logo" /></div>
            <div className=""><img src="/images/si_dashboard-vert-line.png" alt="" /></div>
          </div>
          <Sidebar />
        </div>      {/* Main content */}
        <main className="flex-grow-1 bg-black border border-start" style={{ minHeight: "100vh" }}>          
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
