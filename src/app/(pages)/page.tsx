"use client";

import Image from "next/image";
import Link from "next/link";
import { PricingSection } from "@/components/pricing-section";
import { WalletConnectButton } from "@/components/wallet-connect-button";
import { Shield, Database, Key, Zap, Globe, Lock } from "lucide-react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Particles } from "@/components/particles";
import { LandingFooter } from "@/components/landing-footer";

export default function HomePage() {
  const currentAccount = useCurrentAccount();
  const router = useRouter();

  useEffect(() => {
    if (currentAccount) {
      router.push("/dashboard");
    }
  }, [currentAccount, router]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Navbar / Header Area for Landing */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/images/mtbox-logo.png"
                width={40}
                height={40}
                alt="Mothrbox Logo"
                className="group-hover:opacity-80 transition-opacity"
                priority
              />
              <span className="text-xl font-bold tracking-tight">Mothrbox</span>
            </Link>
          </div>
          <div>
            <WalletConnectButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[30%] -left-[10%] h-[70vh] w-[70vw] rounded-full bg-primary/20 blur-[120px] opacity-30" />
          <div className="absolute top-[20%] -right-[10%] h-[60vh] w-[60vw] rounded-full bg-purple-800/20 blur-[100px] opacity-20" />
          <Particles className="absolute inset-0 opacity-40" quantity={50} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-white md:text-7xl lg:text-8xl">
            Unbreakable <br />
            <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent animate-text">
              Encryption
            </span>
          </h1>
          
          <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400 md:text-xl">
            Decentralized file storage secured by the Sui blockchain. 
            Encrypt, store, and share your data with absolute privacy.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
             <div className="scale-110">
                <WalletConnectButton />
             </div>
             <a
              href="https://docs.mothrbox.xyz/"
              target="_blank"
              referrerPolicy="no-referrer"
              className="rounded-lg border border-white/10 bg-white/5 px-8 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10"
            >
              Documentation
            </a>
          </div>

          {/* Visual Element */}
          <div className="relative mx-auto mt-20 max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-sm lg:mt-32">
            <div className="aspect-[16/9] overflow-hidden rounded-xl bg-black/50 relative">
               <div className="absolute inset-0 flex items-center justify-center">
                  <Image 
                    src="/images/black-box.png" 
                    alt="Encryption Demo" 
                    width={800} 
                    height={500}
                    className="object-contain opacity-80"
                  />
                  {/* Overlay Interaction Hint */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 rounded-full border border-white/10 bg-black/80 px-6 py-2 backdrop-blur-md">
                     <Lock className="text-primary h-4 w-4" />
                     <span className="text-sm font-mono text-gray-300">AES-256-GCM Encrypted</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative border-t border-white/10 bg-black py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
             <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
               Future-Proof Security
             </h2>
             <p className="mt-4 text-lg text-gray-400">
               Built on modern cryptographic standards and decentralized infrastructure.
             </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Client-Side Encryption",
                desc: "Your files are encrypted before they ever leave your device. We never see your keys.",
              },
              {
                icon: Database,
                title: "Walrus Storage",
                desc: "Leveraging Walrus protocol for decentralized, immutable, and redundant data storage.",
              },
              {
                icon: Key,
                title: "NFT Access Keys",
                desc: "Generate NFT-based keys for secure, transferable access control to your files.",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Optimized formatting and WASM-powered encryption for blazing fast uploads.",
              },
              {
                icon: Globe,
                title: "Global Availability",
                desc: "Access your encrypted data from anywhere in the world, anytime.",
              },
              {
                icon: Lock,
                title: "Zero Knowledge",
                desc: "Our architecture ensures we have zero knowledge of your file contents.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="border-t border-white/10 bg-black/50">
        <PricingSection />
      </section>

      <LandingFooter />
    </div>
  );
}
