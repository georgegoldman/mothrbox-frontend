"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { NFTCard } from "@/components/dashboard/nft-card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";

// 1. Imports for Blockchain & Encryption
import { useMothrbox } from "@/hooks/useMothrbox";
import {
  useSignAndExecuteTransaction,
  useCurrentAccount,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { SealClient, EncryptionPolicy } from "@mysten/seal";

// 2. Configuration (Replace with your actual IDs)
const SEAL_API = "https://api.testnet.seal.mystenlabs.com/v1";
const PACKAGE_ID = "0xYOUR_PACKAGE_ID_HERE";
const MODULE_NAME = "mothrbox_move";

export default function KeysPage() {
  // 3. Hooks
  const { isReady, ecc_generate_key } = useMothrbox();
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
  const account = useCurrentAccount();

  // 4. State
  const [isMinting, setIsMinting] = useState(false);
  const [keys, setKeys] = useState([
    {
      id: "0x12..34A",
      alias: "Access Key: Project Alpha",
      algorithm: "AES-256-GCM",
    },
    {
      id: "0x56..78B",
      alias: "Master Key: Financials",
      algorithm: "ChaCha20-Poly1305",
    },
    { id: "0x99..11C", alias: "Key: Personal Backup", algorithm: "ECC" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyAlias, setNewKeyAlias] = useState("");
  const [newKeyAlgorithm, setNewKeyAlgorithm] = useState("ECC");

  // --- THE CORE FUNCTION ---
  const handleGenerateKey = async () => {
    if (!newKeyAlias) return;

    // Check 1: Is Wallet Connected?
    if (!account) {
      alert("Please connect your Sui Wallet first!");
      return;
    }

    // Check 2: Is WASM Loaded?
    if (newKeyAlgorithm === "ECC" && !isReady) {
      alert("Secure Module is still loading. Please wait...");
      return;
    }

    try {
      setIsMinting(true);

      if (newKeyAlgorithm === "ECC") {
        // --- STEP A: Generate Raw Key (WASM) ---
        console.log("⚙️ Generating ECC Keypair...");
        const keypair = ecc_generate_key();
        const rawPrivateKey = keypair.private_key;

        // --- STEP B: Seal Private Key (Seal SDK) ---
        console.log("🛡️ Encrypting with Seal...");
        const seal = new SealClient({
          apiEndpoint: SEAL_API,
          systemObjectId: "0x...", // Lookup Seal System Object ID for Testnet
        });

        // Create a unique scope ID (e.g., random string)
        const scopeId = `scope-${Date.now()}`;

        const policy: EncryptionPolicy = {
          packageId: PACKAGE_ID,
          module: MODULE_NAME,
          function: "seal_access",
          arguments: [Array.from(new TextEncoder().encode(scopeId))],
        };

        const encryption = await seal.encrypt(rawPrivateKey, policy);
        const encryptedBytes = Array.from(encryption.bytes);

        // --- STEP C: Mint NFT (Sui Blockchain) ---
        console.log("📦 Minting NFT...");
        const tx = new Transaction();

        tx.moveCall({
          target: `${PACKAGE_ID}::${MODULE_NAME}::mint`,
          arguments: [
            tx.pure.string(newKeyAlias), // Name
            tx.pure.vector("u8", encryptedBytes), // Sealed Key
            tx.pure.string("Seal_IBE_ECC"), // Algorithm
          ],
        });

        // Execute Transaction
        const result = await signAndExecute({ transaction: tx });

        console.log("✅ Minted! Digest:", result.digest);

        // Add to UI List (Optimistic Update)
        const newKey = {
          id: result.digest.slice(0, 10) + "...", // Use Tx Digest as ID
          alias: newKeyAlias,
          algorithm: "ECC (Sealed)",
        };
        setKeys([newKey, ...keys]);
      } else {
        // Fallback for non-blockchain keys (AES/ChaCha purely local)
        console.log("ℹ️ Generating Local Key (Not Sealed)");
        const newKey = {
          id: `0x${Math.random().toString(16).slice(2, 10).toUpperCase()}`,
          alias: newKeyAlias,
          algorithm: newKeyAlgorithm,
        };
        setKeys([newKey, ...keys]);
      }

      // Cleanup
      setIsModalOpen(false);
      setNewKeyAlias("");
      setNewKeyAlgorithm("ECC");
    } catch (e) {
      console.error("❌ Generation Failed:", e);
      alert("Failed to generate/mint key. Check console for details.");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="bg-background relative flex min-h-screen flex-col">
      <Header
        title="NFT Key Gallery"
        subtitle="Your access keys for encrypted content"
      />

      <div className="flex-1 p-4 md:p-8">
        <div className="mb-6 flex justify-end">
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Generate Key
          </Button>
        </div>

        {keys.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {keys.map((key, i) => (
              <NFTCard key={i} {...key} />
            ))}
          </div>
        ) : (
          <div className="flex h-[50vh] flex-col items-center justify-center space-y-4 text-center">
            {/* Empty State */}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-card border-border text-card-foreground w-full max-w-md space-y-4 rounded-lg border p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Generate New Key</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(false)}
                disabled={isMinting}
              >
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Key Alias</label>
                <input
                  type="text"
                  className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="e.g. Project Secret Key"
                  value={newKeyAlias}
                  onChange={(e) => setNewKeyAlias(e.target.value)}
                  disabled={isMinting}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Encryption Algorithm
                </label>
                <select
                  className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                  value={newKeyAlgorithm}
                  onChange={(e) => setNewKeyAlgorithm(e.target.value)}
                  disabled={isMinting}
                >
                  <option value="ECC">ECC (Sealed on Blockchain)</option>
                  <option value="AES-256-GCM">AES-256-GCM (Local)</option>
                  <option value="ChaCha20-Poly1305">
                    ChaCha20-Poly1305 (Local)
                  </option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isMinting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleGenerateKey}
                disabled={!newKeyAlias || isMinting}
              >
                {isMinting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sealing...
                  </>
                ) : (
                  "Generate & Seal"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
