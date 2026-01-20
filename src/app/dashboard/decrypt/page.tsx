"use client";

import { Header } from "@/components/header";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Key, Unlock, Database } from "lucide-react";

export default function DecryptPage() {
  const [blobId, setBlobId] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);

  const handleDecrypt = async () => {
    setIsDecrypting(true);
    // Simulate decryption
    setTimeout(() => {
        setIsDecrypting(false);
        // Toast success or handle logic
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header title="Decrypt Data" subtitle="Restore your encrypted files" />

      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Decrypt Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-black border-border shadow-none">
              <CardHeader>
                <CardTitle>Data Source</CardTitle>
                <CardDescription>Enter the Blob ID of the encrypted data you wish to restore.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground block">Blob ID</label>
                    <div className="relative">
                       <Database className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                       <input 
                          type="text"
                          className="flex h-10 w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter Blob ID"
                          value={blobId}
                          onChange={(e) => setBlobId(e.target.value)}
                       />
                    </div>
                 </div>
              </CardContent>
            </Card>

             <Card className="bg-black border-border shadow-none">
              <CardHeader>
                <CardTitle>Decryption Credentials</CardTitle>
                <CardDescription>Provide the key or passphrase required to unlock this file.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div>
                    <label className="text-sm font-medium text-muted-foreground mb-2 block">Decryption Key / Passphrase</label>
                    <div className="relative">
                       <Key className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                       <input 
                          type="password"
                          className="flex h-10 w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your secret key"
                          value={passphrase}
                          onChange={(e) => setPassphrase(e.target.value)}
                       />
                    </div>
                 </div>
                 
                 <div className="rounded-md border border-blue-900/50 bg-blue-900/10 p-4">
                    <div className="flex items-start gap-3">
                       <FileText className="h-5 w-5 text-blue-400 mt-0.5" />
                       <div className="text-sm">
                          <p className="font-medium text-blue-400">NFT Key Auto-Detection</p>
                          <p className="text-blue-200/70 mt-1">If you hold the NFT Key for this file in your connected wallet, we will attempt to auto-verify ownership.</p>
                       </div>
                    </div>
                 </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Action */}
          <div className="space-y-6">
             <Card className="bg-black border-border sticky top-24">
                <CardHeader>
                   <CardTitle>Ready to Decrypt?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <p className="text-sm text-muted-foreground">
                      Ensure you have the correct key. Incorrect keys will result in failed decryption.
                   </p>
                   <Button 
                      className="w-full bg-primary hover:bg-primary/90" 
                      size="lg"
                      onClick={handleDecrypt}
                      disabled={!blobId || !passphrase} 
                   >
                      {isDecrypting ? "Unlocking..." : (
                          <span className="flex items-center gap-2">
                              <Unlock className="h-4 w-4" /> Decrypt Data
                          </span>
                      )}
                   </Button>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
