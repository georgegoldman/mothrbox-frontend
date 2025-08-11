"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isPathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const navigationLinks = [
    { href: "/features", label: "Features" },
    { href: "https://docs.mothrbox.xyz/", label: "Docs", isExternal: true },
    { href: "/support", label: "Support" },
    {
      href: "mailto:mothrbox.gold@gmail.com",
      label: "Contact",
      isExternal: true,
    },
  ];

  return (
    <>
      <nav className="mx-auto max-w-[825px] rounded-2xl border-white/30 px-5 py-[10px] text-white lg:border">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/images/mtbox-logo.png"
              width={40}
              height={40}
              alt="mothrbox-logo"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center space-x-13 lg:flex">
            {navigationLinks.map((link, idx) => {
              const NavLink = link.isExternal ? (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm transition hover:text-[#9E5ED6]"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={idx}
                  href={link.href}
                  className={`text-sm transition ${
                    isPathname === link.href
                      ? "rounded-xl bg-gradient-to-b from-[#9E5ED6] to-[#000000] px-5 py-2"
                      : "hover:text-[#9E5ED6]"
                  }`}
                >
                  {link.label}
                </Link>
              );

              return <React.Fragment key={idx}>{NavLink}</React.Fragment>;
            })}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden items-center space-x-4 lg:flex">
            <Link
              href="/auth/login"
              className="rounded-xl border border-[#9E5ED6]/50 px-7 py-3 text-sm font-bold transition-all hover:bg-[#9E5ED6]/20"
            >
              Login
            </Link>

            <Link
              href="/auth/register"
              className="shadow-inner-glow rounded-xl border border-[#9E5ED6]/50 px-7 py-3 text-sm font-bold transition-all"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="cursor-pointer text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              key="sidebar"
              ref={sidebarRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 z-50 flex h-full w-64 flex-col bg-[#111] p-6"
            >
              {/* Close button */}
              <div className="flex justify-end">
                <button
                  onClick={toggleMenu}
                  aria-label="Close menu"
                  className="cursor-pointer text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Links */}
              <nav className="mt-8 flex flex-col space-y-6">
                {navigationLinks.map((link, idx) =>
                  link.isExternal ? (
                    <a
                      key={idx}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm transition hover:text-[#9E5ED6]"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={idx}
                      href={link.href}
                      className={`text-sm transition ${
                        isPathname === link.href
                          ? "rounded-xl bg-gradient-to-b from-[#9E5ED6] to-[#000000] px-5 py-2"
                          : "hover:text-[#9E5ED6]"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ),
                )}

                <hr className="my-4 border-white/20" />

                {/* Auth Links */}
                <Link
                  href="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl border border-[#9E5ED6]/50 px-7 py-3 text-sm font-bold transition-all hover:bg-[#9E5ED6]/20"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsOpen(false)}
                  className="shadow-inner-glow rounded-xl border border-[#9E5ED6]/50 px-7 py-3 text-sm font-bold transition-all"
                >
                  Sign Up
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
