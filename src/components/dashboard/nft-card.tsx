"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Key, Send, ExternalLink, Trash2 } from "lucide-react";

// 👇 UPDATE THIS INTERFACE
export interface NFTKeyProps {
  id?: string;
  alias: string;
  algorithm: string;
  type?: string; // <--- ADD THIS LINE
  onBurn?: () => void;
  onTransfer?: () => void;
}

export function NFTCard({
  id,
  alias,
  algorithm,
  onTransfer,
  onBurn,
}: NFTKeyProps) {
  const handleView = () => {
    if (id) window.open(`https://suiscan.xyz/testnet/object/${id}`, "_blank");
  };

  return (
    <Card className="border-border group hover:border-primary/50 hover:shadow-primary/10 overflow-hidden bg-black transition-all hover:shadow-lg">
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 to-black p-8">
        {/* Visual Representation of the Key */}
        <div className="bg-primary/20 border-primary/30 relative z-10 flex h-32 w-32 items-center justify-center rounded-full border shadow-[0_0_30px_rgba(126,75,171,0.3)] transition-transform duration-500 group-hover:scale-110">
          <Key className="text-primary h-14 w-14" />
        </div>

        {/* Background Pattern */}
        <div className="from-primary absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] via-transparent to-transparent opacity-20" />
      </div>

      <CardContent className="p-4">
        <h3 className="truncate text-lg font-bold text-white">{alias}</h3>
        <div className="mt-2 flex flex-col gap-1">
          <span className="text-muted-foreground text-xs">
            Algorithm: <span className="text-primary">{algorithm}</span>
          </span>
          <div className="bg-secondary text-secondary-foreground max-w-full truncate rounded px-2 py-1 font-mono text-[10px]">
            ID: {id}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 p-4 pt-0">
        {/* Transfer Button */}
        {onTransfer && (
          <Button
            variant="outline"
            size="sm"
            onClick={onTransfer}
            className="border-primary/20 hover:bg-primary/10 hover:text-primary h-8 flex-1 text-xs"
          >
            <Send className="mr-1.5 h-3 w-3" /> Transfer
          </Button>
        )}

        {/* View Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleView}
          className="border-primary/20 hover:bg-primary/10 hover:text-primary h-8 flex-1 text-xs"
        >
          <ExternalLink className="mr-1.5 h-3 w-3" /> View
        </Button>

        {/* Burn/Delete Button (Red) */}
        {onBurn && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onBurn}
            className="h-8 w-8 border border-red-900/50 bg-red-950/30 px-0 text-red-500 hover:bg-red-900/50 hover:text-red-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
