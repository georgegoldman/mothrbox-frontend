"use client";

import {
  Brain,
  ChartNoAxesColumn,
  Move,
  Settings,
  Shield,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function FeaturesPage() {
  return (
    <section className="space-y-5 px-5 md:space-y-20 md:py-20">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center">
        <h1 className="text-3xl font-bold md:text-[96px]">Features</h1>
        <p className="text-sm font-medium md:text-xl">
          Powerful Features Built To Secure Everything.
        </p>
      </div>

      <div className="mx-auto max-w-[1100px] space-y-10">
        <div className="mx-auto max-w-5xl space-y-5 md:px-5">
          <h3 className="text-2xl font-bold text-[#9E5ED6] md:text-[32px]">
            Core Features
          </h3>

          {/* number 1 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2">
            {/* Top Left Card */}
            <div className="rounded-xl bg-[#1a1a1a] p-6 text-center text-white shadow-md">
              <div className="mb-4 flex items-center justify-center">
                <Shield strokeWidth={2} size={50} />
              </div>
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                Bank - Grade Encryption
              </h3>
              <p className="mx-auto max-w-[370px] text-sm font-medium md:text-base">
                Encrypt and decrypt data using industry-standard AES-256 and RSA
                protocols. Your data is safe from prying eyes.
              </p>
            </div>

            {/* Top Right Card */}
            <div className="rounded-xl bg-[#1a1a1a] p-6 text-center text-white shadow-md">
              <div className="mb-4 flex items-center justify-center">
                <Zap strokeWidth={2} size={50} />
              </div>
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                Instant Encryption, Zero Delay
              </h3>
              <p className="mx-auto max-w-[370px] text-sm font-medium md:text-base">
                Our encryption engine is optimized for performance, whether
                you&apos;re securing a word or a file, it&apos;s done in
                milliseconds.
              </p>
            </div>

            {/* Full-width bottom card */}
            <div className="rounded-xl bg-[#1a1a1a] p-6 text-center text-white shadow-md lg:col-span-2">
              <div className="mb-4 flex items-center justify-center">
                <Users strokeWidth={2} size={50} />
              </div>
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                Team Ready Workspace
              </h3>
              <p className="text-sm font-medium md:text-base">
                Collaborate securely with your team, invite members, assign
                roles, and control access in real time.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl space-y-5 md:px-5">
          <h3 className="text-2xl font-bold text-[#9E5ED6] md:text-[32px]">
            For Developers
          </h3>

          {/* number 2 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2">
            {/* Top Left Card */}
            <div className="rounded-xl bg-[#1a1a1a] p-6 text-center text-white shadow-md">
              <div className="mb-4 flex items-center justify-center">
                <Move strokeWidth={2} size={50} />
              </div>
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                Developer - Friendly API
              </h3>
              <p className="mx-auto max-w-[370px] text-sm font-medium md:text-base">
                Easily integrate mothrbox into your app or workflow. Generate
                keys encrypt and decrypt with simple endpoint.
              </p>
            </div>

            {/* Top Right Card */}
            <div className="rounded-xl bg-[#1a1a1a] p-6 text-center text-white shadow-md">
              <div className="mb-4 flex items-center justify-center">
                <ChartNoAxesColumn strokeWidth={2} size={50} />
              </div>
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                Track Everything
              </h3>
              <p className="mx-auto max-w-[370px] text-sm font-medium md:text-base">
                Monitor usage, view logs and keep taps on what’s being encrypted
                and by whom
              </p>
            </div>

            {/* Full-width bottom card */}
            <div className="rounded-xl bg-[#1a1a1a] p-6 text-center text-white shadow-md lg:col-span-2">
              <div className="mb-4 flex items-center justify-center">
                <Settings strokeWidth={2} size={50} />
              </div>
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                Flexible Encryption Settingse
              </h3>
              <p className="text-sm font-medium md:text-base">
                Choose from multiple algorithms and key sizes. Set expiring
                dates, limits access and more.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl space-y-5 md:px-5">
          <h3 className="text-2xl font-bold text-[#9E5ED6] md:text-[32px]">
            For Developers
          </h3>

          {/* number 3 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2">
            {/* Top Left Card */}
            <div className="rounded-xl bg-[#1a1a1a] p-6 text-center text-white shadow-md">
              <div className="mb-4 flex items-center justify-center">
                <Brain strokeWidth={2} size={50} />
              </div>
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                We can’t see your Data
              </h3>
              <p className="mx-auto max-w-[370px] text-sm font-medium md:text-base">
                Mothrbox is built on a zero-modal. We never store or view your
                content, only you holds the key.
              </p>
            </div>

            {/* Top Right Card */}
            <div className="rounded-xl bg-[#1a1a1a] p-6 text-center text-white shadow-md">
              <div className="mb-4 flex items-center justify-center">
                <ShieldCheck strokeWidth={2} size={50} />
              </div>
              <h3 className="mb-2 text-xl font-bold md:text-2xl">
                Audit-Friendly and Transcript
              </h3>
              <p className="mx-auto max-w-[370px] text-sm font-medium md:text-base">
                Packed by third-party audits and open security standards. Our
                system is save verified and trustworthy.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] space-y-7 md:space-y-15">
        <div className="mx-auto max-w-[540px] space-y-2 text-center">
          <h1 className="text-[24px] font-bold md:text-[32px]">
            Ready to protect your data?
          </h1>

          <p className="text-sm font-bold">Get started for free</p>
        </div>

        <div className="flex justify-center">
          <Link
            href="/dashboard/encrypt"
            target="_blank"
            referrerPolicy="no-referrer"
            className="rounded-full bg-[#9E5ED6] px-10 py-4 text-sm font-bold text-white shadow-[inset_0_12px_20px_rgba(255,255,255,0.5)] transition-all"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
