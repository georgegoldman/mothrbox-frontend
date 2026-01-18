import type { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function NormalLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col bg-[#000000] text-white">
      <Navbar />

      <div className="min-h-screen flex-1">{children}</div>
      <Footer />
    </main>
  );
}
