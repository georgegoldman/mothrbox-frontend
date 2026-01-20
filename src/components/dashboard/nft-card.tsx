"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Key, Send, Copy, ExternalLink } from "lucide-react";
import Image from "next/image";

interface NFTKeyProps {
    id: string;
    alias: string;
    algorithm: string;
    image?: string;
}

export function NFTCard({ id, alias, algorithm, image }: NFTKeyProps) {
    return (
        <Card className="overflow-hidden border-border bg-black group transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
            <div className="relative aspect-square w-full bg-gradient-to-br from-gray-900 to-black p-8 flex items-center justify-center overflow-hidden">
                {/* Visual Representation of the Key */}
                <div className="relative z-10 h-32 w-32 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_30px_rgba(126,75,171,0.3)] group-hover:scale-110 transition-transform duration-500">
                    <Key className="h-14 w-14 text-primary" />
                </div>
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
            </div>

            <CardContent className="p-4">
                <h3 className="font-bold text-lg text-white truncate">{alias}</h3>
                <div className="mt-2 flex flex-col gap-1">
                     <span className="text-xs text-muted-foreground">Algorithm: <span className="text-primary">{algorithm}</span></span>
                     <div className="text-[10px] font-mono bg-secondary px-2 py-1 rounded text-secondary-foreground truncate max-w-full">
                        ID: {id}
                    </div>
                </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="w-full text-xs h-8 border-primary/20 hover:bg-primary/10 hover:text-primary">
                    <Send className="w-3 h-3 mr-1.5" /> Transfer
                </Button>
                <Button variant="outline" size="sm" className="w-full text-xs h-8 border-primary/20 hover:bg-primary/10 hover:text-primary">
                    <ExternalLink className="w-3 h-3 mr-1.5" /> View
                </Button>
            </CardFooter>
        </Card>
    );
}
