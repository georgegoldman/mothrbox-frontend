import StructuredData from "@/components/structured-data";
import "@/styles/globals.css";

import { type Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@mysten/dapp-kit/dist/index.css";

import { Toaster } from "sonner";
import { QueryProvider } from "./utils/query-provider";
import { SuiProvider } from "./utils/sui-provider";



import { WalletAuthListener } from "@/components/wallet-auth-listener";
import { SettingsProvider } from "@/context/settings-context";

export const metadata: Metadata = {
  title: "Mothrbox",

  description:
    "Mothrbox is a secure, developer-friendly storage layer for Web3 and hybrid apps. It enables client-side encryption using ECC, fast API access, and seamless data storage—encrypted or plain",

  icons: [{ rel: "icon", url: "/favicon.ico" }],

  keywords:
    "Mothrbox, storage layer, Web3, hybrid apps, client-side encryption, ECC encryption, privacy-first infrastructure, confidential data storage, secure data engine, encrypted storage, zero-trust architecture, decentralized storage, blockchain-based access control, NFT access control, NFT-gated content, tokenized access, decentralized privacy engine, blazing-fast APIs, developer tooling, scalable data engine, high-speed data infrastructure, Web3 developer tools, API-first platform, programmable access control, AI data privacy, AI model storage, gated content distribution, Web3 app backend, confidential file sharing, secure content hosting, decentralized AI infrastructure, Walrus protocol, ECC cryptography, token-based permissions, secure NFT minting, cryptographic data sharing, decentralized key management",

  authors: [{ name: "Mothrbox", url: "https://www.mothrbox.xyz" }],

  openGraph: {
    title: "Mothrbox",
    description:
      "Mothrbox is a secure, developer-friendly storage layer for Web3 and hybrid apps. It enables client-side encryption using ECC, fast API access, and seamless data storage—encrypted or plain",
    url: "https://www.mothrbox.xyz",
    siteName: "Mothrbox",
    images: [
      {
        url: "https://www.mothrbox.xyz/images/marine_logo.png",
        width: 720,
        height: 720,
        alt: "Mothrbox Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mothrbox",
    description:
      "Mothrbox is a secure, developer-friendly storage layer for Web3 and hybrid apps. It enables client-side encryption using ECC, fast API access, and seamless data storage—encrypted or plain",
    images: ["https://www.mothrbox.xyz/images/marine_logo.png"],
  },

  metadataBase: new URL("https://www.mothrbox.xyz"),

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://mothrbox.vercel.app",
  },
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
  display: 'swap',
  adjustFontFallback: false,
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryProvider>
      <SuiProvider>
        <SettingsProvider>
        <WalletAuthListener />
        <html
        lang="en"
        className={`${montserrat.className}`}
        suppressHydrationWarning
      >
        <head>
          <StructuredData />
        </head>

        <body>
          <div className="block lg:hidden">
            <Toaster richColors position="top-center" closeButton />
          </div>
          <div className="hidden lg:block">
            <Toaster richColors position="top-right" closeButton />
          </div>
          {children}
        </body>
       </html>
       </SettingsProvider>
      </SuiProvider>
    </QueryProvider>
  );
}
