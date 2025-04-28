"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  File,
  FileText,
  Key,
  Lock,
  LogOut,
  Settings,
  Unlock,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const [apiDocsOpen, setApiDocsOpen] = useState(false);

  // Check if the current path is under API docs
  const isApiDocsPath = pathname.startsWith("/dashboard/api-docs");

  // Auto-expand the dropdown when navigating to an API docs page
  useEffect(() => {
    if (isApiDocsPath) {
      setApiDocsOpen(true);
    }
  }, [isApiDocsPath]);

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return pathname === path;
    }

    // Special case for dashboard root
    if (path === "/dashboard" && pathname === "/dashboard") {
      return true;
    }

    // For nested paths, ensure we don't match parent paths when on a child path
    if (path !== "/dashboard" && pathname.startsWith(path)) {
      // Get all path segments
      const pathnameSegments = pathname.split("/").filter(Boolean);
      const linkSegments = path.split("/").filter(Boolean);

      // If the link has fewer segments than the current path and all segments match,
      // then it's a parent path of the current path
      if (linkSegments.length < pathnameSegments.length) {
        for (let i = 0; i < linkSegments.length; i++) {
          if (linkSegments[i] !== pathnameSegments[i]) {
            return false;
          }
        }
        return true;
      }

      return pathname.startsWith(path);
    }

    return false;
  };

  return (
    <div className="flex h-screen w-[250px] flex-col border-r border-gray-800 bg-black">
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center gap-2">
          <Lock className="h-6 w-6" />
          <span className="font-bold">Logo</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <div className="mb-2 px-4">
          <p className="mb-2 text-xs font-medium text-gray-500">General</p>
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                isActive("/dashboard", true)
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <BarChart2 className="h-4 w-4" />
              Overview
            </Link>
            <Link
              href="/dashboard/encrypt"
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                isActive("/dashboard/encrypt")
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Lock className="h-4 w-4" />
              Encrypt File
            </Link>
            <Link
              href="/dashboard/decrypt"
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                isActive("/dashboard/decrypt")
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Unlock className="h-4 w-4" />
              Decrypt File
            </Link>
          </nav>
        </div>

        <div className="mt-6 px-4">
          <p className="mb-2 text-xs font-medium text-gray-500">Developer</p>
          <nav className="space-y-1">
            <Link
              href="/dashboard/api-keys"
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                isActive("/dashboard/api-keys")
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Key className="h-4 w-4" />
              API Key Management
            </Link>

            {/* API Documentation with dropdown */}
            <div className="relative">
              <button
                onClick={() => setApiDocsOpen(!apiDocsOpen)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm ${
                  isApiDocsPath
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  API Documentation
                </div>
                {apiDocsOpen ? (
                  <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                ) : (
                  <ChevronRight className="h-4 w-4 transition-transform duration-200" />
                )}
              </button>

              {/* Dropdown menu */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  apiDocsOpen
                    ? "max-h-[200px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-4 space-y-1 pb-3 pl-4">
                  <Link
                    href="/dashboard/api-docs/encrypt"
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                      isActive("/dashboard/api-docs/encrypt")
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-300"
                    }`}
                  >
                    Encrypt
                  </Link>
                  <Link
                    href="/dashboard/api-docs/decrypt"
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                      isActive("/dashboard/api-docs/decrypt")
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-300"
                    }`}
                  >
                    Decrypt
                  </Link>
                  <Link
                    href="/dashboard/api-docs/auth"
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                      isActive("/dashboard/api-docs/auth")
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-300"
                    }`}
                  >
                    Auth
                  </Link>
                  <Link
                    href="/dashboard/api-docs/errors"
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                      isActive("/dashboard/api-docs/errors")
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-300"
                    }`}
                  >
                    Errors
                  </Link>
                  <Link
                    href="/dashboard/api-docs/rate-limit"
                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                      isActive("/dashboard/api-docs/rate-limit")
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-300"
                    }`}
                  >
                    Rate Limit
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <div className="px-4">
          <nav className="space-y-1">
            <Link
              href="/dashboard/logs"
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                isActive("/dashboard/logs")
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <File className="h-4 w-4" />
              Logs & Usage
            </Link>
            <Link
              href="/dashboard/settings"
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                isActive("/dashboard/settings")
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-gray-800 p-4">
        <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-800">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
