import { SealClient } from "@mysten/seal";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";

// ... inside your function ...

// 1. Setup a standard Sui Client first
const suiClient = new SuiClient({ url: getFullnodeUrl("testnet") });

// 2. Define the Seal Key Servers (Testnet)
// These are the nodes that hold the "shards" of the decryption key.
// You can find the latest list in the Seal docs or Discord.
const SEAL_TESTNET_SERVERS = [
  "0x73d05d62c18d9374e3ea529e8e0ed6161da1a141a94d3f76ae3fe4e99356db75",
  "0xf5d14a81a982144ae441cd7d64b09027f116a468bd36e7eca494f750591623c8",
];

// 3. Initialize Seal properly
const seal = new SealClient({
  suiClient, // Pass the SuiClient instance
  serverConfigs: SEAL_TESTNET_SERVERS.map((id) => ({
    objectId: id,
    weight: 1,
  })), // The SDK maps over this, which caused your error!
  verifyKeyServers: true,
});
