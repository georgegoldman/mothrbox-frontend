import "@/styles/globals.css";

import { type Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Mothrbox",
  description:
    "Mothrbox is a secure, developer-friendly storage layer for Web3 and hybrid apps. It enables client-side encryption using ECC, fast API access, and seamless data storage—encrypted or plain",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${montserrat.className}`}
      suppressHydrationWarning
    >
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
  );
}
