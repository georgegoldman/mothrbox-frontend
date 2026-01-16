import type { ActionType, AlgorithmType } from "./types";
import { 
  Upload, Download, Unlock, Trash2, Send, Key, 
  ShieldCheck, Zap, Lock 
} from "lucide-react";
import { cn } from "@/lib/utils";

export function ActionBadge({ action }: { action: ActionType }) {
  const config = {
    upload: { label: "Upload", icon: Upload, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    download: { label: "Download", icon: Download, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    decrypt: { label: "Decrypt", icon: Unlock, color: "text-green-400 bg-green-500/10 border-green-500/20" },
    delete: { label: "Delete", icon: Trash2, color: "text-red-400 bg-red-500/10 border-red-500/20" },
    transfer: { label: "Transfer", icon: Send, color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
    keygen: { label: "Key Gen", icon: Key, color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  };

  const { label, icon: Icon, color } = config[action];

  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border", color)}>
      <Icon className="w-3 h-3" />
      {label}
    </span>
  );
}

export function AlgorithmBadge({ algorithm }: { algorithm: AlgorithmType }) {
  if (!algorithm) return <span className="text-gray-600 text-xs">-</span>;

  const config = {
    'AES-256-GCM': { icon: ShieldCheck, color: "text-purple-300" },
    'ChaCha20-Poly1305': { icon: Zap, color: "text-blue-300" },
    'ECC': { icon: Lock, color: "text-green-300" },
  };

  const { icon: Icon, color } = config[algorithm];

  return (
    <div className="flex items-center gap-2 text-xs">
       <Icon className={cn("w-3.5 h-3.5", color)} />
       <span className="text-gray-300 font-mono">{algorithm}</span>
    </div>
  );
}
