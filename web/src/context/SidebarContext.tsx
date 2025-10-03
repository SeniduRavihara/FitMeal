"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface SidebarContextType {
  isOpen: boolean;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  toggleCollapse: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false); // For mobile overlay
  const [isCollapsed, setIsCollapsed] = useState(false); // For desktop collapse

  // Close mobile sidebar on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);
  const closeSidebar = () => setIsOpen(false);
  const openSidebar = () => setIsOpen(true);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        isCollapsed,
        toggleSidebar,
        toggleCollapse,
        closeSidebar,
        openSidebar,
      }}
    >
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
