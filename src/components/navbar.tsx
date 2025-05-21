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
    <nav className="relative z-50 flex items-center justify-between px-4 py-4">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Link href="/">
          <Image
            src="/images/marine_logo.png"
            alt="logo"
            width={40}
            height={0}
          />
        </Link>
      </motion.div>

      {/* Desktop nav */}
      <div className="hidden items-center space-x-8 lg:flex">
        {navigationLinks.map((link, index) => {
          const NavLink = link.isExternal ? (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-black transition hover:text-purple-600"
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={index}
              href={link.href}
              className="text-sm text-black transition hover:text-purple-600"
            >
              {link.label}
            </Link>
          );

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              whileHover={{ y: -3 }}
            >
              {NavLink}
            </motion.div>
          );
        })}
      </div>

      <div className="hidden items-center space-x-4 lg:flex">
        {/* <ModeToggle /> */}

        <Link
          href="/auth/login"
          className="rounded-xl border border-purple-500 px-7 py-3 text-sm font-bold text-black transition hover:bg-gray-100"
        >
          Login
        </Link>

        <Link
          href="/auth/register"
          className="rounded-xl border border-purple-300 bg-black px-7 py-3 text-sm font-bold text-white shadow-[inset_0_0_25px_#6366f1] transition"
        >
          Sign Up
        </Link>
      </div>

      {/* Mobile menu button */}
      <motion.button
        className="flex cursor-pointer items-center justify-center p-2 lg:hidden"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        whileTap={{ scale: 0.9 }}
      >
        <Menu size={30} />
      </motion.button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        } lg:hidden`}
      />

      {/* Mobile sidebar */}
      <MobileSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        links={navigationLinks}
      />
    </nav>
  );
}
