import { Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-white/30 p-15 text-white">
      <div className="px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-20">
            <div className="mb-5 flex items-center gap-x-2">
              <Image
                src="/images/mtbox-logo.png"
                alt="logo"
                width={40}
                height={40}
              />
              <h3 className="text-[24px] font-bold">Mothrbox</h3>
            </div>
            <p className="mb-6 max-w-[339px]">
              Preserving and protecting what is human at the end
            </p>

            <div className="text-sm">
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
            <h3 className="mb-4 font-bold">Links</h3>
            <ul className="space-y-5">
              <div>
                <div>
                  <li>
                    <a
                      href="https://docs.mothrbox.xyz/"
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="transition hover:text-purple-600"
                    >
                      Docs
                    </a>
                  </li>
                </div>

                <div>
                  <li>
                    <a
                      href="mailto:mothrbox.gold@gmail.com"
                      referrerPolicy="no-referrer"
                      target="_blank"
                      className="transition hover:text-purple-600"
                    >
                      mothrbox.gold@gmail.com
                    </a>
                  </li>
                </div>

                <div>
                  <li>
                    <a
                      href="https://github.com/georgegoldman/mothrbox"
                      referrerPolicy="no-referrer"
                      target="_blank"
                      className="transition hover:text-purple-600"
                    >
                      Our GitHub
                    </a>
                  </li>
                </div>

                <div>
                  <li>
                    <a
                      href="/docs/mothrbox_privacy_policy.pdf"
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="transition hover:text-purple-600"
                    >
                      Privacy
                    </a>
                  </li>
                </div>

                <div>
                  <li>
                    <a
                      href="/docs/mothrbox_terms_of_service.pdf"
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="transition hover:text-purple-600"
                    >
                      Terms
                    </a>
                  </li>
                </div>
              </div>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-bold">Newsletter</h3>
            <p className="mb-4">
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
      </div>
    </footer>
  );
}
