import type { ReactNode } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function NormalLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col bg-[#000000] text-white">
      <div className="mb-5 pt-5 md:mb-10">
        <Navbar />
      </div>

      <div className="min-h-screen flex-1">{children}</div>
      <div className="mt-5 md:mt-10">
        <Footer />
      </div>
    </main>
  );
}
