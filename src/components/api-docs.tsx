// components/apiDocs.tsx
import React from "react";
import { Link2 } from "lucide-react";

export function SectionCard({
  title,
  description,
  tag,
  children,
}: {
  title: string;
  description?: string;
  tag?: string;
  children: React.ReactNode;
}) {
  // Check if children contains a CodeBlock component
  const hasCodeBlock = React.Children.toArray(children).some((child) => {
    if (React.isValidElement(child)) {
      return child.type === CodeBlock;
    }
    return false;
  });

  return (
    <div
      className="w-full rounded-xl border border-white/85 sm:w-fit"
      style={{
        background:
          "linear-gradient(96.75deg, rgba(125, 120, 255, 0.1) -0.65%, rgba(210, 0, 253, 0.1) 96.85%)",
      }}
    >
      <div className="p-3 sm:p-4">
        <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xs font-medium sm:text-sm">{title}</h2>
          {tag && (
            <span className="w-fit rounded border border-white/85 px-2 py-1 text-xs sm:p-[10px]">
              {tag}
            </span>
          )}
        </div>
        {description && (
          <p className="mb-3 text-xs text-gray-400 sm:mb-4">{description}</p>
        )}
      </div>
      <div className={hasCodeBlock ? "" : "border-t border-white/85"}>
        {children}
      </div>
    </div>
  );
}

export function CodeBlock({
  label,
  isMono,
}: {
  label: string;
  isMono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 overflow-x-auto rounded-lg bg-white p-2 sm:flex-row sm:items-center sm:gap-2 sm:px-3 sm:py-2">
      <span
        className={`text-xs font-medium text-[#7D78FF] sm:text-sm ${isMono ? "font-mono" : ""}`}
      >
        {label}
      </span>
      <button className="flex h-8 w-full cursor-pointer items-center justify-center gap-1 rounded-[5px] bg-[#7D78FF] px-2 py-1 text-xs text-white sm:ml-auto sm:h-[30px] sm:w-[71px] sm:flex-shrink-0 sm:gap-[5px] sm:p-1 sm:text-sm">
        <Link2 className="h-3 w-3 text-white sm:h-4 sm:w-4" />
        Copy
      </button>
    </div>
  );
}

export function ErrorCard({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div className="p-3 first:border-r first:border-white/85 sm:p-4">
      <h3 className="mb-1 text-xs font-medium sm:text-sm">{title}</h3>
      <p className="text-xs text-gray-400 sm:text-sm">{message}</p>
    </div>
  );
}

export function RateCard({ count, label }: { count: string; label: string }) {
  return (
    <div className="p-3 text-center first:border-r first:border-white/85 sm:p-4">
      <p className="text-xs font-medium sm:text-sm">{count}</p>
      <p className="text-xs text-gray-400 sm:text-sm">{label}</p>
    </div>
  );
}
