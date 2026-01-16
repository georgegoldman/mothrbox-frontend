"use client";

import { cn } from "@/lib/utils";
import { Upload, File as FileIcon, X, Shield, Zap, Lock } from "lucide-react";
import { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone"; // Assuming react-dropzone is installed or I'll implement simple onDrop

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  onClear: () => void;
  algorithm: string;
  setAlgorithm: (algo: string) => void;
}

export function FileUploadZone({
  onFileSelect,
  selectedFile,
  onClear,
  algorithm,
  setAlgorithm,
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="space-y-6">
      {/* Algorithm Selection */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            id: "aes-256-gcm",
            name: "AES-256-GCM",
            desc: "Fast & Trusted",
            icon: Shield,
          },
          {
            id: "chacha20",
            name: "ChaCha20",
            desc: "Mobile Optimized",
            icon: Zap,
          },
          {
            id: "ecc",
            name: "ECC",
            desc: "High Security",
            icon: Lock,
          },
        ].map((algo) => (
          <button
            key={algo.id}
            onClick={() => setAlgorithm(algo.id)}
            className={cn(
              "relative flex flex-col items-center justify-center gap-2 rounded-xl border p-4 transition-all hover:bg-muted/50",
              algorithm === algo.id
                ? "border-primary bg-primary/10 text-primary ring-1 ring-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary/50"
            )}
          >
            <algo.icon className="h-6 w-6" />
            <div className="text-center">
              <div className="font-semibold text-sm">{algo.name}</div>
              <div className="text-xs opacity-70">{algo.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Drop Zone */}
      {!selectedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative flex min-h-[300px] flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all",
            isDragging
              ? "border-primary bg-primary/10"
              : "border-muted-foreground/25 bg-muted/5 hover:bg-muted/10"
          )}
        >
          <input
            type="file"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={handleFileInput}
          />
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted/30 mb-4">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="text-center px-4">
            <p className="text-lg font-medium">Click to upload or drag and drop</p>
            <p className="text-sm text-muted-foreground mt-1">
              Any file type supported (max 500MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <FileIcon className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={onClear}
              className="rounded-full p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
           {/* Preview or Info could go here */}
           <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground bg-muted/30 p-2 rounded">
              <Lock className="h-3 w-3" />
              Ready to encrypt with {algorithm.toUpperCase()}
           </div>
        </div>
      )}
    </div>
  );
}
