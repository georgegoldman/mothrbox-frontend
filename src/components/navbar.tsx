"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import MobileSidebar from "./mobile-sidebar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  // Close menu when clicking outside the sidebar
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

  // Define navigation links in one place for reuse
  const navigationLinks = [
    {
      href: "#features",
      label: "Features",
    },

    {
      href: "https://docs.mothrbox.xyz/",
      label: "Docs",
      isExternal: true,
    },

    {
      href: "/dashboard",
      label: "Dashboard",
    },

    {
      href: "mailto:mothrbox.gold@gmail.com",
      label: "Contact",
      isExternal: true,
    },
  ];

  return (
    <nav className="mx-auto max-w-[825px] rounded-2xl border border-white/30 px-5 py-[10px] text-white">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/mtbox-logo.png"
            width={40}
            height={40}
            alt="mothrbox-logo"
          />
        </Link>

        <div className="hidden items-center space-x-13 lg:flex">
          {navigationLinks.map((link, idx) => {
            const NavLink = link.isExternal ? (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                referrerPolicy="no-referrer"
                className="text-sm transition hover:text-[#9E5ED6]"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={idx}
                href={link.href}
                className="text-sm transition hover:text-[#9E5ED6]"
              >
                {link.label}
              </Link>
            );

            return <React.Fragment key={idx}>{NavLink}</React.Fragment>;
          })}
        </div>

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
      </div>
    </nav>
  );
}
