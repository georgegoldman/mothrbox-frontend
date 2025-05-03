"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

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

  return (
    <nav className="relative z-50 flex items-center justify-between px-4 py-4">
      <Link href="/">
        <Image src="/images/marine_logo.png" alt="logo" width={40} height={0} />
      </Link>

      {/* Desktop nav */}
      <div className="hidden items-center space-x-8 lg:flex">
        <NavLinks />
      </div>

      <div className="hidden items-center space-x-4 lg:flex">
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

      {/* Hamburger */}
      <div className="flex cursor-pointer lg:hidden" onClick={toggleMenu}>
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        } lg:hidden`}
      />

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 z-50 h-full w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end px-5 py-7">
          <X size={28} onClick={toggleMenu} className="cursor-pointer" />
        </div>

        <div className="flex flex-col items-center space-y-6 px-6">
          <NavLinks onClick={toggleMenu} />
          <div className="flex flex-col items-center space-y-4">
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
        </div>
      </div>
    </nav>
  );
}

function NavLinks({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <Link
        href="#features"
        onClick={onClick}
        className="text-sm text-black transition hover:text-purple-600"
      >
        Features
      </Link>
      <Link
        href="https://mothrbox-docs.vercel.app/"
        target="_blank"
        onClick={onClick}
        className="text-sm text-black transition hover:text-purple-600"
      >
        Docs
      </Link>
      <Link
        href="/dashboard"
        onClick={onClick}
        className="text-sm text-black transition hover:text-purple-600"
      >
        Dashboard
      </Link>
      <a
        href="mailto:mothrbox.gold@gmail.com"
        referrerPolicy="no-referrer"
        target="_blank"
        onClick={onClick}
        className="text-sm text-black transition hover:text-purple-600"
      >
        Contact
      </a>
    </>
  );
}
