import { cn } from "@/lib/utils";

interface SettingsCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function SettingsCard({ title, description, className, children, ...props }: SettingsCardProps) {
  return (
    <div className={cn("rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm p-6 space-y-6", className)} {...props}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {description && <p className="text-sm text-gray-400">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
