import type { ReactNode } from "react";
import BackToHome from "@/components/back-to-home";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 md:py-12">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-xl space-y-6">
          <div className="w-full">
            <BackToHome />
          </div>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
