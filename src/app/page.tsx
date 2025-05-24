"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Lock,
  Layers,
  Twitter,
  Linkedin,
} from "lucide-react";
import Navbar from "@/components/navbar";
import SectionHeader from "@/components/section-header";
import {
  AnimatedButton,
  FadeIn,
  ScaleOnHover,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/animation-component";
import { PageTransition } from "@/components/motion/page-transition";
import Carousel from "@/components/carousel";

export default function HomePage() {
  return (
    <PageTransition>
      <div className="mx-auto min-h-screen max-w-[1200px] bg-white">
        {/* Navigation */}
        <div className="px-4 py-6">
          <FadeIn delay={0.2} duration={0.7}>
            <Navbar />
          </FadeIn>
        </div>

        {/* Hero Section */}
        <section className="py-10 md:py-24">
          <FadeIn
            direction="up"
            delay={0.3}
            duration={0.8}
            className="mb-8 text-center"
          >
            <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-purple-400 via-indigo-400 to-white p-[1px]">
              <div className="inline-flex items-center gap-x-3 rounded-full bg-white px-4 py-3 text-[11px] text-black">
                <div className="h-3 w-3 rounded-full bg-purple-400" />
                End-to-end encryption, zero API call away
              </div>
            </div>

            <h1 className="mx-auto mb-6 max-w-[941px] text-xl font-bold lg:text-[40px]">
              Encrypt anything. Anywhere.{" "}
              <span className="text-purple-600">Instantly.</span>
              <br />
              Your Stripe For Secure File & Data Encryption.
            </h1>

            <p className="mx-auto mb-8 max-w-[941px] px-4 text-black">
              A secure API and web platform to encrypt files & data with one
              click or one line of code.
            </p>

            <div className="px-4 md:px-0">
              <div className="flex flex-row justify-center gap-x-2 md:gap-x-5">
                <AnimatedButton className="rounded-xl bg-purple-400 px-7 py-3 text-sm font-bold text-white transition">
                  <a
                    href="https://docs.mothrbox.xyz/"
                    target="_blank"
                    referrerPolicy="no-referrer"
                  >
                    View Docs
                  </a>
                </AnimatedButton>

                <AnimatedButton className="rounded-xl border border-purple-300 bg-black px-7 py-3 text-sm font-bold text-white shadow-[inset_0_0_25px_#6366f1] transition">
                  <Link href="/dashboard/encrypt">Start Encryption</Link>
                </AnimatedButton>
              </div>
            </div>
          </FadeIn>

          <FadeIn
            direction="up"
            delay={0.6}
            className="overflow-hidden px-5 lg:px-0"
          >
            <Image
              src="/images/Overview.png"
              alt="hero_image"
              width={1239}
              height={600}
              className="rounded-xl"
            />
          </FadeIn>
        </section>

        {/* Features Section */}
        <section id="features" className="py-10 md:py-24">
          <div className="px-4">
            <ScrollReveal>
              <SectionHeader
                title="Our Key Features"
                subtitle="Secure Your Data in Seconds — No Compromises."
              />
            </ScrollReveal>

            <StaggerContainer
              staggerChildren={0.15}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
            >
              <StaggerItem direction="up">
                <ScaleOnHover className="rounded-xl bg-purple-500 p-5 text-white">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                    <Lock className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="mb-4 text-[18px] font-bold">
                    Unbreakable Privacy by Design
                  </h3>
                  <p className="text-sm">
                    Secure your data with client-side ECC encryption (NIST
                    P-256), delivering effortless, end-to-end confidentiality
                    without relying on external trust
                  </p>
                </ScaleOnHover>
              </StaggerItem>

              <StaggerItem direction="up">
                <ScaleOnHover className="rounded-xl bg-gray-100 p-5">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-[18px] font-bold">
                    Revolutionary NFT-Powered Access
                  </h3>
                  <p className="text-sm">
                    Grant precise, user-controlled permissions through
                    decentralized NFT tokens, enabling flexible, tamper-proof
                    access to your private data
                  </p>
                </ScaleOnHover>
              </StaggerItem>

              <StaggerItem direction="up">
                <ScaleOnHover className="rounded-xl bg-gray-100 p-5">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500">
                    <ShieldCheck className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-[18px] font-bold">
                    Seamlessly Scalable Decentralization
                  </h3>
                  <p className="text-sm">
                    Leverage Walrus&apos;s robust, decentralized storage
                    backbone, scale your project with no infrastructure
                    headaches or vendor lock-in
                  </p>
                </ScaleOnHover>
              </StaggerItem>

              <StaggerItem direction="up">
                <ScaleOnHover className="rounded-xl bg-gray-100 p-5">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500">
                    <Layers className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-[18px] font-bold">
                    Developer-Centric Design
                  </h3>
                  <p className="text-sm">
                    Ship faster with secure, high-performance APIs and intuitive
                    SDKs (coming soon), designed to integrate cleanly into your
                    workflow
                  </p>
                </ScaleOnHover>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-10 md:py-24">
          <div className="px-4">
            <ScrollReveal>
              <SectionHeader
                title="Trusted By Developers & Privacy First-Teams"
                subtitle="Everything You Need for Secure, Seamless Encryption."
              />
            </ScrollReveal>

            <Carousel />
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-10 md:py-24">
          <div className="px-4">
            <ScrollReveal>
              <SectionHeader
                title="How it Works"
                subtitle="The Smartest Way to Encrypt Files, Text, and Data Streams."
              />
            </ScrollReveal>

            <div className="flex flex-col items-center justify-center gap-8 lg:flex-row">
              <ScrollReveal
                direction="left"
                className="space-y-5 rounded-[20px] bg-[#f6f6f6] p-5 shadow-md"
              >
                <Image
                  src="/images/step_one.png"
                  alt="step_one"
                  width={489}
                  height={914}
                  className="object-contain"
                />

                <div>
                  <h3 className="text-xl font-bold">Step 1:</h3>
                  <p className="text-xl font-medium">
                    Sign up and get your API key.
                  </p>
                </div>
              </ScrollReveal>

              <div className="flex flex-col items-center gap-y-10">
                <ScrollReveal
                  direction="right"
                  className="space-y-5 rounded-[20px] bg-[#f6f6f6] p-5 shadow-md"
                >
                  <Image
                    src="/images/step_two.png"
                    alt="step_one"
                    width={650}
                    height={366}
                    className="object-contain"
                  />

                  <div>
                    <h3 className="text-xl font-bold">Step 2:</h3>
                    <p className="text-xl font-medium">
                      Choose to encrypt a file or text via the web UI or API.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal
                  direction="right"
                  className="space-y-5 rounded-[20px] bg-[#f6f6f6] p-5 shadow-md"
                >
                  <Image
                    src="/images/step_two.png"
                    alt="step_one"
                    width={650}
                    height={366}
                    className="object-contain"
                  />

                  <div>
                    <h3 className="text-xl font-bold">Step 3:</h3>
                    <p className="text-xl font-medium">
                      Download or share the encrypted result instantly.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-10">
          <div className="px-4">
            <ScrollReveal threshold={0.2}>
              <Link href="/dashboard">
                <ScaleOnHover scale={1.02}>
                  <Image
                    src="/images/built_for_developers.png"
                    alt="cta_banner"
                    width={1239}
                    height={600}
                  />
                </ScaleOnHover>
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white py-16">
          <div className="px-4">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <FadeIn delay={0.1}>
                <h3 className="mb-4 text-xl font-bold">Mothrbox</h3>
                <p className="mb-6 text-gray-600">
                  The Easiest Way to Encrypt, Share, and Protect Your Data.
                  Simple Tools for Complex Security Problems.
                </p>
                <div className="flex space-x-4">
                  <ScaleOnHover>
                    <a
                      href="https://x.com/mothrbox"
                      referrerPolicy="no-referrer"
                      target="_blank"
                      className="text-gray-600 transition hover:text-purple-600"
                    >
                      <Twitter size={20} />
                    </a>
                  </ScaleOnHover>

                  <ScaleOnHover>
                    <a
                      href="https://www.linkedin.com/company/mothrbox/"
                      referrerPolicy="no-referrer"
                      target="_blank"
                      className="text-gray-600 transition hover:text-purple-600"
                    >
                      <Linkedin size={20} />
                    </a>
                  </ScaleOnHover>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h3 className="mb-4 font-bold">Links</h3>
                <ul className="space-y-3">
                  <StaggerContainer staggerChildren={0.05}>
                    <StaggerItem>
                      <li>
                        <a
                          href="https://docs.mothrbox.xyz/"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="text-gray-600 transition hover:text-purple-600"
                        >
                          Docs
                        </a>
                      </li>
                    </StaggerItem>

                    <StaggerItem>
                      <li>
                        <a
                          href="mailto:mothrbox.gold@gmail.com"
                          referrerPolicy="no-referrer"
                          target="_blank"
                          className="text-gray-600 transition hover:text-purple-600"
                        >
                          mothrbox.gold@gmail.com
                        </a>
                      </li>
                    </StaggerItem>

                    <StaggerItem>
                      <li>
                        <a
                          href="https://github.com/georgegoldman/mothrbox"
                          referrerPolicy="no-referrer"
                          target="_blank"
                          className="text-gray-600 transition hover:text-purple-600"
                        >
                          Our GitHub
                        </a>
                      </li>
                    </StaggerItem>

                    <StaggerItem>
                      <li>
                        <a
                          href="/docs/mothrbox_privacy_policy.pdf"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="text-gray-600 transition hover:text-purple-600"
                        >
                          Privacy
                        </a>
                      </li>
                    </StaggerItem>

                    <StaggerItem>
                      <li>
                        <a
                          href="/docs/mothrbox_terms_of_service.pdf"
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="text-gray-600 transition hover:text-purple-600"
                        >
                          Terms
                        </a>
                      </li>
                    </StaggerItem>
                  </StaggerContainer>
                </ul>
              </FadeIn>

              <FadeIn delay={0.3}>
                <h3 className="mb-4 font-bold">Newsletter</h3>
                <p className="mb-4 text-gray-600">
                  Stay updated with everything related to Mothrbox
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                  <AnimatedButton
                    type="submit"
                    className="w-full rounded-md bg-black px-4 py-2 text-white transition hover:bg-gray-800"
                  >
                    Subscribe
                  </AnimatedButton>
                </form>
                <p className="mt-2 text-xs text-gray-500">
                  By signing up you agree to our privacy policy
                </p>
              </FadeIn>
            </div>

            <div className="mt-12 border-t border-gray-200 pt-8 text-sm text-gray-600">
              © {new Date().getFullYear()} Mothrbox. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}
