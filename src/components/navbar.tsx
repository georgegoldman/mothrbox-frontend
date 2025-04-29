"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="flex items-center justify-between">
      <Link href="/">
        <Image src="/images/marine_logo.png" alt="logo" width={40} height={0} />
      </Link>

      <div className="hidden items-center space-x-8 lg:flex">
        <Link
          href="#features"
          className="text-sm text-black transition hover:text-purple-600"
        >
          Features
        </Link>
        <Link
          href="#docs"
          className="text-sm text-black transition hover:text-purple-600"
        >
          Docs
        </Link>
        <Link
          href="/dashboard"
          className="text-sm text-black transition hover:text-purple-600"
        >
          Dashboard
        </Link>
        {/* <Link
          href="#pricing"
          className="text-sm text-black transition hover:text-purple-600"
        >
          Pricing
        </Link> */}
        <a
          href="mailto:mothrbox.gold@gmail.com"
          referrerPolicy="no-referrer"
          target="_blank"
          className="text-sm text-black transition hover:text-purple-600"
        >
          Contact
        </a>
      </div>

      <div className="hidden items-center space-x-4 lg:flex">
        <Link
          href="/login"
          className="rounded-xl border border-purple-500 px-7 py-3 text-sm font-bold text-black transition hover:bg-gray-100"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded-xl border border-purple-300 bg-black px-7 py-3 text-sm font-bold text-white shadow-[inset_0_0_25px_#6366f1] transition"
        >
          {/* hover:shadow-[inset_0_0_25px_#818cf8] - might use later */}
          Sign In
        </Link>
      </div>

      <div className="flex cursor-pointer lg:hidden" onClick={toggleMenu}>
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </div>
    </nav>
  );
}
