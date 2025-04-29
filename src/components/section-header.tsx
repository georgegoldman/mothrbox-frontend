import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-16 text-center">
      <h2 className="text-2xl font-semibold md:text-[40px]">{title}</h2>
      <p className="text-2xl font-medium">{subtitle}</p>
    </div>
  );
}
