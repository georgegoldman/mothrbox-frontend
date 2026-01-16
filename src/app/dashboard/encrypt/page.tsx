"use client";

import { Header } from "@/components/header";
import { FileUploadZone } from "@/components/dashboard/file-upload-zone";
import { extractApiError } from "@/lib/axios";
import { useEncryptFile } from "@/lib/dal/encrypt";
import { getCookieValue } from "@/lib/helpers";
import { Wallet, Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputField as Input } from "@/components/ui/input-field";

export default function EncryptPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [algorithm, setAlgorithm] = useState("aes-256-gcm");
  const [alias, setAlias] = useState("");
  const { mutateAsync: encrypt, isPending } = useEncryptFile();

  // Mock cost calculation
  const estimatedCost = selectedFile ? (selectedFile.size / 1024 / 1024) * 0.05 : 0; // 0.05 SUI per MB mock

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    if (!alias) {
        toast.error("Please enter a key alias");
        return;
    }

    const payload = {
      file: selectedFile,
      alias,
      owner: getCookieValue("userId") ?? "unknown",
      algorithm,
    };

    toast.promise(encrypt(payload), {
      loading: "Encrypting and uploading to Walrus...",
      success: () => {
        setSelectedFile(null);
        setAlias("");
        return "File encrypted successfully! NFT Key generated.";
      },
      error: (err) => extractApiError(err),
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header title="Encrypt Data" subtitle="Secure your files with military-grade encryption" />

      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-black border-border">
              <CardHeader>
                <CardTitle>File Upload</CardTitle>
                <CardDescription>Select a file and encryption method.</CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploadZone
                  selectedFile={selectedFile}
                  onFileSelect={setSelectedFile}
                  onClear={() => setSelectedFile(null)}
                  algorithm={algorithm}
                  setAlgorithm={setAlgorithm}
                />

                <div className="mt-6 space-y-4">
                   <Input 
                      label="Encryption Key Alias"
                      placeholder="e.g. My Secret Project"
                      value={alias}
                      onChange={(e) => setAlias(e.target.value)}
                   />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info & Action */}
          <div className="space-y-6">
             <Card className="bg-black border-border">
                <CardHeader>
                   <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Storage Cost</span>
                      <span className="font-mono">{estimatedCost.toFixed(4)} SUI</span>
                   </div>
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Network Fee</span>
                      <span className="font-mono">~0.002 SUI</span>
                   </div>
                   <div className="border-t border-border pt-4 flex justify-between items-center font-medium">
                      <span>Total Estimated</span>
                      <span className="text-primary">{(estimatedCost + 0.002).toFixed(4)} SUI</span>
                   </div>

                   <div className="bg-primary/10 rounded-lg p-3 text-xs text-primary flex gap-2">
                      <Info className="h-4 w-4 shrink-0 mt-0.5" />
                      <p>Includes separate NFT minting cost for access control.</p>
                   </div>

                   <Button 
                      className="w-full bg-primary hover:bg-primary/90" 
                      size="lg"
                      onClick={handleSubmit}
                      disabled={!selectedFile || !alias || isPending}
                   >
                      {isPending ? "Encrypting..." : "Encrypt & Upload"}
                   </Button>
                </CardContent>
             </Card>
          </div>
        </div>


      </div>
    </div>
  );
}
