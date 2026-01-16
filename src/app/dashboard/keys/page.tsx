"use client";

import { Header } from "@/components/header";
import { NFTCard } from "@/components/dashboard/nft-card";

const MOCK_KEYS = [
    { id: "0x12..34A", name: "Access Key: Project Alpha", fileRef: "Project_Specs_v2.pdf" },
    { id: "0x56..78B", name: "Master Key: Financials", fileRef: "Financials_Q1.xlsx" },
    { id: "0x99..11C", name: "Key: Personal Backup", fileRef: "Backup_Keys.txt" },
    { id: "0xAA..BB2", name: "Shared Key: Team Assets", fileRef: "Team_Photo_HighRes.png" },
    { id: "0xCC..DD4", name: "Encryption Key #552", fileRef: "Unlabeled_File.dat" },
];

export default function KeysPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header title="NFT Key Gallery" subtitle="Your access keys for encrypted content" />

      <div className="flex-1 p-4 md:p-8">
        {MOCK_KEYS.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {MOCK_KEYS.map((key, i) => (
                   <NFTCard 
                      key={i} 
                      id={key.id} 
                      name={key.name} 
                      fileRef={key.fileRef} 
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
            </div>
        )}
      </div>
    </div>
  );
}
