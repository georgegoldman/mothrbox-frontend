import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 md:py-12">
      <div className="w-full max-w-xl">
        {/* <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Cryptix
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Secure your data with confidence
          </p>
        </div> */}
        {children}
      </div>
    </div>
  );
}
