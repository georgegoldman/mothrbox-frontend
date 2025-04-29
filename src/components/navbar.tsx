import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <div className="text-xl font-bold">Logo</div>

      <div className="hidden items-center space-x-8 md:flex">
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
        <Link
          href="#pricing"
          className="text-sm text-black transition hover:text-purple-600"
        >
          Pricing
        </Link>
        <Link
          href="#contact"
          className="text-sm text-black transition hover:text-purple-600"
        >
          Contact
        </Link>
      </div>

      <div className="flex items-center space-x-4">
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
    </nav>
  );
}
