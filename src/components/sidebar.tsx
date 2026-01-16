"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  File,
  FileText,
  Key,
  Lock,

  Settings,
  Unlock,
  X,
  Wallet,
} from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";


// import { logout } from "@/app/actions/auth";
import Image from "next/image";
import { toast } from "sonner";


export function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isOpen, toggleSidebar, isMobile, closeSidebar } = useSidebar();


  // const handleLogout = async () => {
  //   await logout();
  //   toast.success("Logged out successfully");
  //   window.location.href = "/auth/login";
  // };

  // Check if the current path is under API docs


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
    <div className="flex min-h-screen overflow-hidden bg-black">
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-30 flex h-full flex-col border-r border-gray-800 bg-black transition-all duration-300 ease-in-out ${
          isOpen ? "w-[250px]" : isMobile ? "w-0" : "w-[70px]"
        } overflow-hidden`}
      >
        {/* Sidebar Header */}
        <div className="flex h-[72.67px] items-center justify-between border-b border-gray-800 p-4">
          <Link href="/" className="flex items-center gap-2 overflow-hidden">
            <Image src="/images/logo.png" alt="logo" width={36} height={36} />
            {isOpen && <span className="font-medium text-white">Mothrbox</span>}
          </Link>
          {isMobile && isOpen && (
            <button
              onClick={toggleSidebar}
              className="rounded-md p-1"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 cursor-pointer text-white" />
            </button>
          )}
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 overflow-y-auto py-4">
          <div className="mb-2 px-4">
            {isOpen && (
              <p className="mb-2 text-xs font-medium text-gray-500">General</p>
            )}
            <nav className="space-y-1">
              <Link
                href="/dashboard"
                onClick={() => {
                  if (isMobile) {
                    closeSidebar();
                  }
                }}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  isActive("/dashboard", true)
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <BarChart2 className="h-4 w-4 flex-shrink-0" />
                {isOpen && <span className="truncate">Overview</span>}
              </Link>

              <Link
                href="/dashboard/encrypt"
                onClick={() => {
                  if (isMobile) {
                    closeSidebar();
                  }
                }}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  isActive("/dashboard/encrypt")
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Lock className="h-4 w-4 flex-shrink-0" />
                {isOpen && <span className="truncate">Upload Files</span>}
              </Link>

              <Link
                href="/dashboard/files"
                onClick={() => {
                  if (isMobile) {
                    closeSidebar();
                  }
                }}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  isActive("/dashboard/files")
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <File className="h-4 w-4 flex-shrink-0" />
                {isOpen && <span className="truncate">My Files</span>}
              </Link>

              <Link
                href="/dashboard/keys"
                onClick={() => {
                  if (isMobile) {
                    closeSidebar();
                  }
                }}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  isActive("/dashboard/keys")
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Key className="h-4 w-4 flex-shrink-0" />
                {isOpen && <span className="truncate">NFT Keys</span>}
              </Link>

              <Link
                href="/dashboard/decrypt"
                onClick={() => {
                  if (isMobile) {
                    closeSidebar();
                  }
                }}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  isActive("/dashboard/decrypt")
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Unlock className="h-4 w-4 flex-shrink-0" />
                {isOpen && <span className="truncate">Decrypt File</span>}
              </Link>
            </nav>
          </div>

          <div className="mt-6 px-4">
            {isOpen && (
              <p className="mb-2 text-xs font-medium text-gray-500">
                Developer
              </p>
            )}
            <nav className="space-y-1">
              <Link
                href="/dashboard/api-keys"
                onClick={() => {
                  if (isMobile) {
                    closeSidebar();
                  }
                }}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  isActive("/dashboard/api-keys")
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Key className="h-4 w-4 flex-shrink-0" />
                {isOpen && <span className="truncate">API Key Management</span>}
              </Link>

              {/* API Documentation with dropdown */}
              <Link
                href="https://docs.mothrbox.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (isMobile) {
                    closeSidebar();
                  }
                }}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
              >
                <FileText className="h-4 w-4 flex-shrink-0" />
                {isOpen && <span className="truncate">API Documentation</span>}
              </Link>
            </nav>
          </div>

          <div className="mt-6 px-4">
            <nav className="space-y-1">
              <Link
                href="/dashboard/logs"
                onClick={() => {
                  if (isMobile) {
                    closeSidebar();
                  }
                }}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  isActive("/dashboard/logs")
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <File className="h-4 w-4 flex-shrink-0" />
                {isOpen && <span className="truncate">Logs & Usage</span>}
              </Link>



              <Link
                href="/dashboard/settings"
                onClick={() => {
                  if (isMobile) {
                    closeSidebar();
                  }
                }}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  isActive("/dashboard/settings")
                    ? "bg-purple-600 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Settings className="h-4 w-4 flex-shrink-0" />
                {isOpen && <span className="truncate">Settings</span>}
              </Link>
            </nav>
          </div>
        </div>


      </aside>

      {/* Mobile bottom navigation for quick access */}
      {isMobile && (
        <div className="fixed right-0 bottom-0 left-0 z-20 flex items-center justify-around border-t border-gray-800 bg-black py-2">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center p-2 ${
              isActive("/dashboard", true) ? "text-purple-500" : "text-gray-400"
            }`}
          >
            <BarChart2 className="h-5 w-5" />
            <span className="text-xs">Overview</span>
          </Link>
          <Link
            href="/dashboard/encrypt"
            className={`flex flex-col items-center p-2 ${
              isActive("/dashboard/encrypt")
                ? "text-purple-500"
                : "text-gray-400"
            }`}
          >
            <Lock className="h-5 w-5" />
            <span className="text-xs">Encrypt</span>
          </Link>
          <Link
            href="/dashboard/decrypt"
            className={`flex flex-col items-center p-2 ${
              isActive("/dashboard/decrypt")
                ? "text-purple-500"
                : "text-gray-400"
            }`}
          >
            <Unlock className="h-5 w-5" />
            <span className="text-xs">Decrypt</span>
          </Link>

          <Link
            href="/dashboard/settings"
            className={`flex flex-col items-center p-2 ${
              isActive("/dashboard/settings")
                ? "text-purple-500"
                : "text-gray-400"
            }`}
          >
            <Settings className="h-5 w-5" />
            <span className="text-xs">Settings</span>
          </Link>
        </div>
      )}

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isOpen ? "lg:ml-[250px]" : isMobile ? "ml-0" : "lg:ml-[70px]"
        } ${isMobile ? "pb-16" : ""} relative z-10`}
      >
        {children}
      </div>
    </div>
  );
}
