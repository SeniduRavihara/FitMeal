"use client";

import { useSidebar } from "@/context/SidebarContext";

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export default function AdminLayoutClient({
  children,
}: AdminLayoutClientProps) {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isCollapsed ? "lg:pl-16" : "lg:pl-64"
      }`}
    >
      {children}
    </div>
  );
}
