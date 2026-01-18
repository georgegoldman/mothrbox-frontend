"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ApiKeysPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header follows the full-width layout pattern */}
      <Header title="API Key Management" subtitle="Developer Tools" />

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
        {/* Background ambient effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg space-y-8">
          
          {/* Icon Container */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full blur-xl opacity-20 animate-pulse" />
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl">
              <Construction className="w-16 h-16 text-purple-400" />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Coming Soon
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed border-l-2 border-purple-500/50 pl-4 text-left md:text-center md:border-l-0 md:pl-0">
              API Key Management is scheduled for <span className="text-purple-300 font-medium">the next phase</span>. 
              <br className="hidden md:block" />
              We are currently focusing on the core Cloud Platform MVP.
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
             <Link href="/dashboard" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full bg-transparent border-gray-700 hover:bg-white/5 hover:text-white gap-2">
                    <ArrowLeft className="w-4 h-4" /> Return to Dashboard
                </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}
