"use client";

import Image from "next/image";
import Link from "next/link";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex flex-row items-center gap-2 group">
               <Image
                src="/images/mtbox-logo.png"
                width={40}
                height={40}
                alt="Mothrbox Logo"
                className="group-hover:opacity-80 transition-opacity"
                priority
               />
               <span className="text-xl font-bold tracking-tight text-white">Mothrbox</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Preserving and protecting what is human at the end. The most secure decentralized storage for your digital legacy.
            </p>
            <div className="flex gap-4">
               <a href="https://x.com/mothrbox" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#9E5ED6] transition-colors">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
               </a>
               <a href="https://github.com/georgegoldman/mothrbox" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#9E5ED6] transition-colors">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
               </a>
               <a href="mailto:mothrbox.gold@gmail.com" className="text-gray-400 hover:text-[#9E5ED6] transition-colors">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
               </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/features" className="hover:text-[#9E5ED6] transition-colors">Features</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#9E5ED6] transition-colors">Pricing</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#9E5ED6] transition-colors">Dashboard</Link>
              </li>
              <li>
                <a href="https://docs.mothrbox.xyz/" target="_blank" rel="noreferrer" className="hover:text-[#9E5ED6] transition-colors">Documentation</a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
               <li>
                <Link href="/about" className="hover:text-[#9E5ED6] transition-colors">About Us</Link>
              </li>
               <li>
                <Link href="/we-said-no" className="hover:text-[#9E5ED6] transition-colors">We Said No</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#9E5ED6] transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#9E5ED6] transition-colors">Careers</Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-sm font-semibold text-white">Legal & Support</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
               <li>
                <a href="/docs/mothrbox_privacy_policy.pdf" target="_blank" className="hover:text-[#9E5ED6] transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="/docs/mothrbox_terms_of_service.pdf" target="_blank" className="hover:text-[#9E5ED6] transition-colors">Terms of Service</a>
              </li>
              <li>
                <Link href="/support" className="hover:text-[#9E5ED6] transition-colors">Help Center</Link>
              </li>
               <li>
                <Link href="/contact" className="hover:text-[#9E5ED6] transition-colors">Contact Support</Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Mothrbox. All rights reserved. Secured by Sui & Walrus.
          </p>
        </div>
      </div>
    </footer>
  );
}
