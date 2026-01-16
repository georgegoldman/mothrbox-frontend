"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="border-t border-white/30 p-5 text-white lg:p-15">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div className="space-y-20">
          <Link href="/" className="mb-5 flex items-center gap-x-2">
            <Image
              src="/images/mtbox-logo.png"
              alt="logo"
              width={40}
              height={40}
            />
            <h3 className="text-[24px] font-bold">Mothrbox</h3>
          </Link>
          <p className="mb-6 max-w-[339px] text-sm md:text-base">
            Preserving and protecting what is human at the end
          </p>

          <div className="text-sm md:text-base">
            © {new Date().getFullYear()} Mothrbox. All rights reserved.
          </div>
          {/* <div className="flex space-x-4">
              <div>
                <a
                  href="https://x.com/mothrbox"
                  referrerPolicy="no-referrer"
                  target="_blank"
                  className="transition hover:text-purple-600"
                >
                  <Twitter size={20} />
                </a>
              </div>

              <div>
                <a
                  href="https://www.linkedin.com/company/mothrbox/"
                  referrerPolicy="no-referrer"
                  target="_blank"
                  className="transition hover:text-purple-600"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div> */}
        </div>

        <div>
          <h3 className="mb-4 text-base font-bold md:text-xl">Links</h3>
          <ul className="space-y-2 md:space-y-5">
            <li>
              <Link
                href="/we-said-no"
                className="text-sm transition hover:text-purple-600 md:text-base"
              >
                We Said No
              </Link>
            </li>

            <li>
              <a
                href="https://docs.mothrbox.xyz/"
                target="_blank"
                referrerPolicy="no-referrer"
                className="text-sm transition hover:text-purple-600 md:text-base"
              >
                Docs
              </a>
            </li>

            <li>
              <a
                href="mailto:mothrbox.gold@gmail.com"
                referrerPolicy="no-referrer"
                target="_blank"
                className="text-sm transition hover:text-purple-600 md:text-base"
              >
                mothrbox.gold@gmail.com
              </a>
            </li>

            <li>
              <a
                href="https://github.com/georgegoldman/mothrbox"
                referrerPolicy="no-referrer"
                target="_blank"
                className="text-sm transition hover:text-purple-600 md:text-base"
              >
                Our GitHub
              </a>
            </li>

            <li>
              <a
                href="/docs/mothrbox_privacy_policy.pdf"
                target="_blank"
                referrerPolicy="no-referrer"
                className="text-sm transition hover:text-purple-600 md:text-base"
              >
                Privacy
              </a>
            </li>

            <li>
              <a
                href="/docs/mothrbox_terms_of_service.pdf"
                target="_blank"
                referrerPolicy="no-referrer"
                className="text-sm transition hover:text-purple-600 md:text-base"
              >
                Terms
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-base font-bold md:text-xl">Newsletter</h3>
          <p className="mb-4 text-sm md:text-base">
            Stay updated with everything related to Mothrbox
          </p>
          <form className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-[#9E5ED6] px-4 py-2 text-white transition"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-2 text-xs text-gray-500">
            By signing up you agree to our privacy policy
          </p>
        </div>
      </div>
    </footer>
  );
}
