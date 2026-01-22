"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { FileUploadZone } from "@/components/dashboard/file-upload-zone";
import { useMothrbox } from "@/hooks/useMothrbox";
import {
  useCurrentAccount,
  useSuiClientQuery,
  useSignPersonalMessage,
} from "@mysten/dapp-kit";
import { SealClient, SessionKey } from "@mysten/seal";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { fromHEX, toHex } from "@mysten/sui/utils";
import { Transaction } from "@mysten/sui/transactions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Info, Key, Loader2, RefreshCw, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

// --- CONFIGURATION ---
const PACKAGE_ID =
  "0x81968e9bd26971e987b19e8e6dc00bc9a35777db0c19bf6bdff8d2f86c569b75";
const MODULE_NAME = "mothrbox_move";
const KEY_SERVER_OBJECT_IDS = [
  "0x164ac3d2b3b8694b8181c13f671950004765c23f270321a45fdd04d40cccf0f2",
];

// Your deployed Deno Backend URL
const BACKEND_URL = "https://quarrelsome-denise-mothrbox-774fd236.koyeb.app/";

// Helper Types
type AvailableKey = {
  id: string;
  alias: string;
  encryptedData: any;
  typeArg: string;
};

export default function EncryptPage() {
  const router = useRouter();
  const account = useCurrentAccount();
  const { mutateAsync: signPersonalMessage } = useSignPersonalMessage();

  // WASM Exports
  const { isReady, aes_encrypt, chacha_encrypt } = useMothrbox() as any;

  // UI State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [algorithm, setAlgorithm] = useState("aes-256-gcm");
  const [selectedKeyId, setSelectedKeyId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock Cost Calculation
  const estimatedStorageCost = selectedFile
    ? (selectedFile.size / 1024 / 1024) * 0.05
    : 0;

  // --- 1. FETCH KEYS FROM CHAIN ---
  const {
    data: suiObjects,
    isPending: isLoadingKeys,
    refetch,
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
      options: { showContent: true, showType: true },
    },
    { enabled: !!account },
  );

  // --- 2. FILTER KEYS ---
  const availableKeys: AvailableKey[] = useMemo(() => {
    if (!suiObjects?.data) return [];

    const currentAlgo = algorithm.toLowerCase();

    return suiObjects.data
      .filter((obj) => {
        const type = obj.data?.type as string;
        if (currentAlgo.includes("aes")) return type?.includes("::AES>");
        if (currentAlgo.includes("chacha")) return type?.includes("::Chacha>");
        if (currentAlgo.includes("ecc")) return type?.includes("::Ecc>");
        return false;
      })
      .map((obj) => {
        const content = obj.data?.content as any;
        const fields = content?.fields;
        const t = obj.data?.type as string;

        let typeArg = "";
        if (t?.includes("::AES>"))
          typeArg = `${PACKAGE_ID}::${MODULE_NAME}::AES`;
        else if (t?.includes("::Chacha>"))
          typeArg = `${PACKAGE_ID}::${MODULE_NAME}::Chacha`;
        else if (t?.includes("::Ecc>"))
          typeArg = `${PACKAGE_ID}::${MODULE_NAME}::Ecc`;

        return {
          id: obj.data?.objectId as string,
          alias: fields?.name || "Unnamed Key",
          encryptedData: fields?.encrypted_data || fields?.encrypted_dek,
          typeArg,
        };
      });
  }, [suiObjects, algorithm]);

  // --- HELPER: UPLOAD TO BACKEND (STREAMING) ---
  const uploadToBackend = async (
    encryptedBytes: Uint8Array,
    fileName: string,
    ownerAddress: string,
    algoLabel: string, // Added algo param
  ) => {
    // 1. Send Metadata in URL (Avoids Body Parsing Memory Issues)
    const params = new URLSearchParams({
      fileName: fileName,
      userAddress: ownerAddress,
      algorithm: algoLabel,
    });

    // 2. Send Raw Bytes in Body (Streaming)
    const response = await fetch(`${BACKEND_URL}/upload?${params.toString()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: encryptedBytes,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Backend Upload Failed: ${errorText}`);
    }

    const json = await response.json();

    if (!json.success) {
      throw new Error(`Server Error: ${json.error}`);
    }

    return json.blobId;
  };

  // --- HELPER: DEK STRING CONVERSION ---
  const dekBytesToPasswordString = (dekBytes: Uint8Array) =>
    toHex(dekBytes).replace(/^0x/, "");

  // --- 3. HANDLE ENCRYPTION ---
  const handleSubmit = async () => {
    if (!selectedFile) return toast.error("Please select a file first");
    if (!selectedKeyId) return toast.error("Please select an encryption key");
    if (!account) return toast.error("Wallet not connected");
    if (!isReady) return toast.warning("Encryption engine loading...");

    try {
      setIsProcessing(true);
      const toastId = toast.loading("Initializing Secure Enclave...");

      // A. Find Key Data
      const keyObj = availableKeys.find((k) => k.id === selectedKeyId);
      if (!keyObj || !keyObj.encryptedData)
        throw new Error("Key data missing on-chain");
      if (!keyObj.typeArg) throw new Error("Key type missing");

      // B. Setup Seal Client
      const suiClient = new SuiClient({ url: getFullnodeUrl("testnet") });
      const sealClient = new SealClient({
        suiClient,
        serverConfigs: KEY_SERVER_OBJECT_IDS.map((id) => ({
          objectId: id,
          weight: 1,
        })),
        verifyKeyServers: false,
      });

      // Prepare Encrypted Bytes
      let encryptedBytes: Uint8Array;
      if (Array.isArray(keyObj.encryptedData)) {
        encryptedBytes = new Uint8Array(keyObj.encryptedData);
      } else if (typeof keyObj.encryptedData === "string") {
        encryptedBytes = fromHEX(keyObj.encryptedData);
      } else {
        encryptedBytes = new Uint8Array(keyObj.encryptedData);
      }

      // Prepare Scope (Must match encryption scope)
      const scopeBytes = new TextEncoder().encode(account.address);

      // C. Create Session Key & Sign
      toast.loading("Requesting Access (Sign Personal Message)...", {
        id: toastId,
      });

      const sessionKey = await SessionKey.create({
        address: account.address,
        packageId: PACKAGE_ID,
        ttlMin: 10,
        suiClient,
      });

      const msg = sessionKey.getPersonalMessage();
      const sigRes = await signPersonalMessage({ message: msg });
      sessionKey.setPersonalMessageSignature(sigRes.signature);

      // D. Build 'seal_approve' Transaction
      const tx = new Transaction();
      tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::seal_approve`,
        typeArguments: [keyObj.typeArg],
        arguments: [
          tx.pure.vector("u8", Array.from(scopeBytes)),
          tx.object(selectedKeyId),
        ],
      });

      const txBytes = await tx.build({
        client: suiClient,
        onlyTransactionKind: true,
      });

      // E. Decrypt via Seal
      toast.loading("Decrypting Key with Seal Network...", { id: toastId });
      const dekBytes = await sealClient.decrypt({
        data: encryptedBytes,
        sessionKey,
        txBytes,
      });

      if (!(dekBytes instanceof Uint8Array) || dekBytes.length === 0) {
        throw new Error("Seal returned invalid key bytes");
      }

      // F. Encrypt File (WASM)
      toast.loading("Encrypting File (Client-Side WASM)...", { id: toastId });
      // UI Breath to prevent freeze
      await new Promise((r) => setTimeout(r, 100));

      const fileBuffer = await selectedFile.arrayBuffer();
      const fileBytes = new Uint8Array(fileBuffer);
      const password = dekBytesToPasswordString(dekBytes);

      let ciphertext: Uint8Array;
      let finalAlgoLabel = "";

      if (algorithm.toLowerCase().includes("aes")) {
        ciphertext = aes_encrypt(fileBytes, password);
        finalAlgoLabel = "AES-256-GCM";
      } else if (algorithm.toLowerCase().includes("chacha")) {
        ciphertext = chacha_encrypt(fileBytes, password);
        finalAlgoLabel = "ChaCha20-Poly1305";
      } else {
        throw new Error("ECC File Encryption coming soon");
      }

      // G. Upload to Backend (Deno)
      toast.loading("Uploading to Walrus (via Backend)...", { id: toastId });

      const blobId = await uploadToBackend(
        ciphertext,
        selectedFile.name + ".enc",
        account.address,
        finalAlgoLabel, // Passing the label here
      );

      toast.success(`Success! Blob ID: ${blobId}`, {
        id: toastId,
        duration: 8000,
      });
      console.log("✅ Walrus Blob ID:", blobId);

      // Cleanup
      setSelectedFile(null);
      setSelectedKeyId("");
    } catch (e: any) {
      console.error(e);
      toast.error(`Error: ${e.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Header
        title="Encrypt Data"
        subtitle="Secure your files with military-grade encryption"
      />

      <div className="flex-1 space-y-8 p-4 md:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT: MAIN CONFIGURATION */}
          <div className="space-y-6 lg:col-span-2">
            <Card className="border-border bg-black">
              <CardHeader>
                <CardTitle>File Upload</CardTitle>
                <CardDescription>
                  Select a file and encryption method.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploadZone
                  selectedFile={selectedFile}
                  onFileSelect={setSelectedFile}
                  onClear={() => setSelectedFile(null)}
                  algorithm={algorithm}
                  setAlgorithm={(algo) => {
                    setAlgorithm(algo);
                    setSelectedKeyId("");
                  }}
                />

                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">
                        Encryption Key
                      </label>
                      <button
                        onClick={() => refetch()}
                        className="text-primary flex items-center gap-1 text-xs hover:underline"
                      >
                        <RefreshCw
                          className={`h-3 w-3 ${isLoadingKeys ? "animate-spin" : ""}`}
                        />{" "}
                        Refresh Keys
                      </button>
                    </div>

                    {availableKeys.length > 0 ? (
                      <Select
                        value={selectedKeyId}
                        onValueChange={setSelectedKeyId}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={`Select a ${algorithm} Key...`}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {availableKeys.map((k) => (
                            <SelectItem key={k.id} value={k.id}>
                              <div className="flex items-center gap-2">
                                <Key className="text-muted-foreground h-4 w-4" />
                                <span>{k.alias}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Button
                        variant="outline"
                        className="text-muted-foreground border-primary/30 w-full justify-start border-dashed"
                        onClick={() => router.push("/dashboard/keys")}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Create New {algorithm}{" "}
                        Key
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="space-y-6">
            <Card className="border-border bg-black">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Storage Cost</span>
                  <span className="font-mono">
                    {estimatedStorageCost.toFixed(4)} WAL
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Network Fee</span>
                  <span className="font-mono">~0.002 SUI</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Encryption Fee</span>
                  <span className="font-mono text-green-400">0.0001 USDC</span>
                </div>
                <div className="border-border flex items-center justify-between border-t pt-4 font-medium">
                  <span>Total Estimated</span>
                  <div className="flex flex-col items-end">
                    <span className="text-primary">
                      {estimatedStorageCost.toFixed(4)} WAL
                    </span>
                    <span className="text-muted-foreground text-xs">
                      + 0.002 SUI + 0.0001 USDC
                    </span>
                  </div>
                </div>

                <div className="bg-primary/10 text-primary flex gap-2 rounded-lg p-3 text-xs">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>Includes separate NFT minting cost for access control.</p>
                </div>

                <Button
                  className="bg-primary hover:bg-primary/90 w-full"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={
                    !selectedFile || !selectedKeyId || isProcessing || !isReady
                  }
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Encrypting...
                    </>
                  ) : (
                    "Encrypt & Upload"
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
