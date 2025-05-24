// components/apiDocs.tsx
import { Copy } from "lucide-react";

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
  return (
    <div className="rounded-xl bg-gray-800/50 p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium">{title}</h2>
        {tag && (
          <span className="rounded bg-gray-700 px-2 py-1 text-xs">{tag}</span>
        )}
      </div>
      {description && (
        <p className="mb-4 text-xs text-gray-400">{description}</p>
      )}
      {children}
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
    <div className="flex items-center gap-2 overflow-x-auto rounded-lg bg-gray-800 px-3 py-2 text-xs sm:text-sm">
      <span className={isMono ? "font-mono" : ""}>{label}</span>
      <button className="ml-auto flex-shrink-0 rounded p-1 hover:bg-gray-700">
        <Copy className="h-4 w-4" />
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
    <div className="rounded-lg bg-gray-800 p-4">
      <h3 className="mb-1 text-xs font-medium sm:text-sm">{title}</h3>
      <p className="text-xs text-gray-400">{message}</p>
    </div>
  );
}

export function RateCard({ count, label }: { count: string; label: string }) {
  return (
    <div className="rounded-lg bg-gray-800 p-4 text-center">
      <p className="text-sm font-medium">{count}</p>
      <p className="text-xs text-gray-400">{label}</p>
    </div>
  );
}
