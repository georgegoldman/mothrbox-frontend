"use client";

import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  links: Array<{
    href: string;
    label: string;
    isExternal?: boolean;
  }>;
}

export default function MobileSidebar({
  isOpen,
  onClose,
  links,
}: MobileSidebarProps) {
  // Close sidebar when Escape key is pressed
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      // Prevent scrolling when sidebar is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      // Restore scrolling when sidebar is closed
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed inset-y-0 right-0 z-50 w-[16rem] overflow-y-auto bg-white px-6 py-6 shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            // className="fixed inset-y-0 right-0 z-50 w-64 max-w-full bg-white p-6 shadow-lg"
            // role="dialog"
            // aria-modal="true"
            // aria-label="Navigation menu"
            // initial={{ x: "100%" }}
            // animate={{ x: 0 }}
            // exit={{ x: "100%" }}
            // transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Menu</h2>
              <motion.button
                onClick={onClose}
                className="flex-shrink-0 rounded-full p-1 hover:bg-gray-100"
                aria-label="Close menu"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>
            </div>

            <nav className="mt-8">
              <ul className="flex flex-col items-center space-y-4">
                {links.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                  >
                    {link.isExternal ? (
                      <motion.a
                        href={link.href}
                        className="block py-2 text-lg font-medium text-black transition hover:text-purple-600"
                        onClick={onClose}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {link.label}
                      </motion.a>
                    ) : (
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link
                          href={link.href}
                          className="block py-2 text-lg font-medium text-black transition hover:text-purple-600"
                          onClick={onClose}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mt-5 flex flex-col items-center space-y-4 lg:hidden">
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
