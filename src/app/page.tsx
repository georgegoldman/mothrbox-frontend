import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Lock,
  Layers,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";
import Navbar from "@/components/navbar";
import { trustedDevs } from "public";
import SectionHeader from "@/components/section-header";

export default function HomePage() {
  return (
    <div className="mx-auto min-h-screen max-w-[1200px] bg-white">
      {/* Navigation */}
      <div className="px-4 py-6">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="py-10 md:py-24">
        <div className="mb-8 text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-purple-400 via-indigo-400 to-white p-[1px]">
            <div className="inline-flex items-center gap-x-3 rounded-full bg-white px-4 py-3 text-[11px] text-black">
              <div className="h-3 w-3 rounded-full bg-purple-400" />
              End-to-end encryption, zero API call away
            </div>
          </div>

          <h1 className="mx-auto mb-6 max-w-[941px] text-4xl font-bold lg:text-[40px]">
            Encrypt anything. Anywhere.{" "}
            <span className="text-purple-600">Instantly.</span>
            <br />
            Your Stripe For Secure File & Data Encryption.
          </h1>

          <p className="mx-auto mb-8 max-w-[941px] text-black">
            A secure API and web platform to encrypt files & data with one click
            or one line of code.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="#docs"
              className="rounded-xl bg-purple-400 px-10 py-3 text-sm font-bold text-white transition"
            >
              View Docs
            </Link>
            <Link
              href="/dashboard"
              className="rounded-xl border border-purple-300 bg-black px-10 py-3 text-sm font-bold text-white shadow-[inset_0_0_25px_#6366f1] transition"
            >
              Start Encryption
            </Link>
          </div>
        </div>

        <div className="relative h-[400px] overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-purple-100 to-blue-50 md:h-[500px] lg:h-[600px]">
          <Image
            src="/images/Overview.png"
            alt="hero_image"
            width={1239}
            height={600}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-10 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Our Key Features"
            subtitle="Secure Your Data in Seconds — No Compromises."
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-purple-500 p-8 text-white">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <Lock className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="mb-4 text-xl font-bold">End-to-End Encryption</h3>
              <p>
                Encrypt files, text, or data streams securely using AES-256.
              </p>
            </div>

            <div className="rounded-xl bg-gray-100 p-8">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-xl font-bold">Instant Results</h3>
              <p>
                Encrypt files, text, or data streams securely using AES-256.
              </p>
            </div>

            <div className="rounded-xl bg-gray-100 p-8">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500">
                <ShieldCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-xl font-bold">Privacy-first Design</h3>
              <p>
                Encrypt files, text, or data streams securely using AES-256.
              </p>
            </div>

            <div className="rounded-xl bg-gray-100 p-8">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500">
                <Layers className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-xl font-bold">Full-featured</h3>
              <p>
                Encrypt files, text, or data streams securely using AES-256.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-10 md:py-24">
        <div className="px-4">
          <SectionHeader
            title="Trusted By Developers & Privacy First-Teams"
            subtitle="Everything You Need for Secure, Seamless Encryption."
          />

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {trustedDevs.map((dev) => (
              <div key={dev?.id}>
                <Image
                  src={dev?.image}
                  alt="dev_logo"
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-10 md:py-24">
        <div className="px-4">
          <SectionHeader
            title="How it Works"
            subtitle="The Smartest Way to Encrypt Files, Text, and Data Streams."
          />

          <div className="flex items-center justify-center gap-8">
            <div className="space-y-5 rounded-[20px] bg-[#f6f6f6] p-5 shadow-md">
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
            </div>

            <div className="flex flex-col items-center gap-y-10">
              <div className="space-y-5 rounded-[20px] bg-[#f6f6f6] p-5 shadow-md">
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
              </div>

              <div className="space-y-5 rounded-[20px] bg-[#f6f6f6] p-5 shadow-md">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      {/* <section id="pricing" className="py-10 md:py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Simple, Transparent Pricing"
            subtitle="Choose the plan that fits your needs."
          />

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-8">
              <div className="mb-6">
                <h3 className="mb-2 text-xl font-bold">Free</h3>
                <p className="mb-4 text-gray-600">
                  Perfect for getting started
                </p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="ml-2 text-gray-600">/month</span>
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>100 encryptions/month</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>5MB file size limit</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Basic API access</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Community support</span>
                </li>
              </ul>

              <Link
                href="/signup"
                className="block w-full rounded-md border border-gray-300 py-3 text-center text-gray-700 transition hover:bg-gray-100"
              >
                Get Started
              </Link>
            </div>

            <div className="relative rounded-xl border-2 border-purple-500 p-8 shadow-lg">
              <div className="absolute top-0 right-8 -translate-y-1/2 transform rounded-full bg-purple-500 px-4 py-1 text-sm font-medium text-white">
                Popular
              </div>

              <div className="mb-6">
                <h3 className="mb-2 text-xl font-bold">Pro</h3>
                <p className="mb-4 text-gray-600">
                  For professionals and small teams
                </p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="ml-2 text-gray-600">/month</span>
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>10,000 encryptions/month</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>100MB file size limit</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Full API access</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Email support</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Advanced encryption options</span>
                </li>
              </ul>

              <Link
                href="/signup"
                className="block w-full rounded-md bg-purple-600 py-3 text-center text-white transition hover:bg-purple-700"
              >
                Get Started
              </Link>
            </div>

            <div className="rounded-xl border border-gray-200 p-8">
              <div className="mb-6">
                <h3 className="mb-2 text-xl font-bold">Enterprise</h3>
                <p className="mb-4 text-gray-600">For large organizations</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Unlimited encryptions</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Unlimited file size</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Custom API integration</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>On-premise deployment option</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  <span>Custom SLA</span>
                </li>
              </ul>

              <Link
                href="/contact"
                className="block w-full rounded-md border border-gray-300 py-3 text-center text-gray-700 transition hover:bg-gray-100"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Banner */}
      <section className="py-10">
        <div className="px-4">
          <Link href="/dashboard">
            <Image
              src="/images/built_for_developers.png"
              alt="cta_banner"
              width={1239}
              height={600}
            />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xl font-bold">Cryptic</h3>
              <p className="mb-6 text-gray-600">
                The Easiest Way to Encrypt, Share, and Protect Your Data. Simple
                Tools for Complex Security Problems.
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-gray-600 transition hover:text-purple-600"
                >
                  <Instagram size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 transition hover:text-purple-600"
                >
                  <Twitter size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 transition hover:text-purple-600"
                >
                  <Facebook size={20} />
                </Link>
                <Link
                  href="#"
                  className="text-gray-600 transition hover:text-purple-600"
                >
                  <Linkedin size={20} />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-bold">Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#docs"
                    className="text-gray-600 transition hover:text-purple-600"
                  >
                    Docs
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:hello@cryptix.com"
                    className="text-gray-600 transition hover:text-purple-600"
                  >
                    hello@cryptix.com
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/cryptix"
                    className="text-gray-600 transition hover:text-purple-600"
                  >
                    https://github.com/cryptix
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-600 transition hover:text-purple-600"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-600 transition hover:text-purple-600"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-bold">Newsletter</h3>
              <p className="mb-4 text-gray-600">
                Stay updated with everything related to Cryptix
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-md bg-black px-4 py-2 text-white transition hover:bg-gray-800"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-2 text-xs text-gray-500">
                By signing up you agree to our privacy policy
              </p>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8 text-sm text-gray-600">
            © 2025 Cryptix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
