"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackToHome({ className }: { className?: string }) {
  const router = useRouter();

  const backToHome = () => {
    router.push("/");
  };
  return (
    <div
      onClick={backToHome}
      className={cn(
        "group flex items-center gap-x-2 text-sm font-medium text-gray-600 transition-colors hover:text-black",
        "hover:cursor-pointer hover:underline hover:underline-offset-4",
        className,
      )}
    >
      <ArrowLeft size={24} /> <span className="text-sm">Go Back</span>
    </div>
  );
}
