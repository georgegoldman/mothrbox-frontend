"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { NFTCard } from "@/components/dashboard/nft-card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Box,
  RefreshCw,
  Send,
  Lock,
} from "lucide-react";

// --- IMPORTS ---
import { useMothrbox } from "../../../hooks/useMothrbox";

import {
  useSignAndExecuteTransaction,
  useCurrentAccount,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { SealClient } from "@mysten/seal";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { toHex } from "@mysten/sui/utils";

// --- CONFIGURATION ---
const PACKAGE_ID =
  "0x81968e9bd26971e987b19e8e6dc00bc9a35777db0c19bf6bdff8d2f86c569b75";
const MODULE_NAME = "mothrbox_move";
const NFT_TYPE = `${PACKAGE_ID}::${MODULE_NAME}::MothrboxNFT`;

const KEY_SERVER_OBJECT_IDS = [
  "0x164ac3d2b3b8694b8181c13f671950004765c23f270321a45fdd04d40cccf0f2",
];

export default function KeysPage() {
  const { isReady, ecc_generate_key } = useMothrbox();
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();
  const account = useCurrentAccount();

  // --- 1. FETCH KEYS FROM CHAIN ---
  const {
    data: suiObjects,
    isPending: isLoadingKeys,
    refetch: refetchKeys,
  } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
      filter: {
        MatchAny: [
          {
            StructType: `${PACKAGE_ID}::${MODULE_NAME}::MothrboxNFT<${PACKAGE_ID}::${MODULE_NAME}::Ecc>`,
          },
          {
            StructType: `${PACKAGE_ID}::${MODULE_NAME}::MothrboxNFT<${PACKAGE_ID}::${MODULE_NAME}::AES>`,
          },
          {
            StructType: `${PACKAGE_ID}::${MODULE_NAME}::MothrboxNFT<${PACKAGE_ID}::${MODULE_NAME}::Chacha>`,
          },
        ],
      },
      options: { showContent: true, showDisplay: true, showType: true },
    },
    {
      enabled: !!account,
      refetchInterval: 5000,
    },
  );

  const keys =
    suiObjects?.data?.map((obj) => {
      const content = obj.data?.content as any;
      const fields = content?.fields;

      // Extract type from the object's type field
      const fullType = obj.data?.type as string;
      let keyType = "Unknown Type";
      let typeArg = ""; // Store the full type argument for transactions

      if (fullType?.includes("::Ecc>")) {
        keyType = "ECC";
        typeArg = `${PACKAGE_ID}::${MODULE_NAME}::Ecc`;
      } else if (fullType?.includes("::AES>")) {
        keyType = "AES";
        typeArg = `${PACKAGE_ID}::${MODULE_NAME}::AES`;
      } else if (fullType?.includes("::Chacha>")) {
        keyType = "ChaCha20";
        typeArg = `${PACKAGE_ID}::${MODULE_NAME}::Chacha`;
      }

      return {
        id: obj.data?.objectId,
        alias: fields?.name || "Unnamed Key",
        algorithm: fields?.encryption_algo || "Unknown Algo",
        type: keyType,
        typeArg: typeArg, // Store for use in transactions
      };
    }) || [];

  // --- UI STATE ---
  const [processingStage, setProcessingStage] = useState(0);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  const [selectedKeyId, setSelectedKeyId] = useState<string | null>(null);
  const [recipientAddress, setRecipientAddress] = useState("");

  // Generation Inputs
  const [newKeyAlias, setNewKeyAlias] = useState("");
  const [newKeyAlgorithm, setNewKeyAlgorithm] = useState("ECC");
  const [keyPassword, setKeyPassword] = useState("");

  const [txDigest, setTxDigest] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const STEPS = [
    {
      id: 1,
      label: "Generating Keys",
      sub: "Preparing Key Material",
      icon: Cpu,
    },
    {
      id: 2,
      label: "Encrypting Secrets",
      sub: "Seal Identity-Based Encryption",
      icon: ShieldCheck,
    },
    {
      id: 3,
      label: "Tokenizing Asset",
      sub: "Minting On-Chain NFT",
      icon: Box,
    },
  ];

  // --- HELPER: HANDLE CHAIN ERRORS ---
  const handleChainResult = (result: any) => {
    // If we got a digest, the transaction was accepted by the network
    if (result.digest) {
      console.log("✅ Transaction successful:", result.digest);
      return true;
    }

    // If no digest, something went wrong
    console.error("❌ No transaction digest found:", result);
    throw new Error("Transaction failed - no digest returned");
  };

  // 1. BURN (DELETE)
  const handleBurn = async (nftId: string) => {
    if (!confirm("Are you sure you want to permanently delete this key?"))
      return;

    try {
      // Find the key to get its type argument
      const selectedKey = keys.find((k) => k.id === nftId);
      if (!selectedKey || !selectedKey.typeArg) {
        alert("Could not determine key type. Please refresh and try again.");
        return;
      }

      console.log("🔥 Burning key with type:", selectedKey.typeArg);

      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::burn`,
        typeArguments: [selectedKey.typeArg],
        arguments: [tx.object(nftId)],
      });

      const result = await signAndExecute({
        transaction: tx,
      });

      if (handleChainResult(result)) {
        setTxDigest(result.digest);
        setSuccessMessage("Key Burned Successfully 🔥");
        setShowSuccessModal(true);
        refetchKeys();
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  // 2. TRANSFER
  const openTransferModal = (nftId: string) => {
    setSelectedKeyId(nftId);
    setRecipientAddress("");
    setIsTransferModalOpen(true);
  };

  const handleTransfer = async () => {
    if (!selectedKeyId || !recipientAddress) return;

    try {
      // Find the key to get its type argument
      const selectedKey = keys.find((k) => k.id === selectedKeyId);
      if (!selectedKey || !selectedKey.typeArg) {
        alert("Could not determine key type. Please refresh and try again.");
        return;
      }

      console.log("📤 Transferring key with type:", selectedKey.typeArg);

      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::share_key`,
        typeArguments: [selectedKey.typeArg],
        arguments: [
          tx.object(selectedKeyId),
          tx.pure.address(recipientAddress),
        ],
      });

      const result = await signAndExecute({
        transaction: tx,
      });

      if (handleChainResult(result)) {
        setTxDigest(result.digest);
        setSuccessMessage("Key Transferred Successfully 📤");
        setIsTransferModalOpen(false);
        setShowSuccessModal(true);
        refetchKeys();
      }
    } catch (e: any) {
      alert(e.message);
    }
  };

  // 3. GENERATE KEY (UNIFIED FLOW)
  const handleGenerateKey = async () => {
    if (!account || !newKeyAlias) return;

    // Validation
    if (newKeyAlgorithm !== "ECC" && !keyPassword) {
      alert("Please enter a password for this key.");
      return;
    }
    if (newKeyAlgorithm === "ECC" && !isReady) {
      alert("WASM Module loading...");
      return;
    }

    try {
      setProcessingStage(1);

      // --- STEP 1: PREPARE KEY MATERIAL ---
      let rawKeyBytes: Uint8Array;
      let algoLabel = "";

      if (newKeyAlgorithm === "ECC") {
        await new Promise((r) => setTimeout(r, 500));
        console.log("⚙️ Generating ECC Keypair...");
        const keypair = ecc_generate_key();
        rawKeyBytes = keypair.private_key;
        algoLabel = "Seal_IBE_ECC";
        console.log(
          "✅ Generated private key length:",
          rawKeyBytes.length,
          "bytes",
        );
      } else {
        rawKeyBytes = new TextEncoder().encode(keyPassword);
        algoLabel =
          newKeyAlgorithm === "AES" ? "Seal_IBE_AES_256" : "Seal_IBE_ChaCha20";
      }

      // --- STEP 2: ENCRYPT WITH SEAL ---
      setProcessingStage(2);
      console.log("🛡️ Initializing Seal Client...");
      console.log("📍 Using Key Servers:", KEY_SERVER_OBJECT_IDS);
      const suiClient = new SuiClient({ url: getFullnodeUrl("testnet") });
      const sealClient = new SealClient({
        suiClient,
        serverConfigs: KEY_SERVER_OBJECT_IDS.map((id) => ({
          objectId: id,
          weight: 1,
        })),
        verifyKeyServers: false,
      });

      const id = toHex(new TextEncoder().encode(account.address));
      console.log("🔑 Encryption ID (based on address):", id);

      console.log("🛡️ Encrypting with Seal...");
      console.log("📦 Package ID:", PACKAGE_ID);
      console.log("🎯 Threshold: 1 (any single key server can help decrypt)");

      const encryptionResult = await sealClient.encrypt({
        threshold: 1,
        packageId: PACKAGE_ID,
        id: id,
        data: rawKeyBytes,
      });

      console.log("✅ Encryption complete!");
      console.log("📊 Encryption result:", encryptionResult);

      // Extract encrypted bytes from result
      const encryptedBytes = encryptionResult.encryptedObject;

      if (!encryptedBytes) {
        console.error("❌ No encryptedObject in result!");
        throw new Error("Failed to get encrypted bytes from Seal");
      }

      console.log("📦 Got encrypted bytes:", encryptedBytes);
      console.log("📊 Encrypted bytes length:", encryptedBytes.length, "bytes");
      console.log(
        "📈 Encryption overhead:",
        encryptedBytes.length - rawKeyBytes.length,
        "bytes",
      );

      // --- STEP 3: MINT ON CHAIN ---
      setProcessingStage(3);
      console.log("📦 Minting NFT on Sui blockchain...");

      // Determine the type parameter based on algorithm
      let typeArg = "";
      if (newKeyAlgorithm === "ECC") {
        typeArg = `${PACKAGE_ID}::${MODULE_NAME}::Ecc`;
      } else if (newKeyAlgorithm === "AES") {
        typeArg = `${PACKAGE_ID}::${MODULE_NAME}::AES`;
      } else if (newKeyAlgorithm === "ChaCha") {
        typeArg = `${PACKAGE_ID}::${MODULE_NAME}::Chacha`;
      }

      console.log(
        "🎯 Target:",
        `${PACKAGE_ID}::${MODULE_NAME}::mint<${typeArg}>`,
      );
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::mint`,
        typeArguments: [typeArg],
        arguments: [
          tx.pure.string(newKeyAlias),
          tx.pure.vector("u8", Array.from(encryptedBytes)),
          tx.pure.string(algoLabel),
        ],
      });

      console.log("✍️ Signing and executing transaction...");
      const result = await signAndExecute({
        transaction: tx,
      });

      if (handleChainResult(result)) {
        setProcessingStage(4);
        setTxDigest(result.digest);
        setSuccessMessage(`${newKeyAlgorithm} Key Sealed & Minted ✅`);
        console.log("✅ Minted! Digest:", result.digest);
        console.log(
          "🔗 View on Suiscan: https://suiscan.xyz/testnet/tx/" + result.digest,
        );
        console.log(
          "🔗 View on SuiVision: https://testnet.suivision.xyz/txblock/" +
            result.digest,
        );

        setTimeout(() => {
          setIsGenerateModalOpen(false);
          setProcessingStage(0);
          setShowSuccessModal(true);
          setNewKeyAlias("");
          setKeyPassword("");
          refetchKeys();
        }, 1000);
      }
    } catch (e: any) {
      console.error("❌ Generation Failed:", e);
      alert(e.message);
      setProcessingStage(0);
    }
  };

  return (
    <div className="bg-background relative flex min-h-screen flex-col">
      <Header
        title="NFT Key Gallery"
        subtitle="Your access keys for encrypted content"
      />

      <div className="flex-1 p-4 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            {isLoadingKeys ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading...
              </span>
            ) : (
              <span>Found {keys.length} Keys</span>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => refetchKeys()}>
              <RefreshCw
                className={`h-4 w-4 ${isLoadingKeys ? "animate-spin" : ""}`}
              />
            </Button>
            <Button
              onClick={() => setIsGenerateModalOpen(true)}
              className="gap-2"
            >
              <Plus className="h-4 w-4" /> Generate Key
            </Button>
          </div>
        </div>

        {/* KEYS GRID */}
        {keys.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {keys.map((key) => (
              <NFTCard
                key={key.id}
                id={key.id}
                alias={key.alias}
                algorithm={key.algorithm}
                type={key.type}
                onBurn={() => handleBurn(key.id!)}
                onTransfer={() => openTransferModal(key.id!)}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-[50vh] flex-col items-center justify-center space-y-4 text-center">
            {!account ? (
              <p>Connect Wallet to view your keys</p>
            ) : (
              <>
                <h3 className="text-xl font-bold">No Keys Found</h3>
                <p className="text-muted-foreground text-sm">
                  Mint your first key to see it here.
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* --- MODAL 1: GENERATE KEY --- */}
      {isGenerateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-card border-border text-card-foreground w-full max-w-md space-y-4 rounded-lg border p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {processingStage === 0
                  ? "Generate New Key"
                  : "Processing Secure Key"}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsGenerateModalOpen(false)}
                disabled={processingStage > 0}
              >
                ✕
              </Button>
            </div>

            {processingStage === 0 ? (
              <div className="space-y-4">
                {/* KEY NAME */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Key Name</label>
                  <input
                    type="text"
                    className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                    placeholder="e.g. My Secret Project"
                    value={newKeyAlias}
                    onChange={(e) => setNewKeyAlias(e.target.value)}
                  />
                </div>

                {/* ALGORITHM SELECT */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Algorithm</label>
                  <select
                    className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                    value={newKeyAlgorithm}
                    onChange={(e) => setNewKeyAlgorithm(e.target.value)}
                  >
                    <option value="ECC">ECC (Auto-Generated via WASM)</option>
                    <option value="AES">AES-256-GCM (Password Based)</option>
                    <option value="ChaCha">
                      ChaCha20-Poly1305 (Password Based)
                    </option>
                  </select>
                </div>

                {/* PASSWORD INPUT (Only if not ECC) */}
                {newKeyAlgorithm !== "ECC" && (
                  <div className="animate-in fade-in slide-in-from-top-1 space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <Lock className="h-3 w-3 text-blue-500" /> Enter Secret
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 font-mono text-sm"
                      placeholder="This password will be encrypted..."
                      value={keyPassword}
                      onChange={(e) => setKeyPassword(e.target.value)}
                    />
                    <p className="text-muted-foreground text-xs">
                      Seal will encrypt this password. Only you can recover it.
                    </p>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsGenerateModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleGenerateKey}
                    disabled={!account || !newKeyAlias}
                  >
                    {newKeyAlgorithm === "ECC"
                      ? "Generate & Seal"
                      : "Encrypt Password & Seal"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6 py-2">
                <div className="space-y-4">
                  {STEPS.map((step) => {
                    const isActive = processingStage === step.id;
                    const isCompleted = processingStage > step.id;
                    let iconColor = "text-muted-foreground",
                      bgColor = "bg-muted";
                    if (isCompleted) {
                      iconColor = "text-green-500";
                      bgColor = "bg-green-500/10";
                    } else if (isActive) {
                      iconColor = "text-blue-500";
                      bgColor = "bg-blue-500/10";
                    }

                    return (
                      <div
                        key={step.id}
                        className={`flex items-center gap-4 rounded-lg border p-3 ${isActive ? "bg-accent border-border" : "border-transparent"}`}
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full border ${bgColor} border-transparent ${iconColor}`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : isActive ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <step.icon className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4
                            className={`text-sm font-medium ${isActive || isCompleted ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {step.label}
                          </h4>
                          <p className="text-muted-foreground text-xs">
                            {step.sub}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- MODAL 2: TRANSFER KEY --- */}
      {isTransferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-card border-border text-card-foreground w-full max-w-md space-y-4 rounded-lg border p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Send className="h-5 w-5" /> Transfer Key
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsTransferModalOpen(false)}
              >
                ✕
              </Button>
            </div>
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Enter the Sui address you want to send this key to.
              </p>
              <div className="space-y-2">
                <label className="text-sm font-medium">Recipient Address</label>
                <input
                  type="text"
                  className="border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 font-mono text-sm"
                  placeholder="0x..."
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsTransferModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleTransfer}
                  disabled={!recipientAddress.startsWith("0x")}
                >
                  Transfer Key
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: SUCCESS --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-card border-border text-card-foreground w-full max-w-lg space-y-4 rounded-lg border p-6 shadow-lg">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="text-xl font-bold">{successMessage}</h2>
              <p className="text-muted-foreground text-sm">
                Transaction confirmed on chain.
              </p>
            </div>
            <div className="bg-muted rounded-md p-4 text-center font-mono text-xs break-all">
              {txDigest}
            </div>
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  window.open(
                    `https://suiscan.xyz/testnet/tx/${txDigest}`,
                    "_blank",
                  )
                }
              >
                View on Explorer
              </Button>
              <Button onClick={() => setShowSuccessModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
