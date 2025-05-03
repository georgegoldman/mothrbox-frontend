"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false); // default to false
  const [isMobile, setIsMobile] = useState(false);
  const [hydrated, setHydrated] = useState(false); // new state

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      // Only set isOpen to true for desktop on initial load
      if (!hydrated) {
        setIsOpen(!isMobileView);
      }
    };

    checkScreenSize();
    setHydrated(true);

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [hydrated]);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  // Don't render until hydrated to avoid layout mismatch / flicker
  if (!hydrated) return null;

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, isMobile }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
