import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-16 space-y-3 text-center">
      <h2 className="text-xl font-semibold md:text-2xl md:text-[40px]">
        {title}
      </h2>
      <p className="font-medium md:text-xl">{subtitle}</p>
    </div>
  );
}
