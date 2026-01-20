"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { NFTCard } from "@/components/dashboard/nft-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function KeysPage() {
  const [keys, setKeys] = useState([
      { id: "0x12..34A", alias: "Access Key: Project Alpha", algorithm: "AES-256-GCM" },
      { id: "0x56..78B", alias: "Master Key: Financials", algorithm: "ChaCha20-Poly1305" },
      { id: "0x99..11C", alias: "Key: Personal Backup", algorithm: "ECC" },
      { id: "0xAA..BB2", alias: "Shared Key: Team Assets", algorithm: "AES-256-GCM" },
      { id: "0xCC..DD4", alias: "Encryption Key #552", algorithm: "AES-256-GCM" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyAlias, setNewKeyAlias] = useState("");
  const [newKeyAlgorithm, setNewKeyAlgorithm] = useState("AES-256-GCM");

  const handleGenerateKey = () => {
      if (!newKeyAlias) return;

      const newKey = {
          id: `0x${Math.random().toString(16).slice(2, 10).toUpperCase()}`, // Mock ID generation
          alias: newKeyAlias,
          algorithm: newKeyAlgorithm
      };

      setKeys([newKey, ...keys]);
      setIsModalOpen(false);
      setNewKeyAlias("");
      setNewKeyAlgorithm("AES-256-GCM");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <Header title="NFT Key Gallery" subtitle="Your access keys for encrypted content" />

      <div className="flex-1 p-4 md:p-8">
        <div className="flex justify-end mb-6">
            <Button onClick={() => setIsModalOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" /> Generate Key
            </Button>
        </div>

        {keys.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {keys.map((key, i) => (
                   <NFTCard 
                      key={i} 
                      id={key.id} 
                      alias={key.alias} 
                      algorithm={key.algorithm} 
                   />
               ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🗝️</span>
                </div>
                <div>
                    <h3 className="text-xl font-bold">No Keys Found</h3>
                    <p className="text-muted-foreground">You haven't generated any encryption keys yet.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>Generate First Key</Button>
            </div>
        )}
      </div>

      {/* Simple Modal Implementation */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <div className="bg-card border border-border text-card-foreground w-full max-w-md rounded-lg shadow-lg p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold">Generate New Key</h2>
                      <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>✕</Button>
                  </div>
                  
                  <div className="space-y-4">
                      <div className="space-y-2">
                          <label className="text-sm font-medium">Key Alias</label>
                          <input 
                              type="text" 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="e.g. Project Secret Key"
                              value={newKeyAlias}
                              onChange={(e) => setNewKeyAlias(e.target.value)}
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-sm font-medium">Encryption Algorithm</label>
                          <select 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              value={newKeyAlgorithm}
                              onChange={(e) => setNewKeyAlgorithm(e.target.value)}
                          >
                              <option value="AES-256-GCM">AES-256-GCM</option>
                              <option value="ChaCha20-Poly1305">ChaCha20-Poly1305</option>
                              <option value="ECC">ECC (Elliptic Curve)</option>
                          </select>
                      </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                      <Button onClick={handleGenerateKey} disabled={!newKeyAlias}>Generate</Button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}
